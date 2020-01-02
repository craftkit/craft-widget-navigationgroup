
import * as Craft from '@craftkit/craft-uikit';

/** 
 * Back button 
 * 
 * @packagename Craft.Widget.NavigationGroup.BackButton
 */
export class BackButton extends Craft.UI.View {
	
	/**
	 * BackButton constructor
	 * 
	 * @param {Object} options - options (optinal)
	 */
	constructor(options){
		super();
		
		this.packagename = 'Craft.Widget.NavigationGroup.BackButton';
		
		if( !options ){ options = {}; }
		if( options && options.template ){ this.template = options.template; }
		if( options && options.style    ){ this.style    = options.style;    }
	}
	
	/**
	 * style
	 * @protected
	 */
	style(componentId){
		return `
			:host {
				display: none; /* starting by hidden */
				float: left;
				width: 44px;
				height: 44px;
				margin-left: 0px;
				cursor: pointer;
			}
			.root {
				display: block;
				width: 44px;
				height: 44px;
				margin-left: 0px;
				color: #007aff;
				font-size: 36px;
				font-weight: bold;
				line-height: 44px;
			}
		`;
	}
	
	/**
	 * template
	 * @protected
	 */
	template(componentId){
		return `
			<div class="root" onclick="window.Craft.Core.ComponentStack.get('${componentId}').getViewController().back();">‹</div>
		`;
	}

};
