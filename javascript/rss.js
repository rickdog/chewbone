rss

void(function()
{
    rssbm_subscribeFeed  = "http://feeds.feedburner.com/OficinaDeMacacos";    // RSS Subscribe Feed URL.
    rssbm_buttonImageUrl = "http://www.seocentro.com/bookmark-rss/images/rss_button01.gif";   // Button Image URL.
    rssbm_imgRightSide   = "no";  // Set this to yes if you put your image on the right side of the page and the drop down menu goes outside the window.
  
  /****
    var start = function(){alert("start")};

    var s=document.createElement('script');
    s.src = 'http://www.seocentro.com/bookmark-rss/rss.js';
    if (s.addEventListener)
    {
        s.addEventListener("load", start, false);
    } 
    else
    {
        s.onreadystatechange = function()
        {
            if (this.readyState=="complete"){
                start();
                s = null;
            }
        }
    }
    document.getElementsByTagName('head')[0].appendChild(s);}()
    *********/

var rssbm_subscribeFeed  = rssbm_subscribeFeed || "";
var rssbm_buttonImageUrl = rssbm_buttonImageUrl || "http://www.seocentro.com/bookmark-rss/images/rss_button02.gif";
var rssbm_colorText      = rssbm_colorText || "#000";
var rssbm_colorText      = rssbm_colorText || "#000";
var rssbm_colorLink      = rssbm_colorLink || "#000";
var rssbm_colorBorder    = rssbm_colorBorder || "Silver";
var rssbm_colorBgHeader  = rssbm_colorBgHeader || "#E0E0E0";
var rssbm_colorBgMenu    = rssbm_colorBgMenu || "#FFF";
var rssbm_colorBgMenuH   = rssbm_colorBgMenuH || "#F7F7F7";
var rssbm_fontFamily     = rssbm_fontFamily || "Arial, Helvetica, sans-serif";
var rssbm_openInPopup    = rssbm_openInPopup || "yes";
var rssbm_fontSizeNormal = rssbm_fontSizeNormal || "12";
var rssbm_fontSizeSmall  = rssbm_fontSizeSmall || "10";
var rssbm_bookmarkPub    = rssbm_bookmarkPub || document.domain || "unknow";
var rssbm_bookmarkUrl    = "http://www.seocentro.com/cgi-bin/promotion/bookmark-rss/rss.pl";
var rssbm_imagesUrl      = "http://www.seocentro.com/bookmark-rss/images/menu";

function changeme(id, action) {
  if (rssbm_imgRightSide == 'yes') {
    document.getElementById(id).style.right = '2px';
  }
  if (action == 'hide') {
    document.getElementById(id).style.display = 'none';
  }
  else if (action == 'show') {
    document.getElementById(id).style.display = 'block';
  }
  else if (action == 'noBg') {
    document.getElementById(id).style.background = rssbm_colorBgMenu;
  }
  else if (action == 'yesBg') {
    document.getElementById(id).style.background = (rssbm_colorBgMenuH) ? rssbm_colorBgMenuH : rssbm_colorBgMenu;
  }
  else {
    document.getElementById(id).style.display = (document.getElementById(id).style.display == 'block') ? 'none' : 'block';
  }
}

var randomID = Math.floor(Math.random()*9999999999);

document.write('<table border="0" cellspacing="0" cellpadding="0"><tr><td>');
document.write('<img src="'+rssbm_buttonImageUrl+'" alt="RSS Feed Readers" title="RSS Feed Readers" border="0" style="cursor: pointer;" onClick="changeme(\'bookmarkRssBody'+randomID+'\');" onMouseOut="changeme(\'bookmarkRssBody'+randomID+'\', \'hide\');">');
document.write('</td></tr>');
document.write('<tr><td>');
document.write('<table id="bookmarkRssBody'+randomID+'" style="position:absolute;display:none;" onMouseOver="changeme(\'bookmarkRssBody'+randomID+'\', \'show\');" onMouseOut="changeme(\'bookmarkRssBody'+randomID+'\', \'hide\');" border="0" cellspacing="0" cellpadding="1">');
document.write('<tr>');
document.write('	<td style="background: '+rssbm_colorBorder+';">');
document.write('<table border="0" cellspacing="0" cellpadding="2">');
document.write('<tr>');
document.write('	<td style="background: '+rssbm_colorBgHeader+';">&nbsp;<strong style="color: '+rssbm_colorText+'; font-size: '+rssbm_fontSizeNormal+'; font-weight: bold; font-family : '+rssbm_fontFamily+';">Subscribe to:</strong></td><td align="right" valign="top" style="background: '+rssbm_colorBgHeader+';"><span><a href="http://www.seocentro.com" style="text-decoration: none; color: '+rssbm_colorText+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><sup style="color: '+rssbm_colorText+'; font-family : '+rssbm_fontFamily+';">&copy; SeoCentro</sup></a></span></td>');
document.write('</tr>');
if (rssbm_openInPopup == 'yes') {
document.write('<tr>');
document.write('	<td id="idBG_1'+randomID+'" onMouseOver="changeme(\'idBG_1'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_1'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_subscribeFeed+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/rss_button.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">XML&nbsp;File</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_2'+randomID+'" onMouseOver="changeme(\'idBG_2'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_2'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=live&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/live.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Live</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_3'+randomID+'" onMouseOver="changeme(\'idBG_3'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_3'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=bloglines&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/bloglines.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Bloglines</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_4'+randomID+'" onMouseOver="changeme(\'idBG_4'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_4'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=google&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+';" font-family : '+rssbm_fontFamily+';><img src="'+rssbm_imagesUrl+'/google.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Google&nbsp;Reader</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_5'+randomID+'" onMouseOver="changeme(\'idBG_5'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_5'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=newsgator&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/newsgator.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">NewsGator</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_6'+randomID+'" onMouseOver="changeme(\'idBG_6'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_6'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=newsisfree&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/newsisfree.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">NewsIsFree</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_7'+randomID+'" onMouseOver="changeme(\'idBG_7'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_7'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=technorati&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/technorati.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Technorati</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_8'+randomID+'" onMouseOver="changeme(\'idBG_8'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_8'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=netvibes&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/netvibes.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Netvibes</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_9'+randomID+'" onMouseOver="changeme(\'idBG_9'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_9'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=yahoo&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/yahoo.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">My&nbsp;Yahoo</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_10'+randomID+'" onMouseOver="changeme(\'idBG_10'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_10'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=myaol&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/myaol.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">myAOL</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_11'+randomID+'" onMouseOver="changeme(\'idBG_11'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_11'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?b=pageflakes&p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/pageflakes.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Pageflakes</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_12'+randomID+'" onMouseOver="changeme(\'idBG_12'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_12'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open(\''+rssbm_bookmarkUrl+'?p=\'+c(rssbm_bookmarkPub)+\'&u=\'+c(rssbm_subscribeFeed),\'rssbookmark_popup\',\'left=\'+((a.screenX||a.screenLeft)+10)+\',top=\'+((a.screenY||a.screenTop)+10)+\',height=480px,width=720px,scrollbars=1,resizable=1,alwaysRaised=1\');a.setTimeout(function(){ d.focus()},300)})();" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/bookmarkplus.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">More...</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
} else {
document.write('<tr>');
document.write('	<td id="idBG_13'+randomID+'" onMouseOver="changeme(\'idBG_13'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_13'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_subscribeFeed+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/rss_button.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">XML&nbsp;File</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_14'+randomID+'" onMouseOver="changeme(\'idBG_14'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_14'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=live&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/live.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Live</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_15'+randomID+'" onMouseOver="changeme(\'idBG_15'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_15'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=bloglines&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/bloglines.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Bloglines</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_16'+randomID+'" onMouseOver="changeme(\'idBG_16'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_16'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=Google&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/google.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Google&nbsp;Reader</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_17'+randomID+'" onMouseOver="changeme(\'idBG_17'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_17'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=newsgator&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/newsgator.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">NewsGator</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_18'+randomID+'" onMouseOver="changeme(\'idBG_18'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_18'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=newsisfree&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/newsisfree.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">NewsIsFree</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_19'+randomID+'" onMouseOver="changeme(\'idBG_19'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_19'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=technorati&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/technorati.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Technorati</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_20'+randomID+'" onMouseOver="changeme(\'idBG_20'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_20'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=netvibes&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/netvibes.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Netvibes</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_21'+randomID+'" onMouseOver="changeme(\'idBG_21'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_21'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=yahoo&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/yahoo.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">My&nbsp;Yahoo</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_22'+randomID+'" onMouseOver="changeme(\'idBG_22'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_22'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=aol&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/myaol.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">myAOL</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
document.write('<tr>');
document.write('	<td id="idBG_23'+randomID+'" onMouseOver="changeme(\'idBG_23'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_23'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?b=pageflakes&p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/pageflakes.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">Pageflakes</sup></a>&nbsp;&nbsp;</td>');
document.write('	<td id="idBG_24'+randomID+'" onMouseOver="changeme(\'idBG_24'+randomID+'\', \'yesBg\');" onMouseOut="changeme(\'idBG_24'+randomID+'\', \'noBg\');" style="background: '+rssbm_colorBgMenu+';">&nbsp;<a href="'+rssbm_bookmarkUrl+'?p='+encodeURIComponent(rssbm_bookmarkPub)+'&u='+encodeURIComponent(rssbm_subscribeFeed)+'" style="text-decoration: none; color: '+rssbm_colorLink+'; font-size: '+rssbm_fontSizeNormal+'; font-family : '+rssbm_fontFamily+';"><img src="'+rssbm_imagesUrl+'/bookmarkplus.gif" alt="" width="16" height="16" border="0">&nbsp;<sup style="color: '+rssbm_colorLink+'; font-family : '+rssbm_fontFamily+';">More...</sup></a>&nbsp;&nbsp;</td>');
document.write('</tr>');
}
document.write('<tr>');
document.write('	<td colspan="2" style="background: '+rssbm_colorBgMenu+';"><small style="color: '+rssbm_colorText+'; font-size: '+rssbm_fontSizeSmall+'; font-family : '+rssbm_fontFamily+';">Get your <a href="http://www.seocentro.com/tools/remotely/rss-subscribe-button.html" style="text-decoration: underline; color: '+rssbm_colorText+'; font-size: '+rssbm_fontSizeSmall+'; font-family : '+rssbm_fontFamily+';">rss subscribe buttons</a>!</small></td>');
document.write('</tr>');
document.write('</table>');
document.write('	</td>');
document.write('</tr>');
document.write('</table>');
document.write('</td></tr></table>');
}
)();



