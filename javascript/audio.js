
/* 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API


  a = new Audio('http://tholman.com/elevator.js/music/elevator.mp3');
  a.play();
  setTimeout(function () {
      a.pause();
      a = new Audio('http://tholman.com/elevator.js/music/ding.mp3');
      a.play();
  }, 5000);
  
  x = document.createElement("audio")
  y = new Audio();
x.__proto__ ===   y.__proto__

*/
var options = {
  mainAudio: 'http://tholman.com/elevator.js/music/elevator.mp3', // Music from http://www.bensound.com/
  endAudio: 'http://tholman.com/elevator.js/music/ding.mp3',
  duration: undefined,
  preloadAudio: true,
  loopAudio: true
};

if (options.mainAudio) {
  mainAudio = new Audio(options.mainAudio);
  console.log(mainAudio);
  mainAudio.setAttribute('preload', options.preloadAudio);
  mainAudio.setAttribute('loop', options.loopAudio);
}
if (options.endAudio) {
  endAudio = new Audio(options.endAudio);
  endAudio.setAttribute('preload', 'true');
}
if (mainAudio) {
  mainAudio.play();
  setTimeout(function () {
    endMusic()
  }, 5000);
}
function endMusic()
{
  if (mainAudio) {
    mainAudio.pause();
    mainAudio.currentTime = 0;
  }
  if (endAudio) {
    endAudio.play();
  }
}
