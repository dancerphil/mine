(this.webpackJsonpmine=this.webpackJsonpmine||[]).push([[0],{10:function(e,n,t){e.exports={block:"Block_block__Gscjm"}},16:function(e,n,t){e.exports={castRange:"CastRange_castRange__1OIwm"}},21:function(e,n,t){},30:function(e,n,t){"use strict";t.r(n);for(var r=t(1),a=t(14),o=t.n(a),c=(t(21),t(2)),l=t(12),i=window.innerWidth,u=window.innerHeight,m=Math.floor(i/20),f=Math.floor(.95*u/m),s=20*f,v=Math.floor(.2*s),b={width:20*m,height:f*m},d={width:m,height:m},h={width:3*m,height:3*m},_=[],y=0;y<f;y++)for(var j=0;j<20;j++)_.push({x:j,y:y});var p=function(e){e.mark=!0},x=function e(n){if(!n.reveal){if(n.reveal=!0,n.mine)throw n.mark=!0,new Error("\u5931\u8d25");0===n.label&&Y(n).forEach(e)}},O=function(e){var n=e.mark,t=e.reveal;n&&n.forEach(p),t&&t.forEach(x)},E=function(e){return e.reveal&&e.mine?1:e.reveal?0:1},k=function(e){if(e.mine)return{};var n=Y(e);return Object(c.sumBy)(n,E)===e.label?{mark:n.filter((function(e){return!e.reveal}))}:Object(c.sumBy)(n,(function(e){return e.mark?1:0}))===e.label?{reveal:n.filter((function(e){return!e.mark}))}:{}},T=Object(l.a)(),g=T.getValue,w=T.useValue,L=T.set,M=function(){return Object(c.compact)(_.map(g))},Y=function(e){var n=e.x,t=e.y,r=[g({x:n-1,y:t-1}),g({x:n-1,y:t}),g({x:n-1,y:t+1}),g({x:n,y:t-1}),g({x:n,y:t+1}),g({x:n+1,y:t-1}),g({x:n+1,y:t}),g({x:n+1,y:t+1})];return Object(c.compact)(r)};_.forEach((function(e){var n=e.x,t=e.y;L({x:n,y:t},{x:n,y:t,mine:!1,reveal:!1,mark:!1,label:0})}));var B=t(32),N=Object(B.a)(0),X=function(){return N.set((function(e){return e+1}))},R=N.useValue,C=t(4),V=t(9),A=t.n(V),D=t(10),F=t.n(D),Q=t(5),S=t.n(Q),U=t(0),G=function(e){var n,t=e.coordinate,r=w(t);if(!r)return null;var a=r.mine,o=r.reveal,c=r.mark,l=r.label;if(!o){var i=A()(F.a.block,S.a.cover,Object(C.a)({},S.a.mark,c));return Object(U.jsx)("div",{className:i,style:d,children:c&&"m"})}var u=A()(F.a.block,S.a.reveal,(n={},Object(C.a)(n,S.a["label".concat(l)],!a),Object(C.a)(n,S.a.mine,a),n));return Object(U.jsx)("div",{className:u,style:d,children:a?"!":l})},I=t(7),J=t.n(I),W=!1,z=function(){M().forEach((function(e){e.reveal=!1,e.mark=!1})),W=!1,X()};z();var H=function(){M().forEach((function(e){e.mine=!1}));for(var e=0;e<v;){var n=Math.floor(20*Math.random()),t=Math.floor(Math.random()*f),r=g({x:n,y:t});r.mine||(r.mine=!0,e++)}M().forEach((function(e){var n=Y(e);e.label=Object(c.sumBy)(n,"mine")}))},K=function(e){var n=k(e);O(n)},q=function(e){var n=g(e);if(n){W||(!function(e){for(var n=0;n<100;n++)if(H(),!e.mine&&0===e.label)return}(n),W=!0),n.reveal||x(n),K(n);var t=function(e){return{mark:Object(c.compact)(e.map((function(e){return e.mark}))).flat(),reveal:Object(c.compact)(e.map((function(e){return e.reveal}))).flat()}}(Y(n).filter((function(e){return e.reveal})).map(k));O(t)}},P=function(e){try{q(e)}catch(n){console.error(n)}finally{X()}},Z=Object(B.a)(),$=Z.useValue,ee=function(e){Z.set((function(n){return n&&n.x===e.x&&n.y===e.y?n:e}))},ne=Z.reset,te=function(e,n,t){var r=e.getBoundingClientRect(),a=n-r.left+e.scrollLeft,o=t-r.top+e.scrollTop;return{x:Math.floor(a/m),y:Math.floor(o/m)}},re=function(e){return function(n){n.preventDefault();var t=n.changedTouches[0].clientX,r=n.changedTouches[0].clientY;e({clientX:t,clientY:r})}},ae=function(e,n){return function(t){var r=t.clientX,a=t.clientY;n&&!t.buttons||e({clientX:r,clientY:a})}},oe=function(e){return Object(r.useEffect)((function(){var n=e.current;if(n){var t=function(e){var t=e.clientX,r=e.clientY,a=te(n,t,r);ee(a)},r=re(t),a=ae(t),o=function(e){var t=e.clientX,r=e.clientY,a=te(n,t,r);ee(a),P(a)},c=re(o),l=ae(o,!0),i=function(e){var t=e.clientX,r=e.clientY,a=te(n,t,r);P(a),ne()},u=re(i),m=ae(i);return document.body.addEventListener("touchstart",r),document.body.addEventListener("mousedown",a),document.body.addEventListener("touchmove",c,{passive:!1}),document.body.addEventListener("mousemove",l),document.body.addEventListener("touchend",u),document.body.addEventListener("mouseup",m),function(){document.body.removeEventListener("touchstart",r),document.body.removeEventListener("mousedown",a),document.body.removeEventListener("touchmove",c),document.body.removeEventListener("mousemove",l),document.body.removeEventListener("touchend",u),document.body.removeEventListener("mouseup",m)}}}),[e]),e},ce=t(11),le=t(16),ie=t.n(le);function ue(){var e=$();if(!e)return null;var n=e.x,t=e.y;return Object(U.jsx)("div",{className:ie.a.castRange,style:Object(ce.a)(Object(ce.a)({},h),{},{left:(n-1)*m,top:(t-1)*m})})}var me=Object(r.memo)(ue),fe=function(){R();var e=Object(r.useRef)(null);oe(e);var n=M();return Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)("div",{className:J.a.header,onMouseUp:z,onTouchEnd:z,children:n.filter((function(e){return e.mine&&!e.mark})).length}),Object(U.jsx)("div",{className:J.a.content,children:Object(U.jsxs)("div",{className:J.a.panel,style:b,ref:e,children:[_.map((function(e){return Object(U.jsx)(G,{coordinate:e},"".concat(e.x,"-").concat(e.y))})),Object(U.jsx)(me,{})]})})]})};o.a.render(Object(U.jsx)(fe,{}),document.getElementById("root"))},5:function(e,n,t){e.exports={cover:"Theme2_cover__36ss5",reveal:"Theme2_reveal__39mE5",mine:"Theme2_mine__14msQ",mark:"Theme2_mark__6iF2h",label0:"Theme2_label0__2jGEp",label1:"Theme2_label1__2hOCp",label2:"Theme2_label2__r3UQk",label3:"Theme2_label3__mbS-v",label4:"Theme2_label4__18SBo",label5:"Theme2_label5__FTOCM",label6:"Theme2_label6__l5Y_m",label7:"Theme2_label7__2iKDS",label8:"Theme2_label8__1UzQN"}},7:function(e,n,t){e.exports={content:"App_content__1dlDM",panel:"App_panel__2es-6",header:"App_header__14Wxn"}}},[[30,1,2]]]);
//# sourceMappingURL=main.39ebae7a.chunk.js.map