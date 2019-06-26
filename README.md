## Soroban training

![](https://travis-ci.org/web-west/soroban-simulators.svg?branch=master) ![](https://img.shields.io/github/stars/web-west/soroban-simulators.svg) ![](https://img.shields.io/github/forks/web-west/soroban-simulators.svg) ![](https://img.shields.io/github/tag/web-west/soroban-simulators.svg) ![](https://img.shields.io/github/issues/web-west/soroban-simulators.svg)

### Install

`npm i -S soroban-simulators`

#### [Demo 1](https://web-west.github.io/soroban-simulators/dist/index.html)

#### Example

```javascript
document.addEventListener('DOMContentLoaded', function(){
    var el = document.getElementById('app'),
        config = {
            debug: true,
            columns: 2,
            timeSendResult: 15 // seconds
        },
        iter = 0,
        zones = [
            {
                example: [1, -1, 2, -2, 1, -1],
                type: 'default',
                speed: 500,
                id: 1
            },
            {
                example: [1, -1, 2, -2, 1, -1],
                type: 'random-position',
                speed: 500,
                id: 2
            }
        ],                
        s = new SorobanSimulator(config);

    s.build(el, zones)

    el.addEventListener('sendResult', (e) => {
        var sum = s.arraySum(e.detail.zone.data.example)
        iter++
        setTimeout(() => {
            s.showResult(e.detail, sum === parseInt(e.detail.value) ? 'success' : 'error')
            if (iter >= zones.length) {
                iter = 0;
                setTimeout(() => {
                    s.build(el, zones, 'next')
                }, 2000)
            }
        }, 1000)
    })

    el.addEventListener('startTraining', (e) => {
        console.log('startTraining')
    })
    el.addEventListener('endTraining', (e) => {
        console.log('endTraining')
    })
    el.addEventListener('startTimer', (e) => {
        console.log('startTimer')
    })
    el.addEventListener('endTimer', (e) => {
        console.log('endTimer')
        s.build(el, zones, 'next')
    })
});

```