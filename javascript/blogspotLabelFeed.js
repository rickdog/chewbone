// create Blogspot label feed if on label search page

//var x="http://cuchyfritos.blogspot.com/search/label/Jazz";
var x=document.location.toString();
var m=x.match(/http\:\/\/(.*)\.blogspot\.com\/search\/label\/(.*)/);
if(m && m[1] && m[2])
{
  // alert("YES");
  var w=open('http://'+m[1]+'.blogspot.com/feeds/posts/default/-/'+m[2],'_blank');w.document.close();
}
else
   alert(x +" is not at Blogspot label page");

//javascript:var x=document.location.toString();var m=x.match(/http\:\/\/(.*)\.blogspot\.com\/search\/label\/(.*)/);if(m&&m[1]&&m[2]){var w=open('http://'+m[1]+'.blogspot.com/feeds/posts/default/-/'+m[2],'_blank');w.document.close();}else alert(x+" is not at Blogspot label page");void 0
