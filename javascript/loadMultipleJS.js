/*
demo, neat solution for waiting for multiple javascripts to load
 */

var urls = [
  'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js',
  'https://api.jquery.com/jquery-wp-content/themes/jquery/js/plugins.js',
  'https://api.jquery.com/jquery-wp-content/themes/jquery/js/main.js'
];

// map urls to getScript calls, and pass them to $.when
$.when.apply($, $.map(urls, $.getScript)).done(function() {
  alert("done")
}).fail(function(){alert("fail")});

// how to load CSS with jQuery
$("<link>", {
  href: 'http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css',
  rel: 'stylesheet'
}).appendTo("head");

