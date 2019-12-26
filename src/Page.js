
import * as Craft from 'craft-uikit';

/** 
 * Abstruct Page
 * 
 * To be able to your page fit in, and scrollable in the navigation contents area, 
 * it is easy to make your page a sub-class of this class. 
 * 
 * To do this, your shadow root element (template()) should be with css class name `.root`.
 * Don't define `:host` in your `style()`.  
 * And overriding `.root.height` will stop scrolling of your page.
 * 
 * @packagename Craft.Widget.NavigationGroup.Page
 * 
 * @example
 * 
 * class MyPage extends Craft.Widget.NavigationGroup.Page {
 *     style(componentId){
 *         return super.style(componentId) + `
 *             .root { display:flex; }
 *         `;
 *     }
 *     template(componentId){
 *         return `<div id="root" class="root">`;
 *     }
 * }
 * 
 */
export class Page extends Craft.UI.View {
	
	style(componentId){
		let rootViewController = Craft.Core.Context.getRootViewController();
		
		return `
			* { 
				box-sizing:border-box;
			}
			:host {
				width: 100%;
				height: calc( 100vh - ${rootViewController.header_height}px - ${rootViewController.footer_height}px - env(safe-area-inset-bottom) - env(safe-area-inset-top) );
				max-width: 100%;
				max-height: 100%;
				overflow-x: hidden;
				overflow-y: scroll;
				background-color: #fff;
				-webkit-overflow-scrolling: touch;
			}
			.root {
				width: 100%;
				height: 101%;
			}
		`;
	}
	
	template(componentId){
		return `
			<div id="root" class="root"></div>
		`;
	}
	
};

