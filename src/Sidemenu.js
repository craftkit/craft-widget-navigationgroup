
import * as Craft from '@craftkit/craft-uikit';

/** 
 * Sidemenu subsystem 
 * 
 * @packagename Craft.Widget.NavigationGroup.Sidemenu
 */
export class Sidemenu extends Craft.UI.View {
	
	/**
	 * Sidemenu constructor
	 * 
	 * @param {Object} options - options
	 * @param {Element} options.mask - mask
	 * @param {Object} options.config - sidemenu config
	 * @param {Number} options.config.width - width of sidemenu
	 * @param {Number} options.config.height - height of sidemenu
	 * @param {Number} options.config.width_sp - width for min-width:980px (optional)
	 * @param {Number} options.config.height_sp - height for min-width:980px (optional)
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.Sidemenu';
		
		if( !options ){ options = {}; }
		
		this.GENERAL_ANIM_DURATION = 150;
		
		this.menuView = '';
		
		this.config = options.config;
		this.mask   = options.mask;
		
		this.viewController = '';
	}
	
	/** 
	 * viewDidLoad
	 * @override
	 * @protected
	 */
	viewDidLoad(callback){
		this.contents = this.shadow.getElementById('root');
		
		// support swipe left to close menu
		Craft.Core.Gesture.enableSwipe({
			target : this.contents,
			left   : (event) => {
				this.viewController.toggleSidemenu();
			}
		});
		
		if( callback ){ callback(); }
	}
	
	/** 
	 * Open inner component.  
	 * You should not call component's loadView(). It is done by me.
	 * 
	 * @param {Craft.Core.Component} menuView - menu component
	 * @param {Function} callback - callback
	 */
	open(menuView,callback){
		this.menuView = menuView;
		
		this.menuView.setViewController(this.viewController);
		
		if( !this.menuView.isViewLoaded ){
			this.menuView.loadView();
		}
		
		this.menuView.viewWillAppear( () => {
			this.contents.appendChild(this.menuView.view);
			this.menuView.show();
			this.menuView.viewDidAppear();
			if( callback ){ callback(); }
		});
	}
	
	/**
	 * Hide menu with slide out animation
	 * 
	 * @param {Function} callback - callback
	 */
	hide( callback ){
		Craft.Core.Transition.animate({
			element    : this.view,
			properties : { 'left': String(-1 * this.contents.clientWidth)+'px' },
			duration   : this.GENERAL_ANIM_DURATION,
			callback   : () => {
				this.view.style['display'] = 'none';
			}
		});
		Craft.Core.Transition.animate({
			element    : this.mask,
			properties : { opacity: 0 },
			duration   : this.GENERAL_ANIM_DURATION / 2,
			delay      : this.GENERAL_ANIM_DURATION / 2,
			callback   : () => {
				this.mask.style['display'] = 'none';
			}
		});
	}
	
	/**
	 * Show menu with slide in animation
	 * 
	 * @param {Function} callback - callback
	 */
	show( callback ){
		this.view.style['display'] = 'block';
		this.mask.style['display'] = 'block';
		
		Craft.Core.Transition.animate({
			element    : this.view,
			properties : { 'left': '0px', opacity: 1 },
			duration   : this.GENERAL_ANIM_DURATION / 2,
			delay      : this.GENERAL_ANIM_DURATION / 2,
		});
		Craft.Core.Transition.animate({
			element    : this.mask,
			properties : { opacity: 0.5 },
			duration   : this.GENERAL_ANIM_DURATION / 2,
		});
		return false;
	}
	
	/**
	 * style
	 * @protected
	 */
	style(componentId){
		let width    = this.config.width;
		let width_sp = this.config.width_sp || this.config.width;
		
		return `
			* { 
				box-sizing:border-box;
			}
			:host {
				position: absolute;
				top: 0;
				left: -${width};
				max-width: ${width_sp};
				height: 100vh;
				padding-top: env(safe-area-inset-top);
				padding-bottom: env(safe-area-inset-bottom);
				opacity: 0;
				background-color: #fff;
				box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);
			}
			.root {
				width: ${width_sp};
				height: 100vh;
				overflow-x: hidden;
				overflow-y: hidden;
				padding-left: env(safe-area-inset-left);
			}
			@media screen and (min-width:980px){
				:host {
					left: -${width};
					max-width: ${width};
				}
				.root {
					width: ${width};
				}
			}
		`;
	}
	
	/**
	 * template
	 * @protected
	 */
	template(componentId){
		return `
			<div id="root" class="root"></div>
		`;
	}
	
}
