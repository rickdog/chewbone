var player = '<div style="clear:both;margin-bottom:40px;">';
var cnt = 0;
[
].slice.call(document.links).forEach(function (l)
{
  var pats = [
    /.*\.(mp3|m4a|ogg)$/,
    /\.flv$/,
    /\.swf$/,
    /\.mov/
  ];
  pats.forEach(function (p)
  {
    if (l.href.match(p))
    {
      player += '<br><audio controls style="height: 35px;"><source src="' + l.href + '" type="audio/mpeg">Your browser does not support the audio tag.</audio>&nbsp;&nbsp;<a href="' + l.href + '">' + l.href + '</a>';
      cnt++;
    }
  })
});
if (!cnt)
alert('No media found');
document.getElementsByTagName('body') [0].innerHTML += player + '</div><span id="fini"></span>';
setTimeout(function () {
  document.getElementById('fini').scrollIntoView();
}, 1000);
/* http://vvsiamashka.podfm.ru/krakatuk/533/file/podfm_vvsiamashka_krakatuk_20150320.mp3?channel=rss
       player += '<a href="' + l.href + '">' + l.href + '</a><embed type="application/x-mplayer2" src="' + (l.href) + '" enablecontextmenu="1" showcontrols="1" ShowControls="1" ShowDisplay="1" ShowStatusBar="1" autostart="0" height="27" width="100%"></embed>';

document.getElementsByTagName('body') [0].innerHTML = '<div style="margin-top:100px"><embed type="application/x-vlc-plugin" src="http://quicktime.tc.columbia.edu/users/lrf10/movies/sixties_poster.mov" enablecontextmenu="1" showcontrols="1" ShowControls="1" ShowDisplay="1" ShowStatusBar="1" autostart="0" height="40" width="100%"></embed></div>' + document.getElementsByTagName('body') [0].innerHTML;


*/



