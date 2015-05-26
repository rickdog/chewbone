var a = document.documentElement.getElementsByTagName("Annotation");

var about;
for (i=0; i < a.length; i++)
{
  about = a[i].attributes["about"];
  about.textContent = "http://" + about.textContent.replace("*.","").replace("/*","");
  
}
console.log(a[0].attributes["about"].textContent);
