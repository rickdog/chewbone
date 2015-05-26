
var urls = [
  'https://raw.githubusercontent.com/domchristie/to-markdown/master/dist/to-markdown.js'
  ];

// map urls to getScript calls, and pass them to $.when
$.when.apply($, $.map(urls, $.getScript)).done(function()
{

  

var x = toMarkdown($("body")[0].innerHTML);

console.log(x);  
  
  
}
).fail(function(){alert("fail")});
