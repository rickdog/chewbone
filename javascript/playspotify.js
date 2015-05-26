// change spotify open link to play
var d = document;
var re = new RegExp("open.spotify", 'g');
if (d.links) {
  for (var i = 0; i < d.links.length; i++) {
    d.links[i].href = d.links[i].href.replace(re, "play.spotify")
  }
}
