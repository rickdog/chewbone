/*
   append a list of domains to the page
 */
var links = jQuery('A');
var dom = [
];
var html = '';
jQuery.each(links, function (i, val) {
  if (!dom[val.hostname])
  {
    val.href = val.origin;
    val.innerHTML = val.origin;
    console.log(val);
    html += val.outerHTML + '<br/>';
    //console.log(val.outerHTML);
  }
  dom[val.hostname] = val;
});
console.log(html);
document.body.innerHTML += '<br/>=======<br/>DOMAINS<BR/>' + html;
