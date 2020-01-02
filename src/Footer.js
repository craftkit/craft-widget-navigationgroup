
import * as Craft from '@craftkit/craft-uikit';

/** 
 * Footer subsystem 
 * 
 * @packagename Craft.Widget.NavigationGroup.Footer
 */
export class Footer extends Craft.UI.View {
	
	/** 
	 * Footer constructor
	 * 
	 * @param {Object} options - options
	 * @param {Number} options.height - height
	 * @param {Number} options.GENERAL_ANIM_DURATION - animation duration (optional)
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.Footer';
		
		this.parent = '';
		
		if( !options ){ options = {}; }
		if( options.template ){ this.template = options.template; }
		if( options.style ){ this.style = options.style; }
		
		this.height = options.height || 44;
		
		this.leftbtns  = '';
		this.rightbtns = '';
		
		this.rightbuttons = []; // button objects placed on footer's right button area 
		this.leftbuttons  = []; // button objects placed on footer's left button area 
		
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
		if( callback ){ callback(); }
	}
	
	// *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    * 
	
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
			}
			btn.setViewController(this);
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
			}
			btn.setViewController(this);
			btn.viewWillAppear();
			this.leftbtns.appendChild(btn.view);
			this.leftbuttons.push(btn);
			btn.viewDideAppear();
		}
	}
	
	/** 
	 * Clear right area buttons
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
	 */
	clearLeftButtons(options){
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
	 * Disable all buttons
	 * 
	 * @param {Object} options - options
	 * @param {String} options.exception - array of button name not to be disabled
	 * 
	 * @example
	 * 
	 * disable footer buttons except predefined button that is instance of Craft.Widget.NavigationGroup.ActionButton:
	 * footer.disableButtons({ exception: ['Craft.Widget.NavigationGroup.ActionButton'] });
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
	 * enable footer buttons except predefined button that is instance of Craft.Widget.NavigationGroup.ActionButton:
	 * footer.enableButtons({ exception: ['Craft.Widget.NavigationGroup.ActionButton'] });
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
	 * disable footer buttons except predefined button that is instance of Craft.Widget.NavigationGroup.ActionButton:
	 * footer.disableRightButtons({ exception: ['Craft.Widget.NavigationGroup.ActionButton'] });
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
	 * enable footer buttons except predefined button that is instance of Craft.Widget.NavigationGroup.ActionButton:
	 * footer.enableRightButtons({ exception: ['Craft.Widget.NavigationGroup.ActionButton'] });
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
	 * disable footer buttons except predefined button that is instance of Craft.Widget.NavigationGroup.ActionButton:
	 * footer.disableLeftButtons({ exception: ['Craft.Widget.NavigationGroup.ActionButton'] });
	 * 
	 */
	disableLeftButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		if( this.leftbuttons.length > 0 ){
			for( let i=0; i<this.leftbuttons.length; i++ ){
				let btn = this.leftbuttons[i];
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
	 * enable footer buttons except predefined button that is instance of Craft.Widget.NavigationGroup.ActionButton:
	 * footer.enableLeftButtons({ exception: ['Craft.Widget.NavigationGroup.ActionButton'] });
	 * 
	 */
	enableLeftButtons(options){
		if( !options ){ options = { exceptions:{} }; }
		let exceptions = options.exceptions;
		if( this.leftbuttons.length > 0 ){
			for( let i=0; i<this.leftbuttons.length; i++ ){
				let btn = this.leftbuttons[i];
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
				flex: 0;
				height: 44px;
				text-align: center;
				background-color: #f5f5f7;
				border-color: #d0d0d0;
				border-width: 1px 0px 0px 0px;
				border-style: solid;
				${ Craft.UI.Device.hasDisplayCutout() 
					? `padding-left: env(safe-area-inset-left);
					   padding-right: env(safe-area-inset-right);`
					: ``
				}
			}
			.leftbuttons {
				float: left;
				height: 44px;
			}
			.rightbuttons {
				float: right;
				height: 44px;
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
				<div id="rightButtons" class="rightbuttons"></div>
			</div>
		`;
	}
	
};

