/*
http://zbooks.zzzzbov.com/index.php?bookmarkletName=test&bookmarkletURL=https%3A%2F%2Fraw.github.com%2Frickdog%2Ftest%2Fmaster%2Ffilepicker.io.js&bookmarkletID=filepicker
 */

(function () {
  var n = 'filepicker';
  var c = '//raw.github.com/rickdog/test/master/filepicker.io.js';
  var b = document.getElementsByTagName('body') [0];
  var z;
  if (!window.zbooks) {
    var s = document.createElement('script');
    var r = false;
    s.setAttribute('src', '//code.jquery.com/jquery-latest.min.js');
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        window.zbooks = {
          'jQuery': jQuery.noConflict()
        };
        window.zbooks[n] = new zbooks(c);
      }
    };
    b.appendChild(s);
  } else if ((z = window.zbooks[n])) {
    if (z.isReady) z.repeat(window.zbooks.jQuery);
  } else {
    window.zbooks[n] = new zbooks(c);
  }
  function zbooks(c) {
    this.isReady = false;
    var z = this;
    var s = document.createElement('script');
    var r = false;
    s.setAttribute('src', c + '?' + Math.random());
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        z.isReady = true;
        z.init(window.zbooks.jQuery);
      }
    };
    b.appendChild(s);
  }
  zbooks.prototype.init = function ($) {
    if (window.console) console.log('init')
  };
  zbooks.prototype.repeat = function ($) {
    if (window.console) console.log('repeat')
  };
}) ();
