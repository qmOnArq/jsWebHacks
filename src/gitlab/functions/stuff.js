var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function o(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e,n,s){return t[1]&&s?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](s(e))):n.ctx}function l(t,e,n,s,o,c,l){const i=function(t,e,n,s){if(t[2]&&s){const o=t[2](s(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|o[s];return t}return e.dirty|o}return e.dirty}(e,s,o,c);if(i){const o=r(e,n,s,l);t.p(o,i)}}function i(t){return null==t?"":t}function a(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function p(t){return document.createElement(t)}function m(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function $(t){return document.createTextNode(t)}function h(){return $(" ")}function v(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function x(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function w(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function y(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function b(t,e,n){t.classList[n?"add":"remove"](e)}let k;function C(t){k=t}function M(){if(!k)throw new Error("Function called outside component initialization");return k}function _(){const t=M();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const o=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);s.slice().forEach((e=>{e.call(t,o)}))}}}const E=[],S=[],z=[],I=[],N=Promise.resolve();let T=!1;function q(t){z.push(t)}let A=!1;const L=new Set;function B(){if(!A){A=!0;do{for(let t=0;t<E.length;t+=1){const e=E[t];C(e),H(e.$$)}for(C(null),E.length=0;S.length;)S.pop()();for(let t=0;t<z.length;t+=1){const e=z[t];L.has(e)||(L.add(e),e())}z.length=0}while(E.length);for(;I.length;)I.pop()();T=!1,A=!1,L.clear()}}function H(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const O=new Set;let W;function j(t,e){t&&t.i&&(O.delete(t),t.i(e))}function P(t,e,n,s){if(t&&t.o){if(O.has(t))return;O.add(t),W.c.push((()=>{O.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}function R(t){t&&t.c()}function D(t,n,c){const{fragment:r,on_mount:l,on_destroy:i,after_update:a}=t.$$;r&&r.m(n,c),q((()=>{const n=l.map(e).filter(o);i?i.push(...n):s(n),t.$$.on_mount=[]})),a.forEach(q)}function F(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function X(t,e){-1===t.$$.dirty[0]&&(E.push(t),T||(T=!0,N.then(B)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function G(e,o,c,r,l,i,a=[-1]){const u=k;C(e);const d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:a,skip_bound:!1};let p=!1;if(d.ctx=c?c(e,o.props||{},((t,n,...s)=>{const o=s.length?s[0]:n;return d.ctx&&l(d.ctx[t],d.ctx[t]=o)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](o),p&&X(e,t)),n})):[],d.update(),p=!0,s(d.before_update),d.fragment=!!r&&r(d.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);d.fragment&&d.fragment.l(t),t.forEach(f)}else d.fragment&&d.fragment.c();o.intro&&j(e.$$.fragment),D(e,o.target,o.anchor),B()}C(u)}class J{$destroy(){F(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function K(t){let e,n,s,o,c,i,d,m;const $=t[5].default,x=function(t,e,n,s){if(t){const o=r(t,e,n,s);return t[0](o)}}($,t,t[4],null);return{c(){e=p("div"),n=h(),s=p("div"),x&&x.c(),o=h(),c=p("button"),c.textContent="X",g(e,"class","background svelte-tl6uh1"),g(c,"class","close svelte-tl6uh1"),g(s,"class","modal svelte-tl6uh1")},m(r,l){u(r,e,l),u(r,n,l),u(r,s,l),x&&x.m(s,null),a(s,o),a(s,c),i=!0,d||(m=v(c,"click",t[0]),d=!0)},p(t,e){x&&x.p&&16&e&&l(x,$,t,t[4],e,null,null)},i(t){i||(j(x,t),i=!0)},o(t){P(x,t),i=!1},d(t){t&&f(e),t&&f(n),t&&f(s),x&&x.d(t),d=!1,m()}}}function Q(t){let e,n,o=t[1]&&K(t);return{c(){o&&o.c(),e=$("")},m(t,s){o&&o.m(t,s),u(t,e,s),n=!0},p(t,[n]){t[1]?o?(o.p(t,n),2&n&&j(o,1)):(o=K(t),o.c(),j(o,1),o.m(e.parentNode,e)):o&&(W={r:0,c:[],p:W},P(o,1,1,(()=>{o=null})),W.r||s(W.c),W=W.p)},i(t){n||(j(o),n=!0)},o(t){P(o),n=!1},d(t){o&&o.d(t),t&&f(e)}}}function U(t,e,n){let{$$slots:s={},$$scope:o}=e,c=!1;return t.$$set=t=>{"$$scope"in t&&n(4,o=t.$$scope)},[function(){n(1,c=!1)},c,function(){n(1,c=!c)},function(){n(1,c=!0)},o,s]}class V extends J{constructor(t){super(),G(this,t,U,Q,c,{toggle:2,open:3,close:0})}get toggle(){return this.$$.ctx[2]}get open(){return this.$$.ctx[3]}get close(){return this.$$.ctx[0]}}function Y(e){let n,s,o,c;return{c(){n=p("div"),s=p("div"),s.innerHTML='<div class="face front svelte-prwgq7">Win</div> \n        <div class="face back svelte-prwgq7">Loss</div>',g(s,"class","card svelte-prwgq7"),b(s,"flipped",e[0]),g(n,"class","flip svelte-prwgq7"),b(n,"flipped",e[0])},m(t,r){u(t,n,r),a(n,s),o||(c=v(s,"click",e[1]),o=!0)},p(t,[e]){1&e&&b(s,"flipped",t[0]),1&e&&b(n,"flipped",t[0])},i:t,o:t,d(t){t&&f(n),o=!1,c()}}}function Z(t,e,n){const s=_();let o=!1;return[o,function(){o||(n(0,o=!o),setTimeout((()=>{s("flipped",{value:!o})}),1e3))}]}class tt extends J{constructor(t){super(),G(this,t,Z,Y,c,{})}}function et(t){let e,n,s,o,c,r,l,i,d,m,$,x,w,y;return c=new tt({}),c.$on("flipped",t[2]),{c(){e=p("h1"),e.textContent="Only one step away from your prize, confirm your victory!",n=h(),s=p("h3"),s.textContent="Click on the coin to toss it.",o=h(),R(c.$$.fragment),r=h(),l=p("div"),i=p("h1"),i.textContent="Better luck next time!",d=h(),m=p("button"),m.textContent="Close",g(e,"class","svelte-8nm7fu"),g(s,"class","svelte-8nm7fu"),g(i,"class","svelte-8nm7fu"),g(m,"class","svelte-8nm7fu"),g(l,"class",$="ending "+(t[0]?"shown":"")+" svelte-8nm7fu")},m(f,p){u(f,e,p),u(f,n,p),u(f,s,p),u(f,o,p),D(c,f,p),u(f,r,p),u(f,l,p),a(l,i),a(l,d),a(l,m),x=!0,w||(y=v(m,"click",t[1]),w=!0)},p(t,[e]){(!x||1&e&&$!==($="ending "+(t[0]?"shown":"")+" svelte-8nm7fu"))&&g(l,"class",$)},i(t){x||(j(c.$$.fragment,t),x=!0)},o(t){P(c.$$.fragment,t),x=!1},d(t){t&&f(e),t&&f(n),t&&f(s),t&&f(o),F(c,t),t&&f(r),t&&f(l),w=!1,y()}}}function nt(t,e,n){const s=_();let o=!1;return[o,function(){s("close")},()=>{n(0,o=!0)}]}class st extends J{constructor(t){super(),G(this,t,nt,et,c,{})}}const ot=[{name:"Ignore failed tests",price:250},{name:"Self-approve",price:400},{name:"Merge all MRs",price:1e3},{name:"Delete 1 comment",price:150}],ct="monar_shop_coins";function rt(){const t=window.localStorage.getItem(ct);return null==t?500:Number(t)}function lt(t,e=!1){if(0===t)return;const n=rt();if(window.localStorage.setItem(ct,Number(n)+t),e){const e=document.createElement("div");e.innerHTML=(t>0?"+":"")+t,e.style.position="fixed",e.style.zIndex="9999999",e.style.borderRadius="10px",e.style.borderWidth="2px",e.style.borderStyle="solid",e.style.borderColor=t>0?"var(--green)":"var(--red)",e.style.color=t>0?"var(--green)":"var(--red)",e.style.display="inline-block",e.style.fontWeight="bold",e.style.top="100px",e.style.left="50px",e.style.opacity="1",e.style.padding="10px 20px",e.style.boxShadow="0 0 40px 0 "+t>0?"var(--green)":"var(--red)",e.style.textShadow="0 0 20px "+t>0?"var(--green)":"var(--red)",e.style.transition="2s all ease-in",document.body.appendChild(e),setTimeout((()=>{e.style.opacity="0",e.style.top=t>0?"20px":"180px"})),setTimeout((()=>{e.remove()}),2e3)}}function it(t,e,n){const s=t.slice();return s[6]=e[n],s[8]=n,s}function at(t){let e,n,s,o,c,r=t[6].name+"";return{c(){e=m("path"),s=m("text"),o=$(r),g(e,"transform","rotate("+t[6].offset+")"),g(e,"transform-origin","50% 50%"),g(e,"stroke-dasharray","2 2"),g(e,"stroke",t[6].stroke),g(e,"fill",t[6].fill),g(e,"class",n=i(t[1]===t[8]?"active":"")+" svelte-kdc911"),g(e,"d","\r\n                    M "+ft/2+" "+ft/2+"\r\n                    L "+ft/2+", "+(ft/2-dt)+"\r\n                    A "+dt+" "+dt+" 1 0,1 "+t[6].x+" "+t[6].y+"\r\n                    z\r\n                "),g(s,"class",c="text-"+t[8]+" "+(t[1]===t[8]?"active":"")+" svelte-kdc911")},m(t,n){u(t,e,n),u(t,s,n),a(s,o)},p(t,o){2&o&&n!==(n=i(t[1]===t[8]?"active":"")+" svelte-kdc911")&&g(e,"class",n),2&o&&c!==(c="text-"+t[8]+" "+(t[1]===t[8]?"active":"")+" svelte-kdc911")&&g(s,"class",c)},d(t){t&&f(e),t&&f(s)}}}function ut(e){let n,s,o,c,r,l,x,w,y,b,k,C,M,_,E=e[2],S=[];for(let t=0;t<E.length;t+=1)S[t]=at(it(e,E,t));return{c(){n=p("div"),s=h(),o=m("svg"),c=m("g"),r=m("circle"),x=m("text"),w=$("Nothing :)");for(let t=0;t<S.length;t+=1)S[t].c();b=m("g"),k=m("polygon"),g(r,"stroke","rgb(255, 46, 0)"),g(r,"stroke-dasharray","2 2"),g(r,"fill","black"),g(r,"class",l=i(-1===e[1]?"active":"")+" svelte-kdc911"),g(r,"cx",ft/2),g(r,"cy",ft/2),g(r,"r",dt),g(x,"class",y="text-nothing "+(-1===e[1]?"active":"")+" svelte-kdc911"),g(c,"stroke-width","4"),g(k,"transform","translate("+(-ft/2+14)+", 0)"),g(k,"points",ft/2-8+","+(ft/2-10)+" "+(ft/2-8)+","+(ft/2+10)+" "+(ft/2+8)+","+ft/2),g(k,"fill","transparent"),g(k,"stroke","rgb(5, 153, 176)"),g(k,"stroke-width","4"),g(b,"class","arrow svelte-kdc911"),g(b,"transform",C="rotate("+e[0]+")"),g(b,"transform-origin","50% 50%"),g(o,"width",ft),g(o,"height",ft),g(o,"viewBox","0 0 "+ft+" "+ft)},m(t,l){u(t,n,l),u(t,s,l),u(t,o,l),a(o,c),a(c,r),a(c,x),a(x,w);for(let t=0;t<S.length;t+=1)S[t].m(c,null);a(o,b),a(b,k),M||(_=v(c,"click",e[3]),M=!0)},p(t,[e]){if(2&e&&l!==(l=i(-1===t[1]?"active":"")+" svelte-kdc911")&&g(r,"class",l),2&e&&y!==(y="text-nothing "+(-1===t[1]?"active":"")+" svelte-kdc911")&&g(x,"class",y),6&e){let n;for(E=t[2],n=0;n<E.length;n+=1){const s=it(t,E,n);S[n]?S[n].p(s,e):(S[n]=at(s),S[n].c(),S[n].m(c,null))}for(;n<S.length;n+=1)S[n].d(1);S.length=E.length}1&e&&C!==(C="rotate("+t[0]+")")&&g(b,"transform",C)},i:t,o:t,d(t){t&&f(n),t&&f(s),t&&f(o),d(S,t),M=!1,_()}}}const ft=400,dt=170;function pt(t,e,n){const s=_();let o=0,c=!1,r=null;const l=[];return ot.forEach(((t,e)=>{const n=360-180/ot.length;l.push({x:ft/2+dt*Math.cos(n*Math.PI/180),y:ft/2+dt*Math.sin(n*Math.PI/180),segmentSize:n,fill:"black",stroke:"rgb(164, 189, 10)",name:t.name,offset:e>0?l[e-1].offset-l[e-1].segmentSize:0})})),[o,r,l,function(){c||(s("spin",{}),c=!0,n(0,o=360*(5+Math.ceil(5*Math.random()))+360*Math.random()),setTimeout((()=>{const t=(o-90)%360,e=t>=180,c=180/ot.length;let l=null;e||(l=Math.floor(t/c)),n(1,r=e?-1:l),s("end",{winIndex:r})}),4e3))}]}class mt extends J{constructor(t){super(),G(this,t,pt,ut,c,{})}}function $t(t){let e,n,o,c,r,l,i,d,m,$,x,w,y,b,k,C,M,_;return r=new mt({}),r.$on("spin",t[2]),r.$on("end",t[3]),{c(){e=p("div"),n=p("h1"),n.textContent="Click the wheel to Spin and Win!",o=h(),c=p("div"),R(r.$$.fragment),l=h(),i=p("div"),d=p("h1"),d.textContent="Better luck next time!",m=h(),$=p("button"),$.textContent="Close",x=h(),w=p("h1"),w.textContent="Confirm your victory!",y=h(),b=p("button"),b.textContent="Confirm",g(n,"class","svelte-189la7g"),g(d,"class","loss svelte-189la7g"),g($,"class","loss svelte-189la7g"),g(w,"class","win svelte-189la7g"),g(b,"class","win svelte-189la7g"),g(i,"class",k="result "+(t[0]?"won":"")+" "+(t[1]?"lost":"")+" svelte-189la7g"),g(c,"class","roulette svelte-189la7g"),g(e,"class","main svelte-189la7g")},m(s,f){u(s,e,f),a(e,n),a(e,o),a(e,c),D(r,c,null),a(c,l),a(c,i),a(i,d),a(i,m),a(i,$),a(i,x),a(i,w),a(i,y),a(i,b),C=!0,M||(_=[v($,"click",t[4]),v(b,"click",t[5])],M=!0)},p(t,[e]){(!C||3&e&&k!==(k="result "+(t[0]?"won":"")+" "+(t[1]?"lost":"")+" svelte-189la7g"))&&g(i,"class",k)},i(t){C||(j(r.$$.fragment,t),C=!0)},o(t){P(r.$$.fragment,t),C=!1},d(t){t&&f(e),F(r),M=!1,s(_)}}}function ht(t,e,n){const s=_();let o=!1,c=!1;return[o,c,function(){lt(-90,!0),s("spin")},function(t){console.log(t.detail),n(1,c=-1===t.detail.winIndex),n(0,o=t.detail.winIndex>=0)},function(){s("close")},function(){s("confirm")}]}class vt extends J{constructor(t){super(),G(this,t,ht,$t,c,{})}}function gt(t,e,n){const s=t.slice();return s[8]=e[n],s}function xt(e){let n,s,o,c,r,l,i,d,m,v,x,w,y,b,k=e[8].name+"",C=e[8].price+"";return{c(){n=p("div"),s=p("button"),o=p("b"),c=$(k),r=h(),l=p("br"),i=h(),d=p("i"),d.textContent="Out of stock",m=h(),v=p("br"),x=$("\r\n                ("),w=$(C),y=$(")"),b=h(),s.disabled=!0,g(s,"class","svelte-te9269"),g(n,"class","item svelte-te9269")},m(t,e){u(t,n,e),a(n,s),a(s,o),a(o,c),a(s,r),a(s,l),a(s,i),a(s,d),a(s,m),a(s,v),a(s,x),a(s,w),a(s,y),a(n,b)},p:t,d(t){t&&f(n)}}}function wt(e){let n,o,c,r,l,i,m,x,y,b,k,C,M,_,E,S,z,I,N,T,q,A,L,B,H,O,W,j,P=ot,R=[];for(let t=0;t<P.length;t+=1)R[t]=xt(gt(e,P,t));return{c(){n=p("h1"),n.textContent="Welcome to the shop",o=h(),c=p("div"),r=p("div"),r.textContent=`${e[1]}`,l=h(),i=p("div"),m=h(),x=p("div");for(let t=0;t<R.length;t+=1)R[t].c();y=h(),b=p("div"),k=p("div"),k.textContent=`${e[2]} people are looking at this offer!`,C=h(),M=p("h1"),M.textContent="Roulette",_=h(),E=p("h2"),E.textContent="Special offer! -10%!",S=h(),z=p("h2"),I=p("i"),N=$(e[0]),T=h(),q=p("button"),A=p("b"),A.textContent="Roulette!",L=p("br"),B=$("("),H=$(90),O=$(")"),g(n,"class","svelte-te9269"),g(r,"class","amount svelte-te9269"),g(i,"class","icon svelte-te9269"),g(c,"class","coins svelte-te9269"),g(x,"class","items svelte-te9269"),g(k,"class","people svelte-te9269"),g(M,"class","svelte-te9269"),g(E,"class","svelte-te9269"),g(z,"class","svelte-te9269"),g(q,"class","svelte-te9269"),g(b,"class","roulette svelte-te9269")},m(t,s){u(t,n,s),u(t,o,s),u(t,c,s),a(c,r),a(c,l),a(c,i),u(t,m,s),u(t,x,s);for(let t=0;t<R.length;t+=1)R[t].m(x,null);u(t,y,s),u(t,b,s),a(b,k),a(b,C),a(b,M),a(b,_),a(b,E),a(b,S),a(b,z),a(z,I),a(I,N),a(b,T),a(b,q),a(q,A),a(q,L),a(q,B),a(q,H),a(q,O),W||(j=[v(c,"click",e[4]),v(q,"click",e[3])],W=!0)},p(t,[e]){if(0&e){let n;for(P=ot,n=0;n<P.length;n+=1){const s=gt(t,P,n);R[n]?R[n].p(s,e):(R[n]=xt(s),R[n].c(),R[n].m(x,null))}for(;n<R.length;n+=1)R[n].d(1);R.length=P.length}1&e&&w(N,t[0])},i:t,o:t,d(t){t&&f(n),t&&f(o),t&&f(c),t&&f(m),t&&f(x),d(R,t),t&&f(y),t&&f(b),W=!1,s(j)}}}function yt(t,e,n){const s=_(),o=rt();let c=570,r="";i(),setInterval((()=>{c-=1,i()}),1e3);const l=2+Math.round(2*Math.random());function i(){const t=function(t){const e=t-new Date/1e3,n=Math.floor(e%60),s=Math.floor(e/60%60),o=Math.floor(e/3600%24),c=Math.floor(e/86400);return{total:e,days:Math.max(c,0),hours:Math.max(o,0),minutes:Math.max(s,0),seconds:Math.max(n,0)}}(new Date/1e3+c);n(0,r=t.days>0?`${t.days} days `:""),n(0,r+=t.hours>0?`${t.hours} hours `:""),n(0,r+=t.minutes>0?`${t.minutes} minutes `:""),n(0,r+=t.seconds>0?`${t.seconds} seconds `:""),n(0,r+="left"),r.trim()}return[r,o,l,function(){s("roulette",{})},function(){s("advert")}]}class bt extends J{constructor(t){super(),G(this,t,yt,wt,c,{})}}function kt(e){let n,s,o,c,r,l,i,d,v,b,k,C,M,_,E,S,z,I;return{c(){n=m("svg"),s=m("symbol"),o=m("path"),c=m("path"),r=m("path"),l=m("path"),i=h(),d=p("div"),v=p("div"),b=p("div"),k=$(e[1]),C=h(),M=p("div"),_=m("svg"),E=m("use"),S=h(),z=m("svg"),I=m("use"),g(o,"d","M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"),g(o,"class","svelte-npo534"),g(c,"d","M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"),g(c,"class","svelte-npo534"),g(r,"d","M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"),g(r,"class","svelte-npo534"),g(l,"d","M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"),g(l,"class","svelte-npo534"),g(s,"id","wave"),g(s,"class","svelte-npo534"),g(n,"version","1.1"),g(n,"xmlns","http://www.w3.org/2000/svg"),g(n,"xmlns:xlink","http://www.w3.org/1999/xlink"),g(n,"x","0px"),g(n,"y","0px"),y(n,"display","none"),g(n,"class","svelte-npo534"),g(b,"class","percentNum svelte-npo534"),g(b,"id","count"),g(v,"class","percent svelte-npo534"),x(E,"xlink:href","#wave"),g(E,"class","svelte-npo534"),g(_,"viewBox","0 0 560 20"),g(_,"class","water_wave water_wave_back svelte-npo534"),x(I,"xlink:href","#wave"),g(I,"class","svelte-npo534"),g(z,"viewBox","0 0 560 20"),g(z,"class","water_wave water_wave_front svelte-npo534"),g(M,"id","water"),g(M,"class","water svelte-npo534"),y(M,"transform","translate(0,"+(100-e[0])+"%)"),g(d,"class","box svelte-npo534")},m(t,e){u(t,n,e),a(n,s),a(s,o),a(s,c),a(s,r),a(s,l),u(t,i,e),u(t,d,e),a(d,v),a(v,b),a(b,k),a(d,C),a(d,M),a(M,_),a(_,E),a(M,S),a(M,z),a(z,I)},p(t,[e]){2&e&&w(k,t[1]),1&e&&y(M,"transform","translate(0,"+(100-t[0])+"%)")},i:t,o:t,d(t){t&&f(n),t&&f(i),t&&f(d)}}}function Ct(t,e,n){let{percentage:s=0}=e,{text:o=""}=e;return t.$$set=t=>{"percentage"in t&&n(0,s=t.percentage),"text"in t&&n(1,o=t.text)},[s,o]}class Mt extends J{constructor(t){super(),G(this,t,Ct,kt,c,{percentage:0,text:1})}}function _t(t){let e,n,s,o,c,r,l,i;return c=new Mt({props:{percentage:100-t[0]/Et*100,text:t[0]}}),{c(){e=p("h1"),e.textContent="Watch Advert to receive free coins!",n=h(),s=p("div"),o=p("div"),R(c.$$.fragment),r=h(),l=p("div"),g(e,"class","svelte-q7m5h5"),g(o,"class","loading svelte-q7m5h5"),g(l,"class","image svelte-q7m5h5"),g(s,"class","main svelte-q7m5h5")},m(t,f){u(t,e,f),u(t,n,f),u(t,s,f),a(s,o),D(c,o,null),a(s,r),a(s,l),i=!0},p(t,[e]){const n={};1&e&&(n.percentage=100-t[0]/Et*100),1&e&&(n.text=t[0]),c.$set(n)},i(t){i||(j(c.$$.fragment,t),i=!0)},o(t){P(c.$$.fragment,t),i=!1},d(t){t&&f(e),t&&f(n),t&&f(s),F(c)}}}const Et=15;function St(t,e,n){const s=_();let o,c=Et,r=!1;var l;return l=()=>{r=!0,clearTimeout(o)},M().$$.on_destroy.push(l),function t(){o=setTimeout((()=>{r||(n(0,c--,c),c>0?t():(lt(10,!0),s("coins")))}),1e3)}(),[c]}class zt extends J{constructor(t){super(),G(this,t,St,_t,c,{})}}function It(e){let n,s;return n=new bt({}),n.$on("roulette",e[8]),n.$on("advert",e[11]),{c(){R(n.$$.fragment)},m(t,e){D(n,t,e),s=!0},p:t,i(t){s||(j(n.$$.fragment,t),s=!0)},o(t){P(n.$$.fragment,t),s=!1},d(t){F(n,t)}}}function Nt(e){let n,s;return n=new st({}),n.$on("close",e[7]),{c(){R(n.$$.fragment)},m(t,e){D(n,t,e),s=!0},p:t,i(t){s||(j(n.$$.fragment,t),s=!0)},o(t){P(n.$$.fragment,t),s=!1},d(t){F(n,t)}}}function Tt(e){let n,s;return n=new vt({}),n.$on("spin",e[10]),n.$on("close",e[9]),n.$on("confirm",e[6]),{c(){R(n.$$.fragment)},m(t,e){D(n,t,e),s=!0},p:t,i(t){s||(j(n.$$.fragment,t),s=!0)},o(t){P(n.$$.fragment,t),s=!1},d(t){F(n,t)}}}function qt(e){let n,s;return n=new zt({}),n.$on("coins",e[10]),{c(){R(n.$$.fragment)},m(t,e){D(n,t,e),s=!0},p:t,i(t){s||(j(n.$$.fragment,t),s=!0)},o(t){P(n.$$.fragment,t),s=!1},d(t){F(n,t)}}}function At(t){let e,n,s,o,c,r,l,i,d,m,x,y,b,k,C,M,_,E,S;return m=new V({props:{$$slots:{default:[It]},$$scope:{ctx:t}}}),t[12](m),y=new V({props:{$$slots:{default:[Nt]},$$scope:{ctx:t}}}),t[13](y),k=new V({props:{$$slots:{default:[Tt]},$$scope:{ctx:t}}}),t[14](k),M=new V({props:{$$slots:{default:[qt]},$$scope:{ctx:t}}}),t[15](M),{c(){e=p("button"),n=$("Open shop\n    "),s=p("span"),o=$("( "),c=$(t[4]),r=$("    )"),l=h(),i=p("span"),d=h(),R(m.$$.fragment),x=h(),R(y.$$.fragment),b=h(),R(k.$$.fragment),C=h(),R(M.$$.fragment),g(s,"class","coins svelte-a6xp29"),g(i,"class","icon svelte-a6xp29"),g(e,"class","svelte-a6xp29")},m(f,p){u(f,e,p),a(e,n),a(e,s),a(s,o),a(s,c),a(s,r),a(e,l),a(e,i),u(f,d,p),D(m,f,p),u(f,x,p),D(y,f,p),u(f,b,p),D(k,f,p),u(f,C,p),D(M,f,p),_=!0,E||(S=v(e,"click",t[5]),E=!0)},p(t,[e]){(!_||16&e)&&w(c,t[4]);const n={};131072&e&&(n.$$scope={dirty:e,ctx:t}),m.$set(n);const s={};131072&e&&(s.$$scope={dirty:e,ctx:t}),y.$set(s);const o={};131072&e&&(o.$$scope={dirty:e,ctx:t}),k.$set(o);const r={};131072&e&&(r.$$scope={dirty:e,ctx:t}),M.$set(r)},i(t){_||(j(m.$$.fragment,t),j(y.$$.fragment,t),j(k.$$.fragment,t),j(M.$$.fragment,t),_=!0)},o(t){P(m.$$.fragment,t),P(y.$$.fragment,t),P(k.$$.fragment,t),P(M.$$.fragment,t),_=!1},d(n){n&&f(e),n&&f(d),t[12](null),F(m,n),n&&f(x),t[13](null),F(y,n),n&&f(b),t[14](null),F(k,n),n&&f(C),t[15](null),F(M,n),E=!1,S()}}}function Lt(t,e,n){let s,o,c,r,l=0;function i(){s.close()}function a(){c.close()}function u(){n(4,l=rt())}return u(),[s,o,c,r,l,function(){s.open()},function(){a(),o.open()},function(){o.close()},function(){rt()>=90&&(c.open(),i())},a,u,function(){r.open(),i()},function(t){S[t?"unshift":"push"]((()=>{s=t,n(0,s)}))},function(t){S[t?"unshift":"push"]((()=>{o=t,n(1,o)}))},function(t){S[t?"unshift":"push"]((()=>{c=t,n(2,c)}))},function(t){S[t?"unshift":"push"]((()=>{r=t,n(3,r)}))}]}return new class extends J{constructor(t){super(),G(this,t,Lt,At,c,{})}}({target:document.body})}();