// intercooler.js 
// https://github.com/LeadDyno/intercooler-js
// http://intercoolerjs.org/

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

loadJS("https://code.jquery.com/jquery-1.10.2.js",  function ()
{
  $("body").append('<button ic-post-to="//avatars3.githubusercontent.com/u/77186">A Button</button><div ic-src="//avatars3.githubusercontent.com/u/77186">A Div</div>')

  loadJS("https://rawgit.com/LeadDyno/intercooler-js/master/src/intercooler.js",  function ()
  {
    
  })
})
//https://github.com/liabru/matter-js/tree/master/src/render?_pjax=%23js-repo-pjax-container