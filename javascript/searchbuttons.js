// ==UserScript==
// @name        RYM google current album
// @description	open a google search window for the current artist and album
// @namespace   https://greasyfork.org/en/scripts/5966-rym-google-current-album  
// @include     http://rateyourmusic.com/release/*
// @version     1.9
// ==/UserScript==




function getSelected()
{
  var t = '';
  if (window.getSelection){
    t = window.getSelection();
  } else if (document.getSelection){
    t = document.getSelection();
  } else if (document.selection){
    t = document.selection.createRange().text;
  }
  return t;
}

function quote(s) {return '"' + s + '"';}

function loaded()
{
  var $ = jQuery;
  var whereAppend = $($("body"));
  console.log(whereAppend);
  var sel = getSelected();
  
  function addButton(sName, url)
  {
    var sButton = '<button class="rickdog">' + sName + '</button>';
    var btn = $(sButton).click(function () {
      window.open(url, '_blank');
    });
    whereAppend.append(btn);
  }

  whereAppend.append($("<B>" + sel + "</B><br>"));
  addButton('Google', 'https://google.com?q=' + quote(sel));
  addButton('Google Blog', 'https://google.com?q=' + quote(sel) + '&tbm=blg');
  addButton('Google Image', 'https://www.google.com/searchbyimage?image_url=' + quote(sel));
  addButton('tineye', 'http://tineye.com/search?url=' + quote(sel));

  addButton('DDGG', 'https://duckduckgo.com/?ia=audio&q=' + quote(sel));
  addButton('mail.ru', 'http://go.mail.ru/search?q=' + quote(sel));
  addButton('Inoreader', 'http://www.inoreader.com/search/' + quote(sel) + '/public');
  addButton('Feedly', 'http://feedly.com/i/search/' + sel + '/all/engagement.any/any/topic/global.popular');

  addButton('Spotify', 'https://play.spotify.com/search/' + sel);
  addButton('reviews', 'http://developer.echonest.com/api/v4/artist/reviews?format=json&api_key=FEQK8YEAC4WDXAWSP&results=100&name=' + sel);
  addButton('AllMusic', 'http://www.allmusic.com/search/all/' + sel);
  addButton('MBrainz', 'http://musicbrainz.org/search?type=release&query=' + sel);
  addButton('Discogs', 'http://www.discogs.com/search/?type=all&q=' + sel);
  addButton('Ranker', 'http://www.ranker.com/app/search.htm?q=' + sel);
  addButton('viewMe', 'http://www.viewme.com/search?q=' + sel);
  addButton('myzuka.org', 'http://go.mail.ru/search_site?p=1&aux=PLA099&q=' + sel);

  addButton('GenFile', 'http://www.generalfil.es/?qa=' + sel);
  addButton('GenSearch', 'http://www.general-search.net/download/' + sel);
  addButton('FBug', 'http://www.filesbug.com/search/' + sel);
  addButton('FDeck', 'http://filesdeck.com/search.php?q=' + sel);
  addButton('Ebookee', 'http://ebookee.org/search.php?q=' + sel);
  addButton('Avax', 'http://avaxsearch.org/search?q=' + sel);
  addButton('mp3releases', 'http://mp3releases.org/search/' + sel);
  addButton('Taringa', 'http://www.taringa.net/buscar/?q=' + sel);

  addButton('sharedir', 'http://sharedir.com/index.php?s=' + sel);
  addButton('downloadstube', 'http://www.downloadstube.net/' + sel + '/DDLs.html');
  addButton('RSE', 'http://rapid-search-engine.com/index-s=' + sel + ".html");

  addButton('ULOZ', 'http://www.ulozto.net/hledej?q=' + sel);
  addButton('fileKnow', 'http://fileknow.org/' + sel);
  addButton('fileTram', 'http://filetram.com/' + sel);
  addButton('byDuck', 'http://www.byduck.com/?s=' + sel);

  addButton('media-tube', 'http://media-tube.me/?do=search&subaction=search&story=' + sel);
  addButton('NoNaMe', 'http://nnm.me/search?in=news&q=' + sel);
  addButton('NNC', 'http://go.mail.ru/search_site?p=%5Bobject+Object%5D&aux=nK3H8d&q=' + sel);

  addButton('waretube', 'http://waretube.org/index.php?do=search&do=search&full_search=0&result_from=1&search_start=1&subaction=search&story=' + sel);

  addButton('FileSkull', 'http://www.filesal.com/search.php?q=' + sel);

  addButton('cdBaby', 'http://www.cdbaby.com/?q=' + sel);
  addButton('tehparadox', 'http://tehparadox.com/forum/search.php?do=process&quicksearch=1&childforums=1&showposts=0&exactname=1&s=&securitytoken=1425005892-87caad13ca34df98b139e467ff9f838b2cc242a2&query=' + sel);
  addButton('NeThing', 'http://nethingoez.com/index.php?app=core&module=search&do=search&fromMainBar=1&search_app=forums&search_term=' + sel);

  addButton('fileCatch', 'http://filecatch.com/?q=' + sel);
  addButton('MFT', 'http://mediafiretrend.com/?q=' + sel);
  addButton('tfile.me', 'http://tfile.me/forum/ssearch.php?q=' + sel);
  addButton('rutracker', 'http://rutracker.org/forum/tracker.php?nm=' + sel);
  addButton('bitsnoop', 'http://bitsnoop.com/search/all/' + sel);
  addButton('bestDL', 'https://www.bestdownload.eu/search?f=' + sel);
  addButton('ruhunt', 'http://ruhunt.org/search?q=' + sel);
  addButton('realmt', 'http://realmt.org/tracker.php?max=1&to=1&nm=' + sel);
  addButton('filespr', 'http://www.filespr.me/' + sel.toString().toLowerCase() [0] + '/' + sel);
  addButton('byFiles', 'http://byfiles.com/search/' + sel);

  var html = '<form method="post" action="http://www.filesloop.com/search/" target="_blank"><input type="text" id="search" value="XXX" name="search" style="display:none"></input><input type="submit" value="FilesLoop"></input></form>';
  html = html.replace('XXX', sel);
  whereAppend.append($(html));
  $(".rickdog")[0].scrollIntoView();
}

(function() {
  var script = document.createElement('script');
  script.src = '//code.jquery.com/jquery.min.js';

  if(script.addEventListener) {
    script.addEventListener("load", loaded, false);
  } else {
    script.onreadystatechange = function() {
      if (this.readyState=="complete"){
        loaded();
        script = null;
      }
    }
  }
  script.type="text/javascript";
  document.getElementsByTagName('head')[0].appendChild(script);

})();


/*
Exception: missing ) after argument list
@Scratchpad/4:43
*/