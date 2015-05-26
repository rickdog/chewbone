//  https://safelinking.net/api
function callbackfunc(response)
{
  window.open(response.p_links, '_blank');
}

(function() {
  if (typeof jQuery == 'undefined') {
    var s = document.createElement('script');
    s.src = '//code.jquery.com/jquery.min.js';
    if (s.addEventListener)
      s.addEventListener('load', start, false);
    else
      s.onreadystatechange=function() { if(this.readyState=='complete')	start(); };
    s.type='text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  else
    start();
})();

function start()
{
  jQuery.ajax({
      type: 'GET',
      url: 'https://safelinking.net/api?jsoncallback=callbackfunc',
      data: {
       'links-to-protect': document.location.href,
       'enable-captcha': 'on',
       'output': 'json'
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'jsonp'  });
}

