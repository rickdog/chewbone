function loadJS (url, callback) 
{
    var s = document.createElement('script');
    s.src = url;
    if (s.addEventListener) {
      s.addEventListener('load', callback, false);
    } else {
      s.onreadystatechange = function () {
        if (this.readyState == 'complete') {
          callbck();
          s = null;
        }
      }
    }
    s.type = 'text/javascript';
    document.getElementsByTagName('head') [0].appendChild(s);
}


loadJS('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', function () 
{
  loadJS("https://www.google.com/jsapi", function () 
  {
    google.load("feeds", "1");
    run();                                          
  });
})

var page;
var GoButton = undefined;

function loadButtons()
{
        var INObase = 'http://www.inoreader.com/stream/user/1005952996/tag/';
        var INO = [
          [ "_African", "African"],
          [ "aggregators", "Aggregators"],
          [ "_AMERICANA", "Americana"],
          [ "_AVANT", "Avant"],
          [ "_BALKAN and GYPSY", "Balkan & Gypsy"],
          [ "_CLASSICAL", "Classical"],
          [ "_COUNTRY", "Country"],
          [ "_ECLECTIC", "Eclectic"],
          [ "_Electronic", "Electronic"],
          [ "_Exotica-Lounge", "Exotica & Lounge"],
          [ "_Experimental", "Experimental"],
          [ "_Fave", "Fave"],
          [ "_FLAMENCO", "Flamenco"],
          [ "forums", "Forums"],
          [ "_Folk-AltCountry", "Folk & AltCountry"],
          [ "_Folklorico", "Folklorico"],
          [ "_Hip-hop - Rap", "Hip-hop & Rap"],
          [ "_Indian and Asian", "Indian & Asian"],
          [ "_INDIE", "Indie"],
          [ "_JAZZ", "Jazz"],
          [ "_Kitsch-Oddities-Vinyl", "Kitsch, Oddities & Vinyl"],
          [ "_LATIN", "Latin"],
          [ "_METAL", "Metal"],
          [ "_MiddleEastern", "MiddleEastern"],
          [ "_Mixed Bag", "Mixed Bag"],
          [ "_Mixtapes", "Mixtapes"],
          [ "_Noise-Drone-Industrial", "Noise, Drone & Industrial"],
          [ "_OLDIES", "Oldies"],
          [ "Podcasts", "Podcasts"],
          [ "_POP", "Pop"],
          [ "_PROG-PSYCH", "Prog & Psych"],
          [ "_PUNK and GARAGE", "Punk & Garage"],
          [ "_R'n'B - Soul", "R'n'B & Soul"],
          [ "_Rare-Obscure", "Rare & Obscure"],
          [ "_REGGAE", "Reggae"],
          [ "_ROCK", "Rock"],
          [ "_Singer-songwriter", "Singer-songwriter"],
          [ "singles", "Singles"],
          [ "_SOUNDTRACKS", "Soundtracks"],
          [ "_Vintage", "Vintage"],
          [ "_WORLD", "World"],
          [ null, null],
          [ "jQuery", "jQuery"],
          [ "__WhiteRose", "WhiteRose"],
          [ "activism", "Activism"],
          [ "Ajax", "Ajax"],
          [ "apple", "Apple"],
          [ "audioblogs", "Audioblogs"],
          [ "canned feeds", "Canned Feeds"],
          [ "CSS", "CSS"],
          [ "delicious", "Delicious"],
          [ "Development", "Development"],
          [ "Firefox", "Firefox"],
          [ "Freeware", "Freeware"],
          [ "frontend", "Frontend"],
          [ "frontend-standards+browsers", "frontend-standards+browsers"],
          [ "ivoox", "ivoox"],
          [ "Powershell", "Powershell"],
          [ "reviews", "Music Reviews"],
          [ "Semantic Web", "Semantic Web"],
          [ "SEO", "SEO"],
          [ "solomusicaandina", "Solomusicaandina"],
          [ "SteveLacy", "Steve Lacy"],
          [ "Tea", "Tea"],
          [ "The Kitchn", "The Kitchn"],
          [ "Web Design", "Web Design"],
          [ "Web Development", "Web Development"],
          [ "Web-2.0", "Web 2.0"],
          [ "webmaster", "webmaster"],
          [ "WP", "WP"],
          [ "XML", "XML"]
        ];	

        var buttons = $("#buttons");

        for (i = 0; i < INO.length; i++)
        {
          if (INO[i][0] == null)
          {
            var brk = document.createElement("BR"), brk2 = document.createElement("BR");
            buttons.append(brk);
            buttons.append(brk2);
          }
          else
          {
            var btn = document.createElement("BUTTON");
            btn.innerHTML = INO[i][1];
            btn.value = INObase + INO[i][0];
            $(btn).click(function(event) {
              go(this.value);
            }); 
            buttons.append(btn);
          }
        }
}

function setStyle()
{
  $("span.date").css({
    "font-family": "Georgia,serif", 
    "font-style": "italic" , 
    "text-transform": "lowercase", 
    "color": "green", 
    "font-size": "11px", 
    "margin-left": "15px"
  });

  $("ol#list li").css( {"cursor": "pointer"} );
}

