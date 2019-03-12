
# Craft-Widget-NavigationGroup

Classic stack navigation.

## How to use

```html 
<script src="craft-uikit.min.js"></script>

<!-- automatically loaded into Craft.Widget.NavigationGroup -->
<script src="https://unpkg.com/@craftkit/craft-uikit/dist/craft-uikit.min.js"></script>
<script src="https://unpkg.com/@craftkit/craft-widget-navigationgroup/dist/craft-widget-navigationgroup.min.js"></script>
<script>
    window.onload = function(){
        Craft.Core.Bootstrap.boot(App);
    };
</script>
```

or

```javascript 
import * as Craft from 'craft-uikit';
import * as NavigationGroup from 'craft-widget-navigationgroup';

// inject into Craft.Widget. (this is just a cosmetic function)
Craft.usePackage(NavigationGroup);

export class PageController extends Craft.Widget.NavigationGroup.ViewController { ... }
```

## Requirement and Note

* Depends on Craft-UIKit.
* Your page component should extends Craft.Widget.NavigationGroup.Page to be fit and scrollable in the content area.
* NavigationGroup set the scrollTop against your this.view. Be careful if you would like to modify your dom structure of your template.


## Demo

See [craft-demoapp]() for more about this widget.


## Sample

Note: Below sample is not implementing history management.

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover"/>
    <title>Navi sample</title>
    <script src="https://unpkg.com/@craftkit/craft-uikit/dist/craft-uikit.min.js"></script>
    <script src="https://unpkg.com/@craftkit/craft-widget-navigationgroup/dist/craft-widget-navigationgroup.min.js"></script>
    <style>html,body { width: 100%; height: 100%; overflow: hidden; box-sizing:border-box; margin:0; padding:0; }</style>
    <script>
        window.onload = function(){
            Craft.Core.Bootstrap.boot({
                didBootApplication : function(options){
                    Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT = true;
                    const rootViewController = new Craft.Widget.NavigationGroup.ViewController({
                        enableHeader   : true,
                        enableFooter   : true,
                        enableSidemenu : true,
                        page           : new FirstPage(), // initial page
                    });
                    Craft.Core.Context.setRootViewController(rootViewController);
                    rootViewController.Header.setTitle("Demo");
                    rootViewController.setSidemenu(new Menu());
                }
            });
        };
        class Menu extends Craft.UI.View {
            openFirst(){
                this.viewController.open(new FirstPage());
                this.viewController.toggleSidemenu();
            }
            openSecond(){
                this.viewController.open(new SecondPage());
                this.viewController.toggleSidemenu();
            }
            style(){
                return `
                    .menu { display:flex; flex-direction:column; padding-top:20px; }
                    .item { padding-left:20px; line-height:50px; cursor:pointer; }
                    .item:hover { background-color: #ddd; }
                `;
            }
            template(self){
                return `
                    <div class="menu">
                        <div class="item" onclick="${self}.openFirst();">First</div>
                        <div class="item" onclick="${self}.openSecond();">Second</div>
                    </div>
                `;
            }
        }
        class FirstPage extends Craft.UI.View {
            next(){
                this.viewController.open(new SecondPage());
            }
            style(){
                return `
                    :host { height:100%; }
                `;
            }
            template(self){
                return `
                    <div>
                        <div style="padding:44px;">I am FirstPage.</div>
                        <div onclick="${self}.next();" style="padding-left:44px;cursor:pointer;color:blue;">Click here to go SecondPage.</div>
                    </div>
                `;
            }
        }
        class SecondPage extends Craft.UI.View {
            style(){
                return `
                    :host { height:100%; }
                `;
            }
            template(self){
                return `
                    <div style="padding:44px;">I am SecondPage.</div>
                `;
            }
        }
    </script>
</head>
<body id="CraftRoot">
</body>
</html>

``` 

## License

MIT

