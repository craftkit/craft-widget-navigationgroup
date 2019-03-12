
import * as Craft from 'craft-uikit';

/** 
 * Header subsystem 
 * 
 * @packagename Craft.Widget.NavigationGroup.Header
 */
export class Header extends Craft.UI.View {
	
	/** 
	 * Header constructor
	 * 
	 * @param {Object} options - options
	 * @param {Number} options.height - height
	 * @param {Number} options.GENERAL_ANIM_DURATION - animation duration (optional)
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.Header';
		
		this.parent = '';
		
		if( !options ){ options = {}; }
		if( options.template ){ this.template = options.template; }
		if( options.style    ){ this.style    = options.style;    }
		
		this.height = options.height || 44;
		
		this.leftbtns  = '';
		this.rightbtns = '';
		this.title     = '';
		
		this.viewItems    = []; // utility objects placed on center area
		this.rightbuttons = []; // button objects placed on right button area 
		this.leftbuttons  = []; // button objects placed on left button area 
		
		this.GENERAL_ANIM_DURATION = options.GENERAL_ANIM_DURATION || 150;
	}
	
	/** 
	 * viewDidLoad
	 * @override
	 * @protected
	 */
	viewDidLoad(callback){
		this.leftbtns  = this.shadow.getElementById('leftButtons');
		this.rightbtns = this.shadow.getElementById('rightButtons');
		this.title     = this.shadow.getElementById('title');
		if( callback ){ callback(); }
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
	/** 
	 * Set title (text)
	 * 
	 * @param {String} text - header text
	 * @param {Object} options - options
	 * @param {Object} options.fontSize - font size
	 */
	setTitle(text,options){
		let title = this.shadow.getElementById('title');
		if( options && options.fontSize ){ title.style['font-size'] = options.fontSize; }
		title.innerHTML = text;
	}
	
	/** 
	 * Set title (component)
	 * 
	 * @param {Craft.Core.Component} - header component
	 */
	setTitleView(component){
		let title = this.shadow.getElementById('title');
		if( !component.isViewLoaded ){
			component.loadView();
		}
		component.setViewController(this);
		component.viewWillAppear();
		title.innerHTML = '';
		title.appendChild(component.view);
		component.viewDidAppear();
		this.viewItems.push(component);
	}
	
	/** 
	 * Clear title
	 */
	clearTitleView(){
		for( let i=0; i<this.viewItems.length; i++ ){
			this.viewItems[i].viewWillDisappear();
		}
		let title = this.shadow.getElementById('title');
		title.innerHTML = '';
		for( let i=0; i<this.viewItems.length; i++ ){
			this.viewItems[i].viewDidDisappear();
		}
	}
	
	/** 
	 * Set right area buttons
	 * 
	 * @param {Array} buttons - array of component placed on right area
	 */
	setRightButtons(buttons){
		this.clearRightButtons();
		this.addRightButtons(buttons);
	}
	
	/** 
	 * Set left area buttons
	 * 
	 * @param {Array} buttons - array of component placed on left area
	 */
	setLeftButtons(buttons){
		this.clearLeftButtons();
		this.addLeftButtons(buttons);
	}
	
	/** 
	 * Add right area button
	 * 
	 * @param {Craft.Core.Component} button - component added to the right area
	 */
	addRightButtons(buttons){
		for( let i=0; i<buttons.length; i++ ){
			let btn = buttons[i];
			if( !btn.isViewLoaded ){
				btn.loadView();
				btn.setViewController(this);
			}
			btn.viewWillAppear();
			this.rightbtns.appendChild(btn.view);
			this.rightbuttons.push(btn);
			btn.viewDidAppear();
		}
	}
	
	/** 
	 * Add left area button
	 * 
	 * @param {Craft.Core.Component} button - component added to the left area
	 */
	addLeftButtons(buttons){
		for( let i=0; i<buttons.length; i++ ){
			let btn = buttons[i];
			if( !btn.isViewLoaded ){
				btn.loadView();
				btn.setViewController(this);
			}
			btn.viewWillAppear();
			this.leftbtns.appendChild(btn.view);
			this.leftbuttons.push(btn);
			btn.viewDidAppear();
		}
	}
	
	/** 
	 * Clear right area buttons
	 * 
	 * @example
	 * 
	 * header.clearRightButtons({ exceptions:['Craft.Widget.NavigationGroup.BackButton'] });
	 * 
	 */
	clearRightButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		this.rightbtns.innerHTML = '';
		let new_rightbuttons = [];
		for( let i=0; i<this.rightbuttons.length; i++ ){
			let btn = this.rightbuttons[i];
			if( btn.packagename && exceptions[btn.packagename] ){
				new_rightbuttons.push(btn);
				this.rightbtns.appendChild(btn.view);
			}
		}
		this.rightbuttons = new_rightbuttons;
	}
	
