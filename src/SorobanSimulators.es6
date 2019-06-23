export default class {
    constructor (config) {
        this.config = config;
        this.id = `soroban-simulator-${ Date.now() }`
        this.el = undefined
        this.wrapper = undefined
        this.startButton = undefined
        this.btnResultText = config.btnResultText || 'Send Result'
        this.textLoading = config.textLoading || 'Loading...'
        this.zones = []
        this.len = this.config.zones.length
        this.timer = Array(this.len).fill().map((_, i) => 0)
    }

    /**
     * Method for debuging
     * @param data 
     */
    __log (data) {
        if (this.config.debug || null) {
            console.log(data)
        }
    }

    /**
     * Building
     * @param el 
     */
    build (el) {
        this.el = el
        const startText = this.config.startText || 'Start'
        this.wrapper = document.createElement('div')
        this.wrapper.className = 'soroban-simulator__wrapper'
        this.wrapper.id = this.id

        this.items = document.createElement('div')
        this.items.className = 'soroban-simulator__items'

        this.startButton = document.createElement('button')
        this.startButton.className = 'soroban-simulator__start'
        this.startButton.innerText = startText

        this.wrapper.appendChild(this.items)
        this.wrapper.appendChild(this.startButton)
        this.el.appendChild(this.wrapper)

        for (let i = 0; i < this.len; i++) {
            let item = document.createElement('div')
            item.className = `soroban-simulator__item`
            item.innerHTML = '<div></div>'
            let div = item.getElementsByTagName('div')[0]
            item.style.justifyContent = 'center'
            item.style.alignItems = 'center'
            item.style.position = 'relative'
            div.style.display = 'inline-block'
            div.style.position = 'relative'
            if (this.config.zones[i].type === 'random-position') {
                item.style.display = 'block'
                item.style.textAlign = 'left'
            } else {
                item.style.display = 'flex'
            }
            this.items.appendChild(item)
            this.zones.push({
                el: item,
                data: this.config.zones[i]
            })
        }

        this.startButton.onclick = (event) => {
            event.preventDefault()
            this.__start()
            this.startButton.style.display = 'none'
        }
    }

    /**
     * Starting training
     */
    __start () {
        for (let i = 0; i < this.len; i++) {
            let numLen = this.zones[i].data.example.length
            let iteration = 0
            this.__change(this.zones[i], numLen, iteration)
        }
    }

    /**
     * Change iteration
     * @param zone 
     * @param numLen 
     * @param iteration 
     */
    __change (zone, numLen, iteration) {
        let _this = this
        let textEl = zone.el.getElementsByTagName('div')[0]
        if (iteration < numLen) {
            textEl.innerText = zone.data.example[iteration]
            switch (zone.data.type) {
                case 'random-position':
                    this.__setRandomPosition(textEl)
                    break
            }
            setTimeout(() => {
                iteration++
                _this.__change(zone, numLen, iteration)
            }, zone.data.speed)
        } else {
            textEl.innerHTML = `<input type="number" value=""/><button>${ _this.btnResultText }</button>`
            textEl.parentElement.style.display = 'flex'
            textEl.style.top = 'auto'
            textEl.style.left = 'auto'
            let btn = textEl.getElementsByTagName('button')[0]
            let input = textEl.getElementsByTagName('input')[0]

            btn.onclick = () => {
                this.__sendResult(zone, input.value)
            }
            return
        }
    }

    /**
     * Set random position
     * @param el 
     */
    __setRandomPosition (el) {
        let parentWidth = el.parentElement.clientWidth,
            parentHeight = el.parentElement.clientHeight,
            elWidth = el.clientWidth,
            elHeight = el.clientHeight,
            maxLeft = parentWidth - elWidth,
            maxTop = parentHeight - elHeight,
            left = this.__getRandomInt(0, maxLeft),
            top = this.__getRandomInt(0, maxTop)

        el.style.top = top + 'px'
        el.style.left = left + 'px'
    }

    /**
     * Get random integer
     * @param min 
     * @param max 
     */
    __getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    /**
     * Callback result
     * @param data 
     * @param value 
     */
    __sendResult (zone, value) {
        zone.el.innerHTML = `<div class="soroban-simulator__loading">${ this.textLoading }</div>`
        let event = new CustomEvent("sendResult", {
            detail: {
                zone: zone,
                value: value
            },
            bubbles: true,
            cancelable: false
        })

        this.el.dispatchEvent(event)
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
    showResult (detail, status) {
        detail.zone.el.innerHTML = `<div class="soroban-simulator__status soroban-simulator__status--${ status }">${ detail.value }</div>`
    }
    
}