var oldClick=document.body.onclick;
document.body.onclick=function(e)
{
    event=window.event||e;
    console.log(event);
    target = event.target;
    while (!target.href)  /* find enclosing link */
    {
        target = target.parentElement;
        if (!target)  /* then have transversed up to document root, no deal */
        {
            if (confirm("Not a link, continue?"))
                return true;
       }
    }

    window.open('http://www.getlinkinfo.com/info?link='+target.href,'_blank');

    if (event.stopPropagation) event.stopPropagation();
    if (event.cancelBubble!=null) event.cancelBubble = true;
    document.body.onclick=oldClick;
    delete event;
    return false;
};void 0;

// http://expandurl.appspot.com/expand?url=         returns JSON
// http://checkshorturl.com/expand.php?u=           goes to info page
// http://longurl.org/expand?url=                   goes to info page