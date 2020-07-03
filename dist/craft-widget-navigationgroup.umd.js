!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("Craft")):"function"==typeof define&&define.amd?define(["Craft"],e):"object"==typeof exports?exports.NavigationGroup=e(require("Craft")):t.NavigationGroup=e(t.Craft)}(window,(function(t){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(e,i){e.exports=t},function(t,e,i){"use strict";const n=i(2);t.exports=n.default||n},function(t,e,i){"use strict";i.r(e);var n=i(0);class o extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.Header",this.parent="",t||(t={}),t.template&&(this.template=t.template),t.style&&(this.style=t.style),this.height=t.height||44,this.leftbtns="",this.rightbtns="",this.title="",this.viewItems=[],this.rightbuttons=[],this.leftbuttons=[],this.GENERAL_ANIM_DURATION=t.GENERAL_ANIM_DURATION||150}viewDidLoad(t){this.leftbtns=this.shadow.getElementById("leftButtons"),this.rightbtns=this.shadow.getElementById("rightButtons"),this.title=this.shadow.getElementById("title"),t&&t()}setTitle(t,e){let i=this.shadow.getElementById("title");e&&e.fontSize&&(i.style["font-size"]=e.fontSize),i.innerHTML=t}setTitleView(t){let e=this.shadow.getElementById("title");t.isViewLoaded||t.loadView(),t.setViewController(this),t.viewWillAppear(),e.innerHTML="",e.appendChild(t.view),t.viewDidAppear(),this.viewItems.push(t)}clearTitleView(){for(let t=0;t<this.viewItems.length;t++)this.viewItems[t].viewWillDisappear();this.shadow.getElementById("title").innerHTML="";for(let t=0;t<this.viewItems.length;t++)this.viewItems[t].viewDidDisappear()}setRightButtons(t){this.clearRightButtons(),this.addRightButtons(t)}setLeftButtons(t){this.clearLeftButtons(),this.addLeftButtons(t)}addRightButtons(t){for(let e=0;e<t.length;e++){let i=t[e];i.isViewLoaded||(i.loadView(),i.setViewController(this)),i.viewWillAppear(),this.rightbtns.appendChild(i.view),this.rightbuttons.push(i),i.viewDidAppear()}}addLeftButtons(t){for(let e=0;e<t.length;e++){let i=t[e];i.isViewLoaded||(i.loadView(),i.setViewController(this)),i.viewWillAppear(),this.leftbtns.appendChild(i.view),this.leftbuttons.push(i),i.viewDidAppear()}}clearRightButtons(t){t||(t={exceptions:{}});let e=t.exceptions;this.rightbtns.innerHTML="";let i=[];for(let t=0;t<this.rightbuttons.length;t++){let n=this.rightbuttons[t];n.packagename&&e[n.packagename]&&(i.push(n),this.rightbtns.appendChild(n.view))}this.rightbuttons=i}clearLeftButtons(){options||(options={exceptions:{}});let t=options.exceptions;this.leftbtns.innerHTML="";let e=[];for(let i=0;i<this.leftbuttons.length;i++){let n=this.leftbuttons[i];n.packagename&&t[n.packagename]&&(e.push(n),this.leftbtns.appendChild(n.view))}this.leftbuttons=e}disableTitle(){return this.title&&(this.title.style["pointer-events"]="none",n.Core.Transition.animate({element:this.title,properties:{opacity:.5},duration:this.GENERAL_ANIM_DURATION})),!1}enableTitle(){return this.title&&(this.title.style["pointer-events"]="all",n.Core.Transition.animate({element:this.title,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION})),!1}disableButtons(t){return t||(t={exceptions:{}}),this.disableRightButtons(t),this.disableLeftButtons(t),!1}enableButtons(t){return t||(t={exceptions:{}}),this.enableRightButtons(t),this.enableLeftButtons(t),!1}disableRightButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.rightbuttons.length>0)for(let t=0;t<this.rightbuttons.length;t++){let i=this.rightbuttons[t];e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="none",n.Core.Transition.animate({element:i.view,properties:{opacity:.5},duration:this.GENERAL_ANIM_DURATION}))}return!1}enableRightButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.rightbuttons.length>0)for(let t=0;t<this.rightbuttons.length;t++){let i=this.rightbuttons[t];e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="all",n.Core.Transition.animate({element:i.view,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION}))}return!1}disableLeftButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.leftbuttons.length>0)for(let t=0;t<this.leftbuttons.length;t++){let i=this.leftbuttons[t];i.disabled||(e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="none",n.Core.Transition.animate({element:i.view,properties:{opacity:.5},duration:this.GENERAL_ANIM_DURATION})))}return!1}enableLeftButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.leftbuttons.length>0)for(let t=0;t<this.leftbuttons.length;t++){let i=this.leftbuttons[t];i.disabled||(e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="all",n.Core.Transition.animate({element:i.view,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION})))}return!1}style(t){return`\n\t\t\t.root {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: row;\n\t\t\t\twidth: 100vw;\n\t\t\t\tmin-height: 44px;\n\t\t\t\ttext-align: center;\n\t\t\t\tclear: both;\n\t\t\t\tbackground-color: #f5f5f7;\n\t\t\t\tborder-color: #d0d0d0;\n\t\t\t\tborder-width: 0px 0px 1px 0px;\n\t\t\t\tborder-style: solid;\n\t\t\t\t${n.UI.Device.hasDisplayCutout()?"padding-left: env(safe-area-inset-left);\n\t\t\t\t\t   padding-right: env(safe-area-inset-right);":""}\n\t\t\t}\n\t\t\t.root:after {\n\t\t\t\tclear: both;\n\t\t\t}\n\t\t\t.leftbuttons {\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t}\n\t\t\t.leftbuttons_shrinked {\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t}\n\t\t\t@media screen and (max-width:600px){\n\t\t\t\t.leftbuttons_shrinked {\n\t\t\t\t\twidth: 22px;\n\t\t\t\t\theight: 44px;\n\t\t\t\t}\n\t\t\t}\n\t\t\t.rightbuttons {\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t}\n\t\t\t.title {\n\t\t\t\tflex: 1;\n\t\t\t\theight: 44px;\n\t\t\t\twidth: 50%;\n\t\t\t\tmargin-right: auto;\n\t\t\t\tmargin-left: auto;\n\t\t\t\toverflow-x: hidden;\n\t\t\t\toverflow-y: hidden;\n\t\t\t\tcolor: #000;\n\t\t\t\tfont-size: 18px;\n\t\t\t\tline-height: 44px;\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t\t.title a {\n\t\t\t\tcolor: #f2d8d5;\n\t\t\t\ttext-decoration: none;\n\t\t\t}\n\t\t`}template(t){return'\n\t\t\t<div id="root" class="root">\n\t\t\t\t<div id="leftButtons" class="leftbuttons"></div>\n\t\t\t\t<div id="title" class="title"></div>\n\t\t\t\t<div id="rightButtons" class="rightbuttons"></div>\n\t\t\t</div>\n\t\t'}}class s extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.Footer",this.parent="",t||(t={}),t.template&&(this.template=t.template),t.style&&(this.style=t.style),this.height=t.height||44,this.leftbtns="",this.rightbtns="",this.rightbuttons=[],this.leftbuttons=[],this.GENERAL_ANIM_DURATION=t.GENERAL_ANIM_DURATION||150}viewDidLoad(t){this.leftbtns=this.shadow.getElementById("leftButtons"),this.rightbtns=this.shadow.getElementById("rightButtons"),t&&t()}setRightButtons(t){this.clearRightButtons(),this.addRightButtons(t)}setLeftButtons(t){this.clearLeftButtons(),this.addLeftButtons(t)}addRightButtons(t){for(let e=0;e<t.length;e++){let i=t[e];i.isViewLoaded||i.loadView(),i.setViewController(this),i.viewWillAppear(),this.rightbtns.appendChild(i.view),this.rightbuttons.push(i),i.viewDidAppear()}}addLeftButtons(t){for(let e=0;e<t.length;e++){let i=t[e];i.isViewLoaded||i.loadView(),i.setViewController(this),i.viewWillAppear(),this.leftbtns.appendChild(i.view),this.leftbuttons.push(i),i.viewDideAppear()}}clearRightButtons(t){t||(t={exceptions:{}});let e=t.exceptions;this.rightbtns.innerHTML="";let i=[];for(let t=0;t<this.rightbuttons.length;t++){let n=this.rightbuttons[t];n.packagename&&e[n.packagename]&&(i.push(n),this.rightbtns.appendChild(n.view))}this.rightbuttons=i}clearLeftButtons(t){t||(t={exceptions:{}});let e=t.exceptions;this.leftbtns.innerHTML="";let i=[];for(let t=0;t<this.leftbuttons.length;t++){let n=this.leftbuttons[t];n.packagename&&e[n.packagename]&&(i.push(n),this.leftbtns.appendChild(n.view))}this.leftbuttons=i}disableButtons(t){return t||(t={exceptions:{}}),this.disableRightButtons(t),this.disableLeftButtons(t),!1}enableButtons(t){return t||(t={exceptions:{}}),this.enableRightButtons(t),this.enableLeftButtons(t),!1}disableRightButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.rightbuttons.length>0)for(let t=0;t<this.rightbuttons.length;t++){let i=this.rightbuttons[t];e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="none",n.Core.Transition.animate({element:i.view,properties:{opacity:.5},duration:this.GENERAL_ANIM_DURATION}))}return!1}enableRightButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.rightbuttons.length>0)for(let t=0;t<this.rightbuttons.length;t++){let i=this.rightbuttons[t];e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="all",n.Core.Transition.animate({element:i.view,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION}))}return!1}disableLeftButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.leftbuttons.length>0)for(let t=0;t<this.leftbuttons.length;t++){let i=this.leftbuttons[t];e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="none",n.Core.Transition.animate({element:i.view,properties:{opacity:.5},duration:this.GENERAL_ANIM_DURATION}))}return!1}enableLeftButtons(t){t||(t={exceptions:{}});let e=t.exceptions;if(this.leftbuttons.length>0)for(let t=0;t<this.leftbuttons.length;t++){let i=this.leftbuttons[t];e&&i.packagename&&e[i.packagename]||(i.view.style["pointer-events"]="all",n.Core.Transition.animate({element:i.view,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION}))}return!1}style(t){return`\n\t\t\t.root {\n\t\t\t\tflex: 0;\n\t\t\t\theight: 44px;\n\t\t\t\ttext-align: center;\n\t\t\t\tbackground-color: #f5f5f7;\n\t\t\t\tborder-color: #d0d0d0;\n\t\t\t\tborder-width: 1px 0px 0px 0px;\n\t\t\t\tborder-style: solid;\n\t\t\t\t${n.UI.Device.hasDisplayCutout()?"padding-left: env(safe-area-inset-left);\n\t\t\t\t\t   padding-right: env(safe-area-inset-right);":""}\n\t\t\t}\n\t\t\t.leftbuttons {\n\t\t\t\tfloat: left;\n\t\t\t\theight: 44px;\n\t\t\t}\n\t\t\t.rightbuttons {\n\t\t\t\tfloat: right;\n\t\t\t\theight: 44px;\n\t\t\t}\n\t\t`}template(t){return'\n\t\t\t<div id="root" class="root">\n\t\t\t\t<div id="leftButtons" class="leftbuttons"></div>\n\t\t\t\t<div id="rightButtons" class="rightbuttons"></div>\n\t\t\t</div>\n\t\t'}}class a extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.BackButton",t||(t={}),t&&t.template&&(this.template=t.template),t&&t.style&&(this.style=t.style)}style(t){return"\n\t\t\t:host {\n\t\t\t\tdisplay: none; /* starting by hidden */\n\t\t\t\tfloat: left;\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t\tmargin-left: 0px;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.root {\n\t\t\t\tdisplay: block;\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t\tmargin-left: 0px;\n\t\t\t\tcolor: #007aff;\n\t\t\t\tfont-size: 36px;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tline-height: 44px;\n\t\t\t}\n\t\t"}template(t){return`\n\t\t\t<div class="root" onclick="window.Craft.Core.ComponentStack.get('${t}').getViewController().back();">‹</div>\n\t\t`}}class r extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.MenuButton",t||(t={}),t&&t.template&&(this.template=t.template),t&&t.style&&(this.style=t.style),this.exceptions={"Craft.Widget.NavigationGroup.MenuButton":!0}}toggleSidemenu(t){this.viewController.toggleSidemenu({exceptions:this.exceptions})}style(t){return"\n\t\t\t.root {\n\t\t\t\tfloat: right;\n\t\t\t\tmargin-right: 11px;\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t\tcolor: #007aff;\n\t\t\t\tfont-size: 36px;\n\t\t\t\tline-height: 44px;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.root:active {\n\t\t\t\tcolor: #f0f0f0;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t@media screen and (max-width:980px){\n\t\t\t\t.root {\n\t\t\t\t\tmargin-right: 0px;\n\t\t\t\t}\n\t\t\t}\n\t\t"}template(t){return`\n\t\t\t<div class="root" onclick="Craft.Core.ComponentStack.get('${t}').toggleSidemenu();">≡</div>\n\t\t`}}class l extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.Sidemenu",t||(t={}),this.GENERAL_ANIM_DURATION=150,this.menuView="",this.config=t.config,this.mask=t.mask,this.viewController=""}viewDidLoad(t){this.contents=this.shadow.getElementById("root"),n.Core.Gesture.enableSwipe({target:this.contents,left:t=>{this.viewController.toggleSidemenu()}}),t&&t()}open(t,e){this.menuView=t,this.menuView.setViewController(this.viewController),this.menuView.isViewLoaded||this.menuView.loadView(),this.menuView.viewWillAppear(()=>{this.contents.appendChild(this.menuView.view),this.menuView.showComponent(),this.menuView.viewDidAppear(),e&&e()})}hide(t){n.Core.Transition.animate({element:this.view,properties:{left:String(-1*this.contents.clientWidth)+"px"},duration:this.GENERAL_ANIM_DURATION,callback:()=>{this.view.style.display="none"}}),n.Core.Transition.animate({element:this.mask,properties:{opacity:0},duration:this.GENERAL_ANIM_DURATION/2,delay:this.GENERAL_ANIM_DURATION/2,callback:()=>{this.mask.style.display="none"}})}show(t){return this.view.style.display="block",this.mask.style.display="block",n.Core.Transition.animate({element:this.view,properties:{left:"0px",opacity:1},duration:this.GENERAL_ANIM_DURATION/2,delay:this.GENERAL_ANIM_DURATION/2}),n.Core.Transition.animate({element:this.mask,properties:{opacity:.5},duration:this.GENERAL_ANIM_DURATION/2}),!1}style(t){let e=this.config.width,i=this.config.width_sp||this.config.width;return`\n\t\t\t* { \n\t\t\t\tbox-sizing:border-box;\n\t\t\t}\n\t\t\t:host {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: -${e};\n\t\t\t\tmax-width: ${i};\n\t\t\t\theight: 100vh;\n\t\t\t\tpadding-top: env(safe-area-inset-top);\n\t\t\t\tpadding-bottom: env(safe-area-inset-bottom);\n\t\t\t\topacity: 0;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\tbox-shadow: 1px 0px 10px rgba(0, 0, 0, 0.2);\n\t\t\t}\n\t\t\t.root {\n\t\t\t\twidth: ${i};\n\t\t\t\theight: 100vh;\n\t\t\t\toverflow-x: hidden;\n\t\t\t\toverflow-y: hidden;\n\t\t\t\tpadding-left: env(safe-area-inset-left);\n\t\t\t}\n\t\t\t@media screen and (min-width:980px){\n\t\t\t\t:host {\n\t\t\t\t\tleft: -${e};\n\t\t\t\t\tmax-width: ${e};\n\t\t\t\t}\n\t\t\t\t.root {\n\t\t\t\t\twidth: ${e};\n\t\t\t\t}\n\t\t\t}\n\t\t`}template(t){return'\n\t\t\t<div id="root" class="root"></div>\n\t\t'}}class h extends n.UI.DefaultRootViewController{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.ViewController",this.stack=[],this.currentView="",this.Pages={},this.parent="",this.GENERAL_ANIM_DURATION=t.GENERAL_ANIM_DURATION||150,this.config=t.config||{},this.config.NavigationGroup||(this.config.NavigationGroup={}),this.config.Sidemenu||(this.config.Sidemenu={width:"250px",height:"100vh"}),t.template&&(this.template=t.template),t.style&&(this.style=t.style),this.header_height=0,this.footer_height=0,t.enableHeader&&(this.header_height=44),t.enableFooter&&(this.footer_height=44),this.enableHeader=t.enableHeader||!0,this.enableFooter=t.enableFooter||!1,this.enableSidemenu=t.enableSidemenu||!1,this.disableBackBtn=t.disableBackBtn||!1,this.disableMenuBtn=t.disableMenuBtn||!1,this.initialPage=t.page,this.sidemenu_active=!1}viewDidLoad(t){this.contents=this.shadow.getElementById("contents"),this.mask=this.shadow.getElementById("mask"),this.Header="",this.Footer="",this.Sidemenu="",this.MenuButton="",this.BackButton="",this.mask.addEventListener("touchmove",t=>{t.preventDefault()}),this.enableHeader&&(this.Header=new o,this.Header.setViewController(this),this.Header.loadView(),this.shadow.getElementById("header").appendChild(this.Header.view)),this.enableFooter&&(this.Footer=new s,this.Footer.setViewController(this),this.Footer.loadView(),this.shadow.getElementById("footer").appendChild(this.Footer.view)),this.enableHeader&&!this.disableBackBtn&&(this.BackButton=new a,this.BackButton.setViewController(this),this.BackButton.loadView(),this.BackButton.viewWillAppear(),this.Header.leftbtns.appendChild(this.BackButton.view),this.Header.leftbuttons.push(this.BackButton),this.BackButton.viewDidAppear()),this.enableHeader&&this.enableSidemenu&&!this.disableMenuBtn&&(this.MenuButton=new r,this.MenuButton.setViewController(this),this.MenuButton.loadView(),this.MenuButton.viewWillAppear(),this.Header.rightbtns.appendChild(this.MenuButton.view),this.Header.rightbuttons.push(this.MenuButton),this.MenuButton.viewDidAppear()),this.enableSidemenu&&(this.Sidemenu=new l({config:this.config.Sidemenu,mask:this.mask,paerntView:this.view}),this.Sidemenu.setViewController(this),this.Sidemenu.loadView(),this.shadow.appendChild(this.Sidemenu.view)),this.enableHeader&&!this.disableBackBtn?this.open=this.open_with_anim:this.open=this.open_without_anim,this.enableHeader&&!this.disableBackBtn&&n.Core.Gesture.enableSwipe({target:this.contents,right:t=>{this.back()}}),n.Core.Gesture.enableTap({target:this.contents,tap:t=>{n.Core.NotificationCenter.notify("ContentTapped",t)}}),this.initialPage&&this.open({page:this.initialPage}),t&&t()}reset(){for(let t=0;t<this.stack.length;t++)this.stack[t].viewWillDisappear();this.stack=[],this.currentView="",this.Pages={},this.contents.innerHTML="",this.BackButton&&(this.BackButton.view.style.display="none");for(let t=0;t<this.stack.length;t++)this.stack[t].viewDidDisappear()}relayoutNavigationElements(){}open(){}open_with_anim(t){let e=t.page,i=t.callback,o=t.route,s=o?o.event:null,a=!!o&&o.launch,r=this.currentView,l=e;l.setViewController(this),l.isViewLoaded||l.loadView();let h=0,p=0;return r&&(r.viewWillDisappear(),h=document.body.clientWidth,p=1,this.Pages[r.componentId].scrollTop=r.view.scrollTop),l.viewWillAppear(()=>{t.earlycallback&&i&&i(),this.Pages[l.componentId]||(this.Pages[l.componentId]={page:l,contents_width:l.view.clientWidth,contents_height:l.view.clientHeight,scrollTop:0}),l.view.style.position="absolute",l.view.style.left=String(h)+"px",l.view.style.opacity=p,this.stack.push(l),this.contents.appendChild(l.view),l.view.scrollTop=this.Pages[l.componentId].scrollTop,l.showComponent(),l.viewDidAppear(),this.currentView=l,a?window.history.replaceState({componentId:this.currentView.componentId,timestamp:Date.now()},this.currentView.title,n.Core.Context.getRouter().normalize(this.currentView.path)):s||window.history.pushState({componentId:this.currentView.componentId,timestamp:Date.now()},this.currentView.title,n.Core.Context.getRouter().normalize(this.currentView.path)),r?(n.Core.Transition.animate({element:r.view,properties:{left:String(-1*document.body.clientWidth)+"px",opacity:0},duration:this.GENERAL_ANIM_DURATION,callback:()=>{r.viewDidDisappear(),r.view.remove()}}),n.Core.Transition.animate({element:l.view,properties:{left:"0px",opacity:1},duration:this.GENERAL_ANIM_DURATION,callback:()=>{!t.earlycallback&&i&&i(),this.BackButton&&(this.BackButton.view.style.display="block"),this.relayoutNavigationElements()}})):n.Core.Transition.animate({element:l.view,properties:{left:"0px",opacity:1},duration:this.GENERAL_ANIM_DURATION,callback:()=>{!t.earlycallback&&i&&i(),this.relayoutNavigationElements()}})}),!1}open_with_anim(t){let e=t.page,i=t.callback,o=t.route,s=o?o.event:null,a=!!o&&o.launch,r=this.currentView,l=e;l.isViewLoaded||l.loadView(),l.setViewController(this);let h=0;return r&&(r.viewWillDisappear(),h=1,this.Pages[r.componentId].scrollTop=r.view.scrollTop),l.viewWillAppear(()=>{t.earlycallback&&i&&i(),this.Pages[l.componentId]||(this.Pages[l.componentId]={page:l,contents_width:l.view.clientWidth,contents_height:l.view.clientHeight,scrollTop:0}),l.view.style.position="absolute",l.view.style.left="0px",l.view.style.opacity=h,this.stack.push(l),this.contents.appendChild(l.view),l.view.scrollTop=this.Pages[l.componentId].scrollTop,l.showComponent(),l.viewDidAppear(),this.currentView=l,a?window.history.replaceState({componentId:this.currentView.componentId,timestamp:Date.now()},this.currentView.title,n.Core.Context.getRouter().normalize(this.currentView.path)):s||window.history.pushState({componentId:this.currentView.componentId,timestamp:Date.now()},this.currentView.title,n.Core.Context.getRouter().normalize(this.currentView.path)),r?(r.viewDidDisappear(),r.view.remove(),l.view.style.opacity=1,n.Core.Transition.animate({element:l.view,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION,callback:()=>{!t.earlycallback&&i&&i(),this.relayoutNavigationElements()}})):n.Core.Transition.animate({element:l.view,properties:{opacity:1},duration:this.GENERAL_ANIM_DURATION,callback:()=>{!t.earlycallback&&i&&i(),this.relayoutNavigationElements()}})}),!1}pushState(){window.history.pushState(this.currentView.componentId,null,n.Core.Context.getRouter().normalize(this.currentView.path))}can_back(){return!(this.stack.length<=1)}back(t,e,i){if(i||(i={}),this.stack.length<=1)return;t||(t=1);let o=this.stack.length-t;o<1&&(o=1);let s=this.stack.splice(o),a=this.currentView,r=this.stack[this.stack.length-1];for(let t=0;t<s.length;t++)s[t].viewWillDisappear();return r.view.style.position="absolute",r.view.style.left=String(-1*document.body.clientWidth)+"px",r.view.style.opacity=0,r.viewWillAppear(()=>{this.contents.appendChild(r.view),this.Pages[r.componentId].scrollTop&&(r.view.scrollTop=this.Pages[r.componentId].scrollTop),r.showComponent(),r.viewDidAppear(),this.currentView=r,r.path&&window.history.pushState(r.componentId,null,n.Core.Context.getRouter().normalize(r.path)),1===this.stack.length&&(this.BackButton.view.style.display="none"),this.relayoutNavigationElements(),n.Core.Transition.animate({element:a.view,properties:{left:String(document.body.clientWidth)+"px",opacity:0},duration:this.GENERAL_ANIM_DURATION,callback:()=>{delete this.Pages[a.componentId],a.viewDidDisappear(),a.view.remove()}}),n.Core.Transition.animate({element:r.view,properties:{left:"0px",opacity:1},duration:this.GENERAL_ANIM_DURATION,callback:()=>{e&&e()}})}),!1}setSidemenu(t){this.Sidemenu.open(t)}toggleSidemenu(t){this.enableSidemenu&&(this.sidemenu_active?(this.Sidemenu.hide(),this.sidemenu_active=!1):(this.Sidemenu.show(),this.sidemenu_active=!0))}style(t){return`\n\t\t\t* { \n\t\t\t\tbox-sizing:border-box;\n\t\t\t}\n\t\t\t:host {\n\t\t\t\twidth: 100vw;\n\t\t\t\theight: 100vh;\n\t\t\t\toverflow: hidden;\n\t\t\t\tmargin:0;\n\t\t\t\tpadding-top: env(safe-area-inset-top);\n\t\t\t\tpadding-bottom: env(safe-area-inset-bottom);\n\t\t\t\tpadding-left: 0px;\n\t\t\t\tpadding-right: 0px;\n\t\t\t\ttouch-action: manipulation;\n\t\t\t}\n\t\t\t.root {\n\t\t\t\twidth: 100vw;\n\t\t\t\theight: 100vh;\n\t\t\t\toverflow: hidden;\n\t\t\t}\n\t\t\t.contents {\n\t\t\t\theight: calc( 100vh - ${this.header_height}px - ${this.footer_height}px - env(safe-area-inset-bottom) - env(safe-area-inset-top) ); /* should be fit in the safe area */\n\t\t\t\twidth: 100vw;\n\t\t\t\tmargin-left: 0px;\n\t\t\t\toverflow-x: hidden;\n\t\t\t\toverflow-y: hidden;\n\t\t\t}\n\t\t\t.mask {\n\t\t\t\tdisplay: none;\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100vw;\n\t\t\t\theight: 100vh;\n\t\t\t\tbackground-color: rgba(0,0,0,0.4);\n\t\t\t\topacity: 0.25;\n\t\t\t\toverflow: hidden;\n\t\t\t\t-webkit-tap-highlight-color:rgba(0,0,0,0);\n\t\t\t\t-webkit-touch-callout: none;\n\t\t\t}\n\t\t\t.header {\n\t\t\t}\n\t\t\t.header:after {\n\t\t\t\tclear: both;\n\t\t\t}\n\t\t\t.footer {\n\t\t\t}\n\t\t`}template(t){return`\n\t\t\t<div id="root" class="root">\n\t\t\t\t<div id="header" class="header"></div>\n\t\t\t\t<div id="contents" class="contents"></div>\n\t\t\t\t<div id="mask" class="mask" onclick="Craft.Core.ComponentStack.get('${t}').toggleSidemenu();"></div>\n\t\t\t\t<div id="footer" class="footer"></div>\n\t\t\t</div>\n\t\t`}}class p extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.CloseButton",t&&t.template&&(this.template=t.template),t&&t.style&&(this.style=t.style),this.action=t.action}action(){this.action()}style(t){return"\n\t\t\t.root {\n\t\t\t\tfloat: right;\n\t\t\t\tmargin-right: 11px;\n\t\t\t\twidth: 44px;\n\t\t\t\tcolor: #007aff;\n\t\t\t\tfont-size: 36px;\n\t\t\t\tline-height: 44px;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.root:active {\n\t\t\t\tcolor: #f0f0f0;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t@media screen and (max-width:980px){\n\t\t\t\t.root {\n\t\t\t\t\tmargin-right: 0px;\n\t\t\t\t}\n\t\t\t}\n\t\t"}template(t){return`\n\t\t\t<div class="root" onclick="window.Craft.Core.ComponentStack.get('${t}').action();">×</div>\n\t\t`}}class d extends n.UI.View{constructor(t){super(),this.packagename="Craft.Widget.NavigationGroup.ActionButton",t||(t={}),t&&t.template&&(this.template=t.template),t&&t.style&&(this.style=t.style),this.handler=t.handler}openActions(){this.handler()}style(t){return"\n\t\t\t.root {\n\t\t\t\tfloat: right;\n\t\t\t\tmargin-right: 11px;\n\t\t\t\twidth: 44px;\n\t\t\t\theight: 44px;\n\t\t\t\tcolor: #007aff;\n\t\t\t\tfont-size: 36px;\n\t\t\t\tline-height: 44px;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.root:active {\n\t\t\t\tcolor: #f0f0f0;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t@media screen and (max-width:980px){\n\t\t\t\t.root {\n\t\t\t\t\tmargin-right: 0px;\n\t\t\t\t}\n\t\t\t}\n\t\t"}template(t){return`\n\t\t\t<div class="root" onclick="window.Craft.Core.ComponentStack.get('${t}').openActions();">︙</div>\n\t\t`}}class c extends n.UI.View{style(t){let e=n.Core.Context.getRootViewController();return`\n\t\t\t* { \n\t\t\t\tbox-sizing:border-box;\n\t\t\t}\n\t\t\t:host {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: calc( 100vh - ${e.header_height}px - ${e.footer_height}px - env(safe-area-inset-bottom) - env(safe-area-inset-top) );\n\t\t\t\tmax-width: 100%;\n\t\t\t\tmax-height: 100%;\n\t\t\t\toverflow-x: hidden;\n\t\t\t\toverflow-y: scroll;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\t-webkit-overflow-scrolling: touch;\n\t\t\t}\n\t\t\t.root {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 101%;\n\t\t\t}\n\t\t`}template(t){return'\n\t\t\t<div id="root" class="root"></div>\n\t\t'}}const u={ViewController:h,Header:o,Footer:s,Sidemenu:l,CloseButton:p,BackButton:a,MenuButton:r,ActionButton:d,Page:c,inject:function(t){t.Widget=t.Widget||{},t.Widget.NavigationGroup||(t.Widget.NavigationGroup=u)}};e.default=u}])}));