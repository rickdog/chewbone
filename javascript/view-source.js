/*
 * run view-source on:
 * the given URL in the addressbar as a smartmark, or
 * the selected text as an URL, else
 * prompt for the URL
 */
 

var url = '';

// support for browser smartmarks
if ('%s'.length == 0 || ('%s'.length==2 && '%s'[0] == '%' && '%s'[1] == 's'))  
{
  // see if user has selected any text
  var e = window.getSelection, k = document.getSelection, x = document.selection;
  var sel = (e ? e()  : (k) ? k()  : (x ? x.createRange().text : ''));
  if (sel.toString().length > 0)
    url = sel;
}
else
  url = '%s';

if (url.toString().length == 0) 
  url = prompt('URL to view-source:');

if (url != null && url != '')
{
  if (!url.toString().match("/https?\:\/\//"))
      url = "http://" + url;
  try {
    window.open('view-source:' + url, '_blank');
  } catch(e) {alert(url + '\n' + e);}
}
