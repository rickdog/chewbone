/*
 google feed player
 */

//var b=document.body;if(b&&!document.xmlVersion){void(z=document.createElement('script'));void(z.src='http://persistent.info/files/play-bookmarklet.js');void(b.appendChild(z));}else{location='http://www.google.com/reader/play/#stream/feed/'+encodeURIComponent(location.href)}

(function() {
  var found = false;
  var linkNodes = document.getElementsByTagName('link');

  function isXml(attrType) {
    return attrType && attrType.match(/[\+\/]xml$/);
  }

  function getAbsoluteFromRelative(path) {
    var fullPath = path;
    var loc = window.document.location;

    if (path.indexOf('/') != 0) {
      var pathArray = loc.pathname.split('/');
      pathArray[pathArray.length - 1]  = path;
      fullPath = pathArray.join('/');
    }

    return loc.protocol + '//' + loc.hostname + fullPath;
  }

  for(var i = 0, linkNode; linkNode = linkNodes[i]; i++){
    var linkTypeAttr = linkNode.getAttribute('type');
    var relAttr = linkNode.getAttribute('rel');
    if (isXml(linkTypeAttr)
        && relAttr
        && relAttr == 'alternate') {

      var linkHref = linkNode.getAttribute('href');

      if (linkHref.indexOf('http') != 0) {
        linkHref = getAbsoluteFromRelative(linkHref);
      }

      window.open("http://www.google.com/reader/play/#stream/feed/" + encodeURIComponent(linkHref), "_blank");
      // window.document.location = 'http://www.google.com/reader/play/#stream/feed/' + encodeURIComponent(linkHref);
      found = true;
      break;
    }
  }

  if (!found) alert('Oops. Can\'t find a feed.');
})();