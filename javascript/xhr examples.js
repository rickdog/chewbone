// xhr examples
//


window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.html5rocks.com/', true);
xhr.responseType = 'arraybuffer';

var arraybuffer;

xhr.onload = function(e) {
  if (this.status == 200) {
    arraybuffer=this.response;
      var uInt8Array = new Uint8Array(this.response); // this.response == uInt8Array.buffer
 var str = String.fromCharCode.apply(null, uInt8Array); alert(str)  
    var html = document.createElement('div');
    html.innerHTML = arraybuffer;
    document.body.appendChild(uInt8Array);
  };

};

xhr.send();