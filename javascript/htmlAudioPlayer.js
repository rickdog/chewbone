(function()
{

	var s=document.createElement('script');
  s.src='http://code.jquery.com/jquery.min.js';
	if(s.addEventListener)
	{
		s.addEventListener("load",start,false);
	}
	else
	{
		s.onreadystatechange=function()
		{
			if(this.readyState=="complete")
			{
				start();
				s=null;
			}
		}
	}
	s.type="text/javascript";
	document.getElementsByTagName('head')[0].appendChild(s);
})();

var dropboxAudio = null;

function start()
{
console.log("start");
// http://dl.dropbox.com/u/142237/dropbox_audio.js
dropboxAudio = (function () {
  $ = window.jQuery;
  var audio = new Audio();
  var shuffle = false;
  var playing = false;
  var playingTrack = false;
  var volume = 5;
  var linklist = document.getElementsByTagName('a');
  var mp3linklist = [
  ];
  for (var i = 0; i < linklist.length; i++) {
    if (linklist[i].href.match(/.*\.(mp3|m4a|ogg).*/)) {
      var number = mp3linklist.length;
      linklist[i].setAttribute('id', '' + number);
      linklist[i].setAttribute('onclick', 'dropboxAudio.clickAudioLink(' + number + ')');
      linklist[i].removeAttribute('target');
      var url = linklist[i].href;
      linklist[i].setAttribute('href', 'javascript:void(0)');
      mp3linklist.push(url);
    }
  }
  if (mp3linklist.length == 0)
    return;
  var controls =
  '<div id="control-box">' +
  '<div><marquee id="title" scrollamount="1">None</marquee></div>' +
  '<div><span id="currentTime">00:00</span>/<span id="duration">00:00</span>' +
  ' volume: <span id="volume">' + volume + '</span></div>' +
  '<ul><li id="pause">' +
  '<li id="play">' +
  '<li id="prev">' +
  '<li id="next">' +
  '<li id="volume-down">' +
  '<li id="volume-up">' +
  '<li id="shuffle">normal</ul>' +
  '</div>';
  $('body').append(controls);
  $('#control-box').css({
    position: 'fixed',
    top: '10px',
    right: '10px',
    backgroundColor: '#FFF',
    webkitBorderRadius: '2px',
    webkitBoxShadow: '0px 1px 3px #000',
    fontSize: '12px',
    color: '#4f4f4f',
    padding: '2px'
  });
  $('#control-box > ul').css({
    margin: '0',
    padding: '0'
  });
  $('#control-box > ul > li').css({
    display: 'inline-block',
    margin: '0',
    padding: '0',
    cursor: 'pointer'
  });
  $('#pause,#play,#next,#prev,#volume-up,#volume-down').css({
    width: '16px',
    height: '16px',
    marginLeft: '2px'
  });
  $('#shuffle').css({
    height: '16px'
  });
  $('#play').css({
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACPklEQVQ4jXWSTUhUURTHf/e+98Ym882IMGWpzKIyEsE0+gDDoU2LqG0ttU0EQSLUIgpn6ANpUQiuotClyyA3bWIKBYNCQewDN1N+hRo64zgzznv33RYT08w0HTibe/7/3znn3iuoEpNtRhgIlxwluudVoppWVBgj9rHQoN1+NOJrCKLzOwjDwtl2SX1djCdnF2Ld8ypeFTB9yooeuNAxWHe4AXftM9rZ+auSPsyGI2R/7WHl9XTs9FQqWgaYbDP6W652PTOtNCq5Wm3SgrimDs9oZGXiS9+ZD6kxADHZZoTrOw/O7GvxBVVqAwBfUzv5pbnqFGng5ENb6+8XTnTPq4QJ3DJEMphb9oqa/ZcfIwT8fHEDZ+N7BUGhvZUg0AtEpWXLDjfj4qS9YmoF/tZztMSm8B+/WFZz0h5uxsWyZQ+AlKaIONsepamVBsDYG6D59jhNA+N4nl2mEYaIAEghBGpX42bLJyiNwNlLhK7cxc14qJyHymmkLDygadXJWQQdZbdtlGy8k2Rt/BHrr0bwBYxSWRzA9AVkHCHKANIq0Hd/zLH6/Dq5xFylGbSeLUxgG8PSFP1lAFOw9WaIzYkhAGrqK8yA5+ph+PORlu7VR4UUg8UV/DY6m/rHVGzu6VjTw81oEQCw9rRxVEiz97+uotkdCw2s9hWblaRMjJzsq62z75uG0VxpVEotprdTD8I3P44CHqABLQATsAAf4AdqX94539PZeqhLay2EEN7Mt+VP1568fQdkgCyQBxxA/QYhC/g9ap2XfAAAAABJRU5ErkJggg%3D%3D)'
  });
  $('#pause').css({
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB+0lEQVQ4jY2Ty2sTURTGf2ceiTFJG0OIURRTRChoJQHJppVKd+584EYE24VLocFNVy78BwqCexfuXFg3brWi0C60rVYUpSZWSgvGmpqhzWNmrotMnh3FDw73m3vP982ZOeeKUop+vD5jpIFL4aFD42b8aEzZVXZW1uaBudFVe7k7V/oNFnOB2XhueDpxfgQaJVTDQswIEgiz87HM9uKXF7vrm5dHV+0ygAC0TN5MRJeOXR3LUP+OW9ncVxmaiZHK8ONlofzr7Vp27INTbBssnDNnj1/LTbvWOqpq7Rd3QR9Msf2utnz2cSErAK9O6+nYSKJw8DC4tb1/itsm0SQbzwpThvc8KVjUStJOGH5UAeDTjWgPb6FR2cKMaDcNADOqjTt7Lo7PmxqW48sBtKBcMABEExoV17fU7v3+HOWCBqCHxOtHc9Otd1rrVDvcrStUy0NADwoGQGBAL9L5/B6EUkabH0gavYeKYtNgUHsqmkz6GQRjui8HUErNtefg253YEiIZ/zr8oMrKJmu0ptAc0Kc0U54Dsf+S2yp/5O7PYs9dKN0/kREj9ARNT/9d6ZaVXcsnbn99CM1/LzS7oQHmzJWTyesTQ/n4QPhiJBw61dJVa/Wt39buwvzKxr1bD95/BhqAI0opREQDdC8CXgS91QBcoA7UvKgDNuD8AZ8sx9a0b0fqAAAAAElFTkSuQmCC)'
  });
  $('#next').css({
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWElEQVQ4jXWSS0hUYRiGn/9cZrRxnItTWaSNhFJkMUK4yMJwVYuojDZtMqFFRKC0qRZBLdy4kKK2JbQLQoNoWVkIuqiUBiLDMsNLNeaMc3Iu58z5W8yZccahF17Of/ne5z8ffEJKSanGW7UwcNrTFOjUgzv90kqTmJ4dA0Y7otYUmyRKAZPtrqFg+96+0NEDYMaQpoHQaxAuD4lPcf5Mfnm9Pr90piNqxSsA77q8H3adPRIh+wM7ubT5IVB0tPoIv998i6++n23riFpzABrAxCF9qOFceyS7HEWmjcowABnMxCS+lnp/Lt04ArQBKOOtWtjbXNeXXZolG1ujcXCVxsFVTMMm1PsU07DLnF5YxBtWI+OtWg+AAvQIDDKxv5hJu/iembTZsq+LwKkB7JwXM2kXnV5cRq9RLuQ78yqduZSNaeQwjdwGwFkHj1+h4cYL1K37izWmkUNxi2MAilBEGb30DwqqajpI89AEoe6bxTrpXCtqtQCR38iNDHamfD4AfIdP4qrfDQJUdz6kuWrVuQKgVFXbtbL9yvP7/HoyAOkELp8Kkrk8wKc8E4ro2Qxw+9V8K7F5fj68TOrzWzQdNOdcSjkKoLU8So5+v+afQohIKcAVUEnNvCT2uBc7lcAVUEtuZVxa3AVnEhdv10UUXbwC/JXNVEpa8uKOWyvDRQBA7N7uiNCqR1DU8P+Tdlxamf7Q1a/DhSMBqOQHSr/evWfb+a6m/mCt50SNp7q5UJTOZJfXjPWJsemFO5cefJwBTCAH2MIJq45djt3OVwNsIAtkHGcBywHIfxieD3DO93BOAAAAAElFTkSuQmCC)'
  });
  $('#prev').css({
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSUlEQVQ4jXWTUUhTURjHf+eeu3vnmN47NXKJ1pQEYanVg1Kg1ltFkD30mHuNQPCxkAKfohe1gqAefOslSoOgNyFqPUjgwB6iEGeJmsw125a6u93bg9vcuvXBxzmc8/1/5893zhGO4/B3RMNqD3DF6G4fEKoXK7mWyi7/fAvMnv2Uj1fWikpANKyavtbgTH3v8UGj08TJZXGsDMLjB08jiXeLJOc/T/bO50ZdgGhYPRY41b5wqD9k5jdiYFsuZ0ptELQWVl+8j52eS5+sAixea1uo79J7CtsbLmGVZa8fxd/K9+fzk30frVHhOA7RsBppvhiaLqQ3XYLgyAzrD4Zof7wNwNINA0Wv4fcPSC0mQiqAx68M765Vnyx9Bg1Xb+HrPI+VtsvrVtqGdBaBAxBRARRdDFqZQrnIG+qiZeQJ3lDXvqhir3LuqVUGVADHpnxKcHiM4PWxKjcuB6V+KAIFQOoCBGhNRzHOXHb1wd47uGqnpBcga4oArU7GNUPC7ior4xfYev2oCuA9rJbner1EMyWaIdHqZHwfYCqzuinRTYnqyZCcuc3q/UtYiW/7IlMeAIp1uinRDOVVycGUFlBSWkBSysLmBzam+tn5MocWOACUa0wl1jGdni0/pPXxhohQxbSrAf+OlG05547c3YpV/YXEw7aIUPUJhGL+V2oX4k5+Z6hxZCVW7CUCUAAJeJ7ePNEx0N18p87v6/PqWlNJl8nufE3+yr55Nrc8ce/l0iZgAbaogEhABTRAL6ZWhOeBHLBXHHNAASj8AaZb0i/x7/IrAAAAAElFTkSuQmCC)'
  });
  $('#volume-up').css({
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACW0lEQVQ4jXWS30tTYRjHP+85Z2fJ3NyciErlJFbRMhaBNxqWXUR3/bgIhMguuhT0riupCIS6kIpuZf0B4fIq6KIMIwdhWoakmKLohLaabui2s523i3N20FkPPDzP+7x8v9/nfd5HSCnZax9PayHgqqct0O2qb/HLUp6t2aUJIN45V5qhysRegkSHPlLfcXKg4Xw7GCmkkUO4ahG6h635DL8Ti+93VpPXOudKGYegkny+WPvl8I2uKMU1zGyyWggUF1pTlF8fljN/ppfOdn0vrwAoAJ/OaSNNl89Ei5tzFDbWMbImwhuheSiN8EYwsibGVoHdHwnqjit+36mjYw7vZEQNecPBgWJyiWJqGyNnYuRMgr2jAAR7R52akTPJr2/gDanRyYjaB6ABfYIchZTY13FlNFKCkTX33RnZTVy1ym0oxzSXV+ku75qUAb2xldD9cQtoSie2PZ4GYPXJLfLLX63W3eICgCYU4Si0x+cPzM7dEnby8MgU05cO2cRWTVNr7NYlJF8+ItBz0wEcOhImv7bonLcTb6xEgOq2cJruU1cqn5keHyY9PmypPbd2Rqiw2B91SHS/WhFcsQjqlNdCEX3VrQtVONFdAe0xKWUcQDkRy8V1vzKjB1T2+u7sKwDyC2+pvtMDSkb3qU/BXuWNB8Go4hLvAP8BqX+YLMk7zUPpmEMAkHrWGhVazRiKGvo/0szIUmGwof9nzHkqoGKttOve9WONvT1tg/U+z5VaT43zf/lCcXM7tzM1Mbv+8O6LbwuAAZQBU9hg1XbddrcdNcAEikDB9iJQsgnkX9oy69ZabieSAAAAAElFTkSuQmCC)'
  });
  $('#volume-down').css({
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/klEQVQ4jZWTwUvTYRjHP8+7329rbuZaYjMiHVEEpWwEdtCwukRRkHXrkhJ1iSA7dQrq2EWQOuc/EBpB13IkJUROnQSFTRJT0GpzQ7f9fvu9HbbJVCb6hS/v4X0/Dw/P931Ea81WjZ02WoHrvvCBbjN4OKDtHOnJ2VFgpDNhx6vfytYC4x3ugWDHyYeN59rAWkFbWcT0I24f6W8p/o7/+LD2a7GnM2GnAKQa/nLBP3HkZleEwjxOZnFbZygTIxRhOZZM/fs6G+2aKc4ZlbtPZ4yB0KX2SGEpgc5lt8MA5LHS4zScCAWKuaPDzCSjAvDxlKs10NaYrDsETn69BrxZrvomFt4l+yod9ApZ8iuyI1QtK7OE6Ve3DQCzXnUX1x18Z6/RfOc57qaWmmAuOcX84D1yySmUR84rAFGClXEIXrm/IwywL9yOP3oVK+OgHVAALq+AwPLrF2TisR0LZOIxUmNvQcDlkVKM0z11rxB6dz2AijSlGN0N6o0o2XMBrfXIxtjnHjVMIBLZA57SNtGNr/z76cGIMuU9ENgVbuu+5id/hjbtwspgS0QM7zDK1VqbdFLazvc3Pvg5BKVdEEppKMB8fONY062L4f7gft9lv897vMLl8oWl1eza59HJhWd3X05/ByygKFprREQBrrLdZXvKpwE4QAHIl10AbKD4HzAwuuxtHwc8AAAAAElFTkSuQmCC)'
  });
  $('#pause').click(function () {
    audio.pause();
  });
  $('#play').click(function () {
    playingTrack === false ? initAudio(0)  : audio.play();
  });
  $('#next').click(function () {
    playNextTrack();
  });
  $('#prev').click(function () {
    playPrevTrack();
  });
  $('#shuffle').toggle(function () {
    $(this).text('shuffle');
    shuffle = true;
  }, function () {
    $(this).text('normal');
    shuffle = false;
  }
  );
  $('#volume-up').click(function () {
    if (volume < 10) {
      $('#volume').text(++volume);
      audio.volume = volume * 0.1;
    }
  });
  $('#volume-down').click(function () {
    if (volume > 0) {
      $('#volume').text(--volume);
      audio.volume = volume * 0.1;
    }
  });
  var initAudio = function (i) {
    audio.pause();
    audio = new Audio(mp3linklist[i]);
    audio.volume = volume * 0.1;
    audio.play();
    playing = true;
    playingTrack = i;
    $('#title').text($('#' + i).text());
    audio.addEventListener('ended', playNextTrack, true);
    audio.addEventListener('timeupdate', viewTime, true);
  };
  var viewTime = function () {
    var currentTime_m = Math.floor(audio.currentTime / 60);
    var currentTime_s = Math.floor(audio.currentTime % 60);
    var duration_m = Math.floor(audio.duration / 60);
    var duration_s = Math.floor(audio.duration % 60);
    $('#duration').text(format(duration_m) + ':' + format(duration_s));
    $('#currentTime').text(format(currentTime_m) + ':' + format(currentTime_s));
  };
  var format = function (time) {
    return (Math.floor(time / 10) ? '' : '0') + time;
  };
  var playNextTrack = function () {
    var nextTrack;
    if (shuffle) {
      nextTrack = Math.floor(Math.random() * mp3linklist.length);
      while (playingTrack == nextTrack) nextTrack = Math.floor(Math.random() * mp3linklist.length);
    } else {
      nextTrack = (playingTrack + 1) % mp3linklist.length;
    }
    initAudio(nextTrack);
  };
  var playPrevTrack = function () {
    var prevTrack;
    if (shuffle) {
      prevTrack = Math.floor(Math.random() * mp3linklist.length);
      while (playingTrack == prevTrack) nextTrack = Math.floor(Math.random() * mp3linklist.length);
    } else {
      prevTrack = (playingTrack ? playingTrack : mp3linklist.length) - 1;
    }
    initAudio(prevTrack);
  };
  return {
    clickAudioLink: function (i) {
      if (playingTrack === false) {
        initAudio(i);
      } else if (playingTrack == i) {
        playing ? audio.pause()  : audio.play();
      } else {
        initAudio(i);
      }
    }
  }
})();
  
}

