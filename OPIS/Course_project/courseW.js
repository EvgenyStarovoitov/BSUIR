let mimi=0,
    inputText = document.querySelector('.text_value'),
    canvasElem = document.querySelector('.canvas'),
    clearbtn = document.querySelector('.button_clear'),
    AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
    context = new AudioContext(),
    ctx,
    flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    x = "black",
    y = 2,
    widthElem = window.innerWidth,
    heightElem = window.innerHeight;

class Sound {
    constructor(gainAmount,history,log,speed,fadeTime,elm){
        this.gainAmount = gainAmount;
        this.history = history;
        this.log = log;
        this.speed = speed;
        this.fadeTime = fadeTime;
        // this.width = window.innerWidth;
        // this.height = window.innerHeight;    
        this.elm = elm;
        this.elm.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.elm.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.elm.addEventListener('touchstart',this.onTouchStart.bind(this));
        console.log("create a sound element");
    };
    onMouseDown(event){
        console.log('md');
        if (this.osc_) {
          return;
        }
        this.updatePointer(event);
        this.osc_ = this.createOscillator_();
        this.lastFreq = this.getLastFrequency();
        this.osc_.frequency.setValueAtTime(mimi, context.currentTime); 
    }
    onMouseUp(){
        console.log('mu');
        this.deleteOscillator_();
        this.lastFreq = null;
    }
    onMouseMove(){
        console.log('mm');
        if (this.osc_) {
          return;
        }
        this.updatePointer(event);
        this.osc_ = this.createOscillator_();
        this.lastFreq = this.getLastFrequency();
        this.osc_.frequency.setValueAtTime(mimi, context.currentTime);  
    }
    onTouchStart(event) {
        console.log('ts');
        if (this.osc_) {
          return;
        }
        this.osc_ = this.createOscillator_();
        // this.lastFreq = this.getLastFrequency();
        // this.osc_.frequency.value = this.lastFreq;
        this.updatePage(event);
    };
    updatePage(e){
        KeyFlag = false;
        mimi = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        gainNode.gain.value = (CurY/HEIGHT) * maxVol;
    }
    createOscillator_(){
        let gain = context.createGain();
        gain.value = 0;
        gain.connect(context.destination);
        this.gain_ = gain;
        let osc = context.createOscillator();
        osc.connect(gain);
        gain.gain.linearRampToValueAtTime(this.gainAmount,
            context.currentTime + this.fadeTime);
        osc.start(0);
        return osc;
    };
    deleteOscillator_(){
        if (this.osc_) {
            let endTime = context.currentTime + this.fadeTime;
            this.gain_.gain.linearRampToValueAtTime(0, endTime);
            this.osc_.stop(endTime);
            this.osc_ = null;
          };
    };
    getLastFrequency(){
        let x = this.lastX;
        let y = this.lastY;
        let percent = 1 - (y / this.height);
        let nyquist = context.sampleRate/2;
        if (this.log) {
        percent = this.logScale_(percent * 1000, 1000) / 1000;
        };
        return percent * nyquist;
    };
    updatePointer(event){
        console.log("update\n", event.type)
        event = event || {};
        let type = event.type || '';
        if (type.indexOf('mouse') == 0) {
          this.lastX = event.pageX;
          this.lastY = event.pageY;
        } else if (type.indexOf('touch') == 0) {
          this.lastX = event.touches[0].pageX;
          this.lastY = event.touches[0].pageY;
        } else {
          this.lastX = null;
          this.lastY = null;
        }
    };
};

let initCanvas = (widthCanvas, heightCanvas)=> {
    ctx = canvasElem.getContext("2d");
    canvasElem.width = widthElem;
    canvasElem.height = heightElem;

    console.log("init draw func")

    canvasElem.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvasElem.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvasElem.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvasElem.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

let draw = () => {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

let clear = () => {
    let m = confirm("Очистить холст?");
    if (m) {
        ctx.clearRect(0, 0, widthCanvas, heightCanvas);
    }
}

let findxy = (res, e) => {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX; 
        currY = e.clientY;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX;
            currY = e.clientY;
            draw();
        }
    }
}

window.addEventListener('mousemove', ()=>{
    mimi = event.pageY*20;
    inputText.value = mimi;
});

clearbtn.addEventListener('click', clear )

let some = new Sound(0.2,[],false,10,0.01,window);
initCanvas(widthElem,heightElem);