function run()
{
 /*
 * Google feed API with history in XML.
 * The feed items are rendered as an OL list with H3 headers that have click events.
 * The click events load the item's content from a saved array of content(see var page[]).
 * This prevents the rendering of the entire feed and only renders the item when it's header is clicked.
 */
// Wordpress export is RSS!: http://rickshide.com/wordpress.2013-07-15
// blog search, must use rss & num <=50: https://www.google.com/search?hl=en&lr=&q=mp3%20blog&tbm=blg&output=rss&num=50

  $ = jQuery;
  var x=$('<div>feed: <input id="url" type="text" size="80"/><button id="go" onclick="loadUrl();">GO</button>' + 
          '<button onclick="toggleAll()">Toggle All</button> <button onclick="clearAll()">Close All</button>' +
          '<input type="checkbox" id="historical" checked>Historical</input><br/><div id="buttons"></div></div>' +
          '<h1 id="feedName">historical feed items Google feed API</h1><div id="display"><ol id="list"></ol></div>');
  $("body").prepend(x);
  GoButton = $("#go");
  $("#url").keypress(function(event) {
    if (event.which == 13 ) {
      GoButton.click();
    }
  });
  loadButtons();

  /*
  if (location.search)
  {
    if (google.feeds)
      go(location.search.substring(1));
    else
      setTimeout(function(){go(decodeURIComponent(location.search.substring(1)))},1000);
  }
  */
}


function OnLoad(url)
{ 
  if (typeof url != "string")	{// an initial call happens from google.setOnLoadCallback(OnLoad); (see end of this script), url is an Event
		return;
  }
		
	$("#feedName").html("Loading...");
	// Create a feed instance that will grab feed.
  alert(google.feeds)
	var feed = new google.feeds.Feed(url);

	// Request the results in XML
	feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
	if ($("#historical").is(":checked"))
		feed.includeHistoricalEntries(); 
	feed.setNumEntries(250); // google allows max 250 entries

	feed.load(feedLoaded);	// Calling load sends the request off.  It requires a callback function.
}

function loadUrl()
{
	var url = $("#url").val();
	document.title = url;
	$("#feedName").innerHTML = url;
	OnLoad(url);
}



function go(url)
{
	$("#url").val(url);
	GoButton.click();
}


var addList = function(n, title, page, date)
{
	var h3 = document.createElement("h3");
	h3.innerHTML = title + "<span class='date'>" + date + "</span>";
	h3.page = page;
	$(h3).click(function()
	{
		if (this.nextSibling.innerHTML.length == 0)
			this.nextSibling.innerHTML = this.page;
		else
			this.nextSibling.innerHTML = "";
	});
	$("#list").append('<li><div"></div></li>');
	$("#list li").last().prepend(h3);
};

function toggleAll()
{
	$("#list li h3").each(function( index ) {
		$(this).click();
	});
}

function clearAll()
{
	$("#list li h3").each(function( index ) {
		this.nextSibling.innerHTML = "";
	});
}


// Our callback function, for when a feed is loaded.
function feedLoaded(result)
{
	if (result.error)
	{
		$("#feedName").html("code: "+result.error.code + "<br/>" + result.error.message);
		return false;
	}

	$("#feedName").html(result.xmlDocument.getElementsByTagName('title')[0].textContent + "<br/>" + document.title);

	var list = $('#list');
	list.html("");
	page = [];

	// Get all items returned.
	var type = result.xmlDocument.documentElement.tagName;
	var items = null;
	if (type == "feed")
		items = result.xmlDocument.getElementsByTagName('entry');
	else if (type == "rss")
		items = result.xmlDocument.getElementsByTagName('item');
	else
		alert(type); 

	// Loop through our items
	for (var i = 0; i < items.length; i++)
	{
		var item = items[i];

		// Get the title from the element.  firstChild is the text node containing
		// the title, and nodeValue returns the value of it.
		var title = "(no title)";
		if (item.getElementsByTagName('title').length)
		{
			if (item.getElementsByTagName('title')[0].firstChild)
				title = item.getElementsByTagName('title')[0].firstChild.nodeValue;
		}
		
		var cont;
		if ((cont = item.getElementsByTagName('content')).length)
			cont = cont[0].firstChild.nodeValue;
		else if ((cont = item.getElementsByTagName('content:encoded')).length)
			cont = cont[0].firstChild.nodeValue;
		else if ((cont = item.getElementsByTagName('description')).length)
			cont = cont[0].firstChild.nodeValue;
		else if ((cont = item.getElementsByTagName('summary')).length)
			cont = cont[0].firstChild.nodeValue;
		else
			cont = "<br/><br/>(no content)";

		var link = item.getElementsByTagName('link');
		if (link.length) {
			if (link[0].childNodes.length)  // TODO: loop thru & get for rel="alternate"
				link = link[0].firstChild.nodeValue;
			else if (link[0].hasAttributes("href"))
				link = link[0].getAttribute("href");
		}

		var ln = "<a href='" + link + "' target=_blank>" + title + "</a><br/>";
		var date;
		if ((date = item.getElementsByTagName('pubDate')).length)
			date = date[0].firstChild.nodeValue;
		else if ((date = item.getElementsByTagName('published')).length)
			date = date[0].firstChild.nodeValue;
		else if ((date = item.getElementsByTagName('updated')).length)
			date = date[0].firstChild.nodeValue;
		else
			date = "(no date)";

		var author = item.getElementsByTagName('author');
		if (author.length)
		{
			if (author[0].getElementsByTagName("name").length)
				author = "By: " + author[0].getElementsByTagName("name")[0].textContent + "<br/>" + date;
			else if (author[0].childElementCount)
				author = "By: " + author[0].firstChild.nodeValue + "<br/>" + date;
			else
				author = "By: " + author[0].textContent + "<br/>" + date;
		}
		
		var category = item.getElementsByTagName('category');
		var cats = "";
		for (j = 0; j < category.length; j++)
		{
			if (category[j].firstChild)
				cats += (j > 0 ? ", " : "") + category[j].firstChild.nodeValue;
			else
				cats += (j > 0 ? ", " : "") + category[j].getAttribute("term");
		}

		page[i] = ln + author + "<br/>" + (cats.length ? "Categories: "  + cats : "") + cont + "<br/><br/>";
		addList(i, title, page[i], date);
	}
}
