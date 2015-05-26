/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var s=`
<style>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.heart-loader {
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-top: -90px;
  width: 180px;
  height: 180px;
  overflow: visible;
}

.heart-loader__group {
  transform-origin: 0 90px;
  animation: group-anim 7s 1s infinite;
}

.heart-loader__square {
  stroke: #B8B8B8;
  stroke-dasharray: 240, 240;
  stroke-dashoffset: 240;
  animation: square-anim 7s 1s infinite;
}

.heart-loader__circle {
  stroke: #B8B8B8;
  stroke-dasharray: 188.522, 188.522;
  stroke-dashoffset: 188.522;
  transform-origin: 60px 30px;
}

.heart-loader__circle.m--left {
  animation: left-circle-anim 7s 1s infinite;
}

.heart-loader__circle.m--right {
  animation: right-circle-anim 7s 1s infinite;
}

.heart-loader__heartPath {
  stroke: #E21737;
  fill: transparent;
  stroke-dasharray: 308.522, 308.522;
  stroke-dashoffset: 308.522;
  animation: heart-anim 7s 1s infinite;
}

@keyframes square-anim {
  12% {
    stroke-dashoffset: 0;
  }
  43% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

@keyframes left-circle-anim {
  12% {
    stroke-dashoffset: 188.522;
  }
  31% {
    stroke-dashoffset: 0;
    transform: translateY(0);
  }
  41% {
    stroke-dashoffset: 0;
    transform: translateY(-30px);
  }
  43% {
    stroke-dashoffset: 0;
    transform: translateY(-30px);
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    transform: translateY(-30px);
    opacity: 0;
  }
}

@keyframes right-circle-anim {
  12% {
    stroke-dashoffset: 188.522;
  }
  31% {
    stroke-dashoffset: 0;
    transform: translateX(0);
  }
  41% {
    stroke-dashoffset: 0;
    transform: translateX(30px);
  }
  43% {
    stroke-dashoffset: 0;
    transform: translateX(30px);
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    transform: translateX(30px);
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    transform: translateX(30px);
    opacity: 0;
  }
}

@keyframes group-anim {
  43% {
    transform: rotate(0);
  }
  54% {
    transform: rotate(-45deg);
  }
  90% {
    transform: rotate(-45deg);
    opacity: 1;
  }
  97% {
    transform: rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: rotate(-45deg);
    opacity: 0;
  }
}

@keyframes heart-anim {
  55% {
    stroke-dashoffset: 308.522;
    fill: transparent;
  }
  70% {
    stroke-dashoffset: 0;
    fill: transparent;
  }
  87% {
    stroke-dashoffset: 0;
    fill: #E21737;
  }
  100% {
    stroke-dashoffset: 0;
    fill: #E21737;
  }
}

.other {
  position: absolute;
  left: 0;
  bottom: 0.5rem;
  width: 100%;
  text-align: right;
}

.other__link {
  font-size: 1.3rem;
  margin: 0 1rem;
}
</style>


<svg class="heart-loader" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 90 90" version="1.1">
  <g class="heart-loader__group">
    <path class="heart-loader__square" stroke-width="1" fill="none" d="M0,30 0,90 60,90 60,30z"/>
    <path class="heart-loader__circle m--left" stroke-width="1" fill="none" d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"/>
    <path class="heart-loader__circle m--right" stroke-width="1" fill="none" d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"/>
    <path class="heart-loader__heartPath" stroke-width="2" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0" />
  </g>
</svg>`;

document.body.innerHTML = document.body.innerHTML + s;

