/*
Host: tagloom.com
User-Agent: Mozilla/5.0 (Windows NT 6.0; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
X-Requested-With: XMLHttpRequest
Referer: https://tagloom.com/_tl/contact?thankyou
Content-Length: 137
Cookie: SESSID=6b6bdk0fnsotqlkbs1jjc9i9d3; _ga=GA1.2.1646695171.1425165920; _gat=1
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache

curl "https://tagloom.com/_ajaxu/newpost" 
-H "Host: tagloom.com" 
-H "User-Agent: Mozilla/5.0 (Windows NT 6.0; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0" 
-H "Accept: */*" 
-H "Accept-Language: en-US,en;q=0.5" 
--compressed 
-H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" 
-H "X-Requested-With: XMLHttpRequest" 
-H "Referer: https://tagloom.com/_tl/contact?thankyou" 
-H "Cookie: SESSID=6b6bdk0fnsotqlkbs1jjc9i9d3; _ga=GA1.2.1646695171.1425165920; _gat=1" 
-H "Connection: keep-alive" 
-H "Pragma: no-cache" 
-H "Cache-Control: no-cache" 
&token=14077ad80144b9f2323a7ab2
&uploaded-image-tmp=
&text=sdfsdds
&url=
&enc=
&img=
&video=
&type=
&geturl=http"%"3A"%"2F"%"2Fmp3red.ru"%"2F
&title=
&desc=
  
Response Body Δ0ms
{"tag_url_prefix":"\/rickdog","posts":[{"pid":"P9hwBdI-P9hhUR5","rpid":null,"text":"sdfsdds","meta":{"ratio":0},"site":null,"type":"text","deleted":null,"user":{"uname":"rickdog","name":"rickdog","pic":"\/img\/default-pic.png"},"likes":null,"reposts":1,"comments":null,"time":"1 second","alt":"","owner":true}]}


https://tagloom.com/_ajaxu/newpost?text=xxx&geturl=https%3A%2F%2Frateyourmusic.com%2Fartist%2Fanders_jormin&desc=a+description&img=https%3A%2F%2Fthejazzbreakfast.files.wordpress.com%2F2015%2F04%2Fsame-as-you.jpg

////////////////////


<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery.post demo</title>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<form action="https://tagloom.com/_ajaxu/newpost" id="searchForm">
  <input type="text" name="text" placeholder="text">  
  <input type="text" name="geturl" placeholder="geturl">
  <input type="submit" value="Search">
</form>
<!-- the result of the search will be rendered inside this div -->
<div id="result"></div>
 
<script>
// Attach a submit handler to the form
$( "#searchForm" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    text = $form.find( "input[name='text']" ).val(),
    geturl = $form.find( "input[name='geturl']" ).val(),
    host = $form.attr( "action" );
 
  // Send the data using post
  var posting = $.post( host, { text: text, geturl: geturl, token: "14077ad80144b9f2323a7ab2" } );
 
  // Put the results in a div
  posting.done(function( data ) {
    var content = $( data ).find( "#content" );
    $( "#result" ).empty().append( content );
  });
});
</script>
 
</body>
 */

