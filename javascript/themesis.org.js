/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+r),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+i), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+l)
 */


(function()
{
    var D=document;
    D.body.normalize();
    F(D.body); 
    function F(n)
    {
        var u,A,M,R,c,x; 
        if(n.nodeType==3)
        { 
            u=n.data.search(/https?\:\/\/[^\s]*[^.,">\s\)\]]/); 
            if(u>=0) { 
                M=n.splitText(u); 
                R=M.splitText(RegExp.lastMatch.length); 
                A=document.createElement("A"); 
                A.href=M.data;
                if (!A.href.search(/.*zippyshare/))
                {
                    window.open(A.href);
                }
                A.target="_blank"; 
                A.appendChild(M); 
                R.parentNode.insertBefore(A,R); 
            } 
        }
        else if (n.tagName!="STYLE" && n.tagName!="SCRIPT" && n.tagName!="A")
            for(c=0;x=n.childNodes[c];++c)
                F(x); 
    } 
})();