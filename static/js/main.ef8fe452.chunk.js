(this["webpackJsonpreact-connectfour"]=this["webpackJsonpreact-connectfour"]||[]).push([[0],{13:function(r,e,n){},14:function(r,e,n){},16:function(r,e,n){},18:function(r,e,n){"use strict";n.r(e);var t=n(1),c=n.n(t),a=n(8),o=n.n(a),u=(n(13),n(14),n(2)),i=n.n(u),l=n(4),s=n(3),f=(n(16),n(7));function v(r){return j.apply(this,arguments)}function j(){return(j=Object(l.a)(i.a.mark((function r(e){return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",new Promise((function(r,n){if(0!==p(e))return 0;var t,c,a=h(e),o=-1/0,u=Object(f.a)(a);try{for(u.s();!(c=u.n()).done;){var i=c.value;O(e,i,-1);var l=-b(e,1,6,-1/0,1/0);l>o&&(t=i,o=l),m(e,i,-1)}}catch(s){u.e(s)}finally{u.f()}r(t.col)})));case 1:case"end":return r.stop()}}),r)})))).apply(this,arguments)}function b(r,e,n,t,c){if(0===n||p(r))return function(r,e,n){if(p(r)===e)return 1e3*n;if(p(r)===-e)return-1e3*n;return function(r,e){function n(r,n,t,c){return e===r&&r===n&&n===t&&null===c||e===r&&r===n&&null===t&&n===c||e===r&&null===n&&r===t&&t===c||null===r&&r===n&&n===t&&c===e}for(var t=0,c=0;c<4;c++)for(var a=0;a<r.length;a++)n(r[c][a],r[c+1][a],r[c+2][a],r[c+3][a])&&t++;for(var o=0;o<r[0].length;o++)for(var u=0;u<3;u++)n(r[o][u],r[o][u+1],r[o][u+2],r[o][u+3])&&t++;for(var i=0;i<4;i++)for(var l=0;l<3;l++)n(r[i][l],r[i+1][l+1],r[i+2][l+2],r[i+3][l+3])&&t++;for(var s=3;s<6;s++)for(var f=0;f<3;f++)n(r[s][f],r[s-1][f+1],r[s-2][f+2],r[s-3][f+3])&&t++;return t}(r,e)}(r,e,n);var a,o=t,u=h(r),i=Object(f.a)(u);try{for(i.s();!(a=i.n()).done;){var l=a.value;O(r,l,e);var s=-b(r,-e,n-1,-c,-o);if(m(r,l,e),s>o&&(o=s)>=c)break}}catch(v){i.e(v)}finally{i.f()}return o}var d=[3,4,5,7,5,4,3,4,6,8,10,8,6,4,5,8,11,13,11,8,5,5,8,11,13,11,8,5,4,6,8,10,8,6,4,3,4,5,7,5,4,3];function h(r){for(var e=[],n=0;n<7;n++)for(var t=5;t>=0;t--)if(!r[n][t]){e.push({col:n,row:t});break}return e.sort((function(r,e){return d[7*e.row+e.col]-d[7*r.row+r.col]}))}function O(r,e,n){r[e.col][e.row]&&console.error("Invalid move: "+e.col+" "+e.row),r[e.col][e.row]=n}function m(r,e,n){r[e.col][e.row]!==n&&console.error("Invalid revert: "+e.col+" "+e.row),r[e.col][e.row]=null}function p(r){for(var e=!0,n=0;n<7;n++)r[n][0]||(e=!1);function t(r,e,n,t){return r&&r===e&&e===n&&n===t?r:null}for(var c=0;c<4;c++)for(var a=0;a<r.length;a++){var o=t(r[c][a],r[c+1][a],r[c+2][a],r[c+3][a]);if(o)return o}for(var u=0;u<r[0].length;u++)for(var i=0;i<3;i++){var l=t(r[u][i],r[u][i+1],r[u][i+2],r[u][i+3]);if(l)return l}for(var s=0;s<4;s++)for(var f=0;f<3;f++){var v=t(r[s][f],r[s+1][f+1],r[s+2][f+2],r[s+3][f+3]);if(v)return v}for(var j=3;j<6;j++)for(var b=0;b<3;b++){var d=t(r[j][b],r[j-1][b+1],r[j-2][b+2],r[j-3][b+3]);if(d)return d}return e?2:0}var x=n(0);function w(r){var e;return 1===r.value?e="p1":-1===r.value&&(e="p2"),Object(x.jsx)("div",{children:Object(x.jsx)("div",{className:"cell",children:Object(x.jsx)("div",{className:e})})})}function g(r){return Object(x.jsx)("div",{className:"board",children:r.grid.map((function(e,n){return Object(x.jsxs)("div",{className:"column-box",children:[Object(x.jsx)("div",{id:"col-".concat(n),className:"col",children:e.map((function(r,e){return Object(x.jsx)(w,{value:r},e)}))},n),Object(x.jsx)("div",{className:"col-border",onClick:function(){return r.onClick(n)},children:e.map((function(r,e){return Object(x.jsx)("div",{className:"cell-border"},e)}))},n+"rand")]},"col"+n)}))})}function k(r){var e=Object(t.useState)(N()),n=Object(s.a)(e,2),c=n[0],a=n[1],o=Object(t.useState)(!0),u=Object(s.a)(o,2),f=u[0],j=u[1],b=Object(t.useState)(0),d=Object(s.a)(b,2),h=d[0],O=d[1],m=Object(t.useState)(!1),p=Object(s.a)(m,2),w=p[0],k=p[1];function y(r,e,n){if(e[r][0]||C(e))return console.log("col full"),null;for(var t=[],c=0;c<e.length;c++)t[c]=e[c].slice();for(var o=6,u=0;u<6;u++)if(t[r][u]){o=u;break}return t[r][o-1]=n?1:-1,O(C(t)),a(t),t}function S(){return(S=Object(l.a)(i.a.mark((function r(e){var n,t,a;return i.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!w||0!==h||!f){r.next=11;break}if(j(!1),n=y(e,c,!0)){r.next=6;break}return j(!0),r.abrupt("return");case 6:for(t=[],a=0;a<n.length;a++)t[a]=n[a].slice();return r.next=10,new Promise((function(r){return setTimeout(r,550)}));case 10:v(t).then((function(r){y(r,n,!1),j(!0)}));case 11:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return Object(x.jsx)("div",{className:"background",children:Object(x.jsxs)("div",{className:"connect-four",children:[Object(x.jsxs)("div",{className:"header",children:[Object(x.jsx)("h1",{children:"CONNECT FOUR AI"}),Object(x.jsx)("h2",{children:"made by jannis becketepe and timon kobusch."})]}),Object(x.jsxs)("div",{className:"menu",children:[Object(x.jsx)("button",{className:"game-button",onClick:function(r){r.preventDefault(),w?(a(N()),O(0),k(!1)):(k(!0),Math.random()<.5?j(!0):(j(!1),v(N()).then((function(r){y(r,N(),!1),j(!0)}))))},children:w?"reset":"start game"}),w&&0===h&&!f&&Object(x.jsx)("div",{className:"load"}),Object(x.jsx)("p",{children:w&&0===h?f?"your turn. click a column.":"the computer is thinking.":""}),Object(x.jsx)("p",{children:1===h?"you won!":-1===h?"the computer won.":""})]}),Object(x.jsx)(g,{grid:c,onClick:function(r){return function(r){return S.apply(this,arguments)}(r)}}),Object(x.jsx)("div",{className:"log-switch",children:Object(x.jsxs)("label",{className:"switch",children:[Object(x.jsx)("input",{type:"checkbox"}),Object(x.jsx)("span",{className:"slider round"})]})})]})})}function N(){for(var r=new Array(7),e=0;e<r.length;e++)r[e]=new Array(6).fill(null);return r}function y(r,e,n,t){return r&&r===e&&e===n&&n===t?r:null}function C(r){for(var e=0;e<6;e++)for(var n=0;n<4;n++){var t=y(r[n][e],r[n+1][e],r[n+2][e],r[n+3][e]);if(t)return t}for(var c=0;c<7;c++)for(var a=0;a<3;a++){var o=y(r[c][a],r[c][a+1],r[c][a+2],r[c][a+3]);if(o)return o}for(var u=0;u<4;u++)for(var i=0;i<3;i++){var l=y(r[u][i],r[u+1][i+1],r[u+2][i+2],r[u+3][i+3]);if(l)return l}for(var s=3;s<7;s++)for(var f=0;f<3;f++){var v=y(r[s][f],r[s-1][f+1],r[s-2][f+2],r[s-3][f+3]);if(v)return v}return 0}var S=function(){return Object(x.jsx)(k,{})},F=function(r){r&&r instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,t=e.getFID,c=e.getFCP,a=e.getLCP,o=e.getTTFB;n(r),t(r),c(r),a(r),o(r)}))};o.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(S,{})}),document.getElementById("root")),F()}},[[18,1,2]]]);
//# sourceMappingURL=main.ef8fe452.chunk.js.map