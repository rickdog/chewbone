// ==UserScript==
// @name        RYM google current album
// @description	open a google search window for the current artist and album
// @namespace   https://greasyfork.org/en/scripts/5966-rym-google-current-album  
// @include     http://rateyourmusic.com/release/*
// @version     1.9
// ==/UserScript==
var tit = encodeURIComponent($('.album_title').text().trim());
var name = encodeURIComponent($('span[itemProp=\'byArtist\']').text());
var whereAppend = $($('.album_title').siblings(0) [0]);

function addButton(name, url)
{
  var btn = $('<button>' + name + '</button>').click(function () {
    window.open(url, '_blank');
  });
  whereAppend.append(btn);
}

addButton('Google', 'https://google.com?q="' + tit + '" "' + name + '"');
addButton('Google Blog', 'https://google.com?q="' + tit + '" "' + name + '"&tbm=blg');
addButton('Google Image', 'https://www.google.com/searchbyimage?image_url=' + (($('.coverart_img') && $('.coverart_img')[0]) ? $('.coverart_img')[0].src :  ""));
addButton('Inoreader', 'http://www.inoreader.com/search/"' + tit + '" AND "' + name + '"/public');
addButton('Spotify', 'https://play.spotify.com/search/' + tit + ' ' + name);
addButton('reviews', 'http://developer.echonest.com/api/v4/artist/reviews?format=json&api_key=FEQK8YEAC4WDXAWSP&results=100&name=' + name);
addButton('AllMusic', 'http://www.allmusic.com/search/all/"' + name + '" "' + tit + '"');
addButton('MBrainz', 'http://musicbrainz.org/search?type=release&query=' + tit + ' ' + name);
addButton('Discogs', 'http://www.discogs.com/search/?type=all&q=' + tit + ' ' + name);
addButton('Ranker', 'http://www.ranker.com/app/search.htm?q=' + tit + ' ' + name);
addButton('DDGG', 'https://duckduckgo.com/?ia=audio&q="' + tit + '" "' + name + '"');
addButton('GenFile', 'http://www.generalfil.es/?qa="' + tit + '" "' + name + '"');
addButton('GenSearch', 'http://www.general-search.net/download/"' + name + '" "' + tit + '"');
addButton('FBug', 'http://www.filesbug.com/search/' + tit + ' ' + name);
addButton('FDeck', 'http://filesdeck.com/search.php?q=' + tit + ' ' + name);
addButton('Ebookee', 'http://ebookee.org/search.php?q=' + tit + ' ' + name);
addButton('Avax', 'http://avaxsearch.org/avaxhome_search?q=' + tit + ' ' + name);
addButton('NNC', 'http://go.mail.ru/search_site?p=%5Bobject+Object%5D&aux=nK3H8d&q=' + tit + ' ' + name);
addButton('ULOZ', 'http://www.ulozto.net/hledej?q=' + tit + ' ' + name);
addButton('fileKnow', 'http://fileknow.org/' + name + ' ' + tit);
addButton('fileTram', 'http://filetram.com/' + name + ' ' + tit);
addButton('MFT', 'http://mediafiretrend.com/?q=' + name + ' ' + tit);
addButton('mail.ru', 'http://go.mail.ru/search?q=' + name + ' ' + tit);
addButton('tfile.me', 'http://tfile.me/forum/ssearch.php?q=' + name + ' ' + tit);
addButton('rutracker', 'http://rutracker.org/forum/tracker.php?nm=' + name + ' ' + tit);
addButton('bestDL', 'https://www.bestdownload.eu/search?f=' + name + ' ' + tit);
addButton('realmt', 'http://realmt.org/tracker.php?max=1&to=1&nm="' + name + '" "' + tit + '"');
addButton('filespr', 'http://www.filespr.me/' + name.toLowerCase() [0] + '/' + name + ' ' + tit);

var html = '<form method="post" action="http://www.filesloop.com/search/" target="_blank"><input type="text" id="search" value="XXX" name="search" style="display:none"></input><input type="submit" value="FilesLoop"></input></form>';
var uri2 = 'http://www.inoreader.com/search/"' + tit + '" AND "' + name + '"/public';
html = html.replace('XXX', tit + ' ' + name);
$($('.album_title') [0]).append($(html));
