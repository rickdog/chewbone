function loadJS(url, callback, bLoadJqueryFirst) 
{
    if (bLoadJqueryFirst && (typeof jQuery == 'undefined')) {
      loadJS("https://code.jquery.com/jquery.js", function(){ $=jQuery; }, false);
    }
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

  
loadJS("http://127.0.0.1:8080/xxx/weheartit/js/weHeartIt.js", function()
{
  alert("whi");
}, true);

/*
Exception: TypeError: s.onload is null
loadJS@Scratchpad/1:18:3
loadJS@Scratchpad/1:4:7
@Scratchpad/1:24:1
*/