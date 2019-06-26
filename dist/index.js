!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SorobanSimulator=e():t.SorobanSimulator=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=0)}([function(t,e,n){n(1),t.exports=n(2)},function(t,e,n){t.exports=n.p+"style.css"},function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e);var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.debug=e.debug||!1,this.columns=e.columns||1,this.btnTextResult=e.btnTextResult||"Send Result",this.textLoading=e.textLoading||"Loading...",this.btnTextStart=e.btnTextStart||"Start",this.btnTextNext=e.btnTextNext||"Next start",this.el=void 0,this.wrapper=void 0,this.btnStart=void 0,this.btnStartNext=void 0,this.zones=[],this.countItertion=0,this.zonesExampleLength=0,this.timeSendResult=e.timeSendResult||null,this.timerSendResult,this.timerElem=void 0}var e,n,s;return e=t,(n=[{key:"__log",value:function(t){this.debug&&console.log(t)}},{key:"destroy",value:function(){this.el=void 0,this.wrapper=void 0,this.items=void 0,this.zones=[],this.btnStart=void 0,this.btnStartNext=void 0,this.countItertion=0,this.zonesExampleLength=0,this.timerElem=void 0,clearInterval(this.timerSendResult)}},{key:"build",value:function(t,e,n){var i=this;this.destroy();var s=e.length;this.columns=s>1?this.columns:1,this.el=t,this.wrapper=document.createElement("div"),this.wrapper.className="soroban-simulator__wrapper",this.items=document.createElement("div"),this.items.className="soroban-simulator__items",this.wrapper.appendChild(this.items),this.timeSendResult&&(this.timerElem=document.createElement("div"),this.timerElem.className="soroban-simulator__timer",this.timerElem.style.display="none",this.wrapper.appendChild(this.timerElem)),"next"===n?(this.btnStartNext=document.createElement("button"),this.btnStartNext.className="soroban-simulator__start-next",this.btnStartNext.innerText=this.btnTextNext,this.wrapper.appendChild(this.btnStartNext),this.btnStartNext.onclick=function(t){t.preventDefault(),i.__start(),i.btnStartNext.style.display="none"}):(this.btnStart=document.createElement("button"),this.btnStart.className="soroban-simulator__start",this.btnStart.innerText=this.btnTextStart,this.wrapper.appendChild(this.btnStart),this.btnStart.onclick=function(t){t.preventDefault(),i.__start(),i.btnStart.style.display="none"}),this.el.innerHTML="",this.el.appendChild(this.wrapper);for(var a=0;a<s;a++){var o=document.createElement("div");o.className="soroban-simulator__item",o.innerHTML="<div></div>";var r=o.getElementsByTagName("div")[0];o.style.justifyContent="center",o.style.alignItems="center",o.style.position="relative",o.style.width=100/this.columns+"%",r.style.display="inline-block",r.style.position="relative","random-position"===e[a].type?(o.style.display="block",o.style.textAlign="left"):o.style.display="flex",this.items.appendChild(o),this.zones.push({el:o,data:e[a]})}}},{key:"__sumZonesExampleLength",value:function(){for(var t in this.zonesExampleLength=0,this.zones)this.__log(this.zones[t]),this.zonesExampleLength+=this.zones[t].data.example.length}},{key:"__start",value:function(){this.el.dispatchEvent(new CustomEvent("startTraining")),this.__sumZonesExampleLength(),this.__showingNumber()}},{key:"__showingNumber",value:function(){for(var t=this.zones.length,e=0;e<t;e++){var n=this.zones[e].data.example.length;this.__change(this.zones[e],n,0)}}},{key:"__change",value:function(t,e,n){var i=this,s=this,a=t.el.getElementsByTagName("div")[0];if(n<e){switch(a.innerText=t.data.example[n]>0?"+".concat(t.data.example[n]):t.data.example[n],t.data.type){case"random-position":this.__setRandomPosition(a)}setTimeout(function(){n++,i.countItertion++,s.__change(t,e,n)},t.data.speed)}else{a.innerHTML='<input type="number" value=""/><button>'.concat(s.btnTextResult,"</button>"),a.parentElement.style.display="flex",a.style.top="auto",a.style.left="auto";var o=a.getElementsByTagName("button")[0],r=a.getElementsByTagName("input")[0];o.onclick=function(e){isNaN(parseInt(r.value))?e.preventDefault():i.__sendResult(t,r.value)}}this.countItertion>=this.zonesExampleLength&&(this.el.dispatchEvent(new CustomEvent("endTraining")),this.timeSendResult&&this.__startTimer(this.timeSendResult,this.timerElem))}},{key:"__setRandomPosition",value:function(t){var e=t.parentElement.clientWidth,n=t.parentElement.clientHeight,i=e-t.clientWidth,s=n-t.clientHeight,a=this.__getRandomInt(0,i),o=this.__getRandomInt(0,s);t.style.top=o+"px",t.style.left=a+"px"}},{key:"__getRandomInt",value:function(t,e){return Math.floor(Math.random()*(e-t))+t}},{key:"__sendResult",value:function(t,e){t.el.innerHTML='<div class="soroban-simulator__loading">'.concat(this.textLoading,"</div>");var n=new CustomEvent("sendResult",{detail:{zone:t,value:e},bubbles:!0,cancelable:!1});this.el.dispatchEvent(n)}},{key:"arraySum",value:function(t){return parseInt(t.reduce(function(t,e){return parseInt(t)+parseInt(e)}))}},{key:"showResult",value:function(t,e){t.zone.el.innerHTML='<div class="soroban-simulator__status soroban-simulator__status--'.concat(e,'">').concat(t.value,"</div>")}},{key:"__startTimer",value:function(t,e){var n=this,i=Date.now();e.style.display="block",this.el.dispatchEvent(new CustomEvent("startTimer")),this.timerSendResult=setInterval(function(){n.__timer(t,e,i,void 0,void 0,void 0)},1e3),this.__timer(t,e,i,void 0,void 0,void 0)}},{key:"__timer",value:function(t,e,n,i,s,a){s=(s=(i=t-((Date.now()-n)/1e3|0))/60|0)<10?"0"+s:s,a=(a=i%60|0)<10?"0"+a:a,e.textContent=s+":"+a,i<=0&&(e.style.display="none",clearInterval(this.timerSendResult),this.el.dispatchEvent(new CustomEvent("endTimer")))}}])&&i(e.prototype,n),s&&i(e,s),t}();e.default=s}]).default});
//# sourceMappingURL=index.js.map