
import * as Craft from '@craftkit/craft-uikit';

/** 
 * Menu button 
 * 
 * @packagename Craft.Widget.NavigationGroup.MenuButton
 */
export class MenuButton extends Craft.UI.View {

	/**
	 * MenuButton constructor
	 * 
	 * @param {Object} options - options (optional)
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.MenuButton';
		
		if( !options ){ options = {}; }
		if( options && options.template ){ this.template = options.template; }
		if( options && options.style    ){ this.style    = options.style;    }
		
		this.exceptions = {'Craft.Widget.NavigationGroup.MenuButton':true}; // make toggle except me
	}
	
	/**
	 * Toggle sidemenu
	 */
	toggleSidemenu(options){
		this.viewController.toggleSidemenu({exceptions:this.exceptions});
	}
	
	/**
	 * style
	 * @protected
	 */
	style(componentId){
		return `
			.root {
				float: right;
				margin-right: 11px;
				width: 44px;
				height: 44px;
				color: #007aff;
				font-size: 36px;
				line-height: 44px;
				cursor: pointer;
			}
			.root:active {
				color: #f0f0f0;
				cursor: pointer;
			}
			@media screen and (max-width:980px){
				.root {
					margin-right: 0px;
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
			<div class="root" onclick="Craft.Core.ComponentStack.get('${componentId}').toggleSidemenu();">≡</div>
		`;
	}

}
