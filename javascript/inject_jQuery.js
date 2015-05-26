(function () {
  var start = function () {
    $ = jQuery;
    alert("call your init function here");
  };
  if (typeof jQuery == 'undefined') {
    var s = document.createElement('script');
    s.src = '//code.jquery.com/jquery.min.js';
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
