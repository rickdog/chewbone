// make links view-source: protocol
(function () {
  var start = function () {
    $ = jQuery;
    go()
  };
  if (typeof jQuery == 'undefined') {
    var s = document.createElement('script');
    s.src = 'https://code.jquery.com/jquery.min.js';
    if (s.addEventListener) {
      s.addEventListener('load', start, false);
    } else {
      s.onreadystatechange = function () {
        if (this.readyState == 'complete') {
          start();
          s = null;
        }
      }
    }
    s.type = 'text/javascript';
    document.getElementsByTagName('head') [0].appendChild(s);
  } else {
    start();
  }
}) ();

function go()
{
  $("a[href]").each(function(i,el){ el.href = "view-source:" + el.href; el.target='_blank'; })
}