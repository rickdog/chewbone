// use Promise to read an image
$ = jQuery;
var util = {};
util.Deferred = $.Deferred;

/*
use on window containing: <input id="fileItem" type="file">
var el = $('#fileItem');
{
var res = util.readFileImage(el[0]).done(function(t)
{
  console.log(t);
  el.parent().html(el[0].outerHTML + "<img src='" + t + "'>");
}).fail(function(t)
{
  alert(t);
});
}


var el = $('#fileItem');

var aBuff = null;
fetchRaw(el[0].files[0].name, function(t){aBuff = t;})

var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(aBuff)));

*/
// read file using Promise and util.blobToBase64.
util.readFileImage = function (el) {
  return util.Deferred(function (def) {
    var reader = new FileReader();
    reader.onload = function () {
      //console.log(util.blobToBase64(this.result))
      def.resolve('data:image/jpeg;base64,' + util.blobToBase64(this.result));
    };
    reader.onerror = function () {
      def.reject(this.error);
    };
    try {
      reader.readAsArrayBuffer(el.files[0]);
    } catch (E) {
      def.reject(E)
    }
  });
};

util.blobToBase64 = function (blob) {
  // Oh this is just terrible
  var binary = '';
  var bytes = new Uint8Array(blob);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};


// Use XHR to fetch `file` as arraybuffer.
// use btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
// to get base64 string
// 5X faster, but memory hog
function fetchRaw(file, fn) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', file);
  // Using 'arraybuffer' as the responseType ensures that the raw data is returned,
  // rather than letting XMLHttpRequest decode the data first.
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    if (this.status == 200) {
      fn(this.response);
      //console.log(this.response)
    } else {
      console.error('Error while requesting', file, this);
    }
  };
  xhr.send();
}

/* timings

// setup
var ab = new ArrayBuffer(100000);
var vw = new Uint8Array(ab);
for (i=0; i<100000; i++)
  vw[i] = i%256;

console.time("apply")
for (x=0;x<100;x++)
{
  var s = String.fromCharCode.apply(null, new Uint8Array(ab));
}
console.timeEnd("apply")

console.time("loop")
for (x=0;x<100;x++)
{
  var s = '';
  var bytes = new Uint8Array(ab);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    s += String.fromCharCode(bytes[i]);
  }
}
console.timeEnd("loop")

*/