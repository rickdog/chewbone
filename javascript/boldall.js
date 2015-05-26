(function run() {
  try
  {
    jQuery('*').css('font-weight', '900');
  } 
  catch (e)
  {
    var s = document.createElement('script');
    s.setAttribute('src', '//code.jquery.com/jquery.js');
    document.getElementsByTagName('head') [0].appendChild(s);
    window.setTimeout(function () {
      run();
    }, 100);
  }
}) ();
