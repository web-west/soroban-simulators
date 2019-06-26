export class SorobanSimulator {
    constructor(config) {
        this.debug = config.debug || false;
        this.columns = config.columns || 1;
        this.btnTextResult = config.btnTextResult || 'Send Result';
        this.textLoading = config.textLoading || 'Loading...';
        this.btnTextStart = config.btnTextStart || 'Start';
        this.btnTextNext = config.btnTextNext || 'Next start';
        this.el = undefined;
        this.wrapper = undefined;
        this.btnStart = undefined;
        this.btnStartNext = undefined;
        this.zones = [];
        this.countItertion = 0;
        this.zonesExampleLength = 0;
        this.timeSendResult = config.timeSendResult || null;
        this.timerSendResult;
        this.timerElem = undefined;
    }
    /**
     * Method for debuging
     * @param data
     */
    __log(data) {
        if (this.debug || null) {
            console.log(data);
        }
    }
    /**
     * Destroy
     */
    destroy() {
        this.el = undefined;
        this.wrapper = undefined;
        this.items = undefined;
        this.zones = [];
        this.btnStart = undefined;
        this.btnStartNext = undefined;
        this.countItertion = 0;
        this.zonesExampleLength = 0;
        this.timerElem = undefined;
        clearInterval(this.timerSendResult)
    }
    /**
     * Building
     * @param el
     */
    build(el, zones, type) {
        this.destroy();
        let len = zones.length;
        this.columns = len > 1 ? this.columns : 1;
        this.el = el;
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'soroban-simulator__wrapper';
        this.items = document.createElement('div');
        this.items.className = 'soroban-simulator__items';
        this.wrapper.appendChild(this.items);
        if (this.timeSendResult) {
            this.timerElem = document.createElement('div');
            this.timerElem.className = 'soroban-simulator__timer';
            this.timerElem.style.display = 'none';
            this.wrapper.appendChild(this.timerElem);
        }
        if (type === 'next') {
            this.btnStartNext = document.createElement('button');
            this.btnStartNext.className = 'soroban-simulator__start-next';
            this.btnStartNext.innerText = this.btnTextNext;
            this.wrapper.appendChild(this.btnStartNext);
            this.btnStartNext.onclick = (event) => {
                event.preventDefault();
                this.__start();
                this.btnStartNext.style.display = 'none';
            };
        }
        else {
            this.btnStart = document.createElement('button');
            this.btnStart.className = 'soroban-simulator__start';
            this.btnStart.innerText = this.btnTextStart;
            this.wrapper.appendChild(this.btnStart);
            this.btnStart.onclick = (event) => {
                event.preventDefault();
                this.__start();
                this.btnStart.style.display = 'none';
            };
        }
        this.el.innerHTML = '';
        this.el.appendChild(this.wrapper);
        for (let i = 0; i < len; i++) {
            let item = document.createElement('div');
            item.className = `soroban-simulator__item`;
            item.innerHTML = '<div></div>';
            let div = item.getElementsByTagName('div')[0];
            item.style.justifyContent = 'center';
            item.style.alignItems = 'center';
            item.style.position = 'relative';
            item.style.width = (100 / this.columns) + '%';
            div.style.display = 'inline-block';
            div.style.position = 'relative';
            if (zones[i].type === 'random-position') {
                item.style.display = 'block';
                item.style.textAlign = 'left';
            }
            else {
                item.style.display = 'flex';
            }
            this.items.appendChild(item);
            this.zones.push({
                el: item,
                data: zones[i]
            });
        }
    }

    /**
     * Calculation zones example length
     */
    __sumZonesExampleLength() {
        this.zonesExampleLength = 0;

        for (let key in this.zones) {
            this.__log(this.zones[key])
            this.zonesExampleLength += this.zones[key].data.example.length;
        }
    }

    /**
     * Starting training
     */
    __start() {
        this.el.dispatchEvent(new CustomEvent("startTraining"));
        this.__sumZonesExampleLength();
        this.__showingNumber();
    }
    /**
     * Showing number
     */
    __showingNumber() {
        let len = this.zones.length;
        for (let i = 0; i < len; i++) {
            let numLen = this.zones[i].data.example.length;
            let iteration = 0;
            this.__change(this.zones[i], numLen, iteration);
        }
    }
    /**
     * Change iteration
     * @param zone
     * @param numLen
     * @param iteration 
     */
    __change(zone, numLen, iteration) {
        let _this = this;
        let textEl = zone.el.getElementsByTagName('div')[0];
        if (iteration < numLen) {
            textEl.innerText = zone.data.example[iteration] > 0 ? `+${ zone.data.example[iteration] }` : zone.data.example[iteration];
            switch (zone.data.type) {
                case 'random-position':
                    this.__setRandomPosition(textEl);
                    break;
            }
            setTimeout(() => {
                iteration++;
                this.countItertion++;
                _this.__change(zone, numLen, iteration);
            }, zone.data.speed);
        }
        else {
            textEl.innerHTML = `<input type="number" value=""/><button>${_this.btnTextResult}</button>`;
            textEl.parentElement.style.display = 'flex';
            textEl.style.top = 'auto';
            textEl.style.left = 'auto';
            let btn = textEl.getElementsByTagName('button')[0];
            let input = textEl.getElementsByTagName('input')[0];
            btn.onclick = (e) => {
                if (!isNaN(parseInt(input.value))) {
                    this.__sendResult(zone, input.value);
                }
                else {
                    e.preventDefault();
                }
            };
        }

        if (this.countItertion >= this.zonesExampleLength) {
            this.el.dispatchEvent(new CustomEvent("endTraining"));
            if (this.timeSendResult) {
                this.__startTimer(this.timeSendResult, this.timerElem);
            }
        }
    }
    /**
     * Set random position
     * @param el
     */
    __setRandomPosition(el) {
        let parentWidth = el.parentElement.clientWidth, parentHeight = el.parentElement.clientHeight, elWidth = el.clientWidth, elHeight = el.clientHeight, maxLeft = parentWidth - elWidth, maxTop = parentHeight - elHeight, left = this.__getRandomInt(0, maxLeft), top = this.__getRandomInt(0, maxTop);
        el.style.top = top + 'px';
        el.style.left = left + 'px';
    }
    /**
     * Get random integer
     * @param min
     * @param max
     */
    __getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /**
     * Callback result
     * @param data
     * @param value
     */
    __sendResult(zone, value) {
        zone.el.innerHTML = `<div class="soroban-simulator__loading">${this.textLoading}</div>`;
        let event = new CustomEvent("sendResult", {
            detail: {
                zone: zone,
                value: value
            },
            bubbles: true,
            cancelable: false
        });
        this.el.dispatchEvent(event);
    }
    /**
     * Calculate array sum
     * @param array
     */
    arraySum(array) {
        const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
        return parseInt(array.reduce(reducer));
    }
    /**
     * Show result
     * @param detail
     * @param status
     */
    showResult(detail, status) {
        detail.zone.el.innerHTML = `<div class="soroban-simulator__status soroban-simulator__status--${status}">${detail.value}</div>`;
    }

    /**
     * Start timer
     * @param {*} duration 
     * @param {*} display 
     */
    __startTimer (duration, display) {
        let start = Date.now(),
            diff,
            minutes,
            seconds;
        display.style.display = 'block';
        this.el.dispatchEvent(new CustomEvent("startTimer"));
        this.timerSendResult = setInterval(() => {
            this.__timer(duration, display, start, diff, minutes, seconds);
        }, 1000);
        this.__timer(duration, display, start, diff, minutes, seconds);       
    }

    /**
     * Timer
     * @param {*} duration 
     * @param {*} start 
     * @param {*} diff 
     * @param {*} minutes 
     * @param {*} seconds 
     */
    __timer(duration, display, start, diff, minutes, seconds) {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            display.style.display = 'none';
            clearInterval(this.timerSendResult)
            this.el.dispatchEvent(new CustomEvent("endTimer"));
        }
    }
}
