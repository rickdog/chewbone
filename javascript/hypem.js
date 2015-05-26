// hypem - append blogs URL and domain to "posted x hrs ago" link
$(".readpost").map(function(i,v) {
  v.textContent += v.href;
  var str = v.href.split('/');
  var url = str[0] + "//" + str[2];
  $(v.parentElement).append("&nbsp;&nbsp;&nbsp;&nbsp;<b><a href='" + url + "'>" + url + "/></b>");
});
