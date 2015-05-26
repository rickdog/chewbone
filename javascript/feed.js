




function loadFeed(xmlSrc)
{
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlSrc, "text/xml");
  var xmlElem = xmlDoc.documentElement;
  var feed = null;

  if (xmlElem.tagName == "rss")
  {
    console.log("rss2.0");

    function rssItem(item) {

      this.item = item;    // save of the feed item XML 
      this.title = getProp(item, "item > title");
      this.link = getProp(item, "item > link");
      this.comments = getProp(item, "item > comments");
      this.pubDate = getProp(item, "item > pubDate");
      this.creator = getProp(item, "item > creator");
      this.guid = getProp(item, "item > guid");
      this.description = getProp(item, "item > description");
      this.encoded = getProp(item, "item > encoded");
      this.commentRss = getProp(item, "item > commentRss");
      this.comments = getProp(item, "item > comments");
      var z = [];
      Array.slice(item.querySelectorAll("item > category")).forEach(function(t, i){z.push(t.textContent)});
      this.category = z;
      this.enclosure = item.querySelectorAll("item > enclosure");
    }

    function rssFeed(feed)
    {
      this.feed = feed;  // save of the feed XML
      this.item = [];
      this.length = 0
      for (t = feed.querySelectorAll("channel > item"), i = 0, this.length = t.length; i < t.length; i++)
        this.item.push(new rssItem(t[i]));

      this.version = feed.getAttribute("version");
      this.title = getProp(feed, "channel > title");
      this.link = getProp(feed, "channel > link");
      var z = null;
      Array.slice(feed.querySelectorAll("channel > link")).forEach(function(t, i){if (t.attributes.length==0) z=t.textContent;})
      this.homeHref = z;
      this.description = getProp(feed, "channel > description");
      this.lastBuildDate = getProp(feed, "channel > lastBuildDate");
      this.language = getProp(feed, "channel > language");
      this.updatePeriod = getProp(feed, "channel > updatePeriod");
      this.updateFrequency = getProp(feed, "channel > updateFrequency");
    }

    feed = new rssFeed(xmlElem);
  }
  else if (xmlElem.tagName == "feed")
  {
    console.log("atom");

    function atomAuthor(author)
    {
      this.author = author;
      this.name = getProp(author, "author > name");
      this.uri = getProp(author, "author > uri");
      this.email = getProp(author, "author > email");
      this.image = getAttr(author, "author > image", "src");
    }

    function atomEntry(entry)
    {
      this.entry = entry;
      this.id = getProp(entry, "entry > id");
      this.published = getProp(entry, "entry > published");
      this.updated = getProp(entry, "entry > updated");
      this.title = getProp(entry, "entry > title");
      this.content = getProp(entry, "entry > content");
      this.contentType = getAttr(entry, "entry > content", "type");
      this.link = entry.querySelectorAll("entry > link");
      this.author = new atomAuthor(entry.querySelector("entry > author"));
      this.thumbnail = getAttr(entry, "entry > thumbnail", "url");
      this.href = getAttr(entry, "entry > link[rel='alternate']", "href");
      this.replies = getAttr(entry, "entry > link[type='application/atom+xml'][rel='replies']", "href");
      this.enclosure = entry.querySelectorAll("entry > link[rel='enclosure']");
    }

    function atomFeed(feed)
    {
      this.feed = feed;
      this.entry = [];
      for (e = feed.querySelectorAll("feed > entry"), i = 0; i < e.length; i++)
        this.entry.push(new atomEntry(e[i]));
      this.href = getAttr(feed, "link[type='application/atom+xml']", "href");
      this.nextHref = getAttr(feed, "link[rel='next']", "href");
      this.id = getProp(feed, "feed > id");
      this.updated = getProp(feed, "feed > updated");
      this.title = getProp(feed, "feed > title");
      this.subtitle = getProp(feed, "feed > subtitle");
      this.link = feed.querySelectorAll("feed > link");
      this.author = new atomAuthor(feed.querySelector("feed > author"));
      this.generator = getProp(feed, "feed > generator");
      this.totalResults = getProp(feed, "feed > totalResults");
    }

    feed = new atomFeed(xmlElem);
  }

  function getProp(elem, path)
  {
    var node = elem ? elem.querySelector(path) : null;
    return node && node.textContent ? node.textContent : "";
  }

  function getAttr(elem,path,attr)
  {
    var node = elem ? elem.querySelector(path) : null;
    return node ? node.getAttribute(attr) : null;
  }
  
  return feed;
}


// do something to get feed source...

// this grabs XML source from webpage. e.g.
// view-source:view-source:http://hiphopsince1987.com/music/feed/
var xmlSrc = $("#viewsource > pre:nth-child(1)").textContent;
console.time("xml")
aFeed = loadFeed(xmlSrc);
console.timeEnd("xml")

/*
look at ripple for building reactive HTML
https://github.com/ripplejs/ripple/
https://raw.githubusercontent.com/ripplejs/ripple/master/dist/ripple.js

/////////////////

 var Avatar = ripple('<img src="http://graph.facebook.com/{{username}}/picture" />');
  var Link = ripple('<a href="http://www.facebook.com/{{username}}">{{username}}</a>');
 var Avatar2 = ripple('<img src="http://graph.facebook.com/{{username2}}/picture" />');

  
    var template = '<div class="Profile">' +
    '<profile-avatar username="{{username}}"></profile-avatar>' +
    '<profile-link username="{{username}}"></profile-link>' +
    '<profile-avatar2 username2="{{username2}}"></profile-avatar2>' +
  '</div>';

var Profile = ripple(template)  // be string template, a file containing a template, or a selctor
    .compose('profile-avatar', Avatar)
    .compose('profile-avatar2', Avatar2)
    .compose('profile-link', Link);

  var profile = new Profile({
    username: 'anthonyshort'
  });
  profile.appendTo(document.body);
   profile.set('username', 'rickdog');
   profile.set('username2', 'rickshide');

////////////////////
var ht = new Document();
var divFeed = ht.appendChild(document.createElement('DIV'));
divFeed.setAttribute('id', 'feed');
divFeed.setAttribute('class', 'feed');

divFeed.innerHTML += 'Exception: TypeError: post.documentElement is undefined';
$('body').append(divFeed.outerHTML);
ht.documentElement.outerHTML

*/
  