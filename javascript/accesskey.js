/*
 automatically underline the letter of a link text which matches its accesskey.
 http://clagnut.com/sandbox/
 firefox: alt-shift, IE: alt
 */

var injected = true;

function underline() {
    var navlinks = document.getElementsByTagName('A');
    var alrt = "";
    for (var i = 0; i < navlinks.length; i++) {
        var accesskey = navlinks[i].getAttribute('accesskey');
        if (accesskey) {
            var link = navlinks[i];
            var linktext = link.childNodes[0].nodeValue;
            linktext = linktext ? linktext : "";
            alrt += "[" + accesskey + ": '" + linktext + "', " + link + "]";
            var keypos = linktext.indexOf(accesskey);
            var firstportion = linktext.substring(0,keypos);
            var keyportion = linktext.substring(keypos,keypos+1);
            var lastportion = linktext.substring(keypos+1,linktext.length);
            link.childNodes[0].nodeValue = firstportion;
            var s = document.createElement("span");
            var span = link.appendChild(s);
            var keyt = document.createTextNode(keyportion);
            span.appendChild(keyt);
            var lastt = document.createTextNode(lastportion);
            link.appendChild(lastt);
        }
    }
    alert(alrt);
}

injected ? underline() : window.onload = function() { underline(); };
