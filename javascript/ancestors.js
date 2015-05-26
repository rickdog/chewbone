/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
// ancestors bookmarklet - https://www.squarefree.com/bookmarklets/webdevel.html
(function()
{
    function A(n,g)
    {
        var p=n.parentNode,t=n.tagName;
        if(!p)return "";
        if(!t)return A(p,g);
        var T=t.toUpperCase(),b=(T!="TABLE"&&T!="TBODY"&&T!="THEAD"&&T!="TR"),c=n.className,i=n.id;
        return A(p,' > ')+(b?T:T.toLowerCase())+(c?"."+c:"")+(i?"#"+i:"")+(b?g:' ');
    }
    document.onmouseover =
        function(e)
        {
            e=e?e:event;
            var s,g=e.target;
            g=g?g:e.srcElement;
            try
            {
                s=A(g,'');
            }
            catch(err)
            {
                s=err.message;
            }
            console.log(s);     // window.status=s; assigning to window.status doesn't work Fx24
            return true;
        };
    console.log(A(document.documentElement,''));
})()
