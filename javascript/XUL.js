/* XUL debugging
run scratchpad in Environment/Browser

for Environment/Content
http://127.0.0.1:8080/xxx/libs/web-developer/overlay/javascript/overlay.js
http://127.0.0.1:8080/xxx/libs/web-developer/content/content.js
http://127.0.0.1:8080/xxx/libs/web-developer/common/common.js
*/
// is true, then in Browser
var isBrowser = document.getElementsByTagName("browser").length != 0;


if (isBrowser)
{
  debugger;
  var element = window[19].document.querySelector("img")
  var featureId =  WebDeveloper.Common.getFeatureId(element.getAttribute("id"));
  WebDeveloper.Images.displayAltAttributes(!WebDeveloper.Storage.isFeatureActive(featureId), WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));
}
  WebDeveloper.Images.displayAltAttributes(true, WebDeveloper.Content.getDocuments(WebDeveloper.Common.getContentWindow()));

/*
Exception: Components.classes is undefined
WebDeveloper.Common.getMainWindow@http://127.0.0.1:8080/xxx/libs/web-developer/common/common.js:938:3
WebDeveloper.Common.getTabBrowser@http://127.0.0.1:8080/xxx/libs/web-developer/common/common.js:950:10
WebDeveloper.Common.getSelectedBrowser@http://127.0.0.1:8080/xxx/libs/web-developer/common/common.js:944:10
WebDeveloper.Common.getContentWindow@http://127.0.0.1:8080/xxx/libs/web-developer/common/common.js:848:10
@Scratchpad/3:1:84
*/
/*
Exception: WebDeveloper.Common is undefined
@Scratchpad/3:1:3
*/
/*
Exception: WebDeveloper.Content is undefined
@Scratchpad/3:1:3
*/
//id="BLOGGER_PHOTO_ID_5446418510750050658"

/*
element=window[19].document.querySelector("img")
console.dir(document.documentElement.childNodes)
window[19].document
*/

/*
function (display, documents)
{
  var contentDocument = null;
  var image           = null;
  var images          = null;
  var spanElement     = null;
  var text            = null;

  // Loop through the documents
  for(var i = 0, l = documents.length; i < l; i++)
  {
    contentDocument = documents[i];

    // If displaying the alt attributes
    if(display)
    {
      images = contentDocument.querySelectorAll("img[alt], input[type=image][alt]");

      // Loop through the images
      for(var j = 0, m = images.length; j < m; j++)
      {
        image       = images[j];
        spanElement = contentDocument.createElement("span");
        text        = 'alt="' + image.getAttribute("alt") + '"';

        spanElement.setAttribute("class", "web-developer-display-alt-attributes");
        spanElement.appendChild(contentDocument.createTextNode(text));
        image.parentNode.insertBefore(spanElement, image);
      }
    }
    else
    {
      WebDeveloper.Common.removeMatchingElements(".web-developer-display-alt-attributes", contentDocument);
    }

    WebDeveloper.Common.toggleStyleSheet("features/style-sheets/before.css", "web-developer-display-alt-attributes", contentDocument, false);
  }
}
*/