/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

 
loadJS('http://code.jquery.com/jquery.js');
loadJS('http://code.jquery.com/ui/1.11.4/jquery-ui.js');
loadJS('http://rangy.googlecode.com/svn/trunk/currentrelease/rangy-core.js');
loadJS('https://raw.githubusercontent.com/bergie/hallo/master/dist/hallo.js');


function loadJS(url)
{
  z = document.head.appendChild(document.createElement('script'));
  z.type = 'text/javascript';
  z.src = url;
}
  


["div", "h1", "h2", "h3", "h4", "h5", "h6"].map(function(el,n){return document.querySelectorAll(el)})
.map(function(nodelist,i)
  {
      Array.slice(nodelist)
      .forEach(function(el, i)
      {
        el.classList.add("editable");
        //console.log(el);        
      });
  })

jQuery('.editable').hallo({
          plugins: {
            'halloindicator': {},
            'halloformat': {},
            'halloheadings': {},
            'hallojustify': {},
            'hallolists': {},
            'hallolink': {},
            'halloreundo': {}
            /*
            ,'halloimage': {
                search: function(query, limit, offset, successCallback) {
                    response = {offset: offset, total: limit + 1, assets: searchresult.slice(offset, offset+limit)};
                    successCallback(response);
                },
                suggestions: null,
                uploadUrl: function() {
                  return '/some/example/url'
                }
            }
            */
          },
          editable: true,
          toolbar: 'halloToolbarFixed'
        })

/*
Exception: TypeError: jQuery(...).hallo is not a function
@Scratchpad/5:2:1
*/