!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.treemap=e():t.treemap=e()}(self,(function(){return(()=>{"use strict";var t={99:(t,e,n)=>{n.d(e,{Z:()=>s});var o=n(81),r=n.n(o),i=n(645),a=n.n(i)()(r());a.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap);"]),a.push([t.id,'*{user-select:none;padding:0;margin:0}.path{stroke-width:1.5;fill-opacity:1;stroke:#fff;stroke-opacity:1;opacity:1;cursor:pointer}.path:hover{stroke:#363636;stroke-width:2}.text{fill:#424242;fill-opacity:1;font-family:"Roboto",sans-serif;cursor:pointer}.text-scale{fill:#424242;fill-opacity:1;font-family:"Roboto",sans-serif}.tooltip{pointer-events:none}',""]);const s=a},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",o=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),o&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),o&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,o,r,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var l=0;l<t.length;l++){var d=[].concat(t[l]);o&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),e.push(d))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,o=0;o<e.length;o++)if(e[o].identifier===t){n=o;break}return n}function o(t,o){for(var i={},a=[],s=0;s<t.length;s++){var c=t[s],l=o.base?c[0]+o.base:c[0],d=i[l]||0,p="".concat(l," ").concat(d);i[l]=d+1;var u=n(p),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(h);else{var f=r(h,o);o.byIndex=s,e.splice(s,0,{identifier:p,updater:f,references:1})}a.push(p)}return a}function r(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,r){var i=o(t=t||[],r=r||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var s=n(i[a]);e[s].references--}for(var c=o(t,r),l=0;l<i.length;l++){var d=n(i[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}i=c}}},569:t=>{var e={};t.exports=function(t,n){var o=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(o,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={id:o,exports:{}};return t[o](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};return(()=>{function t(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function e(t){return document.getElementById(t)}n.r(o),n.d(o,{default:()=>D,render:()=>q});var r=n(379),i=n.n(r),a=n(795),s=n.n(a),c=n(569),l=n.n(c),d=n(565),p=n.n(d),u=n(216),h=n.n(u),f=n(589),m=n.n(f),y=n(99),g={};g.styleTagTransform=m(),g.setAttributes=p(),g.insert=l().bind(null,"head"),g.domAPI=s(),g.insertStyleElement=h(),i()(y.Z,g),y.Z&&y.Z.locals&&y.Z.locals;const x=14,v={ROOT_CHANGE:new Event("root-change")},b={min:0,max:0},w=[];let $="",C={data:[]};var A,L,E=null;function M(e,n,o={}){const{x:r,y:i,width:a,height:s}=o,c=t("path");return c.classList.add(e),c.setAttribute("style",`fill: ${n}`),c.setAttribute("d",`M${r},${i} L${a+r},${i} L${a+r},${s+i} L${r},${s+i} Z`),c}function O(t){const e=("canvas",document.createElement("canvas")).getContext("2d");return e.font="14px Roboto",e.measureText(t).width}function S(e,n,o,r=!0){const{coords:i,name:a}=n,s=t("text");s.classList.add(e),s.setAttribute("x",0),s.setAttribute("y",0),s.textContent=a;const c=O(a)+5;let l=i.width/c;(l>1&&x>i.height||l<1&&l*x>i.height)&&(l=0);const d=l>1?`translate(${i.x+5}, ${i.y+x})`:`translate(${i.x}, ${i.y+l*x})scale(${l})`;return s.setAttribute("style",`font-size: 14px; fill: ${o}; fill-opacity: ${l<.3?0:1}; white-space: pre;`),s.setAttribute("transform",d),r&&(n.topOffset=l>1?22:l*x+5),s}function T(){document.querySelectorAll(".tooltip").forEach((t=>t.remove()))}function P(t,e){E++,t.children.sort(((t,e)=>e.loc-t.loc)),t.children.forEach((t=>{const n={id:E,name:t.name,parent:e.id,proportion:t.loc,topOffset:0,type:t.type,heatmap:t.heatmap,children:[],scaledProportion:0};e?.children?.push(n),P(t,n)}))}function R(t){return w.filter((e=>e.id==t.id)).length>0}function k(t,e){if(e?.id==t)return e;if(e.children.length>0)for(let n=0;n<e.children.length;n++){let o=k(t,e.children[n]);if(null!=o)return o}return null}function j(e,n={}){const{top:o,bottom:r,left:i,right:a}=n;n.width=n.width-30-60;const s=t("svg");s.setAttribute("id","treemap"),s.setAttribute("width",a+i),s.setAttribute("height",r+o),s.appendChild(function(e={}){const{y:n,width:o,height:r}=e,i=t("g"),a=t("g"),s=t("defs"),c=t("linearGradient"),l=t("text");c.setAttribute("id","Gradient"),c.setAttribute("x1","0"),c.setAttribute("x2","0"),c.setAttribute("y1","0"),c.setAttribute("y1","1");const d=[5,20,30,40,50,60,70,80,90];d.forEach(((e,n)=>{let o=t("stop");o.setAttribute("offset",`${e}%`),o.setAttribute("stop-color",`hsl(240,100%,${d[d.length-n-1]}%)`),c.appendChild(o)})),s.appendChild(c),i.appendChild(s);const p={y:n+34+30,x:o+15,width:30,height:r-(n+34+60)};l.classList.add("text-scale"),l.setAttribute("x",p.x+20),l.setAttribute("y",p.y-20),l.setAttribute("text-anchor","middle"),l.setAttribute("style","font-size: 11px; fill: rgb(0,0,0); fill-opacity: 1; white-space: pre;"),l.textContent=$,i.appendChild(l);const u=M("scale","url('#Gradient')",p);i.appendChild(u);const h=b.max-b.min;return[b.min,Math.round(h/4),Math.round(h/2),Math.round(h/2+h/4),b.max].forEach((e=>{const n=(e-b.min)/(b.max-b.min);let o=t("text");o.classList.add("text-scale"),o.setAttribute("x",0),o.setAttribute("y",0),o.textContent=e;const r=(1-n)*p.height;o.setAttribute("style","font-size: 11px; fill: rgb(0,0,0); fill-opacity: 1; white-space: pre;"),o.setAttribute("transform",`translate(${p.x+p.width+5}, ${0==r?p.y+5:r+p.y})`),a.appendChild(o)})),i.appendChild(a),i}(n)),s.appendChild(function(e={}){const{x:n,y:o,width:r}=e,i=t("g"),a=M("path","hsl(240, 100%, 92%)",{y:o,x:n,width:r,height:o+34});a.addEventListener("click",(()=>function(){if(0==w.length)return;w.pop();const t=w[w.length-1];L=k(t?t.id:A.id,A),window.dispatchEvent(v.ROOT_CHANGE)}())),i.appendChild(a);const s=S("text",{name:A.name+": "+A.proportion,coords:{y:o+10,width:r,x:n}},"rgb(0,0,0)",!1);return s.setAttribute("id","collapse-button-text"),i.appendChild(s),i}(n));const c=t("g");return c.classList.add("treemap-rects"),s.appendChild(c),e.appendChild(s),c}function N(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function I(){return C.height>C.width?{value:C.width,vertical:!1}:{value:C.height,vertical:!0}}const Z=(n,o,r,i)=>{if(0===n.length)return;const a=n.map((t=>t.scaledProportion)).reduce(((t,e)=>t+e),0)/o;n.forEach((n=>{const o=n.scaledProportion/a;let s;r?(s={x:C.x,y:C.y,width:a,height:o},C.y+=o):(s={x:C.x,y:C.y,width:o,height:a},C.x+=o),n.coords=s,s.y<s.height+s.y&&s.x<s.width+s.x&&i.appendChild(function(n){const{fill:o,color:r}=function(t,e){const n=e.max-e.min;let o=95;return n>0&&(o*=1-(t-e.min)/n),{fill:`hsl(240, 100%, ${o}%)`,color:o>50?"rgb(0,0,0)":"rgb(255,255,255)"}}(n.heatmap,b),i=t("g");return"DIR"===n.type&&i.addEventListener("click",(()=>function(t){null==t.parent||R(t)||(L=k(t.id,A),w.push(...function(t){const e=[];let n=L.parent;for(;null!=n;){let t=k(n,A);if(R(t))break;e.push({id:t.id,name:t.name,proportion:t.proportion}),n=t.parent}return e.pop(),e.reverse(),e.push({id:t.id,name:t.name,proportion:t.proportion}),e}(t)),window.dispatchEvent(v.ROOT_CHANGE))}(n))),i.addEventListener("mouseover",(()=>function(n,o,r){const{coords:i,name:a,proportion:s,type:c,heatmap:l}=n;let d,p,u,h,f=null;const m=["label="+a,"value="+s,"type="+c?.toLowerCase(),"heatmap="+Math.round(l)],y=L.coords.width+L.coords.x,g=L.coords.height,v=Math.max(...m.map((t=>O(t)))),b=t("g"),w=t("path");w.setAttribute("style",`fill: ${o}; stroke: rgb(54, 54, 54); stroke-width: 2;`),b.classList.add("tooltip"),b.appendChild(w);const $={width:10,top:0,bottom:0,left:0,right:0,middle:p>g?i.height+i.y-7:i.y+7};d=$.middle-m.length*x/2-5,p=$.middle+m.length*x/2+5,h=i.width+i.x,u=h+v,d=p>g?$.middle-m.length*x-5:d,p=p>g?$.middle+5:p,f=d+(p-d)/2<i.y?.82*(p-d):(p-d)/2,$.top=d+(p-d)/2<i.y?p-15:d+.8*f,$.bottom=d+(p-d)/2<i.y?p-8:p-.8*f,u>y?(u=i.width+i.x-$.width,h=u-v-$.width,$.right=u+$.width,w.setAttribute("d",`M${h},${d} L${u},${d} L${u},${$.top} L${$.right},${d+f} L${u},${$.bottom} L${u},${p} L${h},${p} L${h},${d}Z`)):($.left=h-$.width,w.setAttribute("d",`M${h},${d} L${u},${d} L${u},${p} L${h},${p} L${h},${$.bottom} L${$.left},${d+f} L${h},${$.top} L${h},${d}Z`)),m.forEach(((e,n)=>{let o=t("text");o.setAttribute("x",0),o.setAttribute("y",0),o.classList.add("tooltip-text"),o.setAttribute("style",`font-size: 14px; fill: ${r}; white-space: pre;`),o.setAttribute("transform",`translate(${h+5}, ${d+(n+1)*x})`),o.textContent=e,b.appendChild(o)})),e("treemap").appendChild(b)}(n,o,r))),i.addEventListener("mouseout",(()=>T())),i.appendChild(M("path",o,n.coords)),i.appendChild(S("text",n,r)),i}(n))})),r?(C.x+=a,C.y-=o,C.width-=a):(C.x-=o,C.y+=a,C.height-=a)};function _(t,e){const n=t.map((t=>t.scaledProportion)),o=n.reduce(((t,e)=>t+e),0),r=Math.max(...n),i=Math.min(...n);return Math.max(e**2*r/o**2,o**2/(e**2*i))}const G=(t,e,n,o)=>{if(0===t.length)return;if(1===t.length)return((t,e,n,o)=>{const{vertical:r}=I();Z(t,n,r,o),Z(e,n,r,o)})(e,t,n,o);const r=[...e,t[0]];return 0===e.length||_(e,n)>=_(r,n)?(t.shift(),G(t,r,n,o)):(Z(e,n,I().vertical,o),G(t,[],I().value,o))};function z(t,e){const n=t.id===L.id,o=t.children.map((t=>t.proportion)).reduce(((t,e)=>t+e),0),r=n?t.coords.width:t.coords.width-10,i=n?t.coords.height-34:t.coords.height-t.topOffset-5;t.children.forEach((t=>{t.scaledProportion=t.proportion*r*i/o}));const a=[...t.children];C={...C,x:n?t.coords.x:t.coords.x+5,y:n?t.coords.y+34:t.coords.y+t.topOffset,width:r,height:i},G(a,[],I().value,e),t.children.forEach((t=>{z(t,e)}))}function H(t,e){N(t),L.coords=e,z(L,t)}function B(t){E=0;const e=(n=t,JSON.parse(n||"{}"));var n;const o=function(t){return{id:E||0,name:t.hasOwnProperty("name")?t.name:null,parent:t.parent||null,proportion:t.proportion||0,children:t.children||[],topOffset:0,type:t.type||null,heatmap:t.heatmap||null,coords:t.coords||{},scaledProportion:0}}({id:E,name:e.name,proportion:e.loc,children:[],type:e.type,heatmap:e.heatmap,topOffset:0,parent:null,scaledProportion:0});return P(e,o),o}function q(t,n,o){const r=B(t);$=o,L=r,A=r,function(){const t=e=>{e?.heatmap&&(e.heatmap>b.max?b.max=e.heatmap:e.heatmap<b.min&&(b.min=e.heatmap)),e.children.length>0&&e.children.forEach((e=>{t(e)}))};t(L)}();const i=n.getBoundingClientRect(),a=j(n,i);window.addEventListener("root-change",(()=>{T(),H(a,i),function(){const t=e("collapse-button-text"),n=w.map((t=>t.name));n.unshift(A.name);const o=1==n.length?A.proportion:w[w.length-1].proportion;t.textContent=n.join(" / ")+": "+o}()})),window.addEventListener("resize",(()=>{!function(t){N(t);const e=t.getBoundingClientRect();H(j(t,e),e)}(n)})),H(a,i)}const D={render:q}})(),o})()}));