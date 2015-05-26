
    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed("http://www.inoreader.com/stream/user/1005952996/tag/_ECLECTIC");
      feed.load(function(result) {
        if (!result.error) {
          var container = $("BODY");
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(entry.title));
            container.append(div);
          }
        }
      });
    }
    google.setOnLoadCallback(initialize);

