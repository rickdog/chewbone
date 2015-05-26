(function() {

  var start = function() {alert("xxxa");
    try {
        var event = document.createEvent('Event');
        event.initEvent('exfmSongsAsyncEvent', true, true);
        document.dispatchEvent(event);
    } catch(e){alert(e)}
 };
 
try {
    document.addEventListener('exfmEnabledEvent', function(event) {alert("JSON=" + JSON);
        var eventData = JSON.parse(event.target.innerText);alert(eventData);
        start();
    });
} catch(e){alert("xxx")};

  var script = document.createElement('script');
  script.src = 'http://static.extension.fm/exfm.js?user=rickdog';

  if (script.addEventListener) {
     script.addEventListener("ready", start, false);
  } 
  else {
    script.onreadystatechange = function() {
      if(this.readyState=="complete") {
        start();
        script = null;
      }
    }
  }
  script.type="text/javascript";
  document.getElementsByTagName('head')[0].appendChild(script);
})();

