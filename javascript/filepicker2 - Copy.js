(function() {
  var start = function() {
    showButton();
  };
  if (typeof filepicker == 'undefined') {
    var s = document.createElement('script');
    var pro = (document.location.protocol == 'https:' ? 'https:' : 'http:');
    s.src = pro + '//api.filepicker.io/v1/filepicker.js';
    if (s.addEventListener) {
      s.addEventListener('load', start, false);
    } else {
      s.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          start();
          s = null;
        }
      }
    }
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    start();
  }
})();

function showButton() {
  doDialog();
}

function doDialog() {
  filepicker.setKey('A0b1GBdwgSyv6Pop9ZFNQz');
  // load dialog
  filepicker.pick(function(InkBlob) {
    console.log(InkBlob.url);
  });
}