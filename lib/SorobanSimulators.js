'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        this.config = config;
        this.id = 'soroban-simulator-' + Date.now();
        this.el = undefined;
        this.wrapper = undefined;
        this.startButton = undefined;
        this.btnResultText = config.btnResultText || 'Send Result';
        this.textLoading = config.textLoading || 'Loading...';
        this.zones = [];
        this.len = this.config.zones.length;
        this.timer = Array(this.len).fill().map(function (_, i) {
            return 0;
        });
    }

    /**
     * Method for debuging
     * @param data 
     */


    _createClass(_class, [{
        key: '__log',
        value: function __log(data) {
            if (this.config.debug || null) {
                console.log(data);
            }
        }

        /**
         * Building
         * @param el 
         */

    }, {
        key: 'build',
        value: function build(el) {
            var _this2 = this;

            this.el = el;
            var startText = this.config.startText || 'Start';
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'soroban-simulator__wrapper';
            this.wrapper.id = this.id;

            this.items = document.createElement('div');
            this.items.className = 'soroban-simulator__items';

            this.startButton = document.createElement('button');
            this.startButton.className = 'soroban-simulator__start';
            this.startButton.innerText = startText;

            this.wrapper.appendChild(this.items);
            this.wrapper.appendChild(this.startButton);
            this.el.appendChild(this.wrapper);

            for (var i = 0; i < this.len; i++) {
                var item = document.createElement('div');
                item.className = 'soroban-simulator__item';
                item.innerHTML = '<div></div>';
                var div = item.getElementsByTagName('div')[0];
                item.style.justifyContent = 'center';
                item.style.alignItems = 'center';
                item.style.position = 'relative';
                div.style.display = 'inline-block';
                div.style.position = 'relative';
                if (this.config.zones[i].type === 'random-position') {
                    item.style.display = 'block';
                    item.style.textAlign = 'left';
                } else {
                    item.style.display = 'flex';
                }
                this.items.appendChild(item);
                this.zones.push({
                    el: item,
                    data: this.config.zones[i]
                });
            }

            this.startButton.onclick = function (event) {
                event.preventDefault();
                _this2.__start();
                _this2.startButton.style.display = 'none';
            };
        }

        /**
         * Starting training
         */

    }, {
        key: '__start',
        value: function __start() {
            for (var i = 0; i < this.len; i++) {
                var numLen = this.zones[i].data.example.length;
                var iteration = 0;
                this.__change(this.zones[i], numLen, iteration);
            }
        }

        /**
         * Change iteration
         * @param zone 
         * @param numLen 
         * @param iteration 
         */

    }, {
        key: '__change',
        value: function __change(zone, numLen, iteration) {
            var _this3 = this;

            var _this = this;
            var textEl = zone.el.getElementsByTagName('div')[0];
            if (iteration < numLen) {
                textEl.innerText = zone.data.example[iteration];
                switch (zone.data.type) {
                    case 'random-position':
                        this.__setRandomPosition(textEl);
                        break;
                }
                setTimeout(function () {
                    iteration++;
                    _this.__change(zone, numLen, iteration);
                }, zone.data.speed);
            } else {
                textEl.innerHTML = '<input type="number" value=""/><button>' + _this.btnResultText + '</button>';
                textEl.parentElement.style.display = 'flex';
                textEl.style.top = 'auto';
                textEl.style.left = 'auto';
                var btn = textEl.getElementsByTagName('button')[0];
                var input = textEl.getElementsByTagName('input')[0];

                btn.onclick = function () {
                    _this3.__sendResult(zone, input.value);
                };
                return;
            }
        }

        /**
         * Set random position
         * @param el 
         */

    }, {
        key: '__setRandomPosition',
        value: function __setRandomPosition(el) {
            var parentWidth = el.parentElement.clientWidth,
                parentHeight = el.parentElement.clientHeight,
                elWidth = el.clientWidth,
                elHeight = el.clientHeight,
                maxLeft = parentWidth - elWidth,
                maxTop = parentHeight - elHeight,
                left = this.__getRandomInt(0, maxLeft),
                top = this.__getRandomInt(0, maxTop);

            el.style.top = top + 'px';
            el.style.left = left + 'px';
        }

        /**
         * Get random integer
         * @param min 
         * @param max 
         */

    }, {
        key: '__getRandomInt',
        value: function __getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        /**
         * Callback result
         * @param data 
         * @param value 
         */

    }, {
        key: '__sendResult',
        value: function __sendResult(zone, value) {
            zone.el.innerHTML = '<div class="soroban-simulator__loading">' + this.textLoading + '</div>';
            var event = new CustomEvent("sendResult", {
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

    }, {
        key: 'arraySum',
        value: function arraySum(array) {
            var reducer = function reducer(accumulator, currentValue) {
                return parseInt(accumulator) + parseInt(currentValue);
            };
            return parseInt(array.reduce(reducer));
        }

        /**
         * Show result
         * @param detail
         * @param status 
         */

    }, {
        key: 'showResult',
        value: function showResult(detail, status) {
            detail.zone.el.innerHTML = '<div class="soroban-simulator__status soroban-simulator__status--' + status + '">' + detail.value + '</div>';
        }
    }]);

    return _class;
}();

exports.default = _class;