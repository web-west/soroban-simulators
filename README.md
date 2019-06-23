## Soroban training

![](https://travis-ci.org/web-west/soroban-simulators.svg?branch=master) ![](https://img.shields.io/github/stars/web-west/soroban-simulators.svg) ![](https://img.shields.io/github/forks/web-west/soroban-simulators.svg) ![](https://img.shields.io/github/tag/web-west/soroban-simulators.svg) ![](https://img.shields.io/github/issues/web-west/soroban-simulators.svg)

### Install

`npm i -S soroban-simulators`

#### [Demo](https://web-west.github.io/demo-soroban-simulators/)


#### Example

```javascript
import SorobanSimulator from 'soroban-simulators';

const config = {
    debug: true,
    zones: [
        {
            example: [3, -1, 2, 3, 1, -1],
            type: 'default',
            speed: 500,
            id: 1
        },
        {
            example: [1, -1, 2, -2, 1, -1],
            type: 'default',
            speed: 1000,
            id: 2
        },
        {
            example: [1, -1, 2, -2, 1, -1],
            type: 'default',
            speed: 1500,
            id: 3
        },
        {
            example: [1, -1, 2, -2, 1, -1],
            type: 'default',
            speed: 1000,
            id: 4
        }
    ]
}

const el = document.getElementById('simulator-example-1');

let s = new SorobanSimulator(config);

s.build(el);

el.addEventListener('sendResult', (e) => {
    let sum = s.arraySum(e.detail.zone.data.example)
    setTimeout(() => {
        s.showResult(e.detail, sum === parseInt(e.detail.value) ? 'success' : 'error')
    }, 2000)
})

```