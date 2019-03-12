
import * as Craft from 'craft-uikit';

/** 
 * Action button 
 * 
 * @packagename Craft.Widget.NavigationGroup.ActionButton
 * 
 * @example
 * 
 * this.actionBtn = new ActionButton({
 *     handler : () => { this.openActionSheet(); }
 * });
 * 
 */
export class ActionButton extends Craft.UI.View {

	/**
	 * ActionButton constructor
	 * 
	 * @param {Object} options - options
	 * @param {Function} options.handler - handler (you may show ActionSheet)
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.ActionButton';
		
		if( !options ){ options = {}; }
		if( options && options.template ){ this.template = options.template; }
		if( options && options.style    ){ this.style    = options.style;    }
		
		this.handler = options.handler;
	}
	
	/**
	 * Do action
	 */
	openActions(){
		this.handler();
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
			<div class="root" onclick="window.Craft.Core.ComponentStack.get('${componentId}').openActions();">︙</div>
		`;
	}
	
}
