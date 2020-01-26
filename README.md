# from-json-to-html
This small and simple package will help to convert json to html.

# Usage
In current version, there are two methods, "toHtml" & "toHtmlText". "toHtml" will return the HTMLObject of the json. "toHtmlText" will return text dom strucure in string form.

When used in the script tag, the methods "toHtml" and "toHtmlText" will be available as a part of window, so you can do:
```sh
<script>
    var generatedHtml = toHtml(json or stringy-fied json);
    var generatedHtmltext = toHtmlText(json or stringy-fied json);
</script>
```
When used as a 3rd-party package, you have to import the functions you want to use:
```sh
import {toHtml, toHtmlText} from "from-json-to-html";
var generatedHtml = toHtml(json or stringy-fied json);
var generatedHtmltext = toHtmlText(json or stringy-fied json);
```
# Inputs
Both the functions accept json in object(JSON.parse()) form or stringy-fied(JSON.stringify()) form.

In the input json, you can provide single json object or an array of json objects. All element json object must follow below format:
```sh
{ 
  element:"a valid tag of html like div, span, p, etc.",
  attributes:{ 
    id:"id-1",
    class:"demo-class",
    style:"border: 4px solid red; background-color: #gren; padding: 4px;",
    ...
  },
  htmlText:"Html text to be placed inside above mentioned element",
  htmlTextPosition:"Position of the 'htmlText' with respect to children nodes",
  children:["Array of objects in same format as mentioned here"]
};
```

# Outputs
| Input | Method | output |
| ------ | ------ | ------ | 
| Single json object {} | toHtml | HTMLObject which can be inserted instantaneously in the dom |
| Array of json objects [{},{}] | toHtml | Array of HTMLObject. Iterator or index must be used to access elements. |
| Single json object {} | toHtmlText | String form of the HTMLObject |
| Array of json objects [{},{}] | toHtmlText | String form of the HTMLObject. No need of iterator/index here |

# Format key guide

### element
This could be either a string indicating the valid tag of html, like div, p, body, meta, br, hr & etc.
You can also mention html dom struture in the element like
```sh
{
    element: "<p>Hello! World</p>"
}
```
### attributes
Using this you can pass any attribute to the element. The keys will be the actual attribute like style, id, class, type etc. If boolean attributes (not enum) are to be used, the key and value should be same( disabled: disabled).
### htmlText
In case you want a tex to be added to the element, it can be passed using htmlText.
### htmlTextPosition
If the element is enclosing multiple children, this key will help to add the htmlText relative to the children elements.
### children
This is an array of objects to be rendered inside the element.

# License
This is still confusing for me. This means you can do wahtever you want with the code.