var cnt = 0;
var cur;
[].slice.call(document.links).forEach(function (l)
{
  var pats = [
    { exp: /\.(mp3|ogg)$/, type: "audio/mpeg" },
    { exp: /\.(flac|m4a)$/, type: "audio/x-flac" }
  ];
  pats.forEach(function (p)
  {
    if (l.href.match(p.exp))
    {
      if (p.type == "audio/mpeg")
        l.outerHTML += '&nbsp;&nbsp;<audio controls style="height:35px;"><source src="' + l.href + '" type="audio/mpeg"></audio>';
      else
        l.outerHTML += '&nbsp;&nbsp;<embed type="audio/x-flac" src="' + l.href + '" height="35px" autoplay=false>';
      cnt++;
    }
  })
});
if (!cnt)
  alert('No media found');
else
{
  console.log(cnt + " mp3s detected.");
  var players = document.getElementsByTagName("audio");
  players[0].scrollIntoView();
  for (var i = 0; i < players.length; i++)
  {
    players[i].onclick = function() {
      for (j = 0; j < players.length; j++)
      {
        if (!players[j].paused)
        {
          cur = players[j];
          setTimeout(function(){cur.pause()},100);
        }
      }
    };
  }
}

/* http://vvsiamashka.podfm.ru/krakatuk/533/file/podfm_vvsiamashka_krakatuk_20150320.mp3?channel=rss
       player += '<a href="' + l.href + '">' + l.href + '</a><embed type="application/x-mplayer2" src="' + (l.href) + '" enablecontextmenu="1" showcontrols="1" ShowControls="1" ShowDisplay="1" ShowStatusBar="1" autostart="0" height="27" width="100%"></embed>';

document.getElementsByTagName('body') [0].innerHTML = '<div style="margin-top:100px"><embed type="application/x-vlc-plugin" src="http://quicktime.tc.columbia.edu/users/lrf10/movies/sixties_poster.mov" enablecontextmenu="1" showcontrols="1" ShowControls="1" ShowDisplay="1" ShowStatusBar="1" autostart="0" height="40" width="100%"></embed></div>' + document.getElementsByTagName('body') [0].innerHTML;
document.getElementsByTagName("audio")[0].scrollIntoView();

[].slice.call(document.links).forEach(function (l) {
    if (l.href.match(/\.mp3$/))
      l.outerHTML += '&nbsp;&nbsp;<audio controls><source src="' + l.href + '" type="audio/mpeg"></audio>'});


*/


