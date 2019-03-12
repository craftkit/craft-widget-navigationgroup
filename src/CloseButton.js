
import * as Craft from 'craft-uikit';

/** 
 * Close button 
 * 
 * @packagename Craft.Widget.NavigationGroup.CloseButton
 */
export class CloseButton extends Craft.UI.View {
	
	/**
	 * CloseButton constructor
	 * 
	 * @param {Object} options - options
	 * @param {Function} options.action - close handler
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.CloseButton';
		
		if( options && options.template ){ this.template = options.template; }
		if( options && options.style    ){ this.style    = options.style;    }
		
		this.action = options.action;
	}
	
	/**
	 * Do close
	 */
	action(){
		this.action();
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
			<div class="root" onclick="window.Craft.Core.ComponentStack.get('${componentId}').action();">×</div>
		`;
	}
	
}
