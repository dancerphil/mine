(this.webpackJsonpmine=this.webpackJsonpmine||[]).push([[0],[,function(e,n,t){e.exports={cover:"Theme2_cover__3865b",reveal:"Theme2_reveal__1EBmM",mine:"Theme2_mine__3IuD1",mark:"Theme2_mark__3Tzcm",label0:"Theme2_label0__3RWIe",label1:"Theme2_label1__2ZQ5E",label2:"Theme2_label2__3qBuF",label3:"Theme2_label3__2CRCO",label4:"Theme2_label4__3JfsB",label5:"Theme2_label5__10eKI",label6:"Theme2_label6__1_WrO",label7:"Theme2_label7__2QVoS",label8:"Theme2_label8__3yYkG"}},,,,,,function(e,n,t){e.exports={block:"Block_block__iCjDP"}},,,function(e,n,t){e.exports={container:"App_container__1MQN3"}},function(e,n,t){e.exports=t(19)},,,,,function(e,n,t){},,,function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(9),i=t.n(a),c=(t(16),t(5)),l=t(2),u=function(){return window.outerWidth},f=function(){var e=Object(r.useState)(u),n=Object(l.a)(e,2),t=n[0],o=n[1];return Object(r.useEffect)((function(){var e=function(){return o(u())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}})),t},s=t(3),b=function(){var e=[];return{rerender:function(){e.forEach((function(e){return e()}))},subscribe:function(n){return e.push(n),function(){e.splice(e.indexOf(n),1)}}}}(),v=b.rerender,m=b.subscribe,h={},d=!1,_=function(e){return[e%10,Math.floor(e/10)]},w=function(e,n){return"".concat(e,",").concat(n)},k=function(e){var n=e.x,t=e.y,r=[w(n-1,t-1),w(n-1,t),w(n-1,t+1),w(n,t-1),w(n,t+1),w(n+1,t-1),w(n+1,t),w(n+1,t+1)];return Object(s.compact)(r.map((function(e){return h[e]})))},p=function(e){var n=_(e),t=Object(l.a)(n,2),r=t[0],o=t[1];return{id:w(r,o),x:r,y:o,mine:!1,reveal:!1,mark:!1,label:0}},O=function(){Object.values(h).forEach((function(e){e.mine=!1}));for(var e=0;e<150;){var n=Math.floor(1e3*Math.random()),t=_(n),r=Object(l.a)(t,2),o=r[0],a=r[1],i=w(o,a),c=h[i];c.mine||(c.mine=!0,e++)}Object.values(h).forEach((function(e){var n=k(e);e.label=Object(s.sumBy)(n,"mine")}))};!function(){for(var e=0;e<1e3;e++){var n=p(e);h[n.id]=n}}();var j=function(e){e.mark=!0},g=function e(n){if(!n.reveal){if(n.reveal=!0,n.mine)return console.error("\u5931\u8d25"),void Object.values(h).forEach((function(e){e.reveal=!0}));0===n.label&&k(n).forEach(e)}},E=function(e){d||(!function(e){O();for(var n=0;n++<100;)if(O(),!e.mine&&0===e.label)return}(e),d=!0),e.reveal?function(e){var n=k(e);Object(s.sumBy)(n,(function(e){return e.reveal?0:1}))!==e.label?Object(s.sumBy)(n,(function(e){return e.mark?1:0}))===e.label&&n.filter((function(e){return!e.mark})).forEach(g):n.filter((function(e){return!e.reveal})).forEach(j)}(e):g(e),v()},y=t(4),T=t(6),W=t.n(T),B=t(7),C=t.n(B),x=t(1),A=t.n(x),N=function(e){var n,t=e.block,a=e.style,i=t.mine,c=t.reveal,l=t.mark,u=t.label,f=Object(r.useCallback)((function(){return E(t)}),[t]);if(!c){var s=W()(C.a.block,A.a.cover,Object(y.a)({},A.a.mark,l));return o.a.createElement("div",{className:s,style:a,onClick:f},l&&"m")}var b=W()(C.a.block,A.a.reveal,(n={},Object(y.a)(n,A.a["label".concat(u)],!i),Object(y.a)(n,A.a.mine,i),n));return o.a.createElement("div",{className:b,style:a,onClick:f},i?"!":u)},R=t(10),M=t.n(R),S=Object(c.a)((function(e){return e<400?e:400}),(function(e){return{width:e}})),I=Object(c.a)((function(e){return e}),(function(e){return{width:e,height:e}})),L=function(e){return e+1},z=function(){var e=Object(r.useReducer)(L,0)[1],n=f(),t=S(n),a=I(t.width/10);return Object(r.useEffect)((function(){return m(e)}),[e]),o.a.createElement("div",{className:M.a.container,style:t},Object.values(h).map((function(e){return o.a.createElement(N,{key:e.id,block:e,style:a})})))},J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(o.a.createElement(z,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/mine",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/mine","/service-worker.js");J?(!function(e,n){fetch(e).then((function(t){var r=t.headers.get("content-type");404===t.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):P(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):P(n,e)}))}}()}],[[11,1,2]]]);
//# sourceMappingURL=main.0302012c.chunk.js.map