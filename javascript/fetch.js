function importJS(src, onload) {
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', src);
  if (s.addEventListener) {
		onload && s.addEventListener("load",onload,false);
	}
	else {
		s.onreadystatechange=function() {
			if (this.readyState=="complete")	{
				onload && onload();
				s = null;
			}
		}
	}
  var head = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(s);
  } else {
    document.body.appendChild(s);
  }
}



function test()
{
  var result = fetch('http://localhost:8080/xxx/polymer/polymer/docs.json', {"credentials":"cors"});

    result.then(function(response) {
      console.log('response', response);
      var contentType = response.headers.get('Content-Type');
      console.log('Content-Type', contentType);
      return contentType == "application/json" ? response.json() : response.text(); 
    }).then(function(text) {
        console.log(typeof text);
        console.log(text);
    }).catch(function(ex) {
      console.log('failed', ex)
    });
}


importJS("http://localhost:8080/lib/fetch.js", test)
{
  setTimeout(function () {importJS("http://localhost:8080/lib/filepicker.js")}, 10000);
}