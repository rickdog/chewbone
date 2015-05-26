// insert Yahoo music player

(function(){

  var start = function(){YAHOO.mediaplayer.loadPlayerScript()};

  var script = document.createElement('script');
  script.src = 'http://webplayer.yahooapis.com/player.js';

  if(script.addEventListener){
    script.addEventListener("load", start, false);
  } else{
    script.onreadystatechange = function(){
      if(this.readyState=="complete"){
        start();
        script = null;
      }
    }
  }
  script.type="text/javascript";
  document.getElementsByTagName('head')[0].appendChild(script);

})();

// bookmarklet
// javascript:(function(){var start = function(){YAHOO.mediaplayer.loadPlayerScript()};  var script = document.createElement('script');script.src = 'http://webplayer.yahooapis.com/player.js';  if(script.addEventListener){script.addEventListener("load", start, false);} else{script.onreadystatechange = function(){if(this.readyState=="complete"){start();script = null;}}}script.type="text/javascript";document.getElementsByTagName('head')[0].appendChild(script);})();


/* open in new windoow

(function(){
var w=window.open('http://mediaplayer.yahoo.com/contplay/index.php?url='+document.location,'YMP'+Date(),'scrollbars,resizable,width=685,height=290').focus();
})();

*/
// old
// javascript:void(function(){var%20s=document.createElement('script');s.innerHTML='var%20YWPParams={termDetection:"on"};';document.getElementsByTagName('head')[0].appendChild(s);s=document.createElement('script');s.src='http://webplayer.yahooapis.com/player.js';s.type='text/javascript';document.getElementsByTagName('head')[0].appendChild(s);setTimeout("YAHOO.mediaplayer.loadPlayerScript()",3000);}())
