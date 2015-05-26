/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text,
 * 2. Inspect to bring up an Object Inspector on the result, or,
 * 3. Display to insert the result in a comment after the selection.
 */

var iInterval = null;
var cnt = 0;

function setIt()
{
    if (window.jQuery !== undefined)
    {
        alert("time: " + cnt/100.0);
        window.jQuery('html > head').append(window.jQuery('<style>a:visited { color: yellow; }</style>'));
        if (iInterval !== null)
            window.clearInterval(iInterval);
    }
    cnt++;
}

if (window.jQuery == undefined)
{
    var s=document.createElement('script');
    s.src='http://code.jquery.com/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(s);
    iInterval = this.setInterval(function(){setIt()},10); 
}
else
    setIt();



