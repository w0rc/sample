var _=Object.defineProperty;var T=(d,e,r)=>e in d?_(d,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):d[e]=r;var N=(d,e,r)=>(T(d,typeof e!="symbol"?e+"":e,r),r),W=(d,e,r)=>{if(!e.has(d))throw TypeError("Cannot "+r)};var M=(d,e,r)=>(W(d,e,"read from private field"),r?r.call(d):e.get(d)),I=(d,e,r)=>{if(e.has(d))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(d):e.set(d,r)},C=(d,e,r,i)=>(W(d,e,"write to private field"),i?i.call(d,r):e.set(d,r),r);import{V as u,r as w,R as V,u as H,M as k,a as z,B as K,b as G,j as n,c as Q,C as Y,O as X,d as $,e as Z}from"./vendor.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))i(c);new MutationObserver(c=>{for(const a of c)if(a.type==="childList")for(const b of a.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&i(b)}).observe(document,{childList:!0,subtree:!0});function r(c){const a={};return c.integrity&&(a.integrity=c.integrity),c.referrerPolicy&&(a.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?a.credentials="include":c.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(c){if(c.ep)return;c.ep=!0;const a=r(c);fetch(c.href,a)}})();var E,L,D,F,q;class J{constructor(e,r=123456789,i=362436069,c=521288629){I(this,E,void 0);I(this,L,void 0);I(this,D,void 0);I(this,F,void 0);I(this,q,0);C(this,F,e===void 0?88675123:e>>>0),C(this,E,r>>>0),C(this,L,i>>>0),C(this,D,c>>>0);for(let a=0;a<32;a++)this.gen()}gen(){return C(this,q,M(this,E)^M(this,E)<<11),C(this,E,M(this,L)),C(this,L,M(this,D)),C(this,D,M(this,F)),C(this,F,(M(this,F)^M(this,F)>>>19^(M(this,q)^M(this,q)>>>8))>>>0),M(this,F)}rand(){return this.gen()/4294967296}range(e=0,r=10){return this.rand()*(r-e)+e}shuffle(e){const r=[];for(let i=0,c=0,a=e.length;i<a;i++)c=Math.floor(this.range(0,i)),r[i]=i!==c?r[c]:r[i],r[c]=e[i];return r}}E=new WeakMap,L=new WeakMap,D=new WeakMap,F=new WeakMap,q=new WeakMap;class ee{constructor(){N(this,"all");N(this,"notakes");N(this,"standard");N(this,"scramble");N(this,"vectors");N(this,"rotateAxes");const e=["R","L","U","D","F","B"],r=["M","E","S"],i=["x","y","z"],c=e.map(l=>l+"'"),a=e.map(l=>l+"2"),b=e.concat(c).concat(a),x=e.map(l=>l+"'2"),v=b.concat(x),O=e.map(l=>l+"w"),B=e.map(l=>l+"'w"),A=e.map(l=>l+"w2"),s=O.concat(B).concat(A),S=e.map(l=>l+"'w2"),P=s.concat(S),t=r.map(l=>l+"'"),g=r.map(l=>l+"2"),m=r.concat(t).concat(g),h=r.map(l=>l+"'2"),o=m.concat(h),f=i.map(l=>l+"'"),y=i.concat(f),j=i.map(l=>l+"2"),R=i.map(l=>l+"'2"),p=y.concat(j).concat(R);this.all=Array.prototype.concat(v,o,P,p),this.notakes=Array.prototype.concat(v,o,P),this.standard=Array.prototype.concat(b,m,s,y),this.scramble=Array.prototype.concat(b),this.vectors=new Map([["R",new u(1,0,0)],["L",new u(-1,0,0)],["U",new u(0,1,0)],["D",new u(0,-1,0)],["F",new u(0,0,1)],["B",new u(0,0,-1)],["M",new u(-1,0,0)],["E",new u(0,-1,0)],["S",new u(0,0,1)],["x",new u(1,0,0)],["y",new u(0,1,0)],["z",new u(0,0,1)]]),this.rotateAxes=new Map([["R",new u(-1,0,0)],["L",new u(1,0,0)],["U",new u(0,-1,0)],["D",new u(0,1,0)],["F",new u(0,0,-1)],["B",new u(0,0,1)],["M",new u(1,0,0)],["E",new u(0,1,0)],["S",new u(0,0,-1)],["x",new u(-1,0,0)],["y",new u(0,-1,0)],["z",new u(0,0,-1)]])}getVector(e){const r=this.vectors.get(e);if(r)return r;throw new Error(e+" is not Rotation Symbol.")}getRotateAxis(e){const r=this.rotateAxes.get(e);if(r)return r;throw new Error(e+" is not Rotation Symbol.")}}const te=w.forwardRef(function(e,r){const i=new ee,c=new J(new Date().valueOf()),a=w.useRef(null),b=w.useRef(null),x=w.useRef("manual"),v=w.useRef({isRotation:!1,rotateSymbol:"",symbolVector:new u,currentAngle:0,targetAngle:0,rotateAxis:new u,history:[],rotateQueue:[]}),O=new V,B=w.useRef({mesh:null,tempMaterial:null}),{scene:A}=H();w.useEffect(()=>{const t=a.current;if(t){if(t.name!=="")return;{t.name="RubikCubeGroup";const g=.3,m=.8,h=!1,o=[new k({color:13382451,roughness:g,opacity:m,transparent:h}),new k({color:13395507,roughness:g,opacity:m,transparent:h}),new k({color:13421772,roughness:g,opacity:m,transparent:h}),new k({color:13421670,roughness:g,opacity:m,transparent:h}),new k({color:3394611,roughness:g,opacity:m,transparent:h}),new k({color:3355596,roughness:g,opacity:m,transparent:h})],f=3,y=-1,j=1.01;for(let R=0;R<f;R++)for(let p=0;p<f;p++)for(let l=0;l<f;l++){const U=new z(new K(1,1,1),o);U.position.set((R+y)*j+e.position.x,(p+y)*j+e.position.y,(l+y)*j+e.position.z),a.current.attach(U)}}}},[A,e]),G((t,g)=>{const m=a.current,h=v.current,o=B.current;if(m&&o){O.setFromCamera(new Q(t.mouse.x,t.mouse.y),t.camera);const f=O.intersectObjects(m.children,!1);if(f.length>0){const y=f[0].object;o.mesh!==y&&(o.mesh&&o.mesh.material&&o.tempMaterial&&(o.mesh.material=o.tempMaterial),y.material&&(B.current={mesh:y,tempMaterial:y.material}),y.material=new k({color:16777215}))}else o.mesh&&o.tempMaterial&&(o.mesh.material=o.tempMaterial),B.current={mesh:null,tempMaterial:null}}if(m&&h)if(h.isRotation){const f=b.current;if(f){const y=g*e.moveSpeed;if(h.currentAngle+=y,f.rotateOnAxis(h.rotateAxis,y),h.currentAngle+y*1.5>h.targetAngle){f.rotateOnAxis(h.rotateAxis,h.targetAngle-h.currentAngle);const j=[];f.children.forEach(R=>{j.push(R)}),j.forEach(R=>{m.attach(R)}),h.isRotation=!1,e.onRotationFinished&&e.onRotationFinished(h.rotateSymbol)}}}else{const f=x.current;if(f==="manual"&&P(),f==="demo"&&s(c.shuffle(i.notakes).shift()),f==="order"||f==="reverse"){const y=v.current.rotateQueue.shift();y?s(y,f==="reverse"):(x.current="manual",e.onOrderFinished&&e.onOrderFinished())}}});const s=function(t,g){const m=i.all.find(f=>f===t);if(m===void 0){console.error("is NOT rotation symbol syntax:"+t);return}const h=a.current,o=v.current;if(h&&o)if(o.isRotation)console.log("rubikcube is busy.");else{o.rotateSymbol=m;const[f,...y]=o.rotateSymbol.split("");o.symbolVector=i.getVector(f),o.currentAngle=0,o.targetAngle=y.includes("2")?Math.PI:Math.PI*.5,o.rotateAxis=i.getRotateAxis(f),o.rotateAxis=y.includes("'")?o.rotateAxis.negate():o.rotateAxis;const j=b.current;if(j){const R=[];h.children.forEach(p=>{o.rotateSymbol.match(/[xyz]/)?R.push(p):o.rotateSymbol.match(/[w]/)?p.position.angleTo(o.symbolVector)<Math.PI*.526&&R.push(p):o.rotateSymbol.match(/[MES]/)?p.position.angleTo(o.symbolVector)>Math.PI*.476&&p.position.angleTo(o.symbolVector)<Math.PI*.526&&R.push(p):p.position.angleTo(o.symbolVector)<Math.PI*.476&&R.push(p)}),j.rotation.set(0,0,0),R.forEach(p=>{j.add(p)})}o.isRotation=!0,g?o.history.pop():o.history.push(o.rotateSymbol),e.onRotationStarted&&e.onRotationStarted(o.rotateSymbol),S.current.forEach((R,p)=>{p!=="w"&&p!=="W"&&S.current.set(p,!1)})}},S=w.useRef(new Map),P=()=>{const t=S.current;(t.get("w")||t.get("W"))&&t.get("r")&&s("Rw"),(t.get("w")||t.get("W"))&&t.get("l")&&s("Lw"),(t.get("w")||t.get("W"))&&t.get("u")&&s("Uw"),(t.get("w")||t.get("W"))&&t.get("d")&&s("Dw"),(t.get("w")||t.get("W"))&&t.get("f")&&s("Fw"),(t.get("w")||t.get("W"))&&t.get("b")&&s("Bw"),(t.get("w")||t.get("W"))&&t.get("R")&&s("R'w"),(t.get("w")||t.get("W"))&&t.get("L")&&s("L'w"),(t.get("w")||t.get("W"))&&t.get("U")&&s("U'w"),(t.get("w")||t.get("W"))&&t.get("D")&&s("D'w"),(t.get("w")||t.get("W"))&&t.get("F")&&s("F'w"),(t.get("w")||t.get("W"))&&t.get("B")&&s("B'w"),t.get("r")&&s("R"),t.get("l")&&s("L"),t.get("u")&&s("U"),t.get("d")&&s("D"),t.get("f")&&s("F"),t.get("b")&&s("B"),t.get("R")&&s("R'"),t.get("L")&&s("L'"),t.get("U")&&s("U'"),t.get("D")&&s("D'"),t.get("F")&&s("F'"),t.get("B")&&s("B'"),t.get("e")&&s("E"),t.get("m")&&s("M"),t.get("s")&&s("S"),t.get("E")&&s("E'"),t.get("M")&&s("M'"),t.get("S")&&s("S'"),t.get("x")&&s("x"),t.get("y")&&s("y"),t.get("z")&&s("z"),t.get("X")&&s("x'"),t.get("Y")&&s("y'"),t.get("Z")&&s("z'")};return w.useImperativeHandle(r,()=>{var t;return{onKeyDown:g=>{S.current.set(g,!0)},onKeyUp:g=>{S.current.set(g,!1)},setCubeMode:g=>{x.current=g},requestOrder:(...g)=>{var m;(m=v.current)==null||m.rotateQueue.push(...g),x.current="order",e.onOrderStarted&&e.onOrderStarted()},requestReverse:()=>{var m,h;const g=[...(m=v.current)==null?void 0:m.history].reverse().map(o=>o.indexOf("'")>0?o.replace("'",""):o.replace(/^(.)/,"$1'"));(h=v.current)==null||h.rotateQueue.push(...g),x.current="reverse",e.onOrderStarted&&e.onOrderStarted()},history:(t=v.current)==null?void 0:t.history}},[e]),n.jsxs(n.Fragment,{children:[n.jsx("group",{position:e.position,ref:a}),n.jsx("group",{position:e.position,ref:b})]})});const se=w.forwardRef(function(e,r){const[i,c]=w.useState(!1),[a,b]=w.useState(!1),[x,v]=w.useState(!1),[O,B]=w.useState("");return w.useImperativeHandle(r,()=>({resetConsoles:()=>{b(!1),v(!1)}})),n.jsxs("div",{className:"Controller",children:[n.jsxs("div",{className:"table",children:[n.jsx("div",{children:n.jsx("label",{htmlFor:"speedInput",children:"Speed:"})}),n.jsx("div",{children:n.jsx("input",{type:"number",id:"speedInput",className:"speed",value:e.moveSpeed,onChange:A=>{const s=parseInt(A.target.value);isNaN(s)||s<=0?console.log("Speed must be >0."):e.requestSetSpeed(s)}})})]}),n.jsxs("div",{className:"inputSymbols",children:[n.jsx("label",{htmlFor:"inputSymbols",children:"InputSymbols:"}),n.jsx("br",{}),n.jsx("textarea",{id:"inputSymbols",value:O,onChange:A=>B(A.target.value)}),n.jsx("input",{type:"button",id:"orderBtn",value:"Order",className:x?"clicked":"",onClick:()=>{x||(e.requestOrder(O),e.requestModeChange("order")),v(!x)},disabled:i||x||a})]}),n.jsxs("div",{className:"history",children:[n.jsx("label",{htmlFor:"history",children:"History:"}),n.jsx("br",{}),n.jsx("textarea",{id:"history",value:e.history,readOnly:!0})]}),n.jsxs("div",{className:"table",children:[n.jsx("div",{children:n.jsx("label",{htmlFor:"demoBtn",children:"Demonstration:"})}),n.jsx("div",{children:n.jsx("input",{type:"button",id:"demoBtn",className:i?"clicked":"",value:i?"Stop":"Start",onClick:()=>{e.requestModeChange(i?"manual":"demo"),c(!i)},disabled:a||x})})]}),n.jsxs("div",{className:"table",children:[n.jsx("div",{children:n.jsx("label",{htmlFor:"reverseBtn",children:"Restore cube:"})}),n.jsx("div",{children:n.jsx("input",{type:"button",id:"reverseBtn",value:"Restore",className:a?"clicked":"",onClick:()=>{a||e.requestReverse(),b(!a)},disabled:i||x||a})})]})]})});function re(){var A;const d=w.useRef(null),e=w.useRef(null),r=w.useRef(null),i=s=>{e.current&&e.current.onKeyDown(s.key)},c=s=>{e.current&&e.current.onKeyUp(s.key)},[a,b]=w.useState(4),[x,v]=w.useState(""),O=s=>{v(x+" "+s)},B=()=>{var s;(s=r.current)==null||s.resetConsoles()};return n.jsxs("div",{className:"App",children:[n.jsx("div",{className:"Canvas-Container",children:n.jsxs(Y,{className:"Canvas",tabIndex:0,onKeyDown:i,onKeyUp:c,camera:{position:new u(4,3.5,5)},ref:d,children:[n.jsx(X,{}),n.jsx("ambientLight",{intensity:1}),n.jsx("directionalLight",{position:[10,10,10],intensity:.8}),n.jsx("directionalLight",{position:[-10,-10,-10],intensity:.8}),n.jsx("directionalLight",{position:[10,10,10],intensity:.4}),n.jsx("directionalLight",{position:[10,-10,10],intensity:.4}),n.jsx("axesHelper",{args:[3]}),n.jsx("gridHelper",{args:[20,20],position:[0,-3,0]}),n.jsx("gridHelper",{args:[20,20],position:[0,7,-10],rotation:[Math.PI/2,0,0]}),n.jsx("gridHelper",{args:[20,20],position:[-10,7,0],rotation:[0,0,Math.PI/2]}),n.jsx(te,{position:new u(0,0,0),moveSpeed:a,onRotationFinished:O,onOrderFinished:B,ref:e})]})}),n.jsx(se,{moveSpeed:a,requestSetSpeed:s=>b(s),requestModeChange:s=>{var S;(S=e.current)==null||S.setCubeMode(s)},requestOrder:s=>{var S;(S=e.current)==null||S.requestOrder(...s.split(" "))},requestReverse:()=>{var s;(s=e.current)==null||s.requestReverse()},history:(A=e.current)==null?void 0:A.history.join(" "),ref:r})]})}$.createRoot(document.getElementById("root")).render(n.jsx(Z.StrictMode,{children:n.jsx(re,{})}));