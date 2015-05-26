// open sage windows for all feed links in page

(function(){

var f=false, ls=document.getElementsByTagName('link');
for(var i=0,l;l=ls[i];i++){
    var t=l.getAttribute('type');
    var r=l.getAttribute('rel');
    if(t&&(t=='application/rss+xml'||t=='application/atom+xml')&&r&&r=='alternate'){
        var h= l.getAttribute('href');
        if(h.indexOf('http')!=0){
            var p=(h.indexOf('/')!=0)?'/':location.pathname;
            h='http://'+location.hostname+p+h;
        }
        window.open('chrome://sage/content/feedsummary.html?uri='+h,'_blank');
        f=true;
    }
}
if(!f)alert('Oops. Can\'t find a feed.');

})();


// javascript:(function(){var f=false, ls=document.getElementsByTagName('link');for(var i=0,l;l=ls[i];i++){var t=l.getAttribute('type');var r=l.getAttribute('rel');if(t&&(t=='application/rss+xml'||t=='application/atom+xml')&&r&&r=='alternate'){var h= l.getAttribute('href');if(h.indexOf('http')!=0){var p=(h.indexOf('/')!=0)?'/':location.pathname;h='http://'+location.hostname+p+h;}window.open('chrome://sage/content/feedsummary.html?uri='+h,'_blank');f=true;}}if(!f)alert('Oops. Can\'t find a feed.');})();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               