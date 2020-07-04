
# Craft-Widget-NavigationGroup

Classic stack navigation.

Try online tutorial:  
[https://github.com/craftkit/craftkit-playground](https://github.com/craftkit/craftkit-playground)

Demo:  
See [craft-sample-photoalbum](https://github.com/craftkit/craft-sample-photoalbum) for more about this widget.

## How to use

```html 
<script src="https://unpkg.com/@craftkit/craft-uikit/dist/craft-uikit.min.js"></script>

<!-- automatically loaded into Craft.Widget.NavigationGroup -->
<script src="https://unpkg.com/@craftkit/craft-widget-navigationgroup/dist/craft-widget-navigationgroup.min.js"></script>
<script>
    window.onload = function(){
        Craft.Core.Bootstrap.boot(App);
    };
</script>
```

or

```javascript 
import * as Craft from '@craftkit/craft-uikit';
import * as NavigationGroup from '@craftkit/craft-widget-navigationgroup';

// inject into Craft.Widget. (this is just a cosmetic function)
Craft.usePackage(NavigationGroup);

export class PageController extends Craft.Widget.NavigationGroup.ViewController { ... }
```

## Requirement and Note

* Depends on Craft-UIKit.
* Your page component should extends Craft.Widget.NavigationGroup.Page to be fit and scrollable in the content area.
* NavigationGroup set the scrollTop against your this.view. Be careful if you would like to modify your dom structure of your template.

## License

MIT

