let oscillator = audioCtx.createOscillator();
oscillator.type = 'square';
oscillator.connect(audioCtx.destination);
// oscillator.start();

let startSound = ()=>{
    let oscillator = audioCtx.createOscillator();
    oscillator.frequency.setValueAtTime(height, audioCtx.currentTime); 
    oscillator.start(); 
}
let endSound = ()=>{
    oscillator.frequency.setValueAtTime(height, audioCtx.currentTime); 
    oscillator.deleteOscillator_()
    oscillator.stop();
}

window.addEventListener('mousedown', startSound, false);
window.addEventListener('mouseup', endSound, false);

let height = document.documentElement.clientHeight
console.log(height);
let context = new AudioContext();

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let height = document.documentElement.clientHeight;


    // draw(){
    //     var canvasCtx = canvasElem.getContext('2d');
    //     canvasElem.width = this.width;
    //     canvasElem.height = this.height;
    //     let KeyFlag = true;
    //     var KeyX = 1;
    //     var KeyY = 0.01
    //     let rX = 0;
    //     let rY = 0;
    //     let size = 6;
    //     if(KeyFlag == true) {
    //         rX = KeyX;
    //         rY = KeyY;
    //       } else {
    //         rX = CurX;
    //         rY = CurY;
    //       }
    //       let rC = 10;
          
    //     canvasCtx.globalAlpha = 0.2;
    //     canvasCtx.fillStyle = "#d6cdcd";
    //     canvasCtx.strokeStyle = "#d6cdcd";
    //     canvasCtx.beginPath();
    //     canvasCtx.font = '20px Inconsolata';
    //     canvasCtx.fillRect(10 - size/2, 20 - size/2, size, size);
    //     canvasCtx.fill();
    //     canvasCtx.closePath(); 
    //     // if (this.osc_) {
    //     //     canvasCtx.beginPath();
    //     //     canvasCtx.font = '20px Inconsolata';
    //     //     canvasCtx.fillStyle = "#d6cdcd";
    //     //     canvasCtx.fillRect(10 - size/2, 20 - size/2, size, size);
    //     //     canvasCtx.fill();
    //     //     canvasCtx.closePath(); 
    //     //   }
    //     //   console.log("i'm draw!!!!!",canvasCtx,this.osc_)
    //     // for(let i=1;i<=15;i=i+2) {
    //     //     canvasCtx.beginPath();
    //     //     canvasCtx.fillStyle = 'rgb(' + 100+(i*10);
    //     //     canvasCtx.arc(1,rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
    //     //     canvasCtx.fill();
    //     //     canvasCtx.closePath();     
    //     // } 
    //     requestAnimationFrame(this.draw.bind(this));
    // };


    // create web audio api context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
// connect oscillator to gain node to speakers
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
// create initial theremin frequency and volumn values
var widthElem = window.innerWidth;
var heightElem = window.innerHeight;
var maxFreq = 6000;
var maxVol = 0.02;
var initialFreq = 3000;
var initialVol = 0.001;
// set options for the oscillator
oscillator.detune.value = 100; // value in cents
oscillator.start(0);
oscillator.onended = function() {
  console.log('Your tone has now stopped playing!');
}
gainNode.gain.value = initialVol;
// Mouse pointer coordinates
var CurX;
var CurY;
// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values
document.onmousemove = updatePage;
function updatePage(e) {
    KeyFlag = false;
    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    
    oscillator.frequency.value = (CurX/widthElem) * maxFreq;
    gainNode.gain.value = (CurY/heightElem) * maxVol;
    canvasDraw();
}
