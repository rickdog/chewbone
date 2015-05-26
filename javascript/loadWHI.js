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


if (typeof whi == "undefined")
{  
  loadJS("http://127.0.0.1:8080/xxx/weheartit/js/weHeartIt.js", function()
  {
    console.log("whi");
  }, true);
}
else
{
  whiStart({"dismissedPromotedExtensions":true,"sets":[],"locale":"en"});
}

