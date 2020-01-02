
import * as Craft from '@craftkit/craft-uikit';

import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { BackButton } from './BackButton.js';
import { MenuButton } from './MenuButton.js';
import { Sidemenu } from './Sidemenu.js';

/** 
 * NavigationGroup 
 * 
 * @packagename Craft.Widget.NavigationGroup.ViewController
 */
export class ViewController extends Craft.UI.DefaultRootViewController {
	
	/** 
	 * NavigationGroup constructor
	 * 
	 * @param {Object} options - options
	 * @param {Object} options.config - config
	 * @param {Object} options.config.NavigationGroup - config for NavigationGroup itself
	 * @param {Object} options.config.Sidemenu - config for Sidemenu
	 * @param {Boolean} options.enableHeader - true to enable Header (default true)
	 * @param {Boolean} options.enableFooter - true to enable Footer (default false)
	 * @param {Boolean} options.enableSidemenu - true to enable Sidemenu (default false)
	 * @param {Boolean} options.disableBackBtn - true to disable Back button in the Header (default true)
	 * @param {Boolean} options.disableMenuBtn - true to disable Menu button in the Header (default false)
	 * @param {Craft.UI.View|Craft.UI.ViewController} options.page - initial page (not work if you call bringup() at start)
	 * @param {Integer} options.GENERAL_ANIM_DURATION - animation duration
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.ViewController';
		this.stack       = [];    // history
		this.currentView = '';    // current viewing page component 
		this.Pages       = {};    // support to access page object by its name, and manages metadata
		this.parent      = '';    // parent NavigationGroup
		
		this.GENERAL_ANIM_DURATION = options.GENERAL_ANIM_DURATION || 150;
		
		this.config = options.config || {};
		if( !this.config.NavigationGroup ){ this.config.NavigationGroup = {}; }
		if( !this.config.Sidemenu        ){ this.config.Sidemenu = { width:'250px', height:'100vh' }; }
		
		if( options.template ){ this.template = options.template; }
		if( options.style ){ this.style = options.style; }
		
		this.header_height = 0;
		this.footer_height = 0;
		
		if( options.enableHeader ){
			this.header_height = 44;
		}
		if( options.enableFooter ){
			this.footer_height = 44;
		}
		
		this.enableHeader   = options.enableHeader || true;
		this.enableFooter   = options.enableFooter || false;
		this.enableSidemenu = options.enableSidemenu || false;
		this.disableBackBtn = options.disableBackBtn || false;
		this.disableMenuBtn = options.disableMenuBtn || false;
		this.initialPage    = options.page; // this.initialPage will be deleted after appended (moved to this.currentView)
		
		this.sidemenu_active = false; // true if sidemenu is active
	}
	
	/** 
	 * viewDidLoad
	 * 
	 * in here, dont call super.viewDidLoad, to implement 
	 * 
	 * @override
	 * @protected
	 */
	viewDidLoad(callback){
		this.contents = this.shadow.getElementById('contents');
		this.mask     = this.shadow.getElementById('mask');
		
		// sub components
		this.Header     = '';
		this.Footer     = '';
		this.Sidemenu   = '';
		this.MenuButton = '';
		this.BackButton = '';
		
		// prevent touchmove of masked contents
		this.mask.addEventListener('touchmove',(e) => { e.preventDefault(); });
		
		// header
		if( this.enableHeader ){
			this.Header = new Header();
			this.Header.setViewController(this);
			this.Header.loadView();
			this.shadow.getElementById("header").appendChild(this.Header.view);
		}
		
		// footer
		if( this.enableFooter ){
			this.Footer = new Footer();
			this.Footer.setViewController(this);
			this.Footer.loadView();
			this.shadow.getElementById("footer").appendChild(this.Footer.view);
		}
		
		// back button
		if( this.enableHeader && !this.disableBackBtn ){
			this.BackButton = new BackButton();
			this.BackButton.setViewController(this);
			this.BackButton.loadView();
			this.BackButton.viewWillAppear();
			this.Header.leftbtns.appendChild(this.BackButton.view);
			this.Header.leftbuttons.push(this.BackButton);
			this.BackButton.viewDidAppear();
		}
		
		// menu button
		if( this.enableHeader && this.enableSidemenu && !this.disableMenuBtn ){
			this.MenuButton = new MenuButton();
			this.MenuButton.setViewController(this);
			this.MenuButton.loadView();
			this.MenuButton.viewWillAppear();
			this.Header.rightbtns.appendChild(this.MenuButton.view);
			this.Header.rightbuttons.push(this.MenuButton);
			this.MenuButton.viewDidAppear();
		}
		
		// sidemenu
		if( this.enableSidemenu ){
			this.Sidemenu = new Sidemenu({
				config     : this.config.Sidemenu,
				mask       : this.mask,
				paerntView : this.view,
			});
			this.Sidemenu.setViewController(this);
			this.Sidemenu.loadView();
			this.shadow.appendChild(this.Sidemenu.view);
		}
		
		// define open method
		if( this.enableHeader && !this.disableBackBtn ){
			this.open = this.open_with_anim;
		}else{
			this.open = this.open_without_anim;
		}
		
		// support swipe right to back page
		if( this.enableHeader && !this.disableBackBtn ){
			Craft.Core.Gesture.enableSwipe({
				target : this.contents,
				right  : (event) => { this.back(); }
			});
		}
		// fire ContentTapped event occured on the `contents` (DefaultViewController does on this.view)
		Craft.Core.Gesture.enableTap({
			target : this.contents,
			tap    : (event) => { Craft.Core.NotificationCenter.notify('ContentTapped',event); }
		});
		
		// at last, open initial page if defined
		if( this.initialPage ){
			this.open({page:this.initialPage});
		}
		
		if( callback ){ callback() }
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
	/** 
	 * reset navigation stack
	 */
	reset(){
		for( let i=0; i<this.stack.length; i++ ){
			this.stack[i].viewWillDisappear();
		}
		this.stack              = [];    // history
		this.currentView        = '';    // current viewing page component 
		this.Pages              = {};    // support to access page object by its name, and manages metadata
		this.contents.innerHTML = '';    // clear contents
		if( this.BackButton ){
			this.BackButton.view.style['display'] = 'none';
		}
		for( let i=0; i<this.stack.length; i++ ){
			this.stack[i].viewDidDisappear();
		}
	}
	
	/** 
	 * relayout scaffold kicked after the page transition.  
	 * You may override this method to adjust your header and footer layout after page transition.
	 */
	relayoutNavigationElements(){
		return;
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
	/** 
	 * Open page with|without animation.  
	 * You should not call newpage's loadView(). It is done by me.
	 * 
	 * (Concrete open method will be defined in viewDidLoad according to the disableBackBtn flag)
	 * 
	 * @param {Object} options - options
	 * @param {Craft.Core.Component} options.page - page component
	 * @param {Function} options.callback - callback
	 * @param {Craft.Core.Route} options.route - Route object
	 * @param {Boolean} options.earlycallback - invoke callback before page transition
	 */
	open(){
		// will be replaced at viewDidLoad
	}
	
	/** 
	 * Open page with animation.  
	 * 
	 * @private
	 * 
	 * @param {Object} options - options
	 * @param {Craft.Core.Component} options.page - page component
	 * @param {Function} options.callback - callback
	 * @param {Craft.Core.Route} options.route - Route object
	 * @param {Boolean} options.earlycallback - invoke callback before page transition
	 */
	open_with_anim(options){
		let page     = options.page;
		let callback = options.callback;
		let route    = options.route;
		
		let disappearingView = this.currentView;
		let appearingView    = page;
		
		appearingView.setViewController(this);
		
		if( !appearingView.isViewLoaded ){
			appearingView.loadView();
		}
		
		let initial_left = 0;
		let initial_opacity = 0;
		if( disappearingView ){
			disappearingView.viewWillDisappear();
			initial_left = document.body.clientWidth;
			initial_opacity = 1;
			this.Pages[disappearingView.componentId].scrollTop = disappearingView.view.scrollTop;
		}
		
		appearingView.viewWillAppear( () => {
			if( options.earlycallback && callback ){ callback(); }
			
			if( !this.Pages[appearingView.componentId] ){
				this.Pages[appearingView.componentId] = {
					page            : appearingView,
					contents_width  : appearingView.view.clientWidth,
					contents_height : appearingView.view.clientHeight,
					scrollTop       : 0,
				};
			}
			
			appearingView.view.style['position'] = 'absolute';
			appearingView.view.style['left']     = String(initial_left)+'px';
			appearingView.view.style['opacity']  = initial_opacity;
			
			this.stack.push(appearingView);
			this.contents.appendChild(appearingView.view);
			appearingView.view.scrollTop = this.Pages[appearingView.componentId].scrollTop;
			
			appearingView.show();
			appearingView.viewDidAppear();
			
			this.currentView = appearingView;
			
			if( disappearingView ){
				Craft.Core.Transition.animate({
					element    : disappearingView.view,
					properties : { 'left': String(-1 * document.body.clientWidth)+'px', opacity: 0.0 },
					duration   : this.GENERAL_ANIM_DURATION,
					callback   : () => {
						disappearingView.viewDidDisappear();
						disappearingView.view.remove();
					}
				});
				Craft.Core.Transition.animate({
					element    : appearingView.view,
					properties : { 'left': '0px', opacity: 1 },
					duration   : this.GENERAL_ANIM_DURATION,
					callback   : () => {
						if( appearingView.path ){
							window.history.pushState(appearingView.componentId,null,appearingView.path);
						}
						if( !options.earlycallback && callback ){ callback(); }
						if( this.BackButton ){
							this.BackButton.view.style['display'] = 'block';
						}
						this.relayoutNavigationElements();
					}
				});
			}else{
				Craft.Core.Transition.animate({
					element    : appearingView.view,
					properties : { 'left': '0px', opacity: 1 },
					duration   : this.GENERAL_ANIM_DURATION,
					callback   : () => {
						if( !options.earlycallback && callback ){ callback(); }
						this.relayoutNavigationElements();
					}
				});
			}
		});
		return false;
	}
	
	/** 
	 * Open page without animation.  
	 * 
	 * @private
	 * 
	 * @param {Object} options - options
	 * @param {Craft.Core.Component} options.page - page component
	 * @param {Function} options.callback - callback
	 * @param {Craft.Core.Route} options.route - Route object
	 * @param {Boolean} options.earlycallback - invoke callback before page transition
	 */
	open_with_anim(options){
		let page     = options.page;
		let callback = options.callback;
		let route    = options.route;
		
		let disappearingView = this.currentView;
		let appearingView    = page;
		
		if( !appearingView.isViewLoaded ){
			appearingView.loadView();
		}
		appearingView.setViewController(this);
		
		let initial_opacity = 0;
		if( disappearingView ){
			disappearingView.viewWillDisappear();
			initial_opacity = 1;
			this.Pages[disappearingView.componentId].scrollTop = disappearingView.view.scrollTop;
		}
		
		appearingView.viewWillAppear( () => {
			if( options.earlycallback && callback ){ callback(); }
			
			if( !this.Pages[appearingView.componentId] ){
				this.Pages[appearingView.componentId] = {
					page            : appearingView,
					contents_width  : appearingView.view.clientWidth,
					contents_height : appearingView.view.clientHeight,
					scrollTop       : 0,
				};
			}
			
			appearingView.view.style['position'] = 'absolute';
			appearingView.view.style['left']     = '0px';
			appearingView.view.style['opacity']  = initial_opacity;
			
			this.stack.push(appearingView);
			this.contents.appendChild(appearingView.view);
			appearingView.view.scrollTop = this.Pages[appearingView.componentId].scrollTop;
			
			appearingView.show();
			appearingView.viewDidAppear();
			
			this.currentView = appearingView;
			
			if( disappearingView ){
				disappearingView.viewDidDisappear();
				disappearingView.view.remove();
				
				appearingView.view.style['opacity'] = 1;
				
				Craft.Core.Transition.animate({
					element    : appearingView.view,
					properties : { opacity: 1 },
					duration   : this.GENERAL_ANIM_DURATION,
					callback   : () => {
						window.history.pushState(appearingView.componentId,null,appearingView.path);
						
						if( !options.earlycallback && callback ){ callback(); }
						
						this.relayoutNavigationElements();
					}
				});
			}else{
				Craft.Core.Transition.animate({
					element    : appearingView.view,
					properties : { opacity: 1 },
					duration   : this.GENERAL_ANIM_DURATION,
					callback   : () => {
						if( !options.earlycallback && callback ){ callback(); }
						
						this.relayoutNavigationElements();
					}
				});
			}
		});
		return false;
	}
	
	/** 
	 * Popstate event entrance
	 * 
	 * @override
	 */
	didReceivePopstate(event,launch){
		this.reset(); // browser back/forward should reset navigation
		super.didReceivePopstate(event,launch); // use default strategy (hash routing)
	}
	
	/** 
	 * Register History (history.pushState)  
	 * 
	 * @override
	 * @protected
	 */
	pushState(){
		window.history.pushState(this.currentView.componentId,null,this.currentView.path);
	}
	
	/** 
	 * Check can back
	 * 
	 * @private
	 */
	can_back(){
		if( this.stack.length <= 1 ){
			return false;
		}else{
			return true;
		}
	}
	
	/** 
	 * Page back
	 * 
	 * @param {Number} back - how many pages to back
	 * @param {Function} callback - callback
	 * @param {Object} options - options
	 * 
	 * @example
	 * 
	 * //back 2 pages:
	 * viewController.back(2,callback);
	 * 
	 */
	back( back, callback, options ){
		if( !options ){ options = {}; }
		
		if( this.stack.length <= 1 ){
			// no more history
			return;
		}
		
		if( !back ){ back = 1; }
		let index = this.stack.length - back;
		if( index < 1 ){ index = 1; }
		
		let disappearingViews = this.stack.splice(index);
		let disappearingView  = this.currentView;
		let appearingView     = this.stack[this.stack.length-1];
		
		for( let i=0; i<disappearingViews.length; i++ ){
			disappearingViews[i].viewWillDisappear();
		}
		
		appearingView.view.style['position'] = 'absolute';
		appearingView.view.style['left']     = String(-1 * document.body.clientWidth)+'px';
		appearingView.view.style['opacity']  = 0;
		
		appearingView.viewWillAppear( () => {
			this.contents.appendChild(appearingView.view);
			if( this.Pages[appearingView.componentId].scrollTop ){
				appearingView.view.scrollTop = this.Pages[appearingView.componentId].scrollTop;
			}
			appearingView.show();
			appearingView.viewDidAppear();
			
			this.currentView = appearingView;
			
			if( appearingView.path ){
				window.history.pushState(appearingView.componentId,null,appearingView.path);
			}
			
			if( this.stack.length === 1 ){
				this.BackButton.view.style['display'] = 'none';
			}
			
			this.relayoutNavigationElements();
			
			Craft.Core.Transition.animate({
				element    : disappearingView.view,
				properties : { 'left': String(document.body.clientWidth)+'px', opacity: 0 },
				duration   : this.GENERAL_ANIM_DURATION,
				callback   : () => {
					delete this.Pages[disappearingView.componentId];
					disappearingView.viewDidDisappear();
					disappearingView.view.remove();
				}
			});
			Craft.Core.Transition.animate({
				element    : appearingView.view,
				properties : { 'left': '0px', opacity: 1 },
				duration   : this.GENERAL_ANIM_DURATION,
				callback   : () => {
					if( callback ){ callback(); }
				}
			});
		});
		return false;
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
	/** 
	 * Set sidemenu
	 * 
	 * @param {Craft.Widget.NavigationGroup.Sidemenu} sidemenu - sidemenu
	 */
	setSidemenu( sidemenu ){
		this.Sidemenu.open(sidemenu);
	}
	
	/** 
	 * Toggle sidemenu  
	 * (mask is controlled by Sidemenu)
	 * 
	 * @param {Object} options - options pass to Header/Footer enableButtons/disableButtons
	 */
	toggleSidemenu( options ){
		if( !this.enableSidemenu ){
			return;
		}
		if( this.sidemenu_active ){
			this.Sidemenu.hide();
			this.sidemenu_active = false;
		}else{
			this.Sidemenu.show();
			this.sidemenu_active = true;
		}
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
	/** 
	 * style
	 * @protected
	 */
	style(componentId){
		let stylesheet = `
			* { 
				box-sizing:border-box;
			}
			:host {
				width: 100vw;
				height: 100vh;
				overflow: hidden;
				margin:0;
				padding-top: env(safe-area-inset-top);
				padding-bottom: env(safe-area-inset-bottom);
				padding-left: 0px;
				padding-right: 0px;
				touch-action: manipulation;
			}
			.root {
				width: 100vw;
				height: 100vh;
				overflow: hidden;
			}
			.contents {
				height: calc( 100vh - ${this.header_height}px - ${this.footer_height}px - env(safe-area-inset-bottom) - env(safe-area-inset-top) ); /* should be fit in the safe area */
				width: 100vw;
				margin-left: 0px;
				overflow-x: hidden;
				overflow-y: hidden;
			}
			.mask {
				display: none;
				position: absolute;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background-color: rgba(0,0,0,0.4);
				opacity: 0.25;
				overflow: hidden;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
				-webkit-touch-callout: none;
			}
			.header {
			}
			.header:after {
				clear: both;
			}
			.footer {
			}
		`;
		
		return stylesheet;
	}
	
	/** 
	 * template
	 * @protected
	 */
	template(componentId){
		return `
			<div id="root" class="root">
				<div id="header" class="header"></div>
				<div id="contents" class="contents"></div>
				<div id="mask" class="mask" onclick="Craft.Core.ComponentStack.get('${componentId}').toggleSidemenu();"></div>
				<div id="footer" class="footer"></div>
			</div>
		`;
	}
	
};

