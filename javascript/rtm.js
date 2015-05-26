// ==UserScript==
// @name        RYM google current album
// @description	open a google search window for the current artist and album
// @namespace   https://greasyfork.org/en/scripts/5966-rym-google-current-album  
// @include     http://rateyourmusic.com/release/*
// @version     1.8
// ==/UserScript==

var tit = encodeURIComponent($(".album_title").text().trim());
var name = encodeURIComponent($("span[itemProp='byArtist']").text());
var uri = 'https://google.com?q="' + tit + '" "' + name + '"';

var btn1 = $('<button>Google This</button>').click(function () {
  window.open(uri,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn1);

var btn2 = $('<button>Google Blog This</button>').click(function () {
  window.open(uri + '&tbm=blg','_blank');
});
$($(".album_title").siblings(0)[0]).append(btn2);

var html='<form method="post" action="http://www.filesloop.com/search/" target="_blank"><input type="text" id="search" value="XXX" name="search" style="display:none"></input><input type="submit" value="FilesLoop"></input></form>';

html = html.replace("XXX", $(".album_title").text().trim() + ' ' + $("span[itemProp='byArtist']").text());
$($(".album_title")[0]).append($(html));

var uri2 = 'http://www.inoreader.com/search/"' + tit + '" AND "' + name + '"/public';
var btn3 = $('<button>Inoreader</button>').click(function () {
  window.open(uri2,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn3);

var uri3 = 'https://play.spotify.com/search/' + tit + ' ' + name;
var btn4 = $('<button>Spotify</button>').click(function () {
  window.open(uri3,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn4);


var uri4 = 'http://developer.echonest.com/api/v4/artist/reviews?format=json&api_key=FEQK8YEAC4WDXAWSP&results=100&name=' + name;
var btn5 = $('<button>reviews</button>').click(function () {
  window.open(uri4,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn5);


var uri10 = 'https://duckduckgo.com/?ia=audio&q="' + tit + '" "' + name + '"';
var btn10 = $('<button>DDGG</button>').click(function () {
  window.open(uri10,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn10);


var uri11 = 'http://www.generalfil.es/?qa="' + tit + '" "' + name + '"';
var btn11 = $('<button>GenFile</button>').click(function () {
  window.open(uri11,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn11);



var uri11a = 'http://www.general-search.net/download/"' + name + '" "' + tit + '"';
var btn11a = $('<button>GenSearch</button>').click(function () {
  window.open(uri11a,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn11a);


var uri12 = 'http://www.filesbug.com/search/' + tit + ' ' + name;
var btn12 = $('<button>FBug</button>').click(function () {
  window.open(uri12,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn12);


var uri13 = 'http://filesdeck.com/search.php?q=' + tit + ' ' + name;
var btn13 = $('<button>FDeck</button>').click(function () {
  window.open(uri13,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn13);


var uri14 = 'http://ebookee.org/search.php?q=' + tit + ' ' + name;
var btn14 = $('<button>Ebookee</button>').click(function () {
  window.open(uri14,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn14);



var uri15 = 'http://avaxsearch.org/avaxhome_search?q=' + tit + ' ' + name;
var btn15 = $('<button>Avax</button>').click(function () {
  window.open(uri15,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn15);


var uri16 = 'http://go.mail.ru/search_site?p=%5Bobject+Object%5D&aux=nK3H8d&q=' + tit + ' ' + name;
var btn16 = $('<button>NNC</button>').click(function () {
  window.open(uri16,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn16);


var uri17 = 'http://www.ulozto.net/hledej?q=' + tit + ' ' + name;
var btn17 = $('<button>ULOZ</button>').click(function () {
  window.open(uri17,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn17);


var uri18 = 'http://fileknow.org/' + name  + ' ' + tit;
var btn18 = $('<button>fileKnow</button>').click(function () {
  window.open(uri18,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn18);



var uri19 = 'http://filetram.com/' + name  + ' ' + tit;
var btn19 = $('<button>fileTram</button>').click(function () {
  window.open(uri19,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn19);



var uri20 = 'http://mediafiretrend.com/?q=' + name  + ' ' + tit;
var btn20 = $('<button>MFT</button>').click(function () {
  window.open(uri20,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn20);



var uri21 = 'http://go.mail.ru/search?q=' + name  + ' ' + tit;
var btn21 = $('<button>mail.ru</button>').click(function () {
  window.open(uri21,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn21);



var uri22 = 'http://tfile.me/forum/ssearch.php?q=' + name  + ' ' + tit;
var btn22 = $('<button>tfile.me</button>').click(function () {
  window.open(uri22,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn22);



var uri23 = 'http://rutracker.org/forum/tracker.php?nm=' + name  + ' ' + tit;
var btn23 = $('<button>rutracker</button>').click(function () {
  window.open(uri23,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn23);



var uri24 = 'https://www.bestdownload.eu/search?f=' + name  + ' ' + tit;
var btn24 = $('<button>bestDL</button>').click(function () {
  window.open(uri24,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn24);

// $.each($("button"), function( index, value ){value.click();});



var uri25 = 'http://realmt.org/tracker.php?max=1&to=1&nm="' + name + '" "' + tit + '"';
var btn25 = $('<button>realmt</button>').click(function () {
  window.open(uri25,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn25);



var uri26 = 'http://www.filespr.me/' + name.toLowerCase()[0] +"/" + name  + ' ' + tit;
var btn26 = $('<button>filespr</button>').click(function () {
  window.open(uri26,'_blank');
});
$($(".album_title").siblings(0)[0]).append(btn26);



