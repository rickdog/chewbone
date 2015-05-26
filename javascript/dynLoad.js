function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("file:///C:/Users/rickdog/javascript/lightbox2-master/js/jquery-1.11.0.min.js", "js");
loadjscssfile("file:///C:/Users/rickdog/javascript/lightbox2-master/js/lightbox.min.js", "js");
loadjscssfile("file:///C:/Users/rickdog/javascript/lightbox2-master/css/lightbox.css", "css");