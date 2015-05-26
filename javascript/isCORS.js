

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = "%s";
  //var url = 'http://updates.html5rocks.com';
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function(a,b,c) {
    console.log(a,b,c);alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

makeCorsRequest()
/*
Exception: [Exception... "<no message>"  nsresult: "0x805e0006 (<unknown>)"  location: "JS frame :: Scratchpad/12 :: createCORSRequest :: line 8"  data: no]
*/
/*
Exception: [Exception... "<no message>"  nsresult: "0x805e0006 (<unknown>)"  location: "JS frame :: Scratchpad/12 :: createCORSRequest :: line 8"  data: no]
*/