(function()
{
	if(typeof jQuery=='undefined')
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
	}
	else
		start();
})();


function start()
{
	$ = window.jQuery;
	
	xxx = $.ajax({
		dataType: "html",
		url: "https://papaly.com",
		data: null,
		error: no_sample,
		success: got_sample
	});
	/*
	$.getJSON("https://papaly.com/api/sample?url=http://www.richardshide.com", function(r)
	{
		got_sample(r);
	});
	*/

	function got_sample(r)
	{
		console.info();
		console.dir(r);
	}
	
	function no_sample(r)
	{
		console.info();
		console.dir(r.message)
	}
	
	
}


/*
Exception: missing ; before statement
@Scratchpad/5:47
*/