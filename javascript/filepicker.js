/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
(function()
{
    var b = function()
    {
        doDialog()
    };
    if ("undefined" == typeof filepicker)
    {
        var a = document.createElement("script");
        a.src = "http://api.filepicker.io/v1/filepicker.js";
        a.addEventListener
            ? a.addEventListener("load",b,!1)
            : a.onreadystatechange = function()
            {
                "complete" == this.readyState && (doDialog(), a=null)
            };
        a.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(a)
    }
    else
        doDialog();
    }
)();

function doDialog()
{
    filepicker.setKey("A0b1GBdwgSyv6Pop9ZFNQz");
    filepicker.pick(function(b){})
};