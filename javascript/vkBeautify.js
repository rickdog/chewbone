/**
* vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON, CSS and SQL formats.
*  
* Version - 0.99.00.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*   Pretty print
*
*        vkbeautify.xml(text [,indent_pattern]);
*        vkbeautify.json(text [,indent_pattern]);
*        vkbeautify.css(text [,indent_pattern]);
*        vkbeautify.sql(text [,indent_pattern]);
*
*        @text - String; text to beatufy;
*        @indent_pattern - Integer | String;
*                Integer:  number of white spaces;
*                String:   character string to visualize indentation ( can also be a set of white spaces )
*   Minify
*
*        vkbeautify.xmlmin(text [,preserve_comments]);
*        vkbeautify.jsonmin(text);
*        vkbeautify.cssmin(text [,preserve_comments]);
*        vkbeautify.sqlmin(text);
*
*        @text - String; text to minify;
*        @preserve_comments - Bool; [optional];
*                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )
*
*   Examples:
*        vkbeautify.xml(text); // pretty print XML
*        vkbeautify.json(text, 4 ); // pretty print JSON
*        vkbeautify.css(text, '. . . .'); // pretty print CSS
*        vkbeautify.sql(text, '----'); // pretty print SQL
*
*        vkbeautify.xmlmin(text, true);// minify XML, preserve comments
*        vkbeautify.jsonmin(text);// minify JSON
*        vkbeautify.cssmin(text);// minify CSS, remove comments ( default )
*        vkbeautify.sqlmin(text);// minify SQL
*
*/

function loadJS(url, callback) 
{
    var s = document.createElement('script');
    s.src = url;
    if (s.addEventListener) {
      s.addEventListener('load', callback, false);
    } else {
      s.onreadystatechange = function () {
        if (this.readyState == 'complete') {
          callback();
          s = null;
        }
      }
    }
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
};

loadJS("https://raw.githubusercontent.com/vkiryukhin/vkBeautify/master/vkbeautify.js",  function ()
{
  if (document.querySelector("#viewsource > pre") == null)
  {
    document.querySelector("head").outerHTML = vkbeautify.xml(document.querySelector("head").outerHTML,2); 
    document.querySelector("body").outerHTML = vkbeautify.xml(document.querySelector("body").outerHTML,2); 
  }
    else
    document.querySelector("#viewsource > pre").textContent = vkbeautify.xml(document.querySelector("#viewsource > pre").textContent,2);
})
