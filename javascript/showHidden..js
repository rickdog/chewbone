(function()
{
    var start=function()
    {
        $(':hidden').show();
    };
    var s=document.createElement('script');
    s.src='http://code.jquery.com/jquery.min.js';
    if(s.addEventListener)
    {
        s.addEventListener("load",start,false);
    }
    else
    {
        s.onreadystatechange=function()
        {
            if(this.readyState=="complete")
            {
                start();s=null;
            }
        };
    }
    s.type="text/javascript";
    document.getElementsByTagName('head')[0].appendChild(s);
})();