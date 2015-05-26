function start()
{
	$ = window.jQuery;
  jQuery("a").each(function () 
    {
      jQuery(this).addClass("rickdog");
    });

  jQuery('html > head').append(jQuery('<style>a.rickdog{color:black;background-color:#ffffcc;} a.rickdog:visited{color: red;}</style>'));
}



(function ()
{
	var path = ((document.location.protocol == "file:") ? 'http:' : "") + '//code.jquery.com/jquery.min.js';
	var s = document.createElement('script');
	s.src = path;
	if (s.addEventListener)
	{
		s.addEventListener("load",start,false);
	}
	else
	{
		s.onreadystatechange=function()
		{
			if(this.readyState=="complete")
			{
				start();
				s=null;
			}
		}
	}
	s.type="text/javascript";
	document.getElementsByTagName('head')[0].appendChild(s);
})();

/*
undefined
*/