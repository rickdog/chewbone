/*
name: sp-player
$Rev: 63251 $
$Date: 2012-10-12 11:12:23 -0400 (Fri, 12 Oct 2012) $
author: Dan Kantor
*/
///////////////////////////////////////////////////////////////
//////////////////////////////////////API//////////////////////////////
/*

//////////////////////////////////////////////////////////////////////////*/
if (typeof(SPAPI) == 'undefined'){
	SPAPI = {}
}
SPAPI.QueueNumber = 0;
SPAPI.TotalNumber = 0;
SPAPI.CurrentSong = {};
SPAPI.State = 0;
SPAPI.Listeners = {
	'onSongChange' : [],
	'onStateChange' : [],
	'onQueueChange' : [],
	'onInit' : [],
	'onStart' : [],
	'onQueueEnd' : []
};
SPAPI.Events = {
	onSongChange : function(e){
		SPAPI.State = 1;
		var currentSongVO = streampadPlayer.Playlist.array[streampadPlayer.vars.queueNumber];
		SPAPI.CurrentSong.songTitle = currentSongVO.songTitle;
		SPAPI.CurrentSong.artist = currentSongVO.artist;
		SPAPI.CurrentSong.album = currentSongVO.album;
		SPAPI.CurrentSong.sourceUrl = currentSongVO.sourceUrl;
		SPAPI.CurrentSong.imageUrl = currentSongVO.imageUrl;
		SPAPI.CurrentSong.queue = streampadPlayer.vars.queueNumber;
		SPAPI.CurrentSong.total = streampadPlayer.Playlist.array.length;
		SPAPI.fireEvent('onSongChange', SPAPI.CurrentSong);
	},
	onStateChange : function(e){
		if (streampadPlayer.vars.isPlaying == true){
			SPAPI.State = 1;
		} else {
			SPAPI.State = 0;
		}
		SPAPI.fireEvent('onStateChange', SPAPI.State);
	},
	onQueueChange : function(e){
		var length = streampadPlayer.Playlist.array.length;
		SPAPI.fireEvent('onQueueChange', length);
	},
	onInit : function(e){
		SPAPI.fireEvent('onInit', null);
	},
	onStart : function(e){
		SPAPI.fireEvent('onStart', null);
	},
	onQueueEnd : function(e){
		SPAPI.fireEvent('onQueueEnd', null);
	}
}
SPAPI.fireEvent = function(type, object){
	if (typeof this.Listeners[type] != 'undefined' && this.Listeners[type].length) {
		var newArray = this.Listeners[type].slice();
    	for (var i = 0, l; l = newArray[i]; i++) {
    		l(object);
   		 }
    	return true;           
	}
    return false;
}
SPAPI.addEventListener = function(type, fn){
	switch(type){
		case 'onSongChange' : 
			var len = this.Listeners[type].length;
			this.Listeners[type].push(fn);
		break;
		case 'onStateChange' : 
			var len = this.Listeners[type].length;
			this.Listeners[type].push(fn);
		break; 
		case 'onQueueChange' : 
			var len = this.Listeners[type].length;
			this.Listeners[type].push(fn);
		break;
		case 'onInit' : 
			var len = this.Listeners[type].length;
			this.Listeners[type].push(fn);
		break;
		case 'onStart' : 
			var len = this.Listeners[type].length;
			this.Listeners[type].push(fn);
		break;
		case 'onQueueEnd' : 
			var len = this.Listeners[type].length;
			this.Listeners[type].push(fn);
		break;
		default : 
		break;
	}
}
SPAPI.removeEventListener = function(type, fn){
	if (typeof this.Listeners[type] != 'undefined') {
		for (var i = 0, l; l = this.Listeners[type][i]; i++) {
	    	if (l == fn) break;
	    }
	this.Listeners[type].splice(i, 1);
	}
}
SPAPI.play = function(){
	if (streampadPlayer.vars.isPlaying == false){
		streampadPlayer.vars.isPlaying = true;
		streampadPlayer.UI.showPause();
		if (streampadPlayer.vars.isWinamp){
			window.external.Transport.Play();
		} else {
			streampadPlayer.flash.getSWF("streampadFlash").unPause();
		}
		streampadPlayer.Event.fire(window, 'play', null);
	}
}
SPAPI.pause = function(){
	if (streampadPlayer.vars.isPlaying == true){
		streampadPlayer.vars.isPlaying = false;
		streampadPlayer.UI.showPlay();
		if (streampadPlayer.vars.isWinamp){
			window.external.Transport.Pause();
		} else {
			streampadPlayer.flash.getSWF("streampadFlash").pause();
		}
		streampadPlayer.Event.fire(window, 'pause', null);
	}
}
SPAPI.next = function(){
	streampadPlayer.Events.nextTrack();
}
SPAPI.previous = function(){
	streampadPlayer.Events.previousTrack();
}
SPAPI.skip = function(n){
	if (n <= 0){
		n = 0;
	}
	if (n > streampadPlayer.Playlist.array.length - 1){
		n = streampadPlayer.Playlist.array.length - 1;
	}
	streampadPlayer.vars.queueNumber = n;
	streampadPlayer.Play.queueNumber(streampadPlayer.vars.queueNumber);
}
SPAPI.state = function(n){
	return SPAPI.State;
}
SPAPI.add = function(songTitle, artist, album, enclosure, sourceUrl, imageUrl, share){
	if (enclosure != null){
		var songVO = new streampadPlayer.SongVO();
		songVO.songTitle = songTitle;
		songVO.artist = artist;
		songVO.album = album;
		songVO.enclosure = enclosure;
		songVO.sourceUrl = sourceUrl;
		songVO.imageUrl = imageUrl;
		songVO.text = '';
		if (share == false){
			songVO.getMeta = false;
			songVO.shareEnclosure = false;
		}
		if (songTitle != null){
			songVO.text = songTitle;
			if (artist != null){
				songVO.text = songTitle+' by '+artist;
			}
		}
		streampadPlayer.Playlist.push(songVO);
	}
}
SPAPI.queue = function(n){
	if (n != null){
		if (n <= 0){
			n = 0;
		}
		if (n > streampadPlayer.Playlist.array.length - 1){
			n = streampadPlayer.Playlist.array.length - 1;
		}
		streampadPlayer.vars.queueNumber = n;
		SPAPI.QueueNumber = streampadPlayer.vars.queueNumber;
		if (streampadPlayer.vars.isWinamp){
			window.external.PlayQueue.cursor = streampadPlayer.vars.queueNumber;
		}
	} else {
		SPAPI.QueueNumber = streampadPlayer.vars.queueNumber;
		return SPAPI.QueueNumber;
	}
}
SPAPI.total = function(){
	SPAPI.TotalNumber = streampadPlayer.Playlist.array.length;
	return SPAPI.TotalNumber;
}
SPAPI.song = function(){
	var currentSongVO = streampadPlayer.Playlist.array[streampadPlayer.vars.queueNumber];
	SPAPI.CurrentSong.songTitle = currentSongVO.songTitle;
	SPAPI.CurrentSong.artist = currentSongVO.artist;
	SPAPI.CurrentSong.album = currentSongVO.album;
	SPAPI.CurrentSong.sourceUrl = currentSongVO.sourceUrl;
	SPAPI.CurrentSong.imageUrl = currentSongVO.imageUrl;
	return SPAPI.CurrentSong;
}
SPAPI.start = function(){
	if (streampadPlayer.vars.init == true && streampadPlayer.vars.built == false){
		streampadPlayer.UI.build();
	}
}
SPAPI.clear = function(){
	streampadPlayer.Playlist.array = [];
	if (streampadPlayer.vars.isWinamp){
		window.external.PlayQueue.ClearQueue();
		window.external.Transport.Stop();
	}
	streampadPlayer.Playlist.onChange();
}
SPAPI.hide = function(){
	var bottomBar = document.getElementById('streampadBottomBar');
	bottomBar.style.opacity = 0;
	bottomBar.style.height = '1px';
	bottomBar.style.width = '1px';
	if (streampadPlayer.browser.engine.trident4){
		bottomBar.style.filter = "alpha(opacity=0)";
	}
	streampadPlayer.params.visible = 'false';
}
SPAPI.show = function(){
	var bottomBar = document.getElementById('streampadBottomBar');
	bottomBar.style.opacity = 1;
	streampadPlayer.params.height = 30;
	bottomBar.style.height = streampadPlayer.params.height+'px';
	bottomBar.style.width = '100%';
	if (streampadPlayer.browser.engine.trident4){
		bottomBar.style.filter = "alpha(opacity=100)";
	}
	streampadPlayer.params.visible = 'true';
	streampadPlayer.UI.resize();
}
SPAPI.visible = function(){
	if (streampadPlayer.params.visible == 'false'){
		return false;
	} else {
		return true;
	}
}
//////////////////////////////////////END API//////////////////////////////
/*

//////////////////////////////////////////////////////////////////////////*/
//////////////////////////////////////////////////////////////////////////////////////
if (typeof(streampadPlayer) == 'undefined'){
	streampadPlayer = {}
}
streampadPlayer.vars = {
	queueNumber : 0,
	isPlaying : false,
	init : false,
	built : false,
	posts : [],
	total : 0,
	poweredBy : 'STREAMPAD',
	poweredByLink : 'http://www.streampad.com/?ncid=edlinkusmusi00000001',
	imgHOST : 'http://o.aolcdn.com/art/sp/',
	playImgPos : '-42px -1px',
	playImgPosOver : '-42px -27px',
	pauseImgPos : '-68px -1px',
	pauseImgPosOver : '-68px -27px',
	prevImgPos : '0 -4px',
	prevImgPosOver : '0 -30px',
	nextImgPos : '-22px -4px',
	nextImgPosOver : '-22px -30px',
	currentSongVO : null,
	fontSize : 12,
	oldPlaylistItem : null,
	isFlashLoaded : false,
	getAudioMeta : true,
	popWindow : location.pathname,
	playlistType : '',
	volumeMouseOn : false,
	volumeButtonMouseOverTimeout : null,
	volumeY : 100,
	volumeDraggerY : 55,
	theVolume : 1,
	marginOffsetLeft : 0,
	isWinamp : false,
	playlistDrawerShowing : false,
	profileDrawerShowing : false,
	sn : null,
	profileDrawerCategory : 'history',
	clientLogin : true,
	siteId : 'Aol_Music_Channel',
	profileHeaderSelected : null,
	flashUID : null,
	oldPlayButton : null,
	lastfmpopup : null,
	lastfmpopupcheck : null,
	usCanada : false
};
streampadPlayer.params = {
	height : 30,
	width : '100%',
	showdrawer : false,
	nowplayingurl : 'http://music.aol.com/api/nowplaying/',
	metaurl : 'http://music.aol.com/api/audio/query',
	swfurl : 'http://o.aolcdn.com/art/_media/sp/BottomBar.swf',
	chartsurl : 'http://music.aol.com/api/charts/',
	aimurl : 'http://api.oscar.aol.com/',
	poweredbycolor : 'A0ABD8',
	visible : 'true',
	btnsprite : 'http://o.aolcdn.com/art/sp/',
	bgimg : 'o.aolcdn.com/art/ch_music2/sp-spinner-bottombar-bg',
	bgcolor : '',
	trackcolor : 'FFFFFF',
	clicktext : '',
	clickimg : 'false',
	autoplay : 'false',
	showpop : 'true',
	progressfrontcolor : 'CCCCCC',
	progressbackcolor : 'FFFFFF',
	showplaylistbutton : 'true',
	showplaylist : 'false',
	drawersize : '215',
	showvolumebutton : 'true',
	btncolor : 'white-gray',
	lswf : 'http://o.aolcdn.com/art/_media/sp/LoginForm.swf',
	fsswf : 'http://o.aolcdn.com/art/_media/sp/full_screen.swf',
	fsxml : 'http://o.aolcdn.com/art/_media/sp/fs_settings.xml',
	debug : 'false',
	popup : 'false',
	globalcheck : 'false'
};
streampadPlayer.Theme = {
	prevOn : '-209px 9px',
	prevOff : '5px 9px',
	playOn : '-227px 9px',
	playOff : '-13px 9px',
	nextOn : '-247px 9px',
	nextOff : '-33px 9px',
	pauseOn : '-266px 9px',
	pauseOff : '-52px 9px',
	volumeOn : '-285px 8px',
	volumeOff : '-71px 8px',
	profileOn : '-309px 8px',
	profileOff : '-95px 8px',
	playlistOn : '-332px 8px',
	playlistOff : '-118px 8px',
	popoutOn : '-356px 8px',
	popoutOff : '-142px 8px',
	loggedInOn : 4,
	loggedInOff : 4,
	borderOn : 4,
	borderOff : 4,
	volumeBack : '12px -70px',
	volumeDrag : '0 -215px',
	closeOn : '-28px -235px',
	closeOff : '0 -235px',
	borderOff : '-31px -24px',
	borderOn : '0 -24px',
	borderRight : false,
	borderNum : 0,
	signInIcon : '-10px -255px',
	viewProfileOff : '-10px -180px',
	viewProfileOn : '-97px -180px',
	logoutOff : '-10px -208px',
	logoutOn : '-78px -208px',
	itunesOff : '-10px -123px',
	itunesOn : '-144px -123px',
	amazonOff : '-10px -151px',
	amazonOn : '-114px -151px',
	loginOff : '-10px -67px',
	loginOn : '-66px -67px',
	signUpOff : '-10px -95px',
	signUpOn : '-77px -95px'
}
////////////////////////////////////////////////////
/* called on domready. gets params from script tag url and initializes UI */
streampadPlayer.init = function(){
	if (!streampadPlayer.vars.init){
		streampadPlayer.vars.init = true;
		streampadPlayer.vars.siteId = location.protocol+'//'+location.host;
		var scripts = document.getElementsByTagName('SCRIPT');
		for(i=0; i<scripts.length; i++){
			var src = scripts[i].getAttribute('src');
			try {
				if (src.indexOf('sp-player.js') != -1 || src.indexOf('streampad-tumblr.js') != -1){
					var splits = src.split("?");
					var paramString = splits[1];
					streampadPlayer.Events.setParams(paramString);
				}
			} catch(e){}
		}
		var hashParams = location.hash;
		hashParams = hashParams.substring(1);
		streampadPlayer.Events.setParams(hashParams);
		if (streampadPlayer.params.queuenumber) {
			streampadPlayer.vars.queueNumber = parseInt(streampadPlayer.params.queuenumber)-1;
		}
		if (streampadPlayer.params.drawersize == 'full'){
			streampadPlayer.params.drawersize = streampadPlayer.Utils.getBodyHeight() - streampadPlayer.params.height;
		} else {
			if (streampadPlayer.params.drawersize.indexOf('px') != -1){
				streampadPlayer.params.drawersize = streampadPlayer.params.drawersize.slice(0, streampadPlayer.params.drawersize.length-2);
			}
		}
		if (streampadPlayer.params.progressfrontcolor.indexOf('#') != -1){
			streampadPlayer.params.progressfrontcolor = streampadPlayer.params.progressfrontcolor.slice(streampadPlayer.params.progressfrontcolor.indexOf('#'), streampadPlayer.params.progressfrontcolor.indexOf('#')+1);
		}
		if (streampadPlayer.params.progressbackcolor.indexOf('#') != -1){
			streampadPlayer.params.progressbackcolor = streampadPlayer.params.progressbackcolor.slice(streampadPlayer.params.progressbackcolor.indexOf('#'), streampadPlayer.params.progressbackcolor.indexOf('#')+1);
		}
		//if (streampadPlayer.params.visible == 'true'){
			setInterval(streampadPlayer.Utils.scriptClean, 20000);
			streampadPlayer.UI.init();
		//}
	}
};
/* all Events - clicks, remote, etc */
streampadPlayer.Events = {
	/* called when user clicks or when song is finished */
	nextTrack : function(){
		if (streampadPlayer.vars.queueNumber < streampadPlayer.Playlist.array.length-1){
			streampadPlayer.vars.queueNumber++;
			streampadPlayer.Play.queueNumber(streampadPlayer.vars.queueNumber);
		} else {
			streampadPlayer.Event.fire(window, 'handleMore', null);
		}
	},
	/* called when user clicks */
	previousTrack : function(){
		if (streampadPlayer.vars.queueNumber > 0){
			streampadPlayer.vars.queueNumber--;
			streampadPlayer.Play.queueNumber(streampadPlayer.vars.queueNumber);
		} else {
			streampadPlayer.Event.fire(window, 'handleLess', null);
		}
	},
	/* called when user clicks play/pause */
	playTrack : function(){
		if (streampadPlayer.vars.isPlaying) {
            streampadPlayer.vars.isPlaying = false;
            streampadPlayer.UI.showPlay();
            if (streampadPlayer.vars.isWinamp){
            	window.external.Transport.Pause();
            } else {
            	streampadPlayer.flash.getSWF("streampadFlash").pause();
            }
            streampadPlayer.Event.fire(window, 'pause', null);
        } else {
            streampadPlayer.vars.isPlaying = true;
            streampadPlayer.UI.showPause();
            if (streampadPlayer.vars.isWinamp) {
            	window.external.Transport.Play();
            } else {
            	streampadPlayer.flash.getSWF("streampadFlash").unPause();
            }
            streampadPlayer.Event.fire(window, 'play', null);
        }
    },
    playTrackMouseOver : function(){
    	var streampadPlayTrack = document.getElementById('streampadPlayTrack');
    	if (streampadPlayer.vars.isPlaying) {
    		streampadPlayTrack.style.backgroundPosition = streampadPlayer.Theme.pauseOn;
    	} else {
    		streampadPlayTrack.style.backgroundPosition = streampadPlayer.Theme.playOn;
    	}
    },
     playTrackMouseOut : function(){
     	var streampadPlayTrack = document.getElementById('streampadPlayTrack');
    	if (streampadPlayer.vars.isPlaying) {
    		streampadPlayTrack.style.backgroundPosition = streampadPlayer.Theme.pauseOff;
    	} else {
    		streampadPlayTrack.style.backgroundPosition = streampadPlayer.Theme.playOff;
    	}
    },
    /* method for Flash to log */
	flash : function(obj){
		streampadPlayer.Debug(obj);
	},
	/* hack for ie6 to scroll since its broken on position:fixed */
	scrollHandler : function(){ 
		if (streampadPlayer.browser.engine.trident4 && streampadPlayer.params.visible != 'false'){
			var bottomBar = document.getElementById('streampadBottomBar');
			var scrollT;
			if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    			scrollT = document.body.scrollTop;
  			} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
   				scrollT = document.documentElement.scrollTop;
  			}
			var height = streampadPlayer.Utils.getBodyHeight();
			if (!scrollT){
				scrollT = 0;
			}
			try {
				bottomBar.style.top = scrollT+height-streampadPlayer.params.height;
			} catch(e){}
			var bodyWidth = streampadPlayer.Utils.getBodyWidth();
			var bottomBarWidth = bottomBar.clientWidth;
			if (bottomBarWidth != bodyWidth && streampadPlayer.Utils.getWidthMarginSize() != 0){
				bottomBar.style.left = '-' + streampadPlayer.Utils.getWidthMarginSize() + 'px';
				bottomBar.style.width = bodyWidth+'px';
				streampadPlayer.vars.marginOffsetLeft = streampadPlayer.Utils.getX(bottomBar);
			}
			if (streampadPlayer.vars.marginOffsetLeft < 0){
				bottomBar.style.left = '0';
			}
			if (streampadPlayer.params.showdrawer){
				var drawer = document.getElementById('streampadDrawer');
				try {
					drawer.style.top = scrollT+height-streampadPlayer.params.height-streampadPlayer.params.drawersize;
					if (streampadPlayer.vars.marginOffsetLeft < 0){
						drawer.style.left = '0';
					} else {
						drawer.style.left = '-' + streampadPlayer.Utils.getWidthMarginSize() + 'px';
					}
					drawer.style.width = bodyWidth+'px';
				} catch(e){}
			}
			if (streampadPlayer.vars.volumeMouseOn == true){
				try {
					var volDiv = document.getElementById('streampadVolDiv');
					volDiv.style.top = scrollT+height-streampadPlayer.params.height-130;
				} catch(e){}
			}
		}
	},
	/* called when user clicks 'powered by STREAMPAD' */
	poweredByClick : function(e){
		streampadPlayer.Event.stop(e);	
	},
	/* called when song is half way done */
	setPlay : function(){
		streampadPlayer.Charts.setPlayData.request();
	},
	/* pop a new window to current location, passing in autoplay=true and current queuenumber */
	popnew : function(e){
		streampadPlayer.Event.stop(e);
		streampadPlayer.vars.isPlaying = false;
		try {
			streampadPlayer.UI.showPlay();
			streampadPlayer.flash.getSWF("streampadFlash").pause();
		} catch(e){};
		window.open(streampadPlayer.vars.popWindow+'#showplaylist=true&showplaylistbutton=true&autoplay=true&showpop=false&popup=true&queuenumber='+(streampadPlayer.vars.queueNumber+1), 'streampadpopup','resizable=yes,scrollbars=no,toolbar=no,width=800,height=246');
	},
	popnewMouseOver : function(){
		var popnew = document.getElementById('streampadPopNew');
		popnew.style.backgroundPosition = streampadPlayer.Theme.popoutOn;
	},
	popnewMouseOut : function(){
		var popnew = document.getElementById('streampadPopNew');
		popnew.style.backgroundPosition = streampadPlayer.Theme.popoutOff;
	},
	/* called when user clicks on progress bar (from flash) */
	seek : function(){
		streampadPlayer.vars.isPlaying = true;
		streampadPlayer.UI.showPause();
	},
	setParams : function(string){
		var params = string.split("&");
		for (j=0; j<params.length; j++){
			var param = params[j].split("=");
			streampadPlayer.params[param[0]] = param[1];
		}
	},
	playlistButtonMouseOver : function(){
		var playlistButton = document.getElementById('streampadPlaylistButton');
		playlistButton.style.backgroundPosition = streampadPlayer.Theme.playlistOn;
	},
	playlistButtonMouseOut : function(){
		var playlistButton = document.getElementById('streampadPlaylistButton');
		if (streampadPlayer.vars.playlistDrawerShowing){
			playlistButton.style.backgroundPosition = streampadPlayer.Theme.playlistOn;
		} else {
			playlistButton.style.backgroundPosition = streampadPlayer.Theme.playlistOff;
		}
	},
	playlistButtonClick : function(obj){
		streampadPlayer.Event.remove(window, 'playlistChange', streampadPlayer.Events.playlistButtonClick);
		var playlistButton = document.getElementById('streampadPlaylistButton');
		if (streampadPlayer.vars.playlistDrawerShowing){
			streampadPlayer.UI.destroyDrawer();
			streampadPlayer.Event.remove(window, 'setCurrent', streampadPlayer.UI.fillPlaylistDrawer);
			streampadPlayer.Event.remove(window, 'playlistChange', streampadPlayer.UI.fillPlaylistItems);
		} else {
			streampadPlayer.UI.destroyDrawer();
			playlistButton.style.backgroundPosition = streampadPlayer.Theme.playlistOn;
			var borderNum = playlistButton.getAttribute('bordernum');
			streampadPlayer.UI.buttonBorder(borderNum, 'borderOn');
			playlistButton.setAttribute('title', 'Close Playlist');
			streampadPlayer.UI.createPlaylistDrawer();
			streampadPlayer.vars.playlistDrawerShowing = true;
			streampadPlayer.UI.fillPlaylistDrawer();
			streampadPlayer.Event.add(window, 'setCurrent', streampadPlayer.UI.fillPlaylistDrawer);
			streampadPlayer.Event.add(window, 'playlistChange', streampadPlayer.UI.fillPlaylistItems);
		}
	},
	gotPlaylistMeta : function(){
		streampadPlayer.Event.remove(window, 'playlistChange', streampadPlayer.Events.gotPlaylistMeta);
		if (streampadPlayer.vars.playlistDrawerShowing){
		
		}
	},
	playlistDrawerClosed : function(){
		var playlistButton = document.getElementById('streampadPlaylistButton');
		playlistButton.style.backgroundPosition = streampadPlayer.Theme.playlistOff;
		var borderNum = playlistButton.getAttribute('bordernum');
		streampadPlayer.UI.buttonBorder(borderNum, 'borderOff');
		playlistButton.setAttribute('title', 'Open Playlist');
		streampadPlayer.vars.playlistDrawerShowing = false;
		streampadPlayer.Event.remove(window, 'setCurrent', streampadPlayer.UI.fillPlaylistDrawer);
		streampadPlayer.Event.remove(window, 'playlistChange', streampadPlayer.UI.fillPlaylistItems);
	},
	playlistItemClick : function(e){
		e = e||window.event
		var target = e.currentTarget||e.srcElement;
		streampadPlayer.Play.queueNumber(parseInt(target.getAttribute('num')));
	},
	id3 : function(id3Object){
	},
	playlistItemMore : function(e){
		e = e||window.event
		var target = e.currentTarget||e.srcElement;
		target.innerHTML = "Load 20 more songs...  <img src='"+streampadPlayer.vars.imgHOST+"'loader-16-7A7A8A' style='textAlign=middle'  />";
	},
	volumeButtonMouseOver : function(e){
		streampadPlayer.vars.volumeMouseOn = true;
		try {
			var volDiv = document.getElementById('streampadVolDiv');
			volDiv.setAttribute('foo', 'bar');
		} catch (e){
			streampadPlayer.UI.showVolume();
		}
	},
	volumeDragDown : function(e){
		streampadPlayer.Event.add(document, 'mousemove', streampadPlayer.Events.volumeDragMove);
		streampadPlayer.Event.add(document, 'mouseup', streampadPlayer.Events.volumeDragUp);
		e.preventDefault();
	},
	volumeDragUp : function(){
		streampadPlayer.Event.remove(document, 'mousemove', streampadPlayer.Events.volumeDragMove);
		streampadPlayer.Event.remove(document, 'mouseup', streampadPlayer.Events.volumeDragUp);
	},
	volumeDragMove : function(e){
		try {
			var volDragger = document.getElementById('streampadVolumeDragger');
			streampadPlayer.vars.volumeDraggerY = e.clientY - streampadPlayer.vars.volumeY + 130;
			if (streampadPlayer.vars.volumeDraggerY > 103){
				streampadPlayer.vars.volumeDraggerY = 103;			
			}
			if (streampadPlayer.vars.volumeDraggerY < 12){
				streampadPlayer.vars.volumeDraggerY = 12;
			}
			volDragger.style.top =  streampadPlayer.vars.volumeDraggerY+'px';
			streampadPlayer.vars.theVolume = ((streampadPlayer.vars.volumeDraggerY*-1)+103);
			streampadPlayer.flash.getSWF("streampadFlash").setVolume(streampadPlayer.vars.theVolume/100);
		} catch (e){}
	},
	volumeButtonMouseOut : function(e){
		streampadPlayer.vars.volumeMouseOn = false;
		streampadPlayer.vars.volumeButtonMouseOverTimeout = setTimeout(streampadPlayer.Events.volumeButtonMouseOutDelay, 1000);
	},
	volumeButtonMouseOutDelay : function(){
		if (streampadPlayer.vars.volumeMouseOn == false){
			try {
				var volDiv = document.getElementById('streampadVolDiv');
				document.body.removeChild(volDiv);
			} catch (e){}
			var volumeButton = document.getElementById('streampadVolumeButton');
			volumeButton.style.backgroundPosition = streampadPlayer.Theme.volumeOff;
		}
	},
	winampTransport : function(event){
		switch (event.event) {
			case 'OnPlay' : 
				try {
					streampadPlayer.UI.showPause();
					streampadPlayer.vars.isPlaying = true;
					streampadPlayer.vars.queueNumber = window.external.PlayQueue.cursor;
					streampadPlayer.vars.currentSongVO = streampadPlayer.Playlist.array[streampadPlayer.vars.queueNumber];
					streampadPlayer.UI.setCurrent(streampadPlayer.Playlist.array[streampadPlayer.vars.queueNumber]);
					streampadPlayer.Event.fire(window, 'setCurrent', streampadPlayer.vars.queueNumber);
					streampadPlayer.Event.fire(window, 'play', null);
				} catch (e) {}
			break;
			case 'OnPause' : 
				try {
					if (event.paused == true){
						streampadPlayer.vars.isPlaying = false;
						streampadPlayer.UI.showPlay();
						streampadPlayer.Event.fire(window, 'pause', null);
					}
					if (event.paused == false){
						streampadPlayer.vars.isPlaying = true;
						streampadPlayer.UI.showPause();
						streampadPlayer.Event.fire(window, 'play', null);
					}
				} catch (e) {}
			break;
			default :
			break;
		}
	},
	profileButtonMouseOver : function(){
		var profileButton = document.getElementById('streampadProfileButton');
		profileButton.style.backgroundPosition = streampadPlayer.Theme.profileOn;
	},
	profileButtonMouseOut : function(){
		var profileButton = document.getElementById('streampadProfileButton');
		if (streampadPlayer.vars.profileDrawerShowing){
			profileButton.style.backgroundPosition = streampadPlayer.Theme.profileOn;
		} else {
			profileButton.style.backgroundPosition = streampadPlayer.Theme.profileOff;
		}
	},
	profileButtonClick : function(){
		var profileButton = document.getElementById('streampadProfileButton');
		if (streampadPlayer.vars.profileDrawerShowing){
			streampadPlayer.UI.destroyDrawer();
			//streampadPlayer.Event.remove(window, 'setCurrent', streampadPlayer.UI.fillProfileDrawerLeft);
		} else {
			streampadPlayer.UI.destroyDrawer();
			//streampadPlayer.Event.add(window, 'setCurrent', streampadPlayer.UI.fillProfileDrawerLeft);
			profileButton.style.backgroundPosition = streampadPlayer.Theme.profileOn;
			var borderNum = profileButton.getAttribute('bordernum');
			streampadPlayer.UI.buttonBorder(borderNum, 'borderOn');
			profileButton.setAttribute('title', 'Close Profile');
			streampadPlayer.UI.createProfileDrawer();
			streampadPlayer.vars.profileDrawerShowing = true;
		}
	},
	profileDrawerClosed : function(){
		var profileButton = document.getElementById('streampadProfileButton');
		profileButton.style.backgroundPosition = streampadPlayer.Theme.profileOff;
		var borderNum = profileButton.getAttribute('bordernum');
		streampadPlayer.UI.buttonBorder(borderNum, 'borderOff');
		profileButton.setAttribute('title', 'Open Profile');
		streampadPlayer.vars.profileDrawerShowing = false;
	},
	loginSubmit : function(){
		setTimeout(streampadPlayer.Events.loginSubmitDelay, 200);
	},
	loginSubmitDelay : function(){
		document.getElementById('streampadPlayerLoginLoader').style.display = 'block';
		streampadPlayer.flash.getSWF("streampadForm").submit();
	},
	loginBack : function(statusCode, loginId){
		document.getElementById('streampadPlayerLoginLoader').style.display = 'none';
		if (statusCode == 200){
			streampadPlayer.flash.getSWF("streampadFlash").checkt();
			streampadPlayer.vars.sn = loginId;
			streampadPlayer.UI.setLoggedIn();
			streampadPlayer.UI.fillProfileDrawer();
		} else {
			alert("There was problem logging in. Please try again");
		}
		streampadPlayer.Event.fire(window, 'oaLogin', statusCode);
	},
	oaLogout : {
		request : function(){
			document.getElementById('streampadPlayerLoginLoader').style.display = 'block';
			streampadPlayer.flash.getSWF("streampadFlash").oaLogout('streampadPlayer.Events.oaLogout.response');
			
		},
		response : function(statusCode){
			document.getElementById('streampadPlayerLoginLoader').style.display = 'none';
			streampadPlayer.vars.sn = null;
			streampadPlayer.Theme.profileOff = '-309px 8px';
			streampadPlayer.Theme.profileOn = '-95px 8px';
			document.getElementById('streampadProfileButton').style.backgroundPosition = streampadPlayer.Theme.profileOff;
			streampadPlayer.UI.createAOLSignin();
			streampadPlayer.UI.fillProfileDrawer();
		}
	},
	drawerDragDown : function(e){
		streampadPlayer.Event.add(document, 'mousemove', streampadPlayer.Events.drawerDragMove);
		streampadPlayer.Event.add(document, 'mouseup', streampadPlayer.Events.drawerDragUp);
		e.preventDefault();
	},
	drawerDragUp : function(){
		streampadPlayer.Event.remove(document, 'mousemove', streampadPlayer.Events.drawerDragMove);
		streampadPlayer.Event.remove(document, 'mouseup', streampadPlayer.Events.drawerDragUp);
		streampadPlayer.flash.getSWF("streampadFlash").setDrawerSize(streampadPlayer.params.drawersize);
	},
	drawerDragMove : function(e){
		try {
			if (e.clientY > 100){
				streampadPlayer.params.drawersize  = (streampadPlayer.Utils.getBodyHeight() - e.clientY);
				if (streampadPlayer.params.drawersize < 100) {
					streampadPlayer.params.drawersize = 100;
				}
				var drawer = document.getElementById('streampadDrawer');
				drawer.style.height = streampadPlayer.params.drawersize+'px';
				var right = document.getElementById('streampadDrawerRight');
				right.style.height = (streampadPlayer.params.drawersize-1)+'px';
				var left = document.getElementById('streampadDrawerLeft');
				left.style.height = (streampadPlayer.params.drawersize-1)+'px';
			}
		} catch (e){}
		
	},
	insertFullScreen : function(){
		streampadPlayer.Event.remove(window, 'playlistChange', streampadPlayer.Events.insertFullScreen);
		SPAPI.removeEventListener('onStart', streampadPlayer.Events.insertFullScreen);
			if (streampadPlayer.Playlist.array.length > 0){
			var btncolor = 'FFFFFF';
			var btnhover = 'C0C0C0';
			switch (streampadPlayer.params.btncolor){
				case 'white-gray' :
				break;
				case 'white-black' :
					btncolor = 'FFFFFF';
					btnhover = '000000';
				break;
				case 'black-gray' :
					btncolor = '000000';
					btnhover = 'C0C0C0';
				break;
				case 'black-white' :
					btncolor = '000000';
					btnhover = 'FFFFFF';
				break;
				case 'blue-white' :
					btncolor = '449FC1';
					btnhover = 'FFFFFF';
				break;
				default : 
				break;
			}
			try {
				var divFullScreen = document.getElementById('streampadPlayerFullScreenButton');
				var wMode = 'transparent';
				if (streampadPlayer.browser.engine.name == 'trident' && streampadPlayer.flash.majorVersion < 10){
					wMode = 'opaque';
				}
				var bgcolor = '#000000';
				if (streampadPlayer.params.bgcolor != null && streampadPlayer.params.bgcolor != ''){
					bgcolor = streampadPlayer.params.bgcolor;
				}
				divFullScreen.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="fullscreenFlash" style="margin:0;"><param name=movie value="'+streampadPlayer.params.fsswf+'?'+streampadPlayer.vars.flashUID+'"><param name=swLiveConnect value="true"><param name=allowScriptAccess value="always"><param name=allowFullScreen value="true"><param name=allowNetworking value="all"><param name=wMode value="'+wMode+'"><param name=flashVars value="connection='+streampadPlayer.vars.flashUID+'&settings='+ streampadPlayer.params.fsxml+'&btncolor='+btncolor+'&btnhover='+btnhover+'&debug='+streampadPlayer.params.debug+'&bgcolor='+bgcolor+'"><embed bgcolor="#000000" flashVars="connection='+streampadPlayer.vars.flashUID+'&settings='+ streampadPlayer.params.fsxml+'&btncolor='+btncolor+'&btnhover='+btnhover+'&debug='+streampadPlayer.params.debug+'&bgcolor='+bgcolor+'" src="'+streampadPlayer.params.fsswf+'" type="application/x-shockwave-flash" width="100%" height="100%" wMode="'+wMode+'" allowNetworking="all" allowFullScreen="true" allowScriptAccess="always" name="fullscreenFlash"></embed></object>';
			} catch (e) {}
		} else {
			streampadPlayer.Event.add(window, 'playlistChange', streampadPlayer.Events.insertFullScreen);
		}
	}
	/*scrape : function(){
		var as = document.getElementsByTagName('a');
		var mp3s = 0;
		for(j=0; j<as.length; j++){
			var a = as[j];
			if (a.href.indexOf('.mp3') != -1){
				mp3s ++;
				var songVO = new streampadPlayer.SongVO();
				songVO.text = a.innerHTML;
				songVO.enclosure = a.href;
				songVO.sourceUrl = location.href;
				streampadPlayer.Playlist.push(songVO);
				streampadPlayer.Events.insertPlayButton(a, mp3s);			}
		}
		streampadPlayer.vars.total = mp3s;
		streampadPlayer.Event.add(window, 'setCurrent', streampadPlayer.Events.playButtonChange);
	},
	insertPlayButton : function(element, num){
		var playButton = document.createElement('img');
		streampadPlayer.Utils.setStyles(playButton, {'width' : '16px', 'height' : '16px', 'cursor' : 'pointer', 'marginRight' : '4px', 'verticalAlign' : 'text-bottom'});
		playButton.setAttribute('src', 'http://donkeykong.office.aol.com/~danielkantor07/streampad/prototype/play_blue.png');
		playButton.setAttribute('enclosure', element.href);
		playButton.setAttribute('id', 'streampadPlayerPlayButton'+element.href);
		streampadPlayer.Event.add(playButton, 'click', streampadPlayer.Events.playButtonClick);
		element.parentNode.insertBefore(playButton, element);
	},
	playButtonClick : function(e){
		e = e||window.event
		var target = e.currentTarget||e.srcElement;
		var enclosure = target.getAttribute('enclosure');
		streampadPlayer.vars.queueNumber = streampadPlayer.Events.matchEnclosure(enclosure);
		if (streampadPlayer.vars.built == true){
			streampadPlayer.Play.queueNumber(streampadPlayer.vars.queueNumber);
		} else {
			streampadPlayer.UI.build();
		}
	},
	pauseButtonClick : function(e){
		e = e||window.event
		var target = e.currentTarget||e.srcElement;
		target.setAttribute('src', 'http://donkeykong.office.aol.com/~danielkantor07/streampad/prototype/play_blue.png');
		streampadPlayer.UI.showPlay();
		streampadPlayer.vars.isPlaying = false;
		streampadPlayer.Event.remove(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.pauseButtonClick);
		streampadPlayer.Event.add(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.resumeButtonClick);
        if (streampadPlayer.vars.isWinamp){
        	window.external.Transport.Pause();
        } else {
          	streampadPlayer.flash.getSWF("streampadFlash").pause();
        }
        streampadPlayer.Event.fire(window, 'pause', null);
    },
    resumeButtonClick : function(e){
    	e = e||window.event
		var target = e.currentTarget||e.srcElement;
		target.setAttribute('src', 'http://donkeykong.office.aol.com/~danielkantor07/streampad/prototype/pause_blue.png');
		streampadPlayer.UI.showPause();
		streampadPlayer.vars.isPlaying = true;
		streampadPlayer.Event.remove(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.resumeButtonClick);
		streampadPlayer.Event.add(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.pauseButtonClick);
        if (streampadPlayer.vars.isWinamp){
        	window.external.Transport.Play();
        } else {
          	streampadPlayer.flash.getSWF("streampadFlash").unPause();
        }
        streampadPlayer.Event.fire(window, 'play', null);
    },
	matchEnclosure : function(enclosure){
		for (var i = 0; i < streampadPlayer.Playlist.array.length; i++){
			if (streampadPlayer.Playlist.array[i].enclosure == enclosure){
				return i;
			}
		}
	},
	playButtonChange : function(n){
		try {
			streampadPlayer.vars.oldPlayButton.setAttribute('src', 'http://donkeykong.office.aol.com/~danielkantor07/streampad/prototype/play_blue.png');
			streampadPlayer.Event.remove(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.pauseButtonClick);
			streampadPlayer.Event.add(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.playButtonClick);
		} catch (e) {}
		var enclosure = streampadPlayer.Playlist.array[n].enclosure;
		streampadPlayer.vars.oldPlayButton = document.getElementById('streampadPlayerPlayButton'+enclosure);
		streampadPlayer.vars.oldPlayButton.setAttribute('src', 'http://donkeykong.office.aol.com/~danielkantor07/streampad/prototype/pause_blue.png');
		streampadPlayer.Event.remove(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.playButtonClick);
		streampadPlayer.Event.add(streampadPlayer.vars.oldPlayButton, 'click', streampadPlayer.Events.pauseButtonClick);
	}*/
};
streampadPlayer.UI = {
	/* initilizes bottombar on bottom of page */
	init : function(){
		streampadPlayer.vars.built = false;
		if (streampadPlayer.vars.isWinamp){
			streampadPlayer.params.showvolumebutton = 'false';
			streampadPlayer.params.showpop = 'false';
		}
		streampadPlayer.vars.fontSize = streampadPlayer.params.height/2.5;
		try {
			var old = document.getElementById('streampadBottomBar');
			old.parentNode.removeChild(old);
		} catch(e){}
		var height = streampadPlayer.params.height;
		var width = streampadPlayer.params.width
		if (streampadPlayer.params.visible == 'false'){
			height = 1;
			width = '1px';
		}
		var bottomBar = document.createElement('div');
		document.body.appendChild(bottomBar);
		bottomBar.setAttribute('id', 'streampadBottomBar');
		streampadPlayer.Utils.setStyles(bottomBar, {'position' : 'fixed', 'bottom' : '0', 'left' : '0', 'height' : height+'px', 'width' : width , 'color' : '#FFFFFF', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'fontSize' : '12px', 'cursor' : 'pointer', 'lineHeight' : 'normal', 'zIndex' : '10000', 'textAlign' : 'left'});
		if (streampadPlayer.params.visible == 'false'){
			bottomBar.style.opacity = 0;
		}
		if (streampadPlayer.params.bgcolor != ''){
			if (streampadPlayer.params.bgcolor.indexOf('#') == -1){
				streampadPlayer.params.bgcolor = '#'+streampadPlayer.params.bgcolor;
			}
			bottomBar.style.background = streampadPlayer.params.bgcolor;
		} else {
			bottomBar.style.background ='url(http://'+streampadPlayer.params.bgimg+') repeat-x';	
		}
		if (streampadPlayer.browser.engine.trident4){
			bottomBar.style.position = 'absolute';	
			if (streampadPlayer.params.visible == 'false'){
				bottomBar.style.filter = "alpha(opacity=0)";
			}
		}
		streampadPlayer.Event.add(bottomBar, 'click', streampadPlayer.UI.build);
		var poweredBy = document.createElement('a');
		streampadPlayer.Utils.setStyles(poweredBy, {'background' : 'url('+streampadPlayer.vars.imgHOST+'streampad-white-logo) no-repeat 0 8px', 'height' : '30px', 'width' : '75px', 'display' : 'block', 'textDecoration' : 'none', 'cssFloat' : 'right', 'styleFloat' : 'right', 'margin' : '0 8px'});
		poweredBy.setAttribute('href', streampadPlayer.vars.poweredByLink);
		poweredBy.setAttribute('target', '_blank');
		streampadPlayer.Event.add(poweredBy, 'click', streampadPlayer.Events.poweredByClick);
		bottomBar.appendChild(poweredBy);
		if (streampadPlayer.browser.engine.trident4){
			streampadPlayerFixPNG(poweredBy);
			poweredBy.style.height = '19px';
			poweredBy.style.margin = '8px 8px 0 8px';
		}
		if (streampadPlayer.params.showpop != 'false'){
			if (streampadPlayer.Theme.borderRight == false){
				var borderRight = document.createElement('div');
				streampadPlayer.Theme.borderNum++;
				borderRight.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
				borderRight.className = 'streampadPlayerbutton';
				streampadPlayer.Utils.setStyles(borderRight, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
				bottomBar.appendChild(borderRight);
				streampadPlayer.Theme.borderRight = true;
			}
			var popnew = document.createElement('div');
			popnew.setAttribute('id', 'streampadPopNew');
			popnew.className = 'streampadPlayerbutton';
			streampadPlayer.Utils.setStyles(popnew, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '28px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.popoutOff+' no-repeat'});
			popnew.setAttribute('title', 'Pop this player into a new page');
			popnew.setAttribute('bordernum', streampadPlayer.Theme.borderNum);
			streampadPlayer.Event.add(popnew, 'click', streampadPlayer.Events.popnew);
			streampadPlayer.Event.add(popnew, 'mouseover', streampadPlayer.Events.popnewMouseOver);
			streampadPlayer.Event.add(popnew, 'mouseout', streampadPlayer.Events.popnewMouseOut);
			bottomBar.appendChild(popnew);
			var borderLeft = document.createElement('div');
			streampadPlayer.Theme.borderNum++;
			borderLeft.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
			borderLeft.className = 'streampadPlayerbutton';
			streampadPlayer.Utils.setStyles(borderLeft, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
			bottomBar.appendChild(borderLeft);
		}
		var clickToPlay = document.createElement('div');
		var clickToPlayText = "Click to play all audio posts";
		if (streampadPlayer.params.api != null){
			clickToPlayText = "Click to play all audio posts from "+streampadPlayer.params.api;
		}
		if (streampadPlayer.params.clicktext != ''){
			clickToPlayText = streampadPlayer.params.clicktext.replace(/%20/g, ' ');
			clickToPlayText = decodeURIComponent(clickToPlayText);
		}
		clickToPlay.appendChild(document.createTextNode(clickToPlayText));
		clickToPlay.setAttribute('id', 'streampadPlayerClickToPlay');
		if (streampadPlayer.params.trackcolor.indexOf('#') == -1){
			streampadPlayer.params.trackcolor = '#'+streampadPlayer.params.trackcolor;
		}
		bottomBar.appendChild(clickToPlay);
		streampadPlayer.Utils.setStyles(clickToPlay, {'position' : 'absolute', 'left' : '10px', 'fontSize' : streampadPlayer.vars.fontSize+'px', 'top' : (streampadPlayer.params.height/2)-(streampadPlayer.vars.fontSize/2)+'px', 'color' : streampadPlayer.params.trackcolor});
		if (streampadPlayer.params.clickimg == 'true'){
			var clickToPlayImg = document.createElement('div');
			clickToPlayImg.setAttribute('id', 'streampadPlayerClickToPlayImg');
			clickToPlayImg.className = 'streampadPlayerbutton';
			streampadPlayer.Utils.setStyles(clickToPlayImg, {'width' : '20px', 'height' : '30px', 'position' : 'absolute', 'left' : '10px', 'top' : '0', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.playOff+' no-repeat'});
			bottomBar.insertBefore(clickToPlayImg, clickToPlay);
			clickToPlay.style.left = '40px';
		}
		streampadPlayer.UI.resize();
		try {
			onStreampadPlayerReady(SPAPI);
		} catch(e){}
		streampadPlayer.Event.fire(window, 'init', null);
		if (streampadPlayer.params.autoplay == 'true'){
			streampadPlayer.UI.build();
		}
	},
	/* called when user clicks on initilized bottombar. Can be called by playlist or any other js */
	build : function(){
		/*setTimeout(streampadPlayer.Omni.request, 10000);*/
		streampadPlayer.vars.flashUID = new Date().getTime();
		if (streampadPlayer.params.showplaylist == 'true'){
			streampadPlayer.Event.add(window, 'playlistChange', streampadPlayer.Events.playlistButtonClick);
		}
		var bottomBar = document.getElementById('streampadBottomBar');
		streampadPlayer.Event.remove(bottomBar, 'click', streampadPlayer.UI.build);
		bottomBar.style.cursor = 'default';
		var clickToPlay = document.getElementById('streampadPlayerClickToPlay');
		bottomBar.removeChild(clickToPlay);
		try {
			var clickToPlayImg = document.getElementById('streampadPlayerClickToPlayImg');
			bottomBar.removeChild(clickToPlayImg);
		} catch (e){}
		
		
		if (streampadPlayer.params.showfullscreen != 'false'){
			if (streampadPlayer.Theme.borderRight == false){
				var borderRight = document.createElement('div');
				streampadPlayer.Theme.borderNum++;
				borderRight.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
				borderRight.className = 'streampadPlayerbutton';
				streampadPlayer.Utils.setStyles(borderRight, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
				bottomBar.appendChild(borderRight);
				streampadPlayer.Theme.borderRight = true;
			}
			var divFullScreen = document.createElement('div');
			streampadPlayer.Utils.setStyles(divFullScreen, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '28px', 'height' : '30px', 'cursor' : 'pointer', 'position' : 'relative'});
			divFullScreen.setAttribute('id', 'streampadPlayerFullScreenButton');
			bottomBar.appendChild(divFullScreen);
			var borderLeft = document.createElement('div');
			streampadPlayer.Utils.setStyles(borderLeft, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
			streampadPlayer.Theme.borderNum++;
			borderLeft.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
			borderLeft.className = 'streampadPlayerbutton';
			bottomBar.appendChild(borderLeft);
		}		
		
		if (streampadPlayer.params.showvolumebutton != 'false'){
			if (streampadPlayer.Theme.borderRight == false){
				var borderRight = document.createElement('div');
				streampadPlayer.Theme.borderNum++;
				borderRight.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
				borderRight.className = 'streampadPlayerbutton';
				streampadPlayer.Utils.setStyles(borderRight, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
				bottomBar.appendChild(borderRight);
				streampadPlayer.Theme.borderRight = true;
			}
			var volumeButton = document.createElement('div');
			volumeButton.setAttribute('id', 'streampadVolumeButton');
			volumeButton.className = 'streampadPlayerbutton';
			volumeButton.setAttribute('bordernum', streampadPlayer.Theme.borderNum);
			streampadPlayer.Utils.setStyles(volumeButton, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '28px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.volumeOff+' no-repeat', 'position' : 'relative'});
			streampadPlayer.Event.add(volumeButton, 'mouseover', streampadPlayer.Events.volumeButtonMouseOver);
			bottomBar.appendChild(volumeButton);
			var borderLeft = document.createElement('div');
			streampadPlayer.Utils.setStyles(borderLeft, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
			streampadPlayer.Theme.borderNum++;
			borderLeft.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
			borderLeft.className = 'streampadPlayerbutton';
			bottomBar.appendChild(borderLeft);
		}
		if (streampadPlayer.params.showplaylistbutton != 'false'){
			if (streampadPlayer.Theme.borderRight == false){
				var borderRight = document.createElement('div');
				streampadPlayer.Theme.borderNum++;
				borderRight.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
				borderRight.className = 'streampadPlayerbutton';
				streampadPlayer.Utils.setStyles(borderRight, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
				bottomBar.appendChild(borderRight);
				streampadPlayer.Theme.borderRight = true;
			}
			var playlistButton = document.createElement('div');
			playlistButton.setAttribute('id', 'streampadPlaylistButton');
			playlistButton.className = 'streampadPlayerbutton';
			playlistButton.setAttribute('bordernum', streampadPlayer.Theme.borderNum);
			streampadPlayer.Utils.setStyles(playlistButton, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '28px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.playlistOff+' no-repeat'});
			playlistButton.setAttribute('title', 'Open Playlist');
			streampadPlayer.Event.add(playlistButton, 'click', streampadPlayer.Events.playlistButtonClick);
			streampadPlayer.Event.add(playlistButton, 'mouseover', streampadPlayer.Events.playlistButtonMouseOver);
			streampadPlayer.Event.add(playlistButton, 'mouseout', streampadPlayer.Events.playlistButtonMouseOut);
			streampadPlayer.Event.add(window, 'drawerDestroyed', streampadPlayer.Events.playlistDrawerClosed);
			bottomBar.appendChild(playlistButton);
			var borderLeft = document.createElement('div');
			streampadPlayer.Theme.borderNum++;
			borderLeft.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
			borderLeft.className = 'streampadPlayerbutton';
			streampadPlayer.Utils.setStyles(borderLeft, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
			bottomBar.appendChild(borderLeft);
		}
		if (streampadPlayer.params.showprofilebutton != 'false'){
		if (streampadPlayer.vars.sn != null && streampadPlayer.vars.sn != ''){
			streampadPlayer.Theme.profileOff = '-170px 8px';
			streampadPlayer.Theme.profileOn = '-384px 8px';
		}
			if (streampadPlayer.Theme.borderRight == false){
				var borderRight = document.createElement('div');
				streampadPlayer.Theme.borderNum++;
				borderRight.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
				borderRight.className = 'streampadPlayerbutton';
				streampadPlayer.Utils.setStyles(borderRight, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
				bottomBar.appendChild(borderRight);
				streampadPlayer.Theme.borderRight = true;
			}
			var profileButton = document.createElement('div');
			profileButton.setAttribute('id', 'streampadProfileButton');
			profileButton.className = 'streampadPlayerbutton';
			profileButton.setAttribute('bordernum', streampadPlayer.Theme.borderNum);
			streampadPlayer.Utils.setStyles(profileButton, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '28px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.profileOff+' no-repeat', 'position' : 'relative'});
			profileButton.setAttribute('title', 'Open Profile');
			streampadPlayer.Event.add(profileButton, 'click', streampadPlayer.Events.profileButtonClick);
			streampadPlayer.Event.add(profileButton, 'mouseover', streampadPlayer.Events.profileButtonMouseOver);
			streampadPlayer.Event.add(profileButton, 'mouseout', streampadPlayer.Events.profileButtonMouseOut);
			bottomBar.appendChild(profileButton);
			streampadPlayer.Event.add(window, 'drawerDestroyed', streampadPlayer.Events.profileDrawerClosed);
			var borderLeft = document.createElement('div');
			streampadPlayer.Theme.borderNum++;
			borderLeft.setAttribute('id', 'streampadPlayerBorderNum'+streampadPlayer.Theme.borderNum);
			borderLeft.className = 'streampadPlayerbutton';
			streampadPlayer.Utils.setStyles(borderLeft, {'cssFloat' : 'right', 'styleFloat' : 'right', 'width' : '1px', 'height' : '30px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.borderOff+' no-repeat'});
			bottomBar.appendChild(borderLeft);
		}
		var audioPlays = document.createElement('div');
		audioPlays.setAttribute('id', 'streampadAudioPlays');
		streampadPlayer.Utils.setStyles(audioPlays, {'cssFloat' : 'right', 'styleFloat' : 'right',  'position' : 'relative', 'color' : '#FFFFFF', 'fontSize' : streampadPlayer.vars.fontSize+'px', 'fontFamily' : 'arial', 'overflow' : 'hidden', 'height' : '30px', 'lineHeight' : '30px', 'marginRight' : '5px'});
		bottomBar.appendChild(audioPlays);
		var controls = document.createElement('div');
		streampadPlayer.Utils.setStyles(controls, {'position' : 'absolute', 'left' : '5px', 'width' : '65px', 'height' : '100%'});
		bottomBar.appendChild(controls);
		var previousTrack = document.createElement('div');
		streampadPlayer.Utils.setStyles(previousTrack, {'width' : '20px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.prevOff+' no-repeat', 'cssFloat' : 'left', 'styleFloat' : 'left'});
		streampadPlayer.Event.add(previousTrack, 'mouseover', function(){ previousTrack.style.backgroundPosition = streampadPlayer.Theme.prevOn;});
		streampadPlayer.Event.add(previousTrack, 'mouseout', function(){ previousTrack.style.backgroundPosition = streampadPlayer.Theme.prevOff;});
		streampadPlayer.Event.add(previousTrack, 'click', streampadPlayer.Events.previousTrack);
		previousTrack.className = 'streampadPlayerbutton';
		controls.appendChild(previousTrack);
		var playTrack = document.createElement('div');
		playTrack.setAttribute('id', 'streampadPlayTrack');
		streampadPlayer.Utils.setStyles(playTrack, {'width' : '20px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.playOff+' no-repeat', 'cssFloat' : 'left', 'styleFloat' : 'left'});
		streampadPlayer.Event.add(playTrack, 'mouseover', streampadPlayer.Events.playTrackMouseOver)
		streampadPlayer.Event.add(playTrack, 'mouseout', streampadPlayer.Events.playTrackMouseOut)
		streampadPlayer.Event.add(playTrack, 'click', streampadPlayer.Events.playTrack);
		playTrack.className = 'streampadPlayerbutton';
		controls.appendChild(playTrack);
		streampadPlayer.UI.showPause();
		var nextTrack = document.createElement('div');
		streampadPlayer.Utils.setStyles(nextTrack, {'width' : '20px', 'height' : '30px', 'cursor' : 'pointer', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.nextOff+' no-repeat', 'cssFloat' : 'left', 'styleFloat' : 'left'});
		streampadPlayer.Event.add(nextTrack, 'mouseover', function(){ nextTrack.style.backgroundPosition = streampadPlayer.Theme.nextOn; });
		streampadPlayer.Event.add(nextTrack, 'mouseout', function(){ nextTrack.style.backgroundPosition = streampadPlayer.Theme.nextOff; });
		streampadPlayer.Event.add(nextTrack, 'click', streampadPlayer.Events.nextTrack);
		nextTrack.className = 'streampadPlayerbutton';
		controls.appendChild(nextTrack);
		var audioCaption = document.createElement('a');
		audioCaption.setAttribute('id', 'streampadAudioCaption');
		audioCaption.setAttribute('target', '_blank');
		audioCaption.setAttribute('title', 'Click to view post');
		streampadPlayer.Utils.setStyles(audioCaption, {'position' : 'absolute', 'left' : '240px', 'top' : (streampadPlayer.params.height/2)-(streampadPlayer.vars.fontSize/2)+'px', 'height' : streampadPlayer.params.height/2+'px', 'color' : streampadPlayer.params.trackcolor, 'overflow' : 'hidden', 'textDecoration' : 'none', 'fontWeight' : 'bold', 'fontSize' : streampadPlayer.vars.fontSize+'px', 'fontFamily' : 'arial', 'border' : 'none'});
		streampadPlayer.Event.add(audioCaption, 'mouseover', function(){ audioCaption.style.textDecoration = 'underline'; });
		streampadPlayer.Event.add(audioCaption, 'mouseout', function(){ audioCaption.style.textDecoration = 'none'; });
		bottomBar.appendChild(audioCaption);
		var flash = document.createElement('div');
		flash.setAttribute('id', 'streampadAudioPlayer');
		var theWidth = 135;
		var theHeight = streampadPlayer.params.height/3;
		streampadPlayer.Utils.setStyles(flash, {'position' : 'absolute', 'left' : '80px', 'width' : theWidth+'px', 'height' : theHeight+'px', 'top' : (streampadPlayer.params.height/2)-(theHeight/2)+'px', 'lineHeight' : '0'});
		bottomBar.appendChild(flash);
		streampadPlayer.vars.isFlashLoaded = setTimeout(streampadPlayer.Utils.flashLoaded, 5000);
		flash.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="streampadFlash" style="margin:0;"><param name=movie value="'+streampadPlayer.params.swfurl+'?'+streampadPlayer.vars.flashUID+'"><param name=swLiveConnect value="true"><param name=allowScriptAccess value="always"><param name=allowNetworking value="all"><param name=wMode value="transparent"><param name=flashVars value="onload=streampadPlayer.flash.loaded&theHeight='+theHeight+'&theWidth='+theWidth+'&callback=streampadPlayer&progressBackColor='+streampadPlayer.params.progressbackcolor+'&progressFrontColor='+streampadPlayer.params.progressfrontcolor+'&connection='+streampadPlayer.vars.flashUID+'&debug='+streampadPlayer.params.debug+'&globalCheck='+streampadPlayer.params.globalcheck+'"><embed flashVars="onload=streampadPlayer.flash.loaded&theHeight='+theHeight+'&theWidth='+theWidth+'&callback=streampadPlayer&progressBackColor='+streampadPlayer.params.progressbackcolor+'&progressFrontColor='+streampadPlayer.params.progressfrontcolor+'&connection='+streampadPlayer.vars.flashUID+'&debug='+streampadPlayer.params.debug+'&globalCheck='+streampadPlayer.params.globalcheck+'" src="'+streampadPlayer.params.swfurl+'?'+streampadPlayer.vars.flashUID+'" type="application/x-shockwave-flash" width="100%" height="100%" allowNetworking="all" allowScriptAccess="always" wMode="transparent" name="streampadFlash"></embed></object>';
		streampadPlayer.vars.built = true;
		streampadPlayer.UI.resize();
	},
	/* called when window resizes */
	resize : function(){
		try {
			var bottomBar = document.getElementById('streampadBottomBar');
			var s = bottomBar.offsetWidth;
			document.getElementById('streampadAudioCaption').style.width =  (s-690)+'px';
			//document.getElementById('streampadAudioPlays').style.left = (s-280)+'px';
		} catch (e){}
		streampadPlayer.Events.scrollHandler();
	},
	/* sets the UI to the current song playing */
	setCurrent : function(songVO){
		if (streampadPlayer.vars.isWinamp == false){
			document.getElementById('streampadAudioPlayer').style.border = '1px solid #'+streampadPlayer.params.progressbackcolor;
		}
		var queue = "";
		if (streampadPlayer.vars.total){
			queue = (streampadPlayer.vars.queueNumber+1)+" of "+streampadPlayer.vars.total;
		} else {
			queue = (streampadPlayer.vars.queueNumber+1);	
		}
		this.setCaption("<span style='margin-right:5px;'>"+queue+":</span> "+songVO.text, songVO.sourceUrl, songVO.clickFunction);
		if (songVO.plays){
			document.getElementById('streampadAudioPlays').innerHTML = 'Plays : '+songVO.plays;
		}
		streampadPlayer.UI.showPause();
	},
	/* call to set the caption. If clickFunction is not null it will call that onclick. If it is null, it will open sourceUrl in new window */
	setCaption : function(text, sourceUrl, clickFunction){
		var streampadAudioCaption = document.getElementById('streampadAudioCaption');
		streampadAudioCaption.innerHTML = text;
		if (clickFunction != null){
			streampadAudioCaption.setAttribute('href', '#');
			streampadAudioCaption.setAttribute('target', '_self');
			streampadAudioCaption.onclick = clickFunction;
		} else {
			if (sourceUrl != null){
				if (sourceUrl == 'AOL Music'){
					sourceUrl = 'http://music.aol.com/song/id/'+streampadPlayer.vars.currentSongVO.trackAolId;
				}
				streampadAudioCaption.setAttribute('href', sourceUrl);
				streampadAudioCaption.setAttribute('target', '_blank');
				streampadAudioCaption.onclick = null;
			} else {
				streampadAudioCaption.setAttribute('href', '#');
				streampadAudioCaption.setAttribute('target', '_self');
				streampadAudioCaption.onclick = null;
			}
		}
	},
	/* call this if the playlist is empty. */
	noAudioPosts : function(){
		bottomBar = document.getElementById('streampadBottomBar');
		bottomBar.innerHTML = "";
		var poweredBy = document.createElement('a');
		streampadPlayer.Utils.setStyles(poweredBy, {'background' : 'url('+streampadPlayer.vars.imgHOST+'streampad-white-logo) no-repeat 0 8px', 'height' : '30px', 'width' : '75px', 'display' : 'block', 'textDecoration' : 'none', 'cssFloat' : 'right', 'styleFloat' : 'right', 'margin' : '0 8px'});
		poweredBy.setAttribute('href', streampadPlayer.vars.poweredByLink);
		poweredBy.setAttribute('target', '_blank');
		streampadPlayer.Event.add(poweredBy, 'click', streampadPlayer.Events.poweredByClick);
		bottomBar.appendChild(poweredBy);
		if (streampadPlayer.browser.engine.trident4){
			streampadPlayerFixPNG(poweredBy);
			poweredBy.style.height = '19px';
			poweredBy.style.margin = '8px 8px 0 8px';
		}
		var none = document.createElement('div');
		none.appendChild(document.createTextNode('No Songs'));
		streampadPlayer.Utils.setStyles(none, {'position' : 'absolute', 'left' : '10px', 'top' : '8px'});
		bottomBar.appendChild(none);
	},
	/* call this to show the pause button. Called when user clicks play/pause */
	showPause : function(){
		var streampadPlayTrack = document.getElementById('streampadPlayTrack');
		streampadPlayTrack.style.backgroundPosition = streampadPlayer.Theme.pauseOff;
	},
	/* call this to show the play button. Called when user clicks play/pause */
	showPlay : function(){
		var streampadPlayTrack = document.getElementById('streampadPlayTrack');
		streampadPlayTrack.style.backgroundPosition = streampadPlayer.Theme.playOff;
	},
	/* Create the drawer */
	createDrawer : function(){
		var drawer = document.createElement('div');
		drawer.setAttribute('id', 'streampadDrawer');
		streampadPlayer.Utils.setStyles(drawer, {'height' : streampadPlayer.params.drawersize+'px', 'backgroundColor' : '#FFFFFF', 'position' : 'fixed', 'overflow' : 'auto', 'bottom' : streampadPlayer.params.height+'px', 'left' : '0', 'width' : '100%', 'zIndex' : '99999'});
		if (streampadPlayer.browser.engine.trident4){
				drawer.style.position = 'absolute';	
		}
		document.body.appendChild(drawer);
		var drawerTop = document.createElement('div');
		drawerTop.setAttribute('id', 'streampadDrawerTop');
		streampadPlayer.Utils.setStyles(drawerTop, {'height' : '1px', 'backgroundColor' : '#000000', 'width' : '100%', 'position' : 'absolute', 'cursor' : 'ns-resize', 'left' : '0', 'top' : '0'});
		drawer.appendChild(drawerTop);
		streampadPlayer.Event.add(drawerTop, 'mousedown', streampadPlayer.Events.drawerDragDown);
		streampadPlayer.Event.add(drawerTop, 'mouseup', streampadPlayer.Events.drawerDragUp);
		streampadPlayer.params.showdrawer = true;
		streampadPlayer.Event.fire(window, 'drawerCreated', null);
		streampadPlayer.UI.resize();
		return drawer;
	},
	/* Destroy the drawer */
	destroyDrawer : function(){
		try {
			var drawer = document.getElementById('streampadDrawer');
			document.body.removeChild(drawer);
			streampadPlayer.params.showdrawer = false;
			streampadPlayer.Event.fire(window, 'drawerDestroyed', null);
		} catch(e){}
	},
	/* Create Playlist Drawer */
	createPlaylistDrawer : function(){
		var drawer = this.createDrawer();
		var left = document.createElement('div');
		left.setAttribute('id', 'streampadDrawerLeft');
		streampadPlayer.Utils.setStyles(left, {'position' : 'absolute', 'left' : '0', 'top' : '1px', 'width' : '435px', 'overflow' : 'hidden', 'height' : (streampadPlayer.params.drawersize-1)+'px', 'background' : '#e5e5e5 url('+streampadPlayer.vars.imgHOST+'drawer-left-break) 100% 0 repeat-y'});
		drawer.appendChild(left);
		var nowPlayingHeader = document.createElement('div');
		streampadPlayer.Utils.setStyles(nowPlayingHeader, {'lineHeight' : 'normal', 'background' : 'url('+streampadPlayer.vars.imgHOST+'sound-wave) 0 2px no-repeat', 'fontSize' : '14px', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'fontWeight' : 'bold', 'margin' : '15px 0 0 15px', 'textIndent' : '30px', 'textAlign' : 'left', 'color' : '#000000'});
		nowPlayingHeader.appendChild(document.createTextNode('Now Playing'));
		left.appendChild(nowPlayingHeader);
		var coverArtDiv = document.createElement('div');
		streampadPlayer.Utils.setStyles(coverArtDiv, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '10px 18px 0 15px', 'display' : 'inline', 'height' : '150px', 'width' : '150px'});
		left.appendChild(coverArtDiv);
		var coverArt = document.createElement('img');
		coverArt.setAttribute('id', 'streampadCoverArt');
		coverArt.setAttribute('src', 'http://o.aolcdn.com/art/sp/record-150');
		coverArt.setAttribute('width', '150');
		coverArt.setAttribute('height', '150');
		streampadPlayer.Utils.setStyles(coverArt, {'border' : '1px solid #D4D4D4', 'backgroundColor' : '#FDFDFD', 'padding' : '4px'});
		coverArtDiv.appendChild(coverArt);
		var songTitle = document.createElement('div');
		songTitle.setAttribute('id', 'streampadPlaylistSongTitle');
		streampadPlayer.Utils.setStyles(songTitle, {'fontSize' : '18px', 'fontWeight' : 'bold', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'margin' : '20px 10px 15px 0', 'color' : '#000000', 'textAlign' : 'left'});
		left.appendChild(songTitle);
		var artist = document.createElement('a');
		artist.setAttribute('id', 'streampadPlaylistArtist');
		artist.setAttribute('target', '_blank');
		streampadPlayer.Utils.setStyles(artist, {'fontSize' : '14px', 'fontWeight' : 'bold', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'color' : '#000000', 'textAlign' : 'left', 'display' : 'block'});
		left.appendChild(artist);
		var album = document.createElement('div');
		album.setAttribute('id', 'streampadPlaylistAlbum');
		streampadPlayer.Utils.setStyles(album, {'fontSize' : '12px', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'marginTop' : '4px', 'color' : '#000000', 'textAlign' : 'left'});
		left.appendChild(album);
		var itunes = document.createElement('a');
		itunes.setAttribute('target', '_blank');
		itunes.setAttribute('id', 'streampadPlaylistItunes');
		streampadPlayer.Utils.setStyles(itunes, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.itunesOff, 'width' : '124px', 'height' : '18px', 'lineHeight' : '18px', 'textAlign' : 'center', 'fontSize' : '10px', 'fontWeight' : 'bold', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'textDecoration' : 'none', 'color' : '#FFFFFF', 'display' : 'block', 'margin' : '30px 5px 0 0', 'cssFloat' : 'left', 'styleFloat' : 'left', 'cursor' : 'pointer'});
		streampadPlayer.Event.add(itunes, 'mouseover', function(){ itunes.style.backgroundPosition = streampadPlayer.Theme.itunesOn; });
	    streampadPlayer.Event.add(itunes, 'mouseout', function(){ itunes.style.backgroundPosition = streampadPlayer.Theme.itunesOff; });
		left.appendChild(itunes);
		var amazon = document.createElement('a');
		amazon.setAttribute('target', '_blank');
		amazon.setAttribute('id', 'streampadPlaylistAmazon');
		streampadPlayer.Utils.setStyles(amazon, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.amazonOff, 'width' : '94px', 'height' : '18px', 'lineHeight' : '18px', 'textAlign' : 'center', 'fontSize' : '10px', 'fontWeight' : 'bold', 'fontFamily' : 'Arial, Helvetica, sans-serif', 'textDecoration' : 'none', 'color' : '#FFFFFF', 'display' : 'block', 'marginTop' : '30px', 'cssFloat' : 'left', 'styleFloat' : 'left', 'cursor' : 'pointer'});
		streampadPlayer.Event.add(amazon, 'mouseover', function(){ amazon.style.backgroundPosition = streampadPlayer.Theme.amazonOn; });
		streampadPlayer.Event.add(amazon, 'mouseout', function(){ amazon.style.backgroundPosition = streampadPlayer.Theme.amazonOff; });
		left.appendChild(amazon);
		var right = document.createElement('div');
		right.setAttribute('id', 'streampadDrawerRight');
		streampadPlayer.Utils.setStyles(right, {'position' : 'absolute', 'left' : '435px', 'top' : '1px', 'right' : '0', 'height' : (streampadPlayer.params.drawersize-1)+'px'});
		if (streampadPlayer.browser.engine.trident4){
			right.style.width = streampadPlayer.Utils.getBodyWidth()-435;
		}
		drawer.appendChild(right);
		var playlistHeader = document.createElement('div');
		playlistHeader.setAttribute('id', 'streampadPlaylistHeader');
		streampadPlayer.Utils.setStyles(playlistHeader, {'height' : '36px', 'lineHeight' : '36px', 'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-right-header) repeat-x', 'width' : '100%', 'fontSize' : '20px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'color' : '#000000', 'textIndent' : '30px', 'textAlign' : 'left', 'borderBottom' : '1px solid #D3D4D6'});
		right.appendChild(playlistHeader);
		var playlistItems = document.createElement('div');
		playlistItems.setAttribute('id', 'streampadPlaylistItems');
		streampadPlayer.Utils.setStyles(playlistItems, {'position' : 'absolute', 'top' : '37px', 'left' : '0', 'bottom' : '0', 'width' : '100%', 'overflow' : 'auto'});
		if (streampadPlayer.browser.engine.trident4){
			playlistItems.style.height = (streampadPlayer.params.drawersize-37)+'px';
		}
		right.appendChild(playlistItems);
		this.fillPlaylistItems();
		if (streampadPlayer.Playlist.array.length < streampadPlayer.vars.total){
			//this.showLoadMore();
		}
	},
	/* Load more songs option */
	showLoadMore : function(){
		var more = 20;
		if (streampadPlayer.vars.total - streampadPlayer.Playlist.array.length < more){
			more = streampadPlayer.vars.total - streampadPlayer.Playlist.array.length;
		}	
		var streampadPlaylistItems = document.getElementById('streampadPlaylistItems');
		var moreDiv = document.createElement('div');
		streampadPlayer.Utils.setStyles(moreDiv, {'height' : '44px', 'lineHeight' : '44px', 'cursor' : 'pointer', 'color' : '#7A7A8A', 'fontFamily' : 'arial', 'fontSize' : '14px', 'fontWeight' : 'bold', 'textIndent' : '50px'});
		moreDiv.appendChild(document.createTextNode('Load '+more+' more songs...'));
		streampadPlayer.Event.add(moreDiv, 'click', streampadPlayer.Events.playlistItemMore);
		streampadPlaylistItems.appendChild(moreDiv);
	},
	/* Fill the playlist with song divs */
	fillPlaylistItems : function(){
		var streampadPlaylistItems = document.getElementById('streampadPlaylistItems');
		streampadPlaylistItems.innerHTML = '';
		for (i=0; i < streampadPlayer.Playlist.array.length; i++){
			var playlistItem = document.createElement('div');
			playlistItem.setAttribute('id', 'streampadPlaylistItem'+i);
			playlistItem.setAttribute('num', i);
			playlistItem.style.height = '44px';
			if (streampadPlayer.browser.engine.trident4){
				playlistItem.style.width = '97%';
			} else {
				playlistItem.style.width = '100%';
			}
			playlistItem.style.overflow = 'hidden';
			playlistItem.style.cursor = 'pointer';
			playlistItem.style.position = 'relative';
			streampadPlayer.Event.add(playlistItem, 'click', streampadPlayer.Events.playlistItemClick);
			if (i == streampadPlayer.vars.queueNumber){
				playlistItem.style.background = 'url('+streampadPlayer.vars.imgHOST+'playlist-item-selected) no-repeat';
				streampadPlayer.vars.oldPlaylistItem = playlistItem;
			}
			playlistItem.setAttribute('title', streampadPlayer.Playlist.array[i].description);
			streampadPlaylistItems.appendChild(playlistItem);
			var trackNumber = document.createElement('div');
			trackNumber.style.position = 'absolute';
			trackNumber.style.top = '10px';
			trackNumber.style.left = '0';
			trackNumber.style.width = '50px';
			trackNumber.style.textAlign = 'right';
			trackNumber.style.color = '#7A7A8A';
			trackNumber.style.fontFamily = 'arial';
			trackNumber.style.fontSize = '14px';
			trackNumber.style.fontWeight = 'bold';
			trackNumber.setAttribute('num', i);
			trackNumber.appendChild(document.createTextNode((parseInt(i)+1)+'.'));
			playlistItem.appendChild(trackNumber);
			var songTitle = document.createElement('div');
			songTitle.setAttribute('id', 'streampadPlaylistItemSong'+i);
			songTitle.style.position = 'absolute';
			songTitle.style.left = '60px';
			songTitle.style.right = '0';
			songTitle.style.height = '16px';
			songTitle.style.top = '10px';
			songTitle.style.color = '#7A7A8A';
			songTitle.style.fontFamily = 'arial';
			songTitle.style.fontSize = '14px';
			songTitle.style.fontWeight = 'bold';
			songTitle.style.overflow = 'hidden';
			songTitle.style.textAlign = 'left';
			songTitle.style.lineHeight = 'normal';
			if (streampadPlayer.Playlist.array[i].songTitle != null){
				songTitle.appendChild(document.createTextNode(streampadPlayer.Playlist.array[i].songTitle));
			} else {
				songTitle.innerHTML = streampadPlayer.Playlist.array[i].text;
			}
			if (i == streampadPlayer.vars.queueNumber){
				songTitle.style.color = '#000000';
				streampadPlayer.vars.oldPlaylistItemSong = songTitle;
			}
			songTitle.setAttribute('num', i);
			playlistItem.appendChild(songTitle);
			var artist = document.createElement('div');
			artist.setAttribute('id', 'streampadPlaylistItemArtist'+i);
			artist.style.color = '#666666';
			artist.style.fontFamily = 'arial';
			artist.style.fontSize = '12px';
			artist.style.position = 'absolute';
			artist.style.left = '60px';
			artist.style.right = '0';
			artist.style.height = '14px';
			artist.style.top = '26px';
			artist.style.overflow = 'hidden';
			artist.style.textAlign = 'left';
			artist.style.lineHeight = 'normal';
			if (streampadPlayer.Playlist.array[i].artist != null){
				artist.appendChild(document.createTextNode(streampadPlayer.Playlist.array[i].artist));
			} else {
				artist.appendChild(document.createTextNode(''));
			}
			artist.setAttribute('num', i);
			playlistItem.appendChild(artist);
			var divider = document.createElement('div');
			divider.style.height = '1px';
			if (streampadPlayer.browser.engine.trident4){
				divider.style.width = '97%';
			} else {
				divider.style.width = '100%';
			}
			divider.style.overflow = 'hidden';
			divider.style.background = 'url('+streampadPlayer.vars.imgHOST+'playlist-item-divider) no-repeat';
			streampadPlaylistItems.appendChild(divider);
		}
	},
	/* Called on setCurrent */
	fillPlaylistDrawer : function(){
		if (streampadPlayer.vars.currentSongVO != null){
			var coverArt = document.getElementById('streampadCoverArt');
			if (streampadPlayer.vars.currentSongVO.imageUrl != null) {
				coverArt.setAttribute('src', streampadPlayer.vars.currentSongVO.imageUrl);
			} else {
				coverArt.setAttribute('src', streampadPlayer.vars.imgHOST+'record-150');
			}
			var streampadPlaylistSongTitle = document.getElementById('streampadPlaylistSongTitle');
			if (streampadPlayer.vars.currentSongVO.songTitle != null){
				streampadPlaylistSongTitle.innerHTML = streampadPlayer.Utils.trimString(streampadPlayer.vars.currentSongVO.songTitle, 20);
			} else {
				streampadPlaylistSongTitle.innerHTML = streampadPlayer.Utils.trimString(streampadPlayer.vars.currentSongVO.text, 22);
				streampadPlaylistSongTitle.setAttribute('title', streampadPlayer.vars.currentSongVO.text);
			}
			var streampadPlaylistArtist = document.getElementById('streampadPlaylistArtist');
			if (streampadPlayer.vars.currentSongVO.artist != null){
				streampadPlaylistArtist.innerHTML = streampadPlayer.vars.currentSongVO.artist;
				streampadPlaylistArtist.setAttribute('href', 'http://music.aol.com/search?query='+streampadPlayer.vars.currentSongVO.artist);
			} else {
				streampadPlaylistArtist.innerHTML = '';
			}
			if (streampadPlayer.vars.currentSongVO.artistAolId != null){
				streampadPlaylistArtist.setAttribute('href', 'http://music.aol.com/artist/id/'+streampadPlayer.vars.currentSongVO.artistAolId);
			} 
			var streampadPlaylistAlbum = document.getElementById('streampadPlaylistAlbum');
			if (streampadPlayer.vars.currentSongVO.album != null){
				streampadPlaylistAlbum.innerHTML = streampadPlayer.vars.currentSongVO.album;
			} else {
				streampadPlaylistAlbum.innerHTML = '';
			}
			var amazon = document.getElementById('streampadPlaylistAmazon');
			if (streampadPlayer.vars.currentSongVO.album != null) {
				amazon.setAttribute('href', 'http://www.amazon.com/s/ref=nb_ss_gw_2_10?url=search-alias%3Dpopular&field-keywords='+streampadPlayer.vars.currentSongVO.artist+'%20'+streampadPlayer.vars.currentSongVO.album+'&tag=streampad-20');
				amazon.style.display = 'block';
			} else {
				amazon.style.display = 'none';
			}
			var itunes = document.getElementById('streampadPlaylistItunes');
			if (streampadPlayer.vars.currentSongVO.itunes != null) {
				itunes.setAttribute('href', streampadPlayer.vars.currentSongVO.itunes);
				itunes.style.display = 'block';
			} else {
				if (streampadPlayer.vars.currentSongVO.album != null) {
					itunes.setAttribute('href', 'http://phobos.apple.com/WebObjects/MZSearch.woa/wa/com.apple.jingle.search.DirectAction/search?term='+streampadPlayer.vars.currentSongVO.album+'&partnerId=1');
				itunes.style.display = 'block';
				} else {
					itunes.style.display = 'none';
				}
			}
			
			try {
				streampadPlayer.vars.oldPlaylistItem.style.background = '#FFFFFF';
				streampadPlayer.vars.oldPlaylistItemSong.style.color = '#7A7A8A';
			} catch (e){}
			try {
				streampadPlayer.vars.oldPlaylistItem = document.getElementById('streampadPlaylistItem'+streampadPlayer.vars.queueNumber);
				streampadPlayer.vars.oldPlaylistItem.style.background = 'url('+streampadPlayer.vars.imgHOST+'playlist-item-selected) no-repeat';
				streampadPlayer.vars.oldPlaylistItemSong = document.getElementById('streampadPlaylistItemSong'+streampadPlayer.vars.queueNumber);
				streampadPlayer.vars.oldPlaylistItemSong.style.color = '#0F1030';
			} catch (e){}
			var playlistItems = document.getElementById('streampadPlaylistItems');
			var scrollPosition = streampadPlayer.vars.queueNumber*44-44+streampadPlayer.vars.queueNumber;
			playlistItems.scrollTop = scrollPosition;
		} 
		var playlistHeader = document.getElementById('streampadPlaylistHeader');
		playlistHeader.innerHTML = '';
		var closeButton = document.createElement('div');
		closeButton.className = 'streampadPlayerbutton';
		closeButton.setAttribute('title', 'Close Playlist');
		streampadPlayer.Utils.setStyles(closeButton, {'width' : '20px', 'height' : '24px', 'styleFloat' : 'right', 'cssFloat' : 'right', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.closeOff+' no-repeat', 'margin' : '5px 10px 0 0', 'cursor' : 'pointer'});
		streampadPlayer.Event.add(closeButton, 'mouseover', function(){ closeButton.style.backgroundPosition = streampadPlayer.Theme.closeOn; });
		streampadPlayer.Event.add(closeButton, 'mouseout', function(){ closeButton.style.backgroundPosition = streampadPlayer.Theme.closeOff; });
		streampadPlayer.Event.add(closeButton, 'click', streampadPlayer.Events.playlistButtonClick);
		playlistHeader.appendChild(closeButton);
		var playlistHeaderTitle = document.createElement('div');
		playlistHeaderTitle.style.textIndent = '30px';
		playlistHeaderTitle.appendChild(document.createTextNode(streampadPlayer.Playlist.title));
		playlistHeader.appendChild(playlistHeaderTitle);
	},
	showVolume : function(){
		var volumeButton = document.getElementById('streampadVolumeButton');
		volumeButton.style.backgroundPosition = streampadPlayer.Theme.volumeOn;
		var x = streampadPlayer.Utils.getX(volumeButton);
		streampadPlayer.vars.volumeY = streampadPlayer.Utils.getBodyHeight() - streampadPlayer.params.height;//streampadPlayer.Utils.getY(volumeButton);
		var volDiv = document.createElement('div');
		volDiv.setAttribute('id', 'streampadVolDiv');
		volDiv.className = 'streampadPlayerbutton';
		var bgcolor = '#000000';
		if (streampadPlayer.params.bgcolor != null && streampadPlayer.params.bgcolor != ''){
			bgcolor = streampadPlayer.params.bgcolor;
		}
		streampadPlayer.Utils.setStyles(volDiv, {'height' : '130px', 'background' : bgcolor+' url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.volumeBack+' no-repeat', 'position' : 'fixed', 'bottom' : streampadPlayer.params.height+'px', 'left' : (x-1)+'px', 'width' : '30px', 'zIndex' : '999999', 'overflow' : 'auto'});
		if (streampadPlayer.browser.engine.trident4){
			volDiv.style.position = 'absolute';
			if (streampadPlayer.vars.marginOffsetLeft < 0){
				volDiv.style.left = x - streampadPlayer.Utils.getWidthMarginSize() - 2 - streampadPlayer.vars.marginOffsetLeft + 'px';
			} else {
				volDiv.style.left = x - streampadPlayer.Utils.getWidthMarginSize() - 2 + 'px';
			}
		}
		document.body.appendChild(volDiv);
		streampadPlayer.Event.add(volDiv, 'mouseover', function(){ streampadPlayer.vars.volumeMouseOn = true });
		streampadPlayer.Event.add(volDiv, 'mouseout', streampadPlayer.Events.volumeButtonMouseOut);
		var volDragger = document.createElement('div');
		volDragger.setAttribute('id', 'streampadVolumeDragger');
		volDragger.className = 'streampadPlayerbutton';
		streampadPlayer.Utils.setStyles(volDragger, {'height' : '16px', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.volumeDrag+' no-repeat', 'position' : 'absolute', 'top' : streampadPlayer.vars.volumeDraggerY+'px', 'width' : '16px', 'zIndex' : 10001, 'cursor' : 'pointer', 'left' : '7px'});
		volDiv.appendChild(volDragger);
		streampadPlayer.Event.add(volDragger, 'mousedown', streampadPlayer.Events.volumeDragDown);
		streampadPlayer.Event.add(volDragger, 'mouseup', streampadPlayer.Events.volumeDragUp);
		streampadPlayer.Event.add(volumeButton, 'mouseout', streampadPlayer.Events.volumeButtonMouseOut);
		
		streampadPlayer.UI.resize();
	},
	fillProfileDrawer : function(){
		try {
			streampadPlayer.vars.profileHeaderSelected.style.background = '';
		} catch(e) {}
		switch (streampadPlayer.vars.profileDrawerCategory){
			case "history" : 
				this.fillHistoryDrawer();
			break;
			case "aim" : 
				this.fillAIMDrawer();
			break;
			case "lastfm" : 
				this.fillLastFMDrawer();
			break;
			case "twitter" : 
				this.fillTwitterDrawer();
			break;
			default :
				this.fillHistoryDrawer();
			break;
		}
	},
	fillProfileDrawerTop : function(){
		var right = document.getElementById('streampadDrawerRight');
		right.innerHTML = '';
		var profileHeader = document.createElement('div');
		profileHeader.setAttribute('id', 'streampadProfileHeader');
		streampadPlayer.Utils.setStyles(profileHeader, {'height' : '36px', 'lineHeight' : '36px', 'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-right-header) repeat-x', 'width' : '100%', 'fontSize' : '20px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'textAlign' : 'left', 'borderBottom' : '1px solid #D3D4D6'});
		right.appendChild(profileHeader);
		
		var closeButton = document.createElement('div');
		closeButton.setAttribute('title', 'Close Profile');
		streampadPlayer.Utils.setStyles(closeButton, {'width' : '20px', 'height' : '24px', 'styleFloat' : 'right', 'cssFloat' : 'right', 'background' : 'url('+streampadPlayer.params.btnsprite+streampadPlayer.params.btncolor+'_buttons) '+streampadPlayer.Theme.closeOff+' no-repeat', 'margin' : '5px 10px 0 0', 'cursor' : 'pointer'});
		streampadPlayer.Event.add(closeButton, 'mouseover', function(){ closeButton.style.backgroundPosition = streampadPlayer.Theme.closeOn; });
		streampadPlayer.Event.add(closeButton, 'mouseout', function(){ closeButton.style.backgroundPosition = streampadPlayer.Theme.closeOff; });
		streampadPlayer.Event.add(closeButton, 'click', streampadPlayer.Events.profileButtonClick);
		closeButton.className = 'streampadPlayerbutton';
		profileHeader.appendChild(closeButton);

    // removed by taber aug 31, 2012 - chart/history urls redirect to dynapub.xyz urls which no longer exist
		/*var historyHeader = document.createElement('div');
		historyHeader.setAttribute('id', 'streampadPlayerHistoryHeader');
		streampadPlayer.Utils.setStyles(historyHeader, {'cssFloat' : 'left', 'styleFloat' : 'left', 'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'margin' : '0 0 0 0', 'width' : '106px', 'height' : '36px', 'cursor' : 'pointer', 'color' : '#000000', 'borderRight' : '1px solid #A7A6AE', 'textAlign' : 'center'});
		historyHeader.appendChild(document.createTextNode('AOL MUSIC'));
		profileHeader.appendChild(historyHeader);
		streampadPlayer.Event.add(historyHeader, 'click', function(){ streampadPlayer.vars.profileDrawerCategory = 'history'; streampadPlayer.UI.fillProfileDrawer() });*/
		
		var aimHeader = document.createElement('div');
		aimHeader.setAttribute('id', 'streampadPlayerAimHeader');
		streampadPlayer.Utils.setStyles(aimHeader, {'cssFloat' : 'left', 'styleFloat' : 'left', 'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'margin' : '0 0 0 0', 'width' : '106px', 'height' : '36px', 'cursor' : 'pointer', 'color' : '#000000', 'borderLeft' : '1px solid #FFFFFF', 'borderRight' : '1px solid #A7A6AE', 'textAlign' : 'center'});
		
		aimHeader.appendChild(document.createTextNode('AIM'));
		profileHeader.appendChild(aimHeader);
		streampadPlayer.Event.add(aimHeader, 'click', function(){ streampadPlayer.vars.profileDrawerCategory = 'aim'; streampadPlayer.UI.fillProfileDrawer() });
		
		/*var divider = document.createElement('div');
		streampadPlayer.Utils.setStyles(divider, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '0 0 0 0', 'width' : '1px', 'height' : '36px', 'color' : '#FFFFFF', 'borderLeft' : '1px solid #FFFFFF'});
		profileHeader.appendChild(divider);*/
		
		
		var lastFMHeader = document.createElement('div');
		lastFMHeader.setAttribute('id', 'streampadPlayerLastFMHeader');
		streampadPlayer.Utils.setStyles(lastFMHeader, {'cssFloat' : 'left', 'styleFloat' : 'left', 'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'margin' : '0 0 0 0', 'width' : '106px', 'height' : '36px', 'cursor' : 'pointer', 'color' : '#000000', 'borderLeft' : '1px solid #FFFFFF', 'borderRight' : '1px solid #A7A6AE', 'textAlign' : 'center'});
		
		lastFMHeader.appendChild(document.createTextNode('LAST.FM'));
		profileHeader.appendChild(lastFMHeader);
		streampadPlayer.Event.add(lastFMHeader, 'click', function(){ streampadPlayer.vars.profileDrawerCategory = 'lastfm'; streampadPlayer.UI.fillProfileDrawer() });
		
		/*var twitterHeader = document.createElement('div');
		twitterHeader.setAttribute('id', 'streampadPlayerTwitterHeader');
		streampadPlayer.Utils.setStyles(twitterHeader, {'cssFloat' : 'left', 'styleFloat' : 'left', 'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'margin' : '0 0 0 0', 'width' : '106px', 'height' : '36px', 'cursor' : 'pointer', 'color' : '#000000', 'borderLeft' : '1px solid #FFFFFF', 'borderRight' : '1px solid #A7A6AE', 'textAlign' : 'center'});
		
		twitterHeader.appendChild(document.createTextNode('TWITTER'));
		profileHeader.appendChild(twitterHeader);
		streampadPlayer.Event.add(twitterHeader, 'click', function(){ streampadPlayer.vars.profileDrawerCategory = 'twitter'; streampadPlayer.UI.fillProfileDrawer() });*/
		
		var divider = document.createElement('div');
		streampadPlayer.Utils.setStyles(divider, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '0 0 0 0', 'width' : '1px', 'height' : '36px', 'color' : '#FFFFFF', 'borderLeft' : '1px solid #FFFFFF'});
		profileHeader.appendChild(divider);
		
		
	},
	fillAOLProfileDrawerLeft : function(){
		var left = document.getElementById('streampadDrawerLeft');
		left.innerHTML = '';
		var buddyIcon = document.createElement('img');
		buddyIcon.setAttribute('id', 'streampadBuddyIcon');
		buddyIcon.setAttribute('src', streampadPlayer.params.aimurl+'expressions/get?t='+streampadPlayer.vars.sn+'&f=native&type=buddyIcon&defaultId=00052b00003089');
		buddyIcon.setAttribute('height', '50px');
		buddyIcon.setAttribute('width', '50px');
		streampadPlayer.Utils.setStyles(buddyIcon, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '20px 10px 20px 20px', 'padding' : '4px', 'border' : '1px solid #D6D7DA', 'background' : '#FFFFFF', 'display' : 'inline'});
		if (streampadPlayer.browser.engine.trident4){
			buddyIcon.style.marginBottom = '0';
		}
		left.appendChild(buddyIcon);
		var buddyName = document.createElement('div');
		streampadPlayer.Utils.setStyles(buddyName, {'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'color' : '#000000', 'margin' : '20px 0 20px 0'});
		buddyName.appendChild(document.createTextNode(streampadPlayer.vars.sn));
		left.appendChild(buddyName);
    // removed by taber, aug 31, 2012 - looks like http://music.aol.com/profile/sn_here urls no longer work?
		/*var buddyProfileA = document.createElement('a');
		buddyProfileA.setAttribute('href', 'http://music.aol.com/profile/'+streampadPlayer.vars.sn);
		buddyProfileA.setAttribute('target', '_blank');
		buddyProfileA.appendChild(document.createTextNode('view profile'));
		streampadPlayer.Utils.setStyles(buddyProfileA, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.viewProfileOff, 'textIndent' : '-3000px', 'cssFloat' : 'left', 'styleFloat' : 'left', 'height' : '18px', 'width' : '77px', 'display' : 'block', 'marginRight' : '10px'});
		streampadPlayer.Event.add(buddyProfileA, 'mouseover', function() {buddyProfileA.style.backgroundPosition = streampadPlayer.Theme.viewProfileOn;});
		streampadPlayer.Event.add(buddyProfileA, 'mouseout', function() {buddyProfileA.style.backgroundPosition = streampadPlayer.Theme.viewProfileOff;});
		left.appendChild(buddyProfileA);*/
		if (streampadPlayer.vars.clientLogin == true) {
			var logout = document.createElement('div');
			streampadPlayer.Utils.setStyles(logout, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.logoutOff, 'cssFloat' : 'left', 'styleFloat' : 'left', 'height' : '18px', 'width' : '58px', 'display' : 'block', 'cursor' : 'pointer'});
			streampadPlayer.Event.add(logout, 'mouseover', function() {logout.style.backgroundPosition = streampadPlayer.Theme.logoutOn;});
			streampadPlayer.Event.add(logout, 'mouseout', function() {logout.style.backgroundPosition = streampadPlayer.Theme.logoutOff;});
			streampadPlayer.Event.add(logout, 'click', streampadPlayer.Events.oaLogout.request);
			left.appendChild(logout);
		}
		var border = document.createElement('div');
		streampadPlayer.Utils.setStyles(border, {'borderTop' : '1px solid #000000', 'clear' : 'both', 'margin' : '20px'});
		left.appendChild(border);
		var statusCheckbox = document.createElement('input');
		streampadPlayer.Utils.setStyles(statusCheckbox, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '0 5px 0 20px'});
		statusCheckbox.setAttribute('type', 'checkbox');
		streampadPlayer.Event.add(statusCheckbox, 'click', function(){ streampadPlayer.flash.getSWF("streampadFlash").setasb(statusCheckbox.checked, streampadPlayer.vars.sn) });
		left.appendChild(statusCheckbox);
		var checkedB = streampadPlayer.flash.getSWF("streampadFlash").getasb(streampadPlayer.vars.sn);
		if (checkedB == true){
			statusCheckbox.setAttribute('checked', 'checked');
		}
		var statusText = document.createElement('div');
		streampadPlayer.Utils.setStyles(statusText, {'fontFamily' : 'arial', 'fontSize' : '12px', 'color' : '#666666', 'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '3px 0 15px 0'});
		statusText.appendChild(document.createTextNode('Update AIM with current song'));
		left.appendChild(statusText);
		var historyCheckbox = document.createElement('input');
		streampadPlayer.Utils.setStyles(historyCheckbox, {'clear' : 'both', 'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '0 5px 0 20px'});
		historyCheckbox.setAttribute('type', 'checkbox');
		streampadPlayer.Event.add(historyCheckbox, 'click', function(){ streampadPlayer.flash.getSWF("streampadFlash").setdsb(historyCheckbox.checked, streampadPlayer.vars.sn) });
		left.appendChild(historyCheckbox);
		var checkedH = streampadPlayer.flash.getSWF("streampadFlash").getdsb(streampadPlayer.vars.sn);
		if (checkedH == true){
			historyCheckbox.setAttribute('checked', 'true');
		}
		var historyText = document.createElement('div');
		streampadPlayer.Utils.setStyles(historyText, {'fontFamily' : 'arial', 'fontSize' : '12px', 'color' : '#666666', 'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '1px 0 10px 0'});
		historyText.appendChild(document.createTextNode('Keep listening history'));
		left.appendChild(historyText);
		var loginLoader = document.createElement('div');
		loginLoader.setAttribute('id', 'streampadPlayerLoginLoader');
		streampadPlayer.Utils.setStyles(loginLoader, {'background' : 'url('+streampadPlayer.vars.imgHOST+'horizontal-loader-black) no-repeat', 'width' : '96px', 'height' : '12px', 'margin' : '0 0 0 75px', 'clear' : 'both', 'display' : 'none'});
		left.appendChild(loginLoader);
	},
	fillHistoryDrawer : function(){
		streampadPlayer.vars.profileDrawerCategory = 'history';
		if (streampadPlayer.vars.sn == null || streampadPlayer.vars.sn == ''){
			this.createAOLSignin();
		} else {
			this.fillAOLProfileDrawerLeft();
		}
		this.fillProfileDrawerTop();
		streampadPlayer.vars.profileHeaderSelected = document.getElementById('streampadPlayerHistoryHeader');
		streampadPlayer.vars.profileHeaderSelected.style.background = 'url('+streampadPlayer.vars.imgHOST+'profile-header-selected) repeat-x';
		if (streampadPlayer.vars.sn == null || streampadPlayer.vars.sn == ''){
			var right = document.getElementById('streampadDrawerRight');
			var promo = document.createElement('div');
			promo.setAttribute('id', 'streampadPlayerHistoryPromo');
			streampadPlayer.Utils.setStyles(promo, {'background' : 'url('+streampadPlayer.vars.imgHOST+'sp-infographic-history) no-repeat', 'width' : '500px', 'height' : '140px', 'margin' : '0 auto'});
			right.appendChild(promo);
		} else {
			streampadPlayer.Charts.getUserPlayHist.request();
		}
	},
	fillAIMDrawer : function(){
		streampadPlayer.vars.profileDrawerCategory = 'aim';
		if (streampadPlayer.vars.sn == null || streampadPlayer.vars.sn == ''){
			this.createAOLSignin();
		} else {
			this.fillAOLProfileDrawerLeft();
		}
		this.fillProfileDrawerTop();
		streampadPlayer.vars.profileHeaderSelected = document.getElementById('streampadPlayerAimHeader');
		streampadPlayer.vars.profileHeaderSelected.style.background = 'url('+streampadPlayer.vars.imgHOST+'profile-header-selected) repeat-x';
		if (streampadPlayer.vars.sn == null || streampadPlayer.vars.sn == ''){
			var right = document.getElementById('streampadDrawerRight');
			var promo = document.createElement('div');
			promo.setAttribute('id', 'streampadPlayerHistoryPromo');
			streampadPlayer.Utils.setStyles(promo, {'background' : 'url('+streampadPlayer.vars.imgHOST+'sp-infographic-aim) no-repeat', 'width' : '500px', 'height' : '140px', 'margin' : '0 auto'});
			right.appendChild(promo);
		} else {
			streampadPlayer.AIM.buddylist.request();
		}
	},
	fillLastFMDrawer : function(){
		streampadPlayer.vars.profileDrawerCategory = 'lastfm';
		this.fillProfileDrawerTop();
		streampadPlayer.vars.profileHeaderSelected = document.getElementById('streampadPlayerLastFMHeader');
		streampadPlayer.vars.profileHeaderSelected.style.background = 'url('+streampadPlayer.vars.imgHOST+'profile-header-selected) repeat-x';
		streampadPlayer.lastfm.user.getInfo.request();
	},
	fillLastFMProfileDrawerRight : function(array){
		var len = array.length;
		var right = document.getElementById('streampadDrawerRight');
		var profileItems = document.createElement('div');
		profileItems.setAttribute('id', 'streampadProfileItems');
		streampadPlayer.Utils.setStyles(profileItems, {'position' : 'absolute', 'top' : '37px', 'left' : '0', 'bottom' : '0', 'width' : '100%', 'overflow' : 'auto'});
		if (streampadPlayer.browser.engine.trident4){
			profileItems.style.height = (streampadPlayer.params.drawersize-37)+'px';
		}
		right.appendChild(profileItems);
		for (var i = 0; i < len; i++){
			var historyItem = array[i];
			var playlistItem = document.createElement('div');
			playlistItem.style.height = '50px';
			if (streampadPlayer.browser.engine.trident4){
				playlistItem.style.width = '97%';
			} else {
				playlistItem.style.width = '100%';
			}
			playlistItem.style.overflow = 'hidden';
			playlistItem.style.position = 'relative';
			profileItems.appendChild(playlistItem);
			var d = new Date(parseInt(historyItem.date.uts));
			var ctime = parseInt(historyItem.date.uts);
			d.setTime(ctime * 1000);
			var ampm = "am";
			var timeStringData = d.getHours();
			if (timeStringData > 12){
				timeStringData = timeStringData - 12;
				ampm = "pm";
			}
			var timeString = document.createElement('div');
			timeString.style.position = 'absolute';
			timeString.style.top = '10px';
			timeString.style.left = '30px';
			timeString.style.width = '80px';
			timeString.style.textAlign = 'right';
			timeString.style.color = '#000000';
			timeString.style.fontFamily = 'arial';
			timeString.style.fontSize = '14px';
			timeString.style.fontWeight = 'bold';
			var mins = d.getMinutes();
			if (mins < 10){
				mins = "0"+mins;
			}
			timeString.appendChild(document.createTextNode(timeStringData+":"+mins+" "+ampm));
			playlistItem.appendChild(timeString);
			var dateString = document.createElement('div');
			dateString.style.position = 'absolute';
			dateString.style.top = '27px';
			dateString.style.left = '30px';
			dateString.style.width = '80px';
			dateString.style.textAlign = 'right';
			dateString.style.color = '#666666';
			dateString.style.fontFamily = 'arial';
			dateString.style.fontSize = '12px';
			var year = d.getFullYear();
			year = year+"";
			year = year.substr(2);
			dateString.appendChild(document.createTextNode(d.getMonth()+1+"/"+d.getDate()+"/"+year));
			playlistItem.appendChild(dateString);
			var songTitle = document.createElement('a');
			songTitle.style.position = 'absolute';
			songTitle.style.left = '130px';
			songTitle.style.right = '0';
			songTitle.style.height = '16px';
			songTitle.style.top = '10px';
			songTitle.style.color = '#000000';
			songTitle.style.fontFamily = 'arial';
			songTitle.style.fontSize = '14px';
			songTitle.style.fontWeight = 'bold';
			songTitle.style.overflow = 'hidden';
			songTitle.style.textAlign = 'left';
			songTitle.style.lineHeight = 'normal';
			songTitle.style.textDecoration = 'none';
			if (historyItem.name != null){
				songTitle.appendChild(document.createTextNode(historyItem.name));
			}
			if (historyItem.url != null){
				songTitle.setAttribute('target', 'blank');
				songTitle.setAttribute('href', historyItem.url);
				streampadPlayer.Event.add(songTitle, 'mouseover', streampadPlayer.UI.underlineElement);
				streampadPlayer.Event.add(songTitle, 'mouseout', streampadPlayer.UI.noUnderlineElement);
			}
			playlistItem.appendChild(songTitle);
					
			var artist = document.createElement('a');
			artist.setAttribute('id', 'streampadHistoryArtist'+i);
			artist.style.color = '#666666';
			artist.style.fontFamily = 'arial';
			artist.style.fontSize = '12px';
			artist.style.position = 'absolute';
			artist.style.left = '130px';
			artist.style.right = '0';
			artist.style.height = '14px';
			artist.style.top = '28px';
			artist.style.overflow = 'hidden';
			artist.style.textAlign = 'left';
			artist.style.lineHeight = 'normal';
			artist.style.textDecoration = 'none';
			if (historyItem.artist['#text'] != null){
				artist.appendChild(document.createTextNode(historyItem.artist['#text']));
				artist.setAttribute('target', 'blank');
				artist.setAttribute('href', 'http://last.fm/music/'+historyItem.artist['#text']);
				streampadPlayer.Event.add(artist, 'mouseover', streampadPlayer.UI.underlineElement);
				streampadPlayer.Event.add(artist, 'mouseout', streampadPlayer.UI.noUnderlineElement);
			}
			playlistItem.appendChild(artist);
			var divider = document.createElement('div');
			divider.style.height = '1px';
			if (streampadPlayer.browser.engine.trident4){
				divider.style.width = '97%';
			} else {
				divider.style.width = '100%';
			}
			divider.style.overflow = 'hidden';
			divider.style.background = 'url('+streampadPlayer.vars.imgHOST+'playlist-item-divider) no-repeat';
			playlistItem.appendChild(divider);
		}
	},
	fillLastFMProfileDrawerLeft : function(username, userurl, imageurl, playcount){
		var left = document.getElementById('streampadDrawerLeft');
		left.innerHTML = '';
		var buddyIcon = document.createElement('img');
		buddyIcon.setAttribute('id', 'streampadBuddyIcon');
		buddyIcon.setAttribute('src', imageurl);
		buddyIcon.setAttribute('height', '50px');
		buddyIcon.setAttribute('width', '50px');
		streampadPlayer.Utils.setStyles(buddyIcon, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '20px 10px 20px 20px', 'padding' : '4px', 'border' : '1px solid #D6D7DA', 'background' : '#FFFFFF', 'display' : 'inline', 'width' : '50px', 'height' : '50px'});
		if (streampadPlayer.browser.engine.trident4){
			buddyIcon.style.marginBottom = '0';
		}
		left.appendChild(buddyIcon);
		var buddyName = document.createElement('div');
		streampadPlayer.Utils.setStyles(buddyName, {'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'color' : '#000000', 'margin' : '20px 0 20px 0'});
		buddyName.setAttribute('id', 'streampadBuddyName');
		buddyName.appendChild(document.createTextNode(username));
		left.appendChild(buddyName);
		var buddyProfileA = document.createElement('a');
		buddyProfileA.setAttribute('href', userurl);
		buddyProfileA.setAttribute('id', 'streampadProfileLink');
		buddyProfileA.setAttribute('target', '_blank');
		buddyProfileA.appendChild(document.createTextNode('view profile'));
		streampadPlayer.Utils.setStyles(buddyProfileA, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.viewProfileOff, 'textIndent' : '-3000px', 'cssFloat' : 'left', 'styleFloat' : 'left', 'height' : '18px', 'width' : '77px', 'display' : 'block', 'marginRight' : '10px'});
		streampadPlayer.Event.add(buddyProfileA, 'mouseover', function() {buddyProfileA.style.backgroundPosition = streampadPlayer.Theme.viewProfileOn;});
		streampadPlayer.Event.add(buddyProfileA, 'mouseout', function() {buddyProfileA.style.backgroundPosition = streampadPlayer.Theme.viewProfileOff;});
		left.appendChild(buddyProfileA);
		var logout = document.createElement('div');
		streampadPlayer.Utils.setStyles(logout, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.logoutOff, 'cssFloat' : 'left', 'styleFloat' : 'left', 'height' : '18px', 'width' : '58px', 'display' : 'block', 'cursor' : 'pointer'});
		streampadPlayer.Event.add(logout, 'mouseover', function() {logout.style.backgroundPosition = streampadPlayer.Theme.logoutOn;});
		streampadPlayer.Event.add(logout, 'mouseout', function() {logout.style.backgroundPosition = streampadPlayer.Theme.logoutOff;});
		streampadPlayer.Event.add(logout, 'click', streampadPlayer.lastfm.user.logout);
		left.appendChild(logout);
		var border = document.createElement('div');
		streampadPlayer.Utils.setStyles(border, {'borderTop' : '1px solid #000000', 'clear' : 'both', 'margin' : '20px'});
		left.appendChild(border);
		/*var scrobblingCheckbox = document.createElement('input');
		streampadPlayer.Utils.setStyles(scrobblingCheckbox, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '0 5px 0 20px'});
		scrobblingCheckbox.setAttribute('type', 'checkbox');
		streampadPlayer.Event.add(scrobblingCheckbox, 'click', function(){ streampadPlayer.flash.getSWF("streampadFlash").setasb(statusCheckbox.checked, streampadPlayer.vars.sn) });
		left.appendChild(scrobblingCheckbox);
		var checkedB = streampadPlayer.flash.getSWF("streampadFlash").getasb(streampadPlayer.vars.sn);
		if (checkedB == true){
			scrobblingCheckbox.setAttribute('checked', 'checked');
		}
		var scrobblingText = document.createElement('div');
		streampadPlayer.Utils.setStyles(scrobblingText, {'fontFamily' : 'arial', 'fontSize' : '12px', 'color' : '#666666', 'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '3px 0 15px 0'});
		scrobblingText.appendChild(document.createTextNode('Enable scrobbling'));
		left.appendChild(scrobblingText);*/
	},
	fillLastFMLoginProfileDrawerLeft : function(token){
		var left = document.getElementById('streampadDrawerLeft');
		left.innerHTML = '';
		var authorize = document.createElement('div');
		streampadPlayer.Utils.setStyles(authorize, {'background' : 'url('+streampadPlayer.vars.imgHOST+'sp-lastfm-login) no-repeat', 'width' : '101px', 'height' : '18px', 'margin' : '30px 0 0 87px', 'cursor' : 'pointer'});
		streampadPlayer.Event.add(authorize, 'mouseover', function(){ authorize.style.backgroundPosition = '-101px 0'; });
		streampadPlayer.Event.add(authorize, 'mouseout', function(){ authorize.style.backgroundPosition = '0 0'; });
		streampadPlayer.Event.add(authorize, 'click', function(){ streampadPlayer.lastfm.auth.authorizePopup.open(token, '6c946ca5274b2f396e5031c12c39400c') });
		left.appendChild(authorize);
		var loginLoader = document.createElement('div');
		loginLoader.setAttribute('id', 'streampadPlayerLoginLoader');
		streampadPlayer.Utils.setStyles(loginLoader, {'background' : 'url('+streampadPlayer.vars.imgHOST+'horizontal-loader-black) no-repeat', 'width' : '96px', 'height' : '12px', 'margin' : '10px 0 0 115px', 'clear' : 'both', 'display' : 'none'});
		left.appendChild(loginLoader);
	},
	fillLastFMRightPromo : function(){
		var right = document.getElementById('streampadDrawerRight');
		var promo = document.createElement('div');
		promo.setAttribute('id', 'streampadPlayerLastFMPromo');
		streampadPlayer.Utils.setStyles(promo, {'background' : 'url('+streampadPlayer.vars.imgHOST+'sp-infographic-lastfm) no-repeat', 'width' : '500px', 'height' : '140px', 'margin' : '0 auto'});
		right.appendChild(promo);
	},
	fillTwitterDrawer : function(){
		streampadPlayer.vars.profileDrawerCategory = 'twitter';
		this.fillProfileDrawerTop();
		streampadPlayer.vars.profileHeaderSelected = document.getElementById('streampadPlayerTwitterHeader');
		streampadPlayer.vars.profileHeaderSelected.style.background = 'url('+streampadPlayer.vars.imgHOST+'profile-header-selected) repeat-x';
		streampadPlayer.Twitter.shorten.request();
	},
	createProfileDrawer : function(){
		var drawer = this.createDrawer();
		var left = document.createElement('div');
		left.setAttribute('id', 'streampadDrawerLeft');
		streampadPlayer.Utils.setStyles(left, {'position' : 'absolute', 'left' : '0', 'top' : '1px', 'width' : '275px', 'overflow' : 'hidden', 'height' : (streampadPlayer.params.drawersize-1)+'px', 'background' : '#e5e5e5 url('+streampadPlayer.vars.imgHOST+'drawer-left-break) 100% 0 repeat-y'});
		drawer.appendChild(left);
		var right = document.createElement('div');
		right.setAttribute('id', 'streampadDrawerRight');
		streampadPlayer.Utils.setStyles(right, {'position' : 'absolute', 'left' : '275px', 'top' : '1px', 'right' : '0', 'height' : (streampadPlayer.params.drawersize-1)+'px', 'overflow' : 'hidden'});
		if (streampadPlayer.browser.engine.trident4){
			right.style.width = streampadPlayer.Utils.getBodyWidth()-275;
		}
		drawer.appendChild(right);
		this.fillProfileDrawer();
	},
	createAOLSignin : function(){
		var left = document.getElementById('streampadDrawerLeft');
		left.innerHTML = '';
		var signinHeader = document.createElement('div');
		signinHeader.setAttribute('id', 'streampadSigninLoader');
		signinHeader.appendChild(document.createTextNode("Log in AIM/AOL"));
		streampadPlayer.Utils.setStyles(signinHeader, {'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'color' : '#000000', 'margin' : '15px', 'textIndent' : '30px', 'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.signInIcon});
		left.appendChild(signinHeader);
		if (streampadPlayer.vars.clientLogin == true){
			var form = document.createElement('div');
			streampadPlayer.Utils.setStyles(form, {'width' : '245px', 'height' : '80px', 'margin' : '0 0 0 15px'});
			left.appendChild(form);
			form.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="streampadForm" style="margin:0;"><param name=movie value="'+streampadPlayer.params.lswf+'"><param name=swLiveConnect value="true"><param name=allowScriptAccess value="always"><param name=allowNetworking value="all"><param name=wMode value="transparent"><param name=flashVars value="&callback=streampadPlayer.Events.loginBack"><embed flashVars="callback=streampadPlayer.Events.loginBack" src="'+streampadPlayer.params.lswf+'" type="application/x-shockwave-flash" width="100%" height="100%" allowNetworking="all" allowScriptAccess="always" wMode="transparent" name="streampadForm"></embed></object>';
			var loginButton = document.createElement('div');
			streampadPlayer.Utils.setStyles(loginButton, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.loginOff, 'width' : '46px', 'height' : '18px', 'textDecoration' : 'none', 'display' : 'block', 'margin' : '10px 10px 0 110px', 'cssFloat' : 'left', 'styleFloat' : 'left', 'cursor' : 'pointer', 'display' : 'inline'});
			streampadPlayer.Event.add(loginButton, 'mouseover', function(){ loginButton.style.backgroundPosition = streampadPlayer.Theme.loginOn; });
		    streampadPlayer.Event.add(loginButton, 'mouseout', function(){ loginButton.style.backgroundPosition = streampadPlayer.Theme.loginOff; });
		    streampadPlayer.Event.add(loginButton, 'click', streampadPlayer.Events.loginSubmit);
			left.appendChild(loginButton);
			
			var signUpButton = document.createElement('a');
			signUpButton.setAttribute('href', 'https://new.aol.com/productsweb/?promocode=824114');
			signUpButton.setAttribute('target', '_blank');
			streampadPlayer.Utils.setStyles(signUpButton, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.signUpOff, 'width' : '58px', 'height' : '18px', 'textDecoration' : 'none', 'display' : 'block', 'margin' : '10px 0 20px 0', 'cssFloat' : 'left', 'styleFloat' : 'left', 'cursor' : 'pointer', 'display' : 'inline'});
			streampadPlayer.Event.add(signUpButton, 'mouseover', function(){ signUpButton.style.backgroundPosition = streampadPlayer.Theme.signUpOn; });
		    streampadPlayer.Event.add(signUpButton, 'mouseout', function(){ signUpButton.style.backgroundPosition = streampadPlayer.Theme.signUpOff; });
			left.appendChild(signUpButton);
			
			var loginLoader = document.createElement('div');
			loginLoader.setAttribute('id', 'streampadPlayerLoginLoader');
			streampadPlayer.Utils.setStyles(loginLoader, {'background' : 'url('+streampadPlayer.vars.imgHOST+'horizontal-loader-black) no-repeat', 'width' : '96px', 'height' : '12px', 'margin' : '10px 0 0 115px', 'clear' : 'both', 'display' : 'none'});
			left.appendChild(loginLoader);
		} else {
			var loginButton = document.createElement('a');
			loginButton.setAttribute('href', 'http://music.aol.com/signin?siteState=OrigUrl='+encodeURIComponent(location.href));
			if (streampadPlayer.vars.openAuthFunc != null){
				loginButton.setAttribute('href', '#');
				streampadPlayer.Event.add(loginButton, 'click', streampadPlayer.vars.openAuthFunc);
			} 
			streampadPlayer.Utils.setStyles(loginButton, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.loginOff, 'width' : '46px', 'height' : '18px', 'textDecoration' : 'none', 'display' : 'block', 'margin' : '20px 10px 0 20px', 'cssFloat' : 'left', 'styleFloat' : 'left', 'cursor' : 'pointer', 'display' : 'inline'});
			streampadPlayer.Event.add(loginButton, 'mouseover', function(){ loginButton.style.backgroundPosition = streampadPlayer.Theme.loginOn; });
		    streampadPlayer.Event.add(loginButton, 'mouseout', function(){ loginButton.style.backgroundPosition = streampadPlayer.Theme.loginOff; });
			left.appendChild(loginButton);
			
			var signUpButton = document.createElement('a');
			signUpButton.setAttribute('href', 'https://new.aol.com/productsweb/?promocode=824114');
			streampadPlayer.Utils.setStyles(signUpButton, {'background' : 'url('+streampadPlayer.vars.imgHOST+'drawer-sprite) no-repeat '+streampadPlayer.Theme.signUpOff, 'width' : '58px', 'height' : '18px', 'textDecoration' : 'none', 'display' : 'block', 'margin' : '20px 0 0 0', 'cssFloat' : 'left', 'styleFloat' : 'left', 'cursor' : 'pointer', 'display' : 'inline'});
			streampadPlayer.Event.add(signUpButton, 'mouseover', function(){ signUpButton.style.backgroundPosition = streampadPlayer.Theme.signUpOn; });
		    streampadPlayer.Event.add(signUpButton, 'mouseout', function(){ signUpButton.style.backgroundPosition = streampadPlayer.Theme.signUpOff; });
			left.appendChild(signUpButton);
		}
	},
	createBuddy : function(buddy){
		var div = document.createElement('div');
		streampadPlayer.Utils.setStyles(div, {'cssFloat' : 'left', 'styleFloat' : 'left', 'width' : '280px', 'height' : '80px', 'overflow' : 'hidden', 'border' : '1px solid #E5E5E5', 'margin' : '10px 0 0 10px'});
		div.setAttribute('id', 'buddyDiv'+buddy.aimId)
		var buddyIcon = document.createElement('img');
		//buddyIcon.setAttribute('id', 'streampadBuddyIcon');
		var img = buddy.buddyIcon;
		if (img == null){
			img = streampadPlayer.params.aimurl+'expressions/getAsset?f=native&type=buddyIcon&id=00052b00003089';
		}
		buddyIcon.setAttribute('src', streampadPlayer.params.aimurl+'expressions/get?t='+buddy.aimId+'&f=native&type=buddyIcon&defaultId=00052b00003089');
		buddyIcon.setAttribute('height', '50px');
		buddyIcon.setAttribute('width', '50px');
		streampadPlayer.Utils.setStyles(buddyIcon, {'cssFloat' : 'left', 'styleFloat' : 'left', 'margin' : '10px 10px 10px 10px', 'padding' : '4px', 'border' : '1px solid #D6D7DA', 'background' : '#FFFFFF', 'display' : 'block'});
		div.appendChild(buddyIcon);
		var buddyName = document.createElement('a');
		buddyName.setAttribute('href', 'http://music.aol.com/profile/'+buddy.aimId);
		buddyName.setAttribute('target', '_blank');
		streampadPlayer.Utils.setStyles(buddyName, {'fontSize' : '14px', 'fontFamily' : 'arial', 'fontWeight' : 'bold', 'color' : '#000000', 'margin' : '10px 0 5px 0', 'cssFloat' : 'left', 'styleFloat' : 'left'});
		buddyName.appendChild(document.createTextNode(buddy.displayId));
		div.appendChild(buddyName);
		
		var buddyStatus = document.createElement('div');
		buddyStatus.setAttribute('id', 'buddyStatus'+buddy.aimId);
		streampadPlayer.Utils.setStyles(buddyStatus, {'fontSize' : '12px', 'fontFamily' : 'arial', 'fontWeight' : 'normal', 'fontStyle' : 'italic', 'color' : '#737487', 'margin' : '0 0 8px 0', 'cssFloat' : 'left', 'styleFloat' : 'left', 'width' : '180px'});
		buddyStatus.appendChild(document.createTextNode(buddy.statusMsg));
		div.appendChild(buddyStatus);
		return div;
	},
	modifyBuddy : function(eventData){
		try {
			if (eventData.statusMsg.indexOf('â™«') != -1){
				var buddyStatus = document.getElementById('buddyStatus'+eventData.aimId);
				if (buddyStatus.innerHTML != eventData.statusMsg){
					buddyStatus.innerHTML = eventData.statusMsg;
					var buddyDiv = document.getElementById('buddyDiv'+eventData.aimId);
					buddyDiv.style.border = '1px solid #000000';
					buddyStatus.style.color = '#000000'
					setTimeout(function(){ buddyDiv.style.border = '1px solid #E5E5E5'; }, 3000);
					setTimeout(function(){ buddyStatus.style.color = '#737487'; }, 3000);
				}
			}
		} catch (e) {}
		try {
			if (eventData.statusMsg.indexOf('â™«') != -1){
				streampadPlayer.flash.getSWF("streampadFlash").presenceEvent(eventData);
			}
		} catch (e) {}
	},
	fillHistoryItems : function(data){
		if (data.userplayhistory.userplayhistoryitem){
			var len = data.userplayhistory.userplayhistoryitem.length;
			if (len > 0){
				var right = document.getElementById('streampadDrawerRight');
				//right.innerHTML = '';
				var profileItems = document.createElement('div');
				profileItems.setAttribute('id', 'streampadProfileItems');
				streampadPlayer.Utils.setStyles(profileItems, {'position' : 'absolute', 'top' : '37px', 'left' : '0', 'bottom' : '0', 'width' : '100%', 'overflow' : 'auto'});
				if (streampadPlayer.browser.engine.trident4){
					profileItems.style.height = (streampadPlayer.params.drawersize-37)+'px';
				}
				right.appendChild(profileItems);
				for (var i = 0; i < len; i++){
					var historyItem = data.userplayhistory.userplayhistoryitem[i];
					var playlistItem = document.createElement('div');
					playlistItem.style.height = '60px';
					if (streampadPlayer.browser.engine.trident4){
						playlistItem.style.width = '97%';
					} else {
						playlistItem.style.width = '100%';
					}
					playlistItem.style.overflow = 'hidden';
					playlistItem.style.position = 'relative';
					profileItems.appendChild(playlistItem);
					
					var d = new Date();
					var ctime = parseInt(historyItem.ctime);
					var tzo = parseInt(historyItem.tzo);
					d.setTime(ctime * 1000 - tzo * 60000);
					var ampm = "am";
					var timeStringData = d.getHours();
					if (timeStringData > 12){
						timeStringData = timeStringData - 12;
						ampm = "pm";
					}
					var timeString = document.createElement('div');
					timeString.style.position = 'absolute';
					timeString.style.top = '10px';
					timeString.style.left = '30px';
					timeString.style.width = '80px';
					timeString.style.textAlign = 'right';
					timeString.style.color = '#000000';
					timeString.style.fontFamily = 'arial';
					timeString.style.fontSize = '14px';
					timeString.style.fontWeight = 'bold';
					var mins = d.getMinutes();
					if (mins < 10){
						mins = "0"+mins;
					}
					timeString.appendChild(document.createTextNode(timeStringData+":"+mins+" "+ampm));
					
					playlistItem.appendChild(timeString);
					var dateString = document.createElement('div');
					dateString.style.position = 'absolute';
					dateString.style.top = '27px';
					dateString.style.left = '30px';
					dateString.style.width = '80px';
					dateString.style.textAlign = 'right';
					dateString.style.color = '#666666';
					dateString.style.fontFamily = 'arial';
					dateString.style.fontSize = '12px';
					var year = d.getFullYear();
					year = year+"";
					year = year.substr(2);
					dateString.appendChild(document.createTextNode(d.getMonth()+1+"/"+d.getDate()+"/"+year));
					playlistItem.appendChild(dateString);
					
					
					/*var timeSplit = historyItem.ctime.split(' ');
					var hourSplit = timeSplit[1].split(':');
					var hour = parseInt(hourSplit[0]);
					var tzo = parseInt(historyItem.tzo);
					tzo = tzo / 60;
					hour = hour - tzo;
					var ampm = 'AM';
					
					if (hour > 12){
						hour = hour - 12;
						ampm = 'PM';
					}
					var timeString = document.createElement('div');
					timeString.style.position = 'absolute';
					timeString.style.top = '10px';
					timeString.style.left = '30px';
					timeString.style.width = '80px';
					timeString.style.textAlign = 'right';
					timeString.style.color = '#000000';
					timeString.style.fontFamily = 'arial';
					timeString.style.fontSize = '14px';
					timeString.style.fontWeight = 'bold';
					var mins = parseInt(hourSplit[1]);
					if (mins < 10){
						mins = "0"+mins;
					}
					timeString.appendChild(document.createTextNode(hour+":"+mins+" "+ampm));
					playlistItem.appendChild(timeString);
					var dateString = document.createElement('div');
					dateString.style.position = 'absolute';
					dateString.style.top = '27px';
					dateString.style.left = '30px';
					dateString.style.width = '80px';
					dateString.style.textAlign = 'right';
					dateString.style.color = '#666666';
					dateString.style.fontFamily = 'arial';
					dateString.style.fontSize = '12px';
					dateString.appendChild(document.createTextNode(timeSplit[0]));*/
					
					playlistItem.appendChild(dateString);
					var songTitle = document.createElement('a');
					songTitle.style.position = 'absolute';
					songTitle.style.left = '130px';
					songTitle.style.right = '0';
					songTitle.style.height = '16px';
					songTitle.style.top = '10px';
					songTitle.style.color = '#000000';
					songTitle.style.fontFamily = 'arial';
					songTitle.style.fontSize = '14px';
					songTitle.style.fontWeight = 'bold';
					songTitle.style.overflow = 'hidden';
					songTitle.style.textAlign = 'left';
					songTitle.style.lineHeight = 'normal';
					songTitle.style.textDecoration = 'none';
					if (historyItem.tracktitle != null){
						songTitle.appendChild(document.createTextNode(historyItem.tracktitle));
					} else {
						//songTitle.innerHTML = streampadPlayer.Playlist.array[i].text;
					}
					if (historyItem.trackaolid != null){
						songTitle.setAttribute('target', 'blank');
						songTitle.setAttribute('href', 'http://music.aol.com/song/id/'+historyItem.trackaolid);
						streampadPlayer.Event.add(songTitle, 'mouseover', streampadPlayer.UI.underlineElement);
						streampadPlayer.Event.add(songTitle, 'mouseout', streampadPlayer.UI.noUnderlineElement);
					}
					playlistItem.appendChild(songTitle);
					var artist = document.createElement('a');
					artist.setAttribute('id', 'streampadHistoryArtist'+i);
					artist.style.color = '#666666';
					artist.style.fontFamily = 'arial';
					artist.style.fontSize = '12px';
					artist.style.position = 'absolute';
					artist.style.left = '130px';
					artist.style.right = '0';
					artist.style.height = '14px';
					artist.style.top = '28px';
					artist.style.overflow = 'hidden';
					artist.style.textAlign = 'left';
					artist.style.lineHeight = 'normal';
					artist.style.textDecoration = 'none';
					if (historyItem.artistname != null){
						artist.appendChild(document.createTextNode(historyItem.artistname));
					} else {
						artist.appendChild(document.createTextNode(''));
					}
					if (historyItem.artistaolid != null){
						artist.setAttribute('target', 'blank');
						artist.setAttribute('href', 'http://music.aol.com/artist/id/'+historyItem.artistaolid);
						streampadPlayer.Event.add(artist, 'mouseover', streampadPlayer.UI.underlineElement);
						streampadPlayer.Event.add(artist, 'mouseout', streampadPlayer.UI.noUnderlineElement);
					}
					playlistItem.appendChild(artist);
					if (historyItem.sourceuri != null){
						var sourceu = document.createElement('a');
						sourceu.appendChild(document.createTextNode("via: "+historyItem.sourceuri));
						sourceu.setAttribute('href', historyItem.sourceuri);
						sourceu.setAttribute('target', 'blank');
						streampadPlayer.Event.add(sourceu, 'mouseover', streampadPlayer.UI.underlineElement);
						streampadPlayer.Event.add(sourceu, 'mouseout', streampadPlayer.UI.noUnderlineElement);
					} else {
						var sourceu = document.createElement('div');
						sourceu.appendChild(document.createTextNode("via: "+historyItem.devicename));
					}
					sourceu.style.color = '#666666';
					sourceu.style.fontFamily = 'arial';
					sourceu.style.fontSize = '10px';
					sourceu.style.position = 'absolute';
					sourceu.style.left = '130px';
					sourceu.style.right = '0';
					sourceu.style.height = '14px';
					sourceu.style.top = '42px';
					sourceu.style.overflow = 'hidden';
					sourceu.style.textAlign = 'left';
					sourceu.style.lineHeight = 'normal';
					sourceu.style.textDecoration = 'none';
					playlistItem.appendChild(sourceu);
					var divider = document.createElement('div');
					divider.style.height = '1px';
					if (streampadPlayer.browser.engine.trident4){
						divider.style.width = '97%';
					} else {
						divider.style.width = '100%';
					}
					divider.style.overflow = 'hidden';
					divider.style.background = 'url('+streampadPlayer.vars.imgHOST+'playlist-item-divider) no-repeat';
					playlistItem.appendChild(divider);
					
					}
			} else {
			
			}
		} else {
		
		}
	},
	underlineElement : function(e){
		e = e||window.event
		var target = e.currentTarget||e.srcElement;
		target.style.textDecoration = 'underline';
	},
	noUnderlineElement : function(e){
		e = e||window.event
		var target = e.currentTarget||e.srcElement;
		target.style.textDecoration = 'none';
	},
	buttonBorder : function(borderNum, onOff){
		document.getElementById('streampadPlayerBorderNum'+borderNum).style.backgroundPosition = streampadPlayer.Theme[onOff];
		var borderNumLeft = (parseInt(borderNum))+(1);
		document.getElementById('streampadPlayerBorderNum'+(borderNumLeft+'')).style.backgroundPosition = streampadPlayer.Theme[onOff];
	},
	setLoggedIn : function(){
		streampadPlayer.Theme.profileOff = '-170px 8px';
		streampadPlayer.Theme.profileOn = '-384px 8px';
		try {
			document.getElementById('streampadProfileButton').style.backgroundPosition = streampadPlayer.Theme.profileOff;
		} catch(e){}
	},
	showRightDrawerLoading : function(){
		try {
			var right = document.getElementById('streampadDrawerRight');
			var loadingDiv = document.createElement('div');
			loadingDiv.setAttribute('id', 'streampadPlayerRightDrawerLoader');
			streampadPlayer.Utils.setStyles(loadingDiv, {'background' : 'url('+streampadPlayer.vars.imgHOST+'horizontal-loader-black) no-repeat', 'width' : '96px', 'height' : '12px', 'position' : 'absolute', 'top' : '100px', 'left' : '45%'});
			right.appendChild(loadingDiv);
		} catch (e) {}
	},
	hideRightDrawerLoading : function(){
		try {
			var right = document.getElementById('streampadDrawerRight');
			var loadingDiv = document.getElementById('streampadPlayerRightDrawerLoader');
			right.removeChild(loadingDiv);
		} catch(e){}
	},
	profileDrawerLeftLoader : {
		show : function(){
			try {
				var left = document.getElementById('streampadDrawerLeft');
				left.innerHTML = '';
				var loadingDiv = document.createElement('div');
				loadingDiv.setAttribute('id', 'streampadPlayerLeftDrawerLoader');
				streampadPlayer.Utils.setStyles(loadingDiv, {'background' : 'url('+streampadPlayer.vars.imgHOST+'horizontal-loader-black) no-repeat', 'width' : '96px', 'height' : '12px', 'position' : 'absolute', 'top' : '100px', 'left' : '80px'});
				left.appendChild(loadingDiv);
			} catch(e){}
		},
		hide : function(){
			try {
				var left = document.getElementById('streampadDrawerLeft');
				var loadingDiv = document.getElementById('streampadPlayerLeftDrawerLoader');
				left.removeChild(loadingDiv);
			} catch(e){}
		}
	}
};
streampadPlayer.flash = {
	majorVersion : 0,
    getSWF : function(n) {
      if (document[n]) {
        return document[n];
      } else {
        return window[n];
      }
    },
    fsLoaded : function(){
    },
    /* called from Flash when the swf is initially loaded */
    loaded : function(volume, sn, drawersize, majorVersion){
    	window.clearTimeout(streampadPlayer.vars.isFlashLoaded);
    	streampadPlayer.flash.majorVersion = majorVersion;
    	if (streampadPlayer.vars.clientLogin == true){
    		if (sn != null){
    			streampadPlayer.vars.sn = sn;
    			streampadPlayer.UI.setLoggedIn();
    		}
    	}
    	/*streampadPlayer.vars.theVolume = volume;
    	streampadPlayer.vars.volumeDraggerY = (volume*-100)+103;
    	if (streampadPlayer.vars.volumeDraggerY > 103){
			streampadPlayer.vars.volumeDraggerY = 102;			
		}
		if (streampadPlayer.vars.volumeDraggerY < 12){
			streampadPlayer.vars.volumeDraggerY = 12;
		}*/
		streampadPlayer.vars.theVolume = volume*100;
		streampadPlayer.vars.volumeDraggerY = (streampadPlayer.vars.theVolume*-1)+103;
		if (streampadPlayer.vars.volumeDraggerY > 103){
			streampadPlayer.vars.volumeDraggerY = 102; 
		}
		if (streampadPlayer.vars.volumeDraggerY < 12){
			streampadPlayer.vars.volumeDraggerY = 12;
		}

		streampadPlayer.params.drawersize = drawersize;
		if (streampadPlayer.params.popup == 'true'){
			streampadPlayer.params.drawersize = 215;
		}
    	setTimeout(streampadPlayer.flash.fireLoaded, '100');
    },
    fireLoaded : function(){
    	streampadPlayer.Event.fire(window, 'flashLoaded', null);
    },
    setVolume : function(volume){
    	/*streampadPlayer.vars.theVolume = volume;
    	streampadPlayer.vars.volumeDraggerY = (volume*-100)+103;
    	if (streampadPlayer.vars.volumeDraggerY > 103){
			streampadPlayer.vars.volumeDraggerY = 102;			
		}
		if (streampadPlayer.vars.volumeDraggerY < 12){
			streampadPlayer.vars.volumeDraggerY = 12;
		}
		streampadPlayer.flash.getSWF("streampadFlash").setVolume(streampadPlayer.vars.theVolume);*/
		
		
		streampadPlayer.vars.theVolume = volume*100;
		streampadPlayer.vars.volumeDraggerY = (streampadPlayer.vars.theVolume*-1)+103;
		if (streampadPlayer.vars.volumeDraggerY > 103){
			streampadPlayer.vars.volumeDraggerY = 102; 
		}
		if (streampadPlayer.vars.volumeDraggerY < 12){
			streampadPlayer.vars.volumeDraggerY = 12;
		}
		streampadPlayer.flash.getSWF("streampadFlash").setVolume(streampadPlayer.vars.theVolume/100);
		
		
    },
    getVolume : function(){
    	return streampadPlayer.vars.theVolume/100;
    },
    getQueueNumber : function(){
    	return streampadPlayer.vars.queueNumber;
    },
    getPlaylist : function(){
    	return streampadPlayer.Playlist.array;
    },
    setPlaylist : function(){
    	try {
    		streampadPlayer.flash.getSWF("streampadFlash").setPlaylistandTotal(streampadPlayer.Playlist.array, streampadPlayer.Playlist.array.length);
    	} catch(e) {}
    },
    setSongVO : function(){
    	if (streampadPlayer.vars.currentSongVO != null){
    		try {
    			streampadPlayer.flash.getSWF("streampadFlash").setSongVO(streampadPlayer.vars.currentSongVO);
    		} catch(e) {}
    	}
    },
    inFull : function(b){
    	if (b){
    		streampadPlayer.AIM.startSession.request();
    	}
    },
    openWin : function(url){
    	window.open(url);
    },
    globalCheck : function(status){
    	streampadPlayer.vars.usCanada = status;
    	streampadPlayer.Event.fire(window, 'globalCheck', streampadPlayer.vars.usCanada);
    }
};
/* Event object which handles listening and firing of events */
streampadPlayer.Event = {
	listeners : {},
	add : function(target, type, fn){
		if (typeof this.listeners[type+target] == 'undefined') {
            this.listeners[type+target] = [];
        }
    	this.listeners[type+target].push(fn);
		if (target.addEventListener) {
	        target.addEventListener(type, fn, false);
		} else {
			target.attachEvent('on' + type, fn);
		}
	},
	remove : function(target, type, fn){
		if (typeof this.listeners[type+target] != 'undefined') {
			for (var i = 0, l; l = this.listeners[type+target][i]; i++) {
                if (l == fn) break;
            }
            this.listeners[type+target].splice(i, 1);
        }
		if (target.removeEventListener) {
			target.removeEventListener(type, fn, false);
		} else { 
			target.detachEvent('on' + type, fn);
		}
	},
	fire : function(target, type, object){
		if (typeof this.listeners[type+target] != 'undefined' && this.listeners[type+target].length) {
			var newArray = this.listeners[type+target].slice();
            for (var i = 0, l; l = newArray[i]; i++) {
            	l(object);
            }
            return true;           
        }
        return false;
	},
	stop : function(e){
		try {
			e.stopPropagation();
		} catch (e){
			try {
				window.event.cancelBubble = true;
			} catch (e) {}
		}
	}
};
/* playlists should create a songVO and then call streampadPlayer.Playlist.push(songVO)*/
streampadPlayer.SongVO = function(){
	this.text = null;
	this.enclosure = null;
	this.plays = null;
	this.sourceUrl = null;
	this.artist = null;
	this.artistAolId = null;
	this.album = null;
	this.albumAolId = null;
	this.songTitle = null;
	this.trackAolId = null;
	this.imageUrl = null;
	this.timestamp = null;
	this.itunes = null;
	this.amazon = null;
	this.description = null;
	this.clickFunction = null;
	this.nTrack = null;
	this.pubDate - null;
	this.textTitle = null;
	this.shareEnclosure = true;
	this.getMeta = true;
};
/* Main playlist. playlists should push songVO's into this array */
streampadPlayer.Playlist = {
	array : [],
	timer : null,
	push : function(object){
		clearInterval(streampadPlayer.Playlist.timer);
		this.array.push(object);
		if (streampadPlayer.vars.isWinamp){
			if (this.length == null){
				var r = window.external.PlayQueue.ClearQueue();
			}
			window.external.PlayQueue.Enqueue(object.enclosure, object.songTitle);
		}
		this.length = this.array.length;
		streampadPlayer.Playlist.timer = setInterval(streampadPlayer.Playlist.onChange, 1000);
	},
	onChange : function(){
		clearInterval(streampadPlayer.Playlist.timer);
		streampadPlayer.Event.fire(window, 'playlistChange', streampadPlayer.Playlist.array.length);
	},
	title : document.title,
	length : 0
};
/* call these functions to play a song.  */
streampadPlayer.Play = {
	/* internal method */
	play : function(){
		streampadPlayer.vars.isPlaying = true;
		if (streampadPlayer.vars.isWinamp){
			window.external.PlayQueue.cursor = streampadPlayer.vars.queueNumber;
			window.external.Transport.Play();
		} else {
			try {
				streampadPlayer.vars.currentSongVO.nTrack = streampadPlayer.vars.queueNumber;
			} catch (e) {}
			streampadPlayer.flash.getSWF("streampadFlash").playSong(streampadPlayer.vars.currentSongVO);
		} 
		streampadPlayer.Event.fire(window, 'setCurrent', streampadPlayer.vars.queueNumber);
	},
	/* plays a songVO from streampadPlayer.Playlist */
	queueNumber : function(n){
		if (n >= streampadPlayer.Playlist.array.length)
		return;
		streampadPlayer.vars.queueNumber = n;
		streampadPlayer.vars.currentSongVO = streampadPlayer.Playlist.array[n];
		streampadPlayer.UI.setCurrent(streampadPlayer.vars.currentSongVO);
		this.play();
	},
	/* Insert into current queueNumber and immediately play this songVO */
	songVO : function(songVO){
		streampadPlayer.Playlist.array.splice(streampadPlayer.vars.queueNumber, 0, songVO);
		this.queueNumber(streampadPlayer.vars.queueNumber);
	},
	/* immediately play this enclosure */
	enclosure : function(e){
		var songVO = new streampadPlayer.SongVO();
		songVO.enclosure = e;
		this.songVO(songVO);
	}
};
/* Utility functions */
streampadPlayer.Utils = {
	trimString : function(string, count){
		if (string.length > count){
			return string.slice(string, count)+'...';
		} else {
			return string;
		}
	},
	getBodyHeight : function(){
		if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			return document.documentElement.clientHeight;
  		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
   			return document.body.clientHeight;
		}
	},
	getBodyWidth : function(){
		if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			return document.documentElement.clientWidth;
  		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
   			return document.body.clientWidth;
		}
	},
	getWidthMarginSize : function(){
		var windowWidth = streampadPlayer.Utils.getBodyWidth();
		var bodyWidth = document.body.clientWidth;
		var marginSize = (windowWidth - bodyWidth) / 2;
		if (marginSize > 0) {
			return marginSize;
		} else {
			return 0;
		}
	},
	flashLoaded : function(){
		alert("It seems you don't have the latest version of Flash installed. Please visit http://get.adobe.com/flashplayer/ to get the latest version.");
	},
	scriptRequest : function(url){
		var s = document.createElement('script');
		s.setAttribute('src', url);
		var bottomBar = document.getElementById('streampadBottomBar');
		bottomBar.appendChild(s);
	},
	scriptClean : function(){
		var bottomBar = document.getElementById('streampadBottomBar');
		var scripts = bottomBar.getElementsByTagName('script');
		for (i=0; i < scripts.length; i++){
			try {
				bottomBar.removeChild(scripts[i]);
			} catch (e){}
		}	
	},
	setStyles : function(element, styleObject){
		for (i in styleObject){
			element.style[i] = styleObject[i];
		}
	},
	getX : function(o){ 
		var x = o.offsetLeft
		if (o.offsetParent) while (o.offsetParent) { o = o.offsetParent; x += o.offsetLeft }
		return x
	},
	getY : function(o){
		var s = o
		var y = o.offsetTop
		if (o.offsetParent) while (o.offsetParent) { o = o.offsetParent; y += o.offsetTop }
		var html = document.getElementsByTagName('html')[0]
		if (s.parentNode) while(s.parentNode) {
			s = s.parentNode
			if (s.scrollTop && s != document && s != document.body && s != html) y -= s.scrollTop
		}
		return y
	},
	chunk : function(a, s){
   // for(var x, i = 0, c = -1, l = a.length, n = []; i < l; i++)
        //(x = i % s) ? n[c][x] = a[i] : n[++c] = [a[i]];
    	//return n;
    	var base = [], i;
    	for(i=0; i<a.length; i+=s ) { 
    		base.push( a.slice( i, i+s ) ); 
    	}    
    	return base;
	},
	getSongArtist : function(){
		var s = "";
		if (streampadPlayer.vars.currentSongVO.text != null){
			s = streampadPlayer.vars.currentSongVO.text;
		}
		if (streampadPlayer.vars.currentSongVO.songTitle != null){
			s = streampadPlayer.vars.currentSongVO.songTitle;
			if (streampadPlayer.vars.currentSongVO.artist != null){
				s += " by "+streampadPlayer.vars.currentSongVO.artist;
			}
		}
		return s;
	}
}
/* Now Playing */
streampadPlayer.NowPlaying = {
	meta : {
		playlistLength : 0,
		determine : function(){
			try {
				if (streampadPlayer.vars.getAudioMeta == true){
					var array = [];
					var l = streampadPlayer.Playlist.array.length - streampadPlayer.NowPlaying.meta.playlistLength;
					for (var i = streampadPlayer.NowPlaying.meta.playlistLength; i < streampadPlayer.Playlist.array.length; i++){
						if (streampadPlayer.Playlist.array[i].getMeta == true){
							var o = {"sourceUrl" : streampadPlayer.Playlist.array[i].sourceUrl, "enclosure" : streampadPlayer.Playlist.array[i].enclosure};
							array.push(o); 
						}
					}
					var bigArray = streampadPlayer.Utils.chunk(array, 20);
					for (var j = 0; j < bigArray.length; j++){
						var newArray = bigArray[j];
						//newArray = streampadPlayer.flash.getSWF("streampadFlash").JSONEncode(newArray);
						newArray = JSON.stringify(newArray);
						newArray = escape(newArray);
						streampadPlayer.NowPlaying.meta.request(newArray);
						streampadPlayer.NowPlaying.meta.playlistLength = streampadPlayer.Playlist.array.length;
					}
				} else {
					streampadPlayer.Event.fire(window, 'gotMetadata', null);
				}
			} catch (e) {}
		},
		request : function(data){
			try {
				streampadPlayer.flash.getSWF("streampadFlash").jsonPoster(streampadPlayer.params.metaurl, 'f=json&data='+data, 'streampadPlayer.NowPlaying.meta.response', "POST");
			} catch (e){
				streampadPlayer.Utils.scriptRequest(streampadPlayer.params.metaurl+'?c=streampadPlayer.NowPlaying.meta.response&f=json&data='+data);
			}
		},
		response : function(json){
			if (json.response.statusCode == 200){
				try {
					if (json.response.data.streams.stream.length != undefined){
						for (j = 0; j < json.response.data.streams.stream.length; j++){
							var object = json.response.data.streams.stream[j];
							this.matchSongs(object);
							if (streampadPlayer.params.showdrawer){
								streampadPlayer.UI.fillPlaylistItems();
								streampadPlayer.UI.fillPlaylistDrawer();
							}
						}	
					} 
				} catch (e){};
				streampadPlayer.vars.currentSongVO = streampadPlayer.Playlist.array[streampadPlayer.vars.queueNumber];
				//streampadPlayer.Event.fire(window, 'setCurrent', streampadPlayer.vars.queueNumber);
				streampadPlayer.Event.fire(window, 'gotMetadata', json);
			}
		},
		matchSongs : function(object){
			for (i = 0; i < streampadPlayer.Playlist.array.length; i++){
				if (object.enclosure == streampadPlayer.Playlist.array[i].enclosure){
					try {
						if (object.songTitle != 'null'){
							streampadPlayer.Playlist.array[i].songTitle = object.songTitle;
						}
					} catch(e){}
					try {
						if (object.artist != 'null'){
							streampadPlayer.Playlist.array[i].artist = object.artist;
						}
					} catch(e){}
					try {
						if (object.album != 'null'){
							streampadPlayer.Playlist.array[i].album = object.album;
						}
					} catch(e){}
					try {
						if (object.imageUrl != 'null' && streampadPlayer.Playlist.array[i].imageUrl == null){
							if (object.imageUrl == 'http://o.aolcdn.com/art/ch_music2/no_art.jpg'){
								object.imageUrl = null;
							}
							streampadPlayer.Playlist.array[i].imageUrl = object.imageUrl;
						}
					} catch(e){}
					try {
						if (object.artistAolId != 'null'){
							streampadPlayer.Playlist.array[i].artistAolId = object.artistAolId;
						}
					} catch(e){}
					try {
						if (object.trackAolId != 'null'){
							streampadPlayer.Playlist.array[i].trackAolId = object.trackAolId;
						}
					} catch(e){}
					try {
						if (object.albumAolId != 'null'){
							streampadPlayer.Playlist.array[i].albumAolId = object.albumAolId;
						}
					} catch(e){}
				}
			}
		}	
	},
	set : {
		request : function(){
			if (streampadPlayer.vars.currentSongVO.enclosure != null){
				object = {};
				if (streampadPlayer.vars.currentSongVO.shareEnclosure == true){
					object.enclosure = streampadPlayer.vars.currentSongVO.enclosure;
				}
				if (streampadPlayer.vars.currentSongVO.songTitle != null){
					object.songTitle = streampadPlayer.vars.currentSongVO.songTitle;
				} else {
					object.songTitle = streampadPlayer.vars.currentSongVO.text.substring(0, 30);
				}
				if (streampadPlayer.vars.currentSongVO.artist != null){
					object.artist = streampadPlayer.vars.currentSongVO.artist;
				}
				if (streampadPlayer.vars.currentSongVO.album != null){
					object.album = streampadPlayer.vars.currentSongVO.album;
				}
				if (streampadPlayer.vars.currentSongVO.imageUrl != null){
					object.imageUrl = streampadPlayer.vars.currentSongVO.imageUrl;
				}
				if (streampadPlayer.vars.currentSongVO.sourceUrl != null){
					object.sourceUrl = streampadPlayer.vars.currentSongVO.sourceUrl;
				}
				if (streampadPlayer.vars.currentSongVO.artistAolId != null){
					object.artistAolId = streampadPlayer.vars.currentSongVO.artistAolId;
				}
				if (streampadPlayer.vars.currentSongVO.trackAolId != null){
					object.trackAolId = streampadPlayer.vars.currentSongVO.trackAolId;
				}
				object.tzo = new Date().getTimezoneOffset();
				//object = streampadPlayer.flash.getSWF("streampadFlash").JSONEncode(object);
				object = JSON.stringify(object);
				object = encodeURIComponent(object);

        // removed by taber, aug 13, 2012 - nowplayingurl redirects to a dynapub url (eg: http://dynapub.music.aol.com/api/nowplaying/set...) which no longer exists
				//streampadPlayer.Utils.scriptRequest(streampadPlayer.params.nowplayingurl+'set?c=streampadPlayer.NowPlaying.set.response&f=json&data='+object);
			}
		},
		response : function(json){
		}
	}
}
streampadPlayer.Event.add(window, 'playlistChange', streampadPlayer.NowPlaying.meta.determine);
streampadPlayer.Event.add(window, 'gotMetadata', streampadPlayer.flash.setPlaylist);
streampadPlayer.Event.add(window, 'gotMetadata', streampadPlayer.flash.setSongVO);
SPAPI.addEventListener('onStart', streampadPlayer.Events.insertFullScreen);
streampadPlayer.Event.add(window, 'setCurrent', streampadPlayer.NowPlaying.set.request);
/* hack for IE6 to show alpha pngs */
function streampadPlayerFixPNG(el) {
    if (streampadPlayer.browser.engine.trident4) {
		var imgURL = el.style.backgroundImage;
		el.style.background = '';
		el.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='crop', src=" + imgURL.match(/\((.+)\)/)[1] + ")";
    }
};
/* omniture */
streampadPlayer.Omni = {
	request : function(){
/*		var omnTS=new Date();
		var omnTS1=omnTS.getDate()+'/'+omnTS.getMonth()+'/'+omnTS.getFullYear()+' '+omnTS.getHours()+':'+omnTS.getMinutes()+':'+omnTS.getSeconds()+' '+omnTS.getDay()+' '+omnTS.getTimezoneOffset();
 	var omUrl='http://o.sa.aol.com/b/ss/' + 'aolstreampadapp' + '/1/H.15.1/' +Math.ceil(Math.random()*100000000000000) +'?[AQB]&ndh=1&t='+encodeURIComponent(omnTS1) +'&ns=aolllc&cl=63072000' +'&pageName=' +encodeURIComponent(streampadPlayer.Playlist.title)+'&c1='+streampadPlayer.vars.playlistType+'&c12='+encodeURIComponent(streampadPlayer.vars.siteId) +'&c16='+streampadPlayer.vars.total+'&g='+encodeURIComponent(document.URL)+'&pe=lnk_o' +'&pev2='+encodeURIComponent(streampadPlayer.Playlist.title)+'&[AQE]';
		var i = new Image();
		i.setAttribute('src', omUrl);
		var dlUrl = "http://b.aol.com/ping?h="+encodeURIComponent('streampad.com')+"&ts="+omnTS.getTime()+"&r="+encodeURIComponent(streampadPlayer.vars.siteId)+"&p="+encodeURIComponent(streampadPlayer.Playlist.title)+"&t="+streampadPlayer.vars.playlistType+"&s="+streampadPlayer.vars.total;
		var di = new Image();
		di.setAttribute('src', dlUrl);*/
	}
}
streampadPlayer.AIM = {
	status : {
		set : {
			request : function(){
				if (streampadPlayer.vars.clientLogin == true){
					if (streampadPlayer.flash.getSWF("streampadFlash").getasb(streampadPlayer.vars.sn)){
						streampadPlayer.flash.getSWF("streampadFlash").setStatus(streampadPlayer.vars.currentSongVO, 'streampadPlayer.AIM.status.set.response');
					}
				} else {
					if (streampadPlayer.vars.currentSongVO.songTitle != null){
						var artist = '';
						if (streampadPlayer.vars.currentSongVO.artist != null){
							artist = ' by '+streampadPlayer.vars.currentSongVO.artist;
						}
						if (streampadPlayer.OpenAuth.token != null){
							if (streampadPlayer.flash.getSWF("streampadFlash").getasb(streampadPlayer.vars.sn)){
								streampadPlayer.Utils.scriptRequest(streampadPlayer.params.aimurl+'presence/setStatus?f=json&c=streampadPlayer.AIM.status.set.response&k='+streampadPlayer.OpenAuth.devId+'&a='+streampadPlayer.OpenAuth.token+'&statusMsg=%E2%99%AB%20'+encodeURIComponent(streampadPlayer.vars.currentSongVO.songTitle+artist));
							}
						}
					} 
				}
			},
			response : function(json){
			}
		}
	},
	buddylist : {
		request : function(){
			streampadPlayer.UI.showRightDrawerLoading();
			if (streampadPlayer.vars.clientLogin == true){
				streampadPlayer.flash.getSWF("streampadFlash").getBuddylist('streampadPlayer.AIM.buddylist.response');
			} else {
				if (streampadPlayer.OpenAuth.token != null){
					streampadPlayer.Utils.scriptRequest(streampadPlayer.params.aimurl+'presence/get?f=json&c=streampadPlayer.AIM.buddylist.response&k='+streampadPlayer.OpenAuth.devId+'&a='+streampadPlayer.OpenAuth.token+'&bl=1&presenceIcon=0&capabilities=1&statusMsg=1&location=0');
				}
			}
		},
		response : function(json){
			streampadPlayer.UI.hideRightDrawerLoading();
			if (json.response.statusCode == 200){
				try {
					var musicBuddies = streampadPlayer.AIM.buddylist.getMusicBuddies(json.response.data.groups);
					var right = document.getElementById('streampadDrawerRight');
					var buddyContainer = document.createElement('div');
					buddyContainer.setAttribute('id', 'streampadBuddyContainer');
					streampadPlayer.Utils.setStyles(buddyContainer, {'position' : 'absolute', 'top' : '37px', 'left' : '0', 'bottom' : '0', 'width' : '100%', 'overflow' : 'auto'});
					if (streampadPlayer.browser.engine.trident4){
						buddyContainer.style.height = (streampadPlayer.params.drawersize-37)+'px';
					}
					right.appendChild(buddyContainer);
					var len = musicBuddies.length;
					if (len > 0){
						for (var i = 0; i < len; i++){
							var buddy = streampadPlayer.UI.createBuddy(musicBuddies[i]);
							buddyContainer.appendChild(buddy);
						}
					} else {
						var noBuddies = document.createElement('div');
						noBuddies.appendChild(document.createTextNode('You do not have any buddies listening to music right now'));
						streampadPlayer.Utils.setStyles(noBuddies, {'position' : 'absolute', 'top' : '100px', 'left' : '30%', 'fontFamily' : 'arial', 'fontSize' : '14px', 'fontWeight' : 'bold'});
						right.appendChild(noBuddies);
					}	
				} catch (e){}
			}
			streampadPlayer.Event.fire(window, "buddylistResponse", json);
			streampadPlayer.AIM.startSession.request();
		},
		getMusicBuddies : function(groups){
			var musicBuddies = []
			var len = groups.length;
			for (var i = 0; i < len; i++){
				var buddies = groups[i].buddies;
				var buddiesLen = buddies.length;
				for (var j = 0; j < buddiesLen; j++){
					var buddy = buddies[j];
					try {
						if (buddy.statusMsg.indexOf('â™«') != -1){
							musicBuddies.push(buddy);
						}
					} catch (e) {}
				}
			}
			streampadPlayer.Event.fire(window, "musicBuddies", musicBuddies);
			return musicBuddies;
		}	
	},
	startSession : {
		started : false,
		aimsid : null,
		fetchBaseUrl : null,
		events : 'presence',
		capabilities : '91a3c7404a32bf26cc4048eba5452f0d',
		request : function(){
			if (streampadPlayer.AIM.startSession.started == false){
				if (streampadPlayer.vars.clientLogin == true){
					streampadPlayer.flash.getSWF("streampadFlash").startSession(true, streampadPlayer.AIM.startSession.events, '1', streampadPlayer.AIM.startSession.capabilities, 'streampadPlayer.AIM.startSession.response');
				} else {
					if (streampadPlayer.OpenAuth.token != null){
						streampadPlayer.Utils.scriptRequest(streampadPlayer.params.aimurl+'aim/startSession?f=json&c=streampadPlayer.AIM.startSession.response&k='+streampadPlayer.OpenAuth.devId+'&a='+streampadPlayer.OpenAuth.token+'&events='+streampadPlayer.AIM.startSession.events+'&assertCaps='+streampadPlayer.AIM.startSession.capabilities+'&interestCaps='+streampadPlayer.AIM.startSession.capabilities);
					}
				}
			}
		},
		response : function(json){
			if (json.response.statusCode == 200){
				streampadPlayer.AIM.startSession.started = true;
				streampadPlayer.AIM.startSession.aimsid = json.response.data.aimsid;
				streampadPlayer.AIM.startSession.fetchbaseUrl = json.response.data.fetchBaseURL;
				var obj = streampadPlayer.AIM.fetchEvents.parse();
				streampadPlayer.flash.getSWF("streampadFlash").fetchEventsStart(obj.url, obj.port, obj.get, 'streampadPlayer.AIM.fetchEvents.response');
			}
			if (json.response.statusCode == 607){
				streampadPlayer.AIM.startSession.started = true;
				setTimeout(streampadPlayer.AIM.startSession.rateLimitEnd, 300000);
			}
		},
		rateLimitEnd : function(){
			streampadPlayer.AIM.startSession.started = false;
		}
	},
	fetchEvents : {
		connectData : {},
		parse : function(){
			var fetchBase = streampadPlayer.AIM.startSession.fetchbaseUrl;
			var splits = fetchBase.split("/aim");
			var urlsplits = splits[0].split("http://");
			var url = urlsplits[1];
			var portsplits = url.split(":");
			streampadPlayer.AIM.fetchEvents.connectData.url = portsplits[0];
			streampadPlayer.AIM.fetchEvents.connectData.port = 80;
			if (portsplits[1]){
				streampadPlayer.AIM.fetchEvents.connectData.port = parseInt(portsplits[1]);
			}
			streampadPlayer.AIM.fetchEvents.connectData.get = "/aim"+splits[1];
			return streampadPlayer.AIM.fetchEvents.connectData;
		},
		request : function(){
			streampadPlayer.flash.getSWF("streampadFlash").fetchEventsStart(streampadPlayer.AIM.fetchEvents.connectData.url, streampadPlayer.AIM.fetchEvents.connectData.port, streampadPlayer.AIM.fetchEvents.connectData.get, 'streampadPlayer.AIM.fetchEvents.response');
		},
		response : function(json){
			if (json != null){
				if (json.response.statusCode == 200){
					streampadPlayer.AIM.startSession.fetchbaseUrl = json.response.data.fetchBaseURL;
					var obj = streampadPlayer.AIM.fetchEvents.parse();
					setTimeout(streampadPlayer.AIM.fetchEvents.request, json.response.data.timeToNextFetch);
					var len = json.response.data.events.length;
					for (var i = 0; i < len; i++){
						var eventData = json.response.data.events[i].eventData;
						streampadPlayer.UI.modifyBuddy(eventData);
					}
				}
			streampadPlayer.Event.fire(window, 'aimfetch', json);
			} else {
				streampadPlayer.AIM.fetchEvents.request();
			}
		}
	},
	avTrack : {
		set : {
			request : function(){
				if (streampadPlayer.flash.getSWF("streampadFlash").getasb(streampadPlayer.vars.sn)){
					var str = "";
					if (streampadPlayer.vars.currentSongVO.enclosure != null && streampadPlayer.vars.currentSongVO.shareEnclosure == true){
						str += "&uri="+encodeURIComponent(streampadPlayer.vars.currentSongVO.enclosure);
					}
					if (streampadPlayer.vars.currentSongVO.songTitle != null){
						str += "&title="+encodeURIComponent(streampadPlayer.vars.currentSongVO.songTitle);
					} else {
						str += "&title="+encodeURIComponent(streampadPlayer.vars.currentSongVO.text.substring(0, 30));
					}
					if (streampadPlayer.vars.currentSongVO.artist != null){
						str += "&artist="+encodeURIComponent(streampadPlayer.vars.currentSongVO.artist);
					}
					if (streampadPlayer.vars.currentSongVO.album != null){
						str += "&album="+encodeURIComponent(streampadPlayer.vars.currentSongVO.album);
					}
					if (streampadPlayer.vars.currentSongVO.imageUrl != null){
						str += "&image="+encodeURIComponent("width=200,height=200,src="+streampadPlayer.vars.currentSongVO.imageUrl);
					}
					if (streampadPlayer.vars.currentSongVO.sourceUrl != null){
						str += "&playlistLink="+encodeURIComponent(streampadPlayer.vars.currentSongVO.sourceUrl);
					}
					if (streampadPlayer.vars.currentSongVO.artistAolId != null){
						str += "&artistLink="+encodeURIComponent("http://music.aol.com/artist/artist/"+streampadPlayer.vars.currentSongVO.artistAolId);
					}
					if (streampadPlayer.vars.currentSongVO.trackAolId != null){
						str += "&titleLink="+encodeURIComponent("http://music.aol.com/song/song/"+streampadPlayer.vars.currentSongVO.trackAolId);
					}
					str += "&startDate="+Math.round(new Date().getTime()/1000.0);
					str = str.replace(/%26/g, '%26amp;');
					if (streampadPlayer.vars.clientLogin == true){
						streampadPlayer.flash.getSWF("streampadFlash").setAVTrack(streampadPlayer.vars.currentSongVO, 'streampadPlayer.AIM.avTrack.set.response');
					} else {
						if (streampadPlayer.OpenAuth.token != null){
							streampadPlayer.Utils.scriptRequest(streampadPlayer.params.aimurl+'aim/setAvTrack?f=json&c=streampadPlayer.AIM.avTrack.set.response&k='+streampadPlayer.OpenAuth.devId+'&a='+streampadPlayer.OpenAuth.token+str);
						}
					}
				}	  
			},
			response : function(json){
			}
		},
		get : {
			
		}
	}
}
streampadPlayer.Event.add(window, 'setCurrent', streampadPlayer.AIM.status.set.request);
streampadPlayer.Event.add(window, 'setCurrent', streampadPlayer.AIM.avTrack.set.request);
/* browser detection adapted from MooTools 1.2 */
streampadPlayer.browser = {};
if (window.opera) streampadPlayer.browser.engine = {name: 'presto', version: (document.getElementsByClassName) ? 950 : 925};
else if (window.ActiveXObject) streampadPlayer.browser.engine = {name: 'trident', version: (window.XMLHttpRequest) ? 5 : 4};
else if (!navigator.taintEnabled) streampadPlayer.browser.engine = {name: 'webkit', version: (document.evaluate) ? 420 : 419};
else if (navigator.product == "Gecko") streampadPlayer.browser.engine = {name: 'gecko', version: (document.getElementsByClassName) ? 19 : 18};
streampadPlayer.browser.engine[streampadPlayer.browser.engine.name] = streampadPlayer.browser.engine[streampadPlayer.browser.engine.name + streampadPlayer.browser.engine.version] = true;
try {
	window.external.Transport.RegisterForEvents(streampadPlayer.Events.winampTransport);
	streampadPlayer.vars.isWinamp = true;
} catch (e){
	streampadPlayer.vars.isWinamp = false;
}
(function(){
	var domready = function(){
		if (streampadPlayer.browser.loaded) return;
		streampadPlayer.browser.loaded = true;
		streampadPlayer.init();
		streampadPlayer.Event.fire(window, "ready");
	};
	switch (streampadPlayer.browser.engine.name){
		case 'webkit': (function(){
			if (document.readyState == 'loaded' || document.readyState == 'complete'){
				domready();	
			} else {
				setTimeout(arguments.callee, 50);
			}
		})(); 
		break;
		case 'trident':
			var temp = document.createElement('div');
			(function(){
				try {
					(function(){
						temp.doScroll('left');
						temp.innerHTML = 'temp';
						document.body.appendChild(temp);
						document.body.removeChild(temp);
						domready();
					})();
				} catch (e){
					setTimeout(arguments.callee, 50);
				}
			})();
		break;
		default:
			streampadPlayer.Event.add(window, 'load', domready);
			streampadPlayer.Event.add(document, 'DOMContentLoaded', domready);
		}
})();
/* listen for browser resize events */
streampadPlayer.Event.add(window, 'resize', streampadPlayer.UI.resize);
/* ie6 hack for scrolling */
if (streampadPlayer.browser.engine.trident4){
	document.execCommand("BackgroundImageCache", false, true);
	streampadPlayer.Event.add(window, 'scroll', streampadPlayer.Events.scrollHandler);
}
streampadPlayer.OpenAuth = {
	token : null,
	devId : null,
	setToken : function(_devId, _token, _sn){
		streampadPlayer.OpenAuth.devId = _devId;
		streampadPlayer.OpenAuth.token = _token;
		if (_sn != null){
			streampadPlayer.vars.sn = _sn;
		}
		if (streampadPlayer.OpenAuth.token != null && streampadPlayer.vars.sn != null && streampadPlayer.vars.sn != ''){
			streampadPlayer.UI.setLoggedIn();
		}
	}
}
streampadPlayer.Charts = {
	getUserPlayHist : {
		request : function(){
      return;
      // removed by taber, aug 31, 2012 - getUserPlayHist redirects to a dynapub.xyz url which no longer exists
			/*streampadPlayer.UI.showRightDrawerLoading();
			if (streampadPlayer.vars.clientLogin == true){
				streampadPlayer.flash.getSWF("streampadFlash").getUserPlayHist('streampadPlayer.Charts.getUserPlayHist.response');
			} else {
				if (streampadPlayer.OpenAuth.token != null){
					streampadPlayer.Utils.scriptRequest(streampadPlayer.params.chartsurl+'getUserPlayHist?f=json&t='+streampadPlayer.vars.sn+'&devId='+streampadPlayer.OpenAuth.devId+'&c=streampadPlayer.Charts.getUserPlayHist.response&a='+streampadPlayer.OpenAuth.token+'&rows=20');
				}
			}*/
		},
		response : function(json){
			streampadPlayer.UI.hideRightDrawerLoading();
			if (json.response.statusCode == 200){
				streampadPlayer.UI.fillHistoryItems(json.response.data);
			}
		}
	},
	setPlayData : {
		request : function(){
			var tzo = new Date().getTimezoneOffset();
			var app = encodeURIComponent(location.host);
			if (app.length > 3){
					app = app.slice(0,63);
			}
			var requestString = '&tzo='+tzo;
			if (streampadPlayer.vars.currentSongVO.songTitle != null){
					requestString += '&ttitle='+escape(streampadPlayer.vars.currentSongVO.songTitle);
				} else {
					requestString += '&ttitle='+escape(streampadPlayer.vars.currentSongVO.text.substring(0, 30));
				}
			if (streampadPlayer.vars.currentSongVO.artist != null){
				requestString += '&aname='+escape(streampadPlayer.vars.currentSongVO.artist);
			}
			if (streampadPlayer.vars.currentSongVO.album != null){
				requestString += '&altitle='+escape(streampadPlayer.vars.currentSongVO.album);
			}
			if (streampadPlayer.vars.currentSongVO.sourceUrl != null){
				requestString += '&source='+escape(streampadPlayer.vars.currentSongVO.sourceUrl);
			}
			if (streampadPlayer.vars.currentSongVO.artistAolId != null){
				requestString += '&aid='+escape(streampadPlayer.vars.currentSongVO.artistAolId);
			}
			if (streampadPlayer.vars.currentSongVO.trackAolId != null){
				requestString += '&tid='+escape(streampadPlayer.vars.currentSongVO.trackAolId);
			}
			if (streampadPlayer.vars.currentSongVO.albumAolId != null){
				requestString += '&alid='+escape(streampadPlayer.vars.currentSongVO.albumAolId);
			}
			if (streampadPlayer.vars.currentSongVO.enclosure != null && streampadPlayer.vars.currentSongVO.shareEnclosure == true){
				requestString += '&asset='+escape(streampadPlayer.vars.currentSongVO.enclosure);
			}
			if (streampadPlayer.vars.clientLogin == true){
				if (streampadPlayer.flash.getSWF("streampadFlash").getdsb(streampadPlayer.vars.sn)){
					streampadPlayer.flash.getSWF("streampadFlash").setPlayData(streampadPlayer.vars.currentSongVO, tzo, app, 'streampad', 'streampadPlayer.Charts.setPlayData.response');
				} else {
          // removed by taber, aug 31, 2012 - chartsurl redirects to a dynapub.xyz type of url which no longer exists
					//streampadPlayer.Utils.scriptRequest(streampadPlayer.params.chartsurl+'SetPlayData?f=json&c=streampadPlayer.Charts.setPlayData.response&devId='+streampadPlayer.OpenAuth.devId+'&appname='+app+'&device=streampad'+requestString);
				}
			} else {
        // removed by taber, aug 31, 2012 - chartsurl redirects to a dynapub.xyz type of url which no longer exists
				/*if (streampadPlayer.OpenAuth.token != null){
					if (streampadPlayer.flash.getSWF("streampadFlash").getdsb(streampadPlayer.vars.sn)){
						streampadPlayer.Utils.scriptRequest(streampadPlayer.params.chartsurl+'SetPlayData?f=json&c=streampadPlayer.Charts.setPlayData.response&devId='+streampadPlayer.OpenAuth.devId+'&a='+streampadPlayer.OpenAuth.token+'&appname='+app+'&device=streampad'+requestString)
					}
				} else {
					streampadPlayer.Utils.scriptRequest(streampadPlayer.params.chartsurl+'SetPlayData?f=json&c=streampadPlayer.Charts.setPlayData.response&devId='+streampadPlayer.OpenAuth.devId+'&appname='+app+'&device=streampad'+requestString);
				}*/
			}
		},
		response : function(json){
		}
	}
}
streampadPlayer.lastfm = {
	username : null,
	userurl : null,
	imageurl : null,
	playcount : null,
	auth : {
		token : null,
		getToken : {
			request : function(){
				streampadPlayer.UI.profileDrawerLeftLoader.show();
				streampadPlayer.Utils.scriptRequest('http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=6c946ca5274b2f396e5031c12c39400c&format=json&callback=streampadPlayer.lastfm.auth.getToken.response');
			},
			response : function(json){
				try {
					streampadPlayer.lastfm.auth.token = json.token;
					streampadPlayer.UI.fillLastFMLoginProfileDrawerLeft(streampadPlayer.lastfm.auth.token);
					streampadPlayer.UI.fillLastFMRightPromo();
				} catch (e) {};
				streampadPlayer.UI.profileDrawerLeftLoader.hide();
			}
		},
		getSession : {
			request : function(){
				streampadPlayer.UI.profileDrawerLeftLoader.show();
				streampadPlayer.flash.getSWF("streampadFlash").lastfmAuthGetSession(streampadPlayer.lastfm.auth.token, 'streampadPlayer.lastfm.user.getInfo.response');
			}
		},
		authorizePopup : {
			open : function(token, key){
				streampadPlayer.vars.lastfmpopup = window.open('http://www.last.fm/api/auth/?api_key=6c946ca5274b2f396e5031c12c39400c&token='+token, 'streampadlastfm','resizable=yes,scrollbars=yes,toolbar=no,width=980,height=500');
			streampadPlayer.vars.lastfmpopupcheck = setInterval(streampadPlayer.lastfm.auth.authorizePopup.check, 1000);
			},
			check : function(){
				if (streampadPlayer.vars.lastfmpopup.closed == true){
					clearInterval(streampadPlayer.vars.lastfmpopupcheck);
					streampadPlayer.lastfm.auth.getSession.request();
				} 
			}
		}
	},
	user : {
		getInfo : {
			request : function(){
				if (streampadPlayer.lastfm.username == null){
					streampadPlayer.flash.getSWF("streampadFlash").lastfmUserGetInfo('streampadPlayer.lastfm.user.getInfo.response');
				} else {
					streampadPlayer.UI.fillLastFMProfileDrawerLeft(streampadPlayer.lastfm.username, streampadPlayer.lastfm.userurl, streampadPlayer.lastfm.imageurl, streampadPlayer.lastfm.playcount);
					streampadPlayer.lastfm.user.getRecentTracks.request();
				}
			},
			response : function(username, userurl, imageurl, playcount){
				try {
					document.getElementById('streampadPlayerLoginLoader').style.display = 'none';
				} catch (e){};
				try {
					var right = document.getElementById('streampadDrawerRight');
					var promo = document.getElementById('streampadPlayerLastFMPromo');
					right.removeChild(promo);
				} catch(e){}
				streampadPlayer.UI.profileDrawerLeftLoader.hide();
				streampadPlayer.lastfm.username = username;
				streampadPlayer.lastfm.userurl = userurl;
				streampadPlayer.lastfm.imageurl = imageurl;
				streampadPlayer.lastfm.playcount = playcount;
				if (streampadPlayer.lastfm.username != null){
					streampadPlayer.UI.fillLastFMProfileDrawerLeft(streampadPlayer.lastfm.username, streampadPlayer.lastfm.userurl, streampadPlayer.lastfm.imageurl, streampadPlayer.lastfm.playcount);
					streampadPlayer.lastfm.user.getRecentTracks.request();
				} else {
					streampadPlayer.lastfm.auth.getToken.request();
				}
			}
		},
		getRecentTracks : {
			request : function(){
				streampadPlayer.UI.showRightDrawerLoading();
				streampadPlayer.Utils.scriptRequest('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=6c946ca5274b2f396e5031c12c39400c&format=json&callback=streampadPlayer.lastfm.user.getRecentTracks.response&user='+streampadPlayer.lastfm.username);
			},
			response : function(json){
				streampadPlayer.UI.hideRightDrawerLoading();
				if (!json.error){
					streampadPlayer.UI.fillLastFMProfileDrawerRight(json.recenttracks.track);
				} else {
				}
			}
		},
		logout : function(){
			streampadPlayer.flash.getSWF("streampadFlash").lastfmLogout();
			streampadPlayer.lastfm.username = null;
			streampadPlayer.lastfm.userurl = null;
			streampadPlayer.lastfm.imageurl = null;
			streampadPlayer.lastfm.playcount = null;
			streampadPlayer.UI.fillLastFMDrawer();
		}
	}
}
streampadPlayer.Bitly = {
	url : 'http://api.bit.ly/',
	version : '2.0.1',
	login : 'streampad',
	apiKey : 'R_c9d8ee14fd2afba2ebb387d9977d3259',
	shorten : {
		request : function(longUrl){
			longUrl = encodeURIComponent(longUrl);
			streampadPlayer.Utils.scriptRequest(streampadPlayer.Bitly.url+'shorten?history=1&callback=streampadPlayer.Bitly.shorten.response&version='+streampadPlayer.Bitly.version+'&longUrl='+longUrl+'&login='+streampadPlayer.Bitly.login+'&apiKey='+streampadPlayer.Bitly.apiKey);
		},
		response : function(json){
			var shortUrl = "";
			if (json.errorCode == 0){
				for (var i in json.results){
					shortUrl = json.results[i].shortUrl;
				}
			}
			streampadPlayer.Event.fire(window, 'bitlyShorten', shortUrl);
		}
	}
}
streampadPlayer.Twitter = {
	shorten : {
		request : function(){
			streampadPlayer.Event.add(window, 'bitlyShorten', streampadPlayer.Twitter.shorten.response);
			var enclosure = streampadPlayer.vars.currentSongVO.enclosure;
			var encryptedUrl = encodeURIComponent(streampadPlayer.flash.getSWF("streampadFlash").getEncryptedSong(enclosure));
			var songArtist = streampadPlayer.Utils.getSongArtist();
			var url = 'http://www.streampad.com/play/'+songArtist+'/'+encryptedUrl;
			streampadPlayer.Bitly.shorten.request(url);
		},
		response : function(url){
			streampadPlayer.Event.remove(window, 'bitlyShorten', streampadPlayer.Twitter.shorten.response);
			var textArea = document.createElement('textarea');
			var songArtist = streampadPlayer.Utils.getSongArtist();
			var textNode = "â™« Listening to "+songArtist+" on @streampad "+url;
			textArea.appendChild(document.createTextNode(textNode));
			streampadPlayer.Utils.setStyles(textArea, {'width' : '500px', 'height' : '60px', 'margin' : '20px', 'border' : '2px solid #C0DEED', 'padding' : '10px'});
			var right = document.getElementById('streampadDrawerRight');
			right.appendChild(textArea);
			var a = document.createElement('a');
			a.appendChild(document.createTextNode('Tweet!'))
			a.setAttribute('href', 'http://twitter.com/home?status='+encodeURIComponent(textNode));
			a.setAttribute('target', '_blank');
			right.appendChild(a);
		}
	}
}
streampadPlayer.Debug = function(obj){
	if (streampadPlayer.params.debug == 'true'){
		try {
			console.log(obj);
		} catch(e){ }
	}
}
streampadPlayer.Event.add(window, 'setCurrent', SPAPI.Events.onSongChange);
streampadPlayer.Event.add(window, 'play', SPAPI.Events.onStateChange);
streampadPlayer.Event.add(window, 'pause', SPAPI.Events.onStateChange);
streampadPlayer.Event.add(window, 'playlistChange', SPAPI.Events.onQueueChange);
streampadPlayer.Event.add(window, 'init', SPAPI.Events.onInit);
streampadPlayer.Event.add(window, 'flashLoaded', SPAPI.Events.onStart);
streampadPlayer.Event.add(window, 'handleMore', SPAPI.Events.onQueueEnd);
////////////////////////////////////////////////////////////////////////////
/*
     JSON FUNCTIONS
//////////////////////////////////////////////////////////////////////////*/
var JSON=JSON||{};(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
////////////////////////////////////////////////////////////////////////////
/*
     END JSON FUNCTIONS
//////////////////////////////////////////////////////////////////////////*/
/*
name: sp-player-other
$Rev: 36926 $
$Date: 2009-02-13 11:18:48 -0500 (Fri, 13 Feb 2009) $
author: Dan Kantor
/////////////////////
dependencies:
1. sp-player.js
////////////////////
*/
///////////////////////////////////////////////////////////////
streampadPlayerOther = {
	init : function(){
		streampadPlayer.Event.remove(window, 'init', streampadPlayerOther.init);
		streampadPlayer.vars.playlistType = 'other';
	},
	getAudio : function(){
		streampadPlayer.Event.remove(window, 'flashLoaded', streampadPlayerOther.getAudio);
		streampadPlayer.UI.setCaption('Loading Music...');
		streampadPlayerOther.scrape();
	},
	scrape : function(){
		var as = document.getElementsByTagName('a');
		var mp3s = 0;
		for(j=0; j<as.length; j++){
			var a = as[j];
			if (a.href.indexOf('.mp3') != -1){
				mp3s ++;
				var songVO = new streampadPlayer.SongVO();
				songVO.text = a.innerHTML;
				songVO.enclosure = a.href;
				songVO.sourceUrl = location.href;
				streampadPlayer.Playlist.push(songVO);
			}
		}
		streampadPlayer.Playlist.title = document.title;
		if (mp3s > 0){
			streampadPlayer.vars.total = mp3s;
			streampadPlayer.Play.queueNumber(streampadPlayer.vars.queueNumber);
			streampadPlayer.Event.fire(window, 'gotPlaylist', streampadPlayer.Playlist.array);
		} else {
			streampadPlayer.UI.noAudioPosts();
		}
	}
}
streampadPlayer.Event.add(window, 'init', streampadPlayerOther.init);
streampadPlayer.Event.add(window, 'flashLoaded', streampadPlayerOther.getAudio);

// loaded
streampadPlayer.init();