	/** 
	 * Clear left area buttons
	 * 
	 * @example
	 * 
	 * header.clearLeftButtons({ exceptions:['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	clearLeftButtons(){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		this.leftbtns.innerHTML = '';
		let new_leftbuttons = [];
		for( let i=0; i<this.leftbuttons.length; i++ ){
			let btn = this.leftbuttons[i];
			if( btn.packagename && exceptions[btn.packagename] ){
				new_leftbuttons.push(btn);
				this.leftbtns.appendChild(btn.view);
			}
		}
		this.leftbuttons = new_leftbuttons;
	}
	
	/** 
	 * Disable title
	 */
	disableTitle(){
		if( this.title ){
			this.title.style['pointer-events'] = 'none';
			Craft.Core.Transition.animate({
				element    : this.title,
				properties : { opacity: 0.5 },
				duration   : this.GENERAL_ANIM_DURATION,
			});
		}
		return false;
	}
	
	/** 
	 * Enable title
	 */
	enableTitle(){
		if( this.title ){
			this.title.style['pointer-events'] = 'all';
			Craft.Core.Transition.animate({
				element    : this.title,
				properties : { opacity: 1 },
				duration   : this.GENERAL_ANIM_DURATION,
			});
		}
		return false;
	}
	
	/** 
	 * Disable all buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be disabled
	 * 
	 * @example
	 * 
	 * // disable hader buttons except predefined button that is instance of Craft.Widget.NavigationGroup.MenuButton:
	 * header.disableButtons({ exception: ['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	disableButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		this.disableRightButtons(options);
		this.disableLeftButtons(options);
		return false;
	}
	
	/** 
	 * Enable all buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be enabled
	 * 
	 * @example
	 * 
	 * // enable hader buttons except predefined button that is instance of Craft.Widget.NavigationGroup.MenuButton:
	 * header.enableButtons({ exception: ['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	enableButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		this.enableRightButtons(options);
		this.enableLeftButtons(options);
		return false;
	}
	
	/** 
	 * Disable right buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be disabled
	 * 
	 * @example
	 * 
	 * // disable hader buttons except predefined button that is instance of Craft.Widget.NavigationGroup.MenuButton:
	 * header.disableRightButtons({ exception: ['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	disableRightButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		if( this.rightbuttons.length > 0 ){
			for( let i=0; i<this.rightbuttons.length; i++ ){
				let btn = this.rightbuttons[i];
				if( exceptions && btn.packagename && exceptions[btn.packagename] ){ continue; }
				btn.view.style['pointer-events'] = 'none';
				Craft.Core.Transition.animate({
					element    : btn.view,
					properties : { opacity: 0.5 },
					duration   : this.GENERAL_ANIM_DURATION,
				});
			}
		}
		return false;
	}
	
	/** 
	 * Enable right buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be enabled
	 * 
	 * @example
	 * 
	 * // enable hader buttons except predefined button that is instance of Craft.Widget.NavigationGroup.MenuButton:
	 * header.enableRightButtons({ exception: ['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	enableRightButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		if( this.rightbuttons.length > 0 ){
			for( let i=0; i<this.rightbuttons.length; i++ ){
				let btn = this.rightbuttons[i];
				if( exceptions && btn.packagename && exceptions[btn.packagename] ){ continue; }
				btn.view.style['pointer-events'] = 'all';
				Craft.Core.Transition.animate({
					element    : btn.view,
					properties : { opacity: 1 },
					duration   : this.GENERAL_ANIM_DURATION,
				});
			}
		}
		return false;
	}
	
	/** 
	 * Disable left buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be disabled
	 * 
	 * @example
	 * 
	 * // disable hader buttons except predefined button that is instance of Craft.Widget.NavigationGroup.MenuButton:
	 * header.disableLeftButtons({ exception: ['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	disableLeftButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		if( this.leftbuttons.length > 0 ){
			for( let i=0; i<this.leftbuttons.length; i++ ){
				let btn = this.leftbuttons[i];
				if( btn.disabled ){ continue; }
				if( exceptions && btn.packagename && exceptions[btn.packagename] ){ continue; }
				btn.view.style['pointer-events'] = 'none';
				Craft.Core.Transition.animate({
					element    : btn.view,
					properties : { opacity: 0.5 },
					duration   : this.GENERAL_ANIM_DURATION,
				});
			}
		}
		return false;
	}
	
	/** 
	 * Enable left buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be enabled
	 * 
	 * @example
	 * 
	 * // enable hader buttons except predefined button that is instance of Craft.Widget.NavigationGroup.MenuButton:
	 * header.enableLeftButtons({ exception: ['Craft.Widget.NavigationGroup.MenuButton'] });
	 * 
	 */
	enableLeftButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		if( this.leftbuttons.length > 0 ){
			for( let i=0; i<this.leftbuttons.length; i++ ){
				let btn = this.leftbuttons[i];
				if( btn.disabled ){ continue; }
				if( exceptions && btn.packagename && exceptions[btn.packagename] ){ continue; }
				btn.view.style['pointer-events'] = 'all';
				Craft.Core.Transition.animate({
					element    : btn.view,
					properties : { opacity: 1 },
					duration   : this.GENERAL_ANIM_DURATION,
				});
			}
		}
		return false;
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
	/** 
	 * style
	 * @protected
	 */
	style(componentId){
		return `
			.root {
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				width: 100vw;
				min-height: 44px;
				text-align: center;
				clear: both;
				background-color: #f5f5f7;
				border-color: #d0d0d0;
				border-width: 0px 0px 1px 0px;
				border-style: solid;
				${ Craft.UI.Device.hasDisplayCutout() 
					? `padding-left: env(safe-area-inset-left);
					   padding-right: env(safe-area-inset-right);`
					: ``
				}
			}
			.root:after {
				clear: both;
			}
			.leftbuttons {
				width: 44px;
				height: 44px;
			}
			.leftbuttons_shrinked {
				width: 44px;
				height: 44px;
			}
			@media screen and (max-width:600px){
				.leftbuttons_shrinked {
					width: 22px;
					height: 44px;
				}
			}
			.rightbuttons {
				width: 44px;
				height: 44px;
			}
			.title {
				flex: 1;
				height: 44px;
				width: 50%;
				margin-right: auto;
				margin-left: auto;
				overflow-x: hidden;
				overflow-y: hidden;
				color: #000;
				font-size: 18px;
				line-height: 44px;
				text-align: center;
			}
			.title a {
				color: #f2d8d5;
				text-decoration: none;
			}
		`;
	}
	
	/** 
	 * template
	 * @protected
	 */
	template(componentId){
		return `
			<div id="root" class="root">
				<div id="leftButtons" class="leftbuttons"></div>
				<div id="title" class="title"></div>
				<div id="rightButtons" class="rightbuttons"></div>
			</div>
		`;
	}
	
};

