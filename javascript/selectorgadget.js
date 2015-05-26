/*
 * https://dv0akt2986vzh.cloudfront.net/unstable/lib/selectorgadget.js
 */

function importJS(src, look_for, onload) {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', src);
  if (onload) wait_for_script_load(look_for, onload);
  var head = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(s);
  } else {
    document.body.appendChild(s);
  }
}

function importCSS(href, look_for, onload) {
  var s = document.createElement('link');
  s.setAttribute('rel', 'stylesheet');
  s.setAttribute('type', 'text/css');
  s.setAttribute('media', 'screen');
  s.setAttribute('href', href);
  if (onload) wait_for_script_load(look_for, onload);
  var head = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(s);
  } else {
    document.body.appendChild(s);
  }
}

function wait_for_script_load(look_for, callback) {
  var interval = setInterval(function() {
    if (eval("typeof " + look_for) != 'undefined') {
      clearInterval(interval);
      callback();
    }
  }, 50);
}

(function(){
  importCSS('https://dv0akt2986vzh.cloudfront.net/stable/lib/selectorgadget.css');
  importJS('https://code.jquery.com/jquery.js', 'jQuery', function() { // Load everything else when it is done.
    jQuery.noConflict();
    importJS('https://dv0akt2986vzh.cloudfront.net/stable/vendor/diff/diff_match_patch.js', 'diff_match_patch', function() {
      importJS('https://dv0akt2986vzh.cloudfront.net/stable/lib/dom.js', 'DomPredictionHelper', function() {
        importJS('https://dv0akt2986vzh.cloudfront.net/stable/lib/interface.js', 'SelectorGadget', function() {
          importJS('http://127.0.0.1:8080/lib/within.js');
          
          
        });
      });
    });
  });
})();



/*
var selector = jQuery("input#_sg_path_field").val();  // where SelectorGadget puts unique path string
console.log(jQuery(selector));
jQuery(selector).css("border","5px dashed black");
jQuery(selector).css("border","");
jQuery('div').within(400,400)
jQuery("*").on('click', function(ev) {
  console.log(ev);
});

SelectorGadget.prototype.sgMousedown = function(e) {
 console.log(e);
 }
*/


