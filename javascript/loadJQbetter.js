// load jQuery

(function(){

  var start = function(){$('html > head').append($('<style>a:visited { color: red; }</style>'));};

  var script = document.createElement('script');
  script.src = 'http://code.jquery.com/jquery.min.js';

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
// javascript:(function(){var start=function(){$('html > head').append($('<style>a:visited{color:red;}</style>'));};var s=document.createElement('script');s.src='http://code.jquery.com/jquery.min.js';if(s.addEventListener){s.addEventListener("load",start,false);}else{s.onreadystatechange=function(){if(this.readyState=="complete"){start();s=null;}}}s.type="text/javascript";document.getElementsByTagName('head')[0].appendChild(s);})();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
