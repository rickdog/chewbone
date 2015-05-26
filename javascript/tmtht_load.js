(function()
{
	var s=document.createElement('script');
	s.src='https://raw.githubusercontent.com/rickdog/tmtht/master/tmtht.js';
	if(s.addEventListener)
	{
		s.addEventListener("load",parse,false);
	}
	else
	{
		s.onreadystatechange=function()
		{
			if(this.readyState=="complete")
			{
				parse();
				s=null;
			}
		}
	}
	s.type="text/javascript";
	document.getElementsByTagName('head')[0].appendChild(s);
})();

function parse()
{
  parse_table();
}


//javascript:(function(){(function(){var%20s=document.createElement('script');s.src='https://raw.githubusercontent.com/rickdog/tmtht/master/tmtht.js';if(s.addEventListener){s.addEventListener("load",parse,false);}else{s.onreadystatechange=function(){if(this.readyState=="complete"){parse();s=null;}}}s.type="text/javascript";document.getElementsByTagName('head')[0].appendChild(s);})();function%20parse(){parse_table();}})();