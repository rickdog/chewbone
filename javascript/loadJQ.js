(function () {
  var s = document.createElement('script');
  s.setAttribute('src', '//code.jquery.com/jquery.js');
  if (typeof jQuery != 'undefined') {
    var msg = 'This page already using jQuery v' + jQuery.fn.jquery;
  } else {
    document.getElementsByTagName('head') [0].appendChild(s);
    var msg = 'This page is now jQuerified';
  }
  var el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.height = '30';
  el.style.width = '200';
  el.style.margin = '0 auto 0 auto';
  el.id = 'jq-kswedberg';
  el.style.top = '0';
  el.style.left = '40%';
  el.style.padding = '5px 10px 5px 10px';
  el.style.backgroundColor = '#f99';
  el.innerHTML = msg;
  var b = document.getElementsByTagName('body') [0];
  b.appendChild(el);
  window.setTimeout(function () {
    jQuery('#jq-kswedberg').fadeOut('slow', function () {
      jQuery(this).remove()
    });
  }, 2500);
}) ();
