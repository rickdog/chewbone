

if (window.jQuery == undefined)
{
    var s=document.createElement('script');
    s.src='http://code.jquery.com/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(s);
}
//javascript:if (window.jQuery == undefined){var s=document.createElement('script');s.src='http://code.jquery.com/jquery.min.js';document.getElementsByTagName('head')[0].appendChild(s);}
// takes time for $ to get defined
window.setTimeout(function(){$('html > head').append($('<style>a:visited { color: red; }</style>'))},2000);


//$('html > head').append($('<style>a:visited { color: red; }</style>'));



/*
jQuery("A").each(function() { 
    jQuery(this).css({color: "red"}); 
});
*/

if (false) {{{
//jQuery(document).ready(function(){ 
    
   
  

	/* jQuery('ul#rmenu').superfish(); */
	/* jQuery('ul#rmenu').superfish().find('ul').bgIframe({opacity:false}); */
 
	/* For IE6 */
	if (false) { //jQuery.browser.msie && /MSIE 6\.0/i.test(window.navigator.userAgent) && !/MSIE 7\.0/i.test(window.navigator.userAgent) && !/MSIE 8\.0/i.test(window.navigator.userAgent)) {

		/* Max-width for images in IE6 */		
		var centerwidth = jQuery("td#middle").width(); 
		
		/* Images without caption */
		jQuery(".post img").each(function() { 
			var maxwidth = centerwidth - 10 + 'px';
			var imgwidth = jQuery(this).width(); 
			var imgheight = jQuery(this).height(); 
			var newimgheight = (centerwidth / imgwidth * imgheight) + 'px';	
			if (imgwidth > centerwidth) { 
				jQuery(this).css({width: maxwidth}); 
				jQuery(this).css({height: newimgheight}); 
			}
		});
		
		/* Images with caption */
		jQuery("div.wp-caption").each(function() { 
			var captionwidth = jQuery(this).width(); 
			var maxcaptionwidth = centerwidth + 'px';
			var captionheight = jQuery(this).height();
			var captionimgwidth =  jQuery("div.wp-caption img").width();
			var captionimgheight =  jQuery("div.wp-caption img").height();
			if (captionwidth > centerwidth) { 
				jQuery(this).css({width: maxcaptionwidth}); 
				var newcaptionheight = (centerwidth / captionwidth * captionheight) + 'px';
				var newcaptionimgheight = (centerwidth / captionimgwidth * captionimgheight) + 'px';
				jQuery(this).css({height: newcaptionheight}); 
				jQuery("div.wp-caption img").css({height: newcaptionimgheight}); 
				}
		});
		
		/* sfhover for LI:HOVER support in IE6: */
		jQuery("ul li").
			hover( function() {
					jQuery(this).addClass("sfhover")
				}, 
				function() {
					jQuery(this).removeClass("sfhover")
				} 
			); 

	/* End IE6 */
	}
	
	
	
	/* Since 3.7.8: Auto resize videos (embed and iframe elements) 
	TODO: Parse parent's dimensions only once per layout column, not per video
	*/
	function bfa_resize_video() {
		jQuery('embed, iframe').each( function() {
			var video = jQuery(this),
			videoWidth = video.attr('width'); // use the attr here, not width() or css()
			videoParent = video.parent(),
			videoParentWidth = parseFloat( videoParent.css( 'width' ) ),
			videoParentBorder = parseFloat( videoParent.css( 'border-left-width' ) ) 
										+  parseFloat( videoParent.css( 'border-right-width' ) ),
			videoParentPadding = parseFloat( videoParent.css( 'padding-left' ) ) 
										+  parseFloat( videoParent.css( 'padding-right' ) ),
			maxWidth = videoParentWidth - videoParentBorder - videoParentPadding;

			if( videoWidth > maxWidth ) {
				var videoHeight = video.attr('height'),
				videoMaxHeight = ( maxWidth / videoWidth * videoHeight );
				video.attr({ width: maxWidth, height: videoMaxHeight });
			} 

		});	
	}
	bfa_resize_video();
	jQuery(window).resize( bfa_resize_video );

		
	jQuery(".post table tr").
		mouseover(function() {
			jQuery(this).addClass("over");
		}).
		mouseout(function() {
			jQuery(this).removeClass("over");
		});

	
	jQuery(".post table tr:even").
		addClass("alt");

	
	jQuery("input.text, input.TextField, input.file, input.password, textarea").
		focus(function () {  
			jQuery(this).addClass("highlight"); 
		}).
		blur(function () { 
			jQuery(this).removeClass("highlight"); 
		})
	
	jQuery("input.inputblur").
		focus(function () {  
			jQuery(this).addClass("inputfocus"); 
		}).
		blur(function () { 
			jQuery(this).removeClass("inputfocus"); 
		})

		

	
	jQuery("input.button, input.Button, input#submit").
		mouseover(function() {
			jQuery(this).addClass("buttonhover");
		}).
		mouseout(function() {
			jQuery(this).removeClass("buttonhover");
		});

	/* toggle "you can use these xhtml tags" */
	jQuery("a.xhtmltags").
		click(function(){ 
			jQuery("div.xhtml-tags").slideToggle(300); 
		});

	/* For the Tabbed Widgets plugin: */
	jQuery("ul.tw-nav-list").
		addClass("clearfix");

		
	
//});

}}}


/*
Exception: $ is not defined
@Scratchpad:10
@Scratchpad:10
*/