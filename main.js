
import { ViewController } from './src/ViewController.js';
import { Header } from './src/Header.js';
import { Footer } from './src/Footer.js';
import { Sidemenu } from './src/Sidemenu.js';
import { CloseButton } from './src/CloseButton.js';
import { BackButton } from './src/BackButton.js';
import { MenuButton } from './src/MenuButton.js';
import { ActionButton } from './src/ActionButton.js';
import { Page } from './src/Page.js';

const Packages = {
	ViewController : ViewController,
	Header         : Header,
	Footer         : Footer,
	Sidemenu       : Sidemenu,
	CloseButton    : CloseButton,
	BackButton     : BackButton,
	MenuButton     : MenuButton,
	ActionButton   : ActionButton,
	Page           : Page
};

Packages.inject = function(Craft){
	Craft.Widget = Craft.Widget || {};
	if( !Craft.Widget.NavigationGroup ){
		Craft.Widget.NavigationGroup = Packages;
	}
};

export default Packages;

