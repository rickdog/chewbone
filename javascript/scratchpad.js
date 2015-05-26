/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

function loadJS(url, callback) {
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
    document.getElementsByTagName('head') [0].appendChild(s);
}


document.querySelector('#viewsource > pre').textContent = JSON.stringify(JSON.parse(document.querySelector('#viewsource > pre').textContent), null, 4);

/*

JSON.stringify(JSON.parse(document.querySelector('#viewsource > pre')), null, step);


document.querySelector('#viewsource > pre')

*/