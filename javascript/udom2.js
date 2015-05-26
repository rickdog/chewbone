/*
udom - unique domains
 */
var a = '<b>Unique Domains</br><a href="' + location.href + '">' + location.href + ': ' + document.title + '</a></b><br/><br/>',
    d = document;
if (d.links) {
  var la = [];
  for (var i = 0; i < d.links.length; i++) {
    var l = d.links[i];
    var lx = l.href.replace(/http([s]*)\:\/\/(.*?)\/.*/, 'http$1: //$2/');
    if (!la[lx])
      la[lx] = '<a href="' + lx + '" target="_blank">' + lx + '</a> ';
    la[lx] += ' <a href="' + l + '" title="' + l + '" target="_blank">+</a>';
  }
  for (o in la)
    a += la[o] + '<br/>';
}
(w = window.open('', '_blank')).focus();
w.document.write(a);
w.document.close();

