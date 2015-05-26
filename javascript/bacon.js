// Bacon functional lib for events
// https://github.com/baconjs

/*****
(function () {
  if (typeof importJS != 'undefined') {
    console.log('This page already using loaderJS');
    LoadBacon();
  } else {
    var s = document.createElement('script');
    s.setAttribute('src', 'http://localhost:8080/lib/loader.js');
    s.addEventListener("load",LoadBacon,false);
    document.getElementsByTagName('head') [0].appendChild(s);
    console.log('LoaderJS loaded');
  }
}) ();
*****/


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


function wait_for_script_load(look_for, callback) {
  var interval = setInterval(function() {
    console.log(eval(look_for));
    if (eval("typeof " + look_for) != 'undefined') {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}


 
function LoadBacon()
{alert(1)
  importJS('https://code.jquery.com/jquery.js', null, function() { // Load everything else when it is done.
    jQuery.noConflict();alert(2)
    importJS('https://raw.githubusercontent.com/baconjs/bacon.js/master/dist/Bacon.js', null, function() {
      importJS("https://raw.githubusercontent.com/baconjs/bacon.model/master/dist/bacon.model.js", 'Bacon', function() {
        importJS("https://raw.github.com/raimohanska/bacon.matchers/master/bacon.matchers.js", "Bacon", function() {

          done();
        });
      });
    });
  });
}

function done()
{
alert(Bacon)
}


