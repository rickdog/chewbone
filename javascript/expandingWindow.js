
function expandingWindow(website) {
var windowprops='width=100,height=100,scrollbars=yes,status=yes,resizable=yes'
var heightspeed = 2; // vertical scrolling speed (higher = slower)
var widthspeed = 7;  // horizontal scrolling speed (higher = slower)
var leftdist = 10;    // distance to left edge of window
var topdist = 10;     // distance to top edge of window

if (window.resizeTo&&navigator.userAgent.indexOf("Opera")==-1) {
var winwidth = window.screen.availWidth - leftdist;
var winheight = window.screen.availHeight - topdist;
var sizer = window.open("","","left=" + leftdist + ",top=" + topdist +","+ windowprops);
for (sizeheight = 1; sizeheight < winheight; sizeheight += heightspeed)
sizer.resizeTo("1", sizeheight);
for (sizewidth = 1; sizewidth < winwidth; sizewidth += widthspeed)
sizer.resizeTo(sizewidth, sizeheight);
sizer.location = website;
}
else
window.open(website,'mywindow');
}

expandingWindow("http://google.com");