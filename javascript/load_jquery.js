(function()
{
	var s=document.createElement('script');
	s.src='//code.jquery.com/jquery.min.js';
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
				start();
				s=null;
			}
		}
	}
	s.type="text/javascript";
	document.getElementsByTagName('head')[0].appendChild(s);
})();


function start()
{
	$ = window.jQuery;
	var  $container = $('body');
	alert(jQuery);
}

