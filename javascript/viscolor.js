(function()
{
    var start=function()
    {
        $('html > head').append($(
            '<style>' +
            'sidebar .widget a:visited,' +
            '#sidebartop a:visited,' +
            '#sidebar a:visited' +
            '.fc-userpage-itemlist a:visited,' +
            '.item h3 a:visited,' +
            '#s idebar1 a:visited,' +
            '.blog-list-container a:visited,' +
            'a:visited,' +
            'ul li a:visited,' +
            '#content ul.posts h2 a:visited,'  +
            'a.button:visited,' +
            '.col h2 a:visited,' +
            'article.templates_listings header .post_title a:visited,' +
            'a.linkers.black:visited,' +
             '.templates-small ul li p a:visited' +
                '{color:cyan !important;}' +
            '</style>'
        ));
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
        }
    }
    s.type="text/javascript";
    document.getElementsByTagName('head')[0].appendChild(s);
})();