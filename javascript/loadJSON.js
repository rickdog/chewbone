function loadJS(url, callback) 
{
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

  
loadJS("https://code.jquery.com/jquery.js", function()
{
      $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://google.com') + '&callback=?', function(data)
      {
         alert(data.contents);
      })
});

