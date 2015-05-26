/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

(function () {
  var start = function () {
    $ = jQuery;
    displayFeeds();
  };
  if (typeof jQuery == 'undefined') {
    var s = document.createElement('script');
    s.src = '//code.jquery.com/jquery.min.js';
    if (s.addEventListener) {
      s.addEventListener('load', start, false);
    } else {
      s.onreadystatechange = function () {
        if (this.readyState == 'complete') {
          start();
          s = null;
        }
      }
    }
    s.type = 'text/javascript';
    document.getElementsByTagName('head') [0].appendChild(s);
  } else {
    start();
  }
}) ();


function displayFeeds()
{
  var sHTML = "";
  $.each($.parseHTML($("head").html(),false), function( i, el ) {
    if (el instanceof HTMLLinkElement  && el.rel == "alternate") {
      sHTML += `<br/><a href="${el.href}" target="_blank">${el.title||el.href}</a>`;
    }
  });
  if (sHTML)
    $("body").prepend(sHTML);
}