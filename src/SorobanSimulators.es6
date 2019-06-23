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
    log (data) {
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
            switch (this.zones[i].data.type) {
                case 'default':
                    this.__default(this.zones[i], numLen, iteration)
                    break
            }
        }
    }

    /**
     * Default
     * @param zone 
     * @param numLen 
     * @param iteration 
     */
    __default (zone, numLen, iteration) {
        let _this = this
        let textEl = zone.el.getElementsByTagName('div')[0]
        if (iteration < numLen) {
            textEl.innerText = zone.data.example[iteration]
            setTimeout(() => {
                iteration++
                _this.__default(zone, numLen, iteration)
            }, zone.data.speed)
        } else {
            textEl.innerHTML = `<input type="number" value=""/><button>${ _this.btnResultText }</button>`

            let btn = textEl.getElementsByTagName('button')[0]
            let input = textEl.getElementsByTagName('input')[0]

            btn.onclick = () => {
                this.__sendResult(zone, input.value)
            }
            return
        }
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