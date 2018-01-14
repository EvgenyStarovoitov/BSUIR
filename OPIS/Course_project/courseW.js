 // Обьявление переменных

    let mimi=0,
        inputText = document.querySelector('.text_value'),
        canvasElem = document.querySelector('.canvas__row'),
        clearbtn = document.querySelector('.button_clear'),
        AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
        context = new AudioContext(),
        ctx,
        flag = false,
        prevX = 0,
        prevY = 0,
        currX = 0,
        currY = 0,
        dot_flag = false,
        color = "black",
        y = 2,
        widthElem = window.innerWidth,
        heightElem = window.innerHeight,
        canvasW = canvasElem.clientWidth,
        canvasH = canvasElem.clientHeight,
        clicking = false;
        console.log(canvasH,canvasW,"\n",widthElem,heightElem)

// Секция по работе с Web Audio API

    class Sound {
        constructor(gainAmount,history,log,speed,fadeTime,elm){
            this.gainAmount = gainAmount;
            this.history = history;
            this.log = log;
            this.speed = speed;
            this.fadeTime = fadeTime;
            this.elm = elm;
            // Слушаем события мыши и вызываем на основе них нужные функции
            this.elm.addEventListener('mousedown', this.onMouseDown.bind(this));
            this.elm.addEventListener('mouseup', this.onMouseUp.bind(this));
            this.elm.addEventListener('mousemove',this.onMouseMove.bind(this));
            console.log("create a sound element");
        };
        // при нажатой клавише вызываеться функция createOscillator_ которая создает канал генерации звука
        onMouseDown(){
            console.log('md');
            clicking = true;
            if (this.osc_) {
                return;
            }
            this.osc_ = this.createOscillator_();
        }
        // при отжатии клавиши отключении звука
        onMouseUp(){
            clicking = false;
            console.log('mu');
            this.deleteOscillator_();
        }
        // при передвижении мышки, вычисляетсья координата Y мыши и согласно ее значения, меняться частота звука
        onMouseMove(){
            console.log('mm');
            if (clicking==false) {
                return;
            };
            this.updatePage()
        }
        // функция для создания канала звука
        createOscillator_(){
            let gain = context.createGain();
            let osc = context.createOscillator();
            gain.value = 0;
            gain.connect(context.destination);
            this.gain_ = gain;
            osc.connect(gain);
            gain.gain.linearRampToValueAtTime(this.gainAmount,
                context.currentTime + this.fadeTime);
            osc.start(0);
            return osc;
        };
        // функция удаления канала звука
        deleteOscillator_(){
            if (this.osc_) {
                let endTime = context.currentTime + this.fadeTime;
                this.gain_.gain.linearRampToValueAtTime(0, endTime);
                this.osc_.stop(endTime);
                this.osc_ = null;
            };
        };
        // фунция изменения частоты звука по координатам мыши
        updatePage(){
            this.osc_.frequency.setValueAtTime(mimi, context.currentTime);  
            console.log(this.osc_.frequency.value, mimi)
        }
    };

//   Секция элемента отрисовки

    class CanvasEl {
        constructor(width,height,btn){
            this.width = width;
            this.height = height;
            this.initCanvas();
            this.btn = btn;
            this.btn.addEventListener('click', this.clear.bind(this) )
        }
        // функиця инициальизующая холст дял рисования
        initCanvas(){
            ctx = canvasElem.getContext("2d");
            canvasElem.width = this.width;
            canvasElem.height = this.height;
            console.log("init draw func"); 
            //навешиваем обработчки событий мыши
            canvasElem.addEventListener("mousemove", (e)=> {
                this.findCoord('move', e)
            }, false);
            canvasElem.addEventListener("mousedown", (e)=> {
                this.findCoord('down', e)
            }, false);
            canvasElem.addEventListener("mouseup", (e)=> {
                this.findCoord('up', e)
            }, false);
            canvasElem.addEventListener("mouseout", (e)=> {
                this.findCoord('out', e)
            }, false);
        };
        // функция прорисовки
        draw(){
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = color;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        };
        // функция очистки холста
        clear(){
            let m = confirm("Очистить холст?");
            if (m) {
                ctx.clearRect(0, 0, this.width, this.height);
            };
        };
        //функция определния координат выши
        findCoord(res,e){
            if (res == 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX; 
                currY = e.clientY;
                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = color;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                };
            };
            if (res == 'up' || res == "out") {
                flag = false;
            };
            if (res == 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX;
                    currY = e.clientY;
                    this.draw();
                };
            };
        };
    };

// Создаем обьекты класса и добавление прослышка событий на обьекты

    canvasElem.addEventListener('mousemove', ()=>{
        mimi = event.pageY*20;
        inputText.value = mimi;
    });

    let some = new Sound(0.2,[],false,10,0.01,window);
    let newCanvas = new CanvasEl(widthElem,canvasH,clearbtn);
