/*
parse page, clear, write back
 */

var rickdogHEAD = $.parseHTML($("head").html(),false);

$("head").html("")

$.each( rickdogHEAD, function( i, el ) {
  $("head").append(el);
});


var rickdogBODY = $.parseHTML($("body").html(),true);

$("body").html("")

$.each( rickdogBODY, function( i, el ) {
  $("body").append(el);
});


// pick out feeds
var sHTML = "";
$.each($.parseHTML($("head").html(),false), function( i, el ) {
  if (el instanceof HTMLLinkElement  && el.rel == "alternate") {
    sHTML += `<a href="${el.href}" target="_blank"${el.title}</a>`;
  }
})
alert(sHTML)