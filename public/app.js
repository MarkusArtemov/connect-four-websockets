(()=>{var De=Object.defineProperty;var Ie=(i,e)=>{for(var t in e)De(i,t,{get:e[t],enumerable:!0})};var g=Object.create(null);g.open="0";g.close="1";g.ping="2";g.pong="3";g.message="4";g.upgrade="5";g.noop="6";var N=Object.create(null);Object.keys(g).forEach(i=>{N[g[i]]=i});var ue={type:"error",data:"parser error"};var Fe=typeof Blob=="function"||typeof Blob!="undefined"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Me=typeof ArrayBuffer=="function",Ue=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i&&i.buffer instanceof ArrayBuffer,Ve=({type:i,data:e},t,s)=>Fe&&e instanceof Blob?t?s(e):le(e,s):Me&&(e instanceof ArrayBuffer||Ue(e))?t?s(e):le(new Blob([e]),s):s(g[i]+(e||"")),le=(i,e)=>{let t=new FileReader;return t.onload=function(){let s=t.result.split(",")[1];e("b"+(s||""))},t.readAsDataURL(i)},H=Ve;var fe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",L=typeof Uint8Array=="undefined"?[]:new Uint8Array(256);for(let i=0;i<fe.length;i++)L[fe.charCodeAt(i)]=i;var pe=i=>{let e=i.length*.75,t=i.length,s,r=0,n,o,a,m;i[i.length-1]==="="&&(e--,i[i.length-2]==="="&&e--);let _=new ArrayBuffer(e),k=new Uint8Array(_);for(s=0;s<t;s+=4)n=L[i.charCodeAt(s)],o=L[i.charCodeAt(s+1)],a=L[i.charCodeAt(s+2)],m=L[i.charCodeAt(s+3)],k[r++]=n<<2|o>>4,k[r++]=(o&15)<<4|a>>2,k[r++]=(a&3)<<6|m&63;return _};var He=typeof ArrayBuffer=="function",Ke=(i,e)=>{if(typeof i!="string")return{type:"message",data:de(i,e)};let t=i.charAt(0);return t==="b"?{type:"message",data:We(i.substring(1),e)}:N[t]?i.length>1?{type:N[t],data:i.substring(1)}:{type:N[t]}:ue},We=(i,e)=>{if(He){let t=pe(i);return de(t,e)}else return{base64:!0,data:i}},de=(i,e)=>{switch(e){case"blob":return i instanceof ArrayBuffer?new Blob([i]):i;case"arraybuffer":default:return i}},K=Ke;var me=String.fromCharCode(30),ye=(i,e)=>{let t=i.length,s=new Array(t),r=0;i.forEach((n,o)=>{H(n,!1,a=>{s[o]=a,++r===t&&e(s.join(me))})})},ge=(i,e)=>{let t=i.split(me),s=[];for(let r=0;r<t.length;r++){let n=K(t[r],e);if(s.push(n),n.type==="error")break}return s},j=4;function h(i){if(i)return Ye(i)}function Ye(i){for(var e in h.prototype)i[e]=h.prototype[e];return i}h.prototype.on=h.prototype.addEventListener=function(i,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+i]=this._callbacks["$"+i]||[]).push(e),this};h.prototype.once=function(i,e){function t(){this.off(i,t),e.apply(this,arguments)}return t.fn=e,this.on(i,t),this};h.prototype.off=h.prototype.removeListener=h.prototype.removeAllListeners=h.prototype.removeEventListener=function(i,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+i];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+i],this;for(var s,r=0;r<t.length;r++)if(s=t[r],s===e||s.fn===e){t.splice(r,1);break}return t.length===0&&delete this._callbacks["$"+i],this};h.prototype.emit=function(i){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+i],s=1;s<arguments.length;s++)e[s-1]=arguments[s];if(t){t=t.slice(0);for(var s=0,r=t.length;s<r;++s)t[s].apply(this,e)}return this};h.prototype.emitReserved=h.prototype.emit;h.prototype.listeners=function(i){return this._callbacks=this._callbacks||{},this._callbacks["$"+i]||[]};h.prototype.hasListeners=function(i){return!!this.listeners(i).length};var l=(()=>typeof self!="undefined"?self:typeof window!="undefined"?window:Function("return this")())();function W(i,...e){return e.reduce((t,s)=>(i.hasOwnProperty(s)&&(t[s]=i[s]),t),{})}var ze=l.setTimeout,Je=l.clearTimeout;function v(i,e){e.useNativeTimers?(i.setTimeoutFn=ze.bind(l),i.clearTimeoutFn=Je.bind(l)):(i.setTimeoutFn=l.setTimeout.bind(l),i.clearTimeoutFn=l.clearTimeout.bind(l))}var Xe=1.33;function be(i){return typeof i=="string"?$e(i):Math.ceil((i.byteLength||i.size)*Xe)}function $e(i){let e=0,t=0;for(let s=0,r=i.length;s<r;s++)e=i.charCodeAt(s),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(s++,t+=4);return t}var ee=class extends Error{constructor(e,t,s){super(e),this.description=t,this.context=s,this.type="TransportError"}},A=class extends h{constructor(e){super(),this.writable=!1,v(this,e),this.opts=e,this.query=e.query,this.socket=e.socket}onError(e,t,s){return super.emitReserved("error",new ee(e,t,s)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){let t=K(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}};var Ee="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),te=64,Qe={},we=0,Y=0,ve;function ke(i){let e="";do e=Ee[i%te]+e,i=Math.floor(i/te);while(i>0);return e}function z(){let i=ke(+new Date);return i!==ve?(we=0,ve=i):i+"."+ke(we++)}for(;Y<te;Y++)Qe[Ee[Y]]=Y;function J(i){let e="";for(let t in i)i.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(i[t]));return e}function _e(i){let e={},t=i.split("&");for(let s=0,r=t.length;s<r;s++){let n=t[s].split("=");e[decodeURIComponent(n[0])]=decodeURIComponent(n[1])}return e}var xe=!1;try{xe=typeof XMLHttpRequest!="undefined"&&"withCredentials"in new XMLHttpRequest}catch(i){}var Te=xe;function se(i){let e=i.xdomain;try{if(typeof XMLHttpRequest!="undefined"&&(!e||Te))return new XMLHttpRequest}catch(t){}if(!e)try{return new l[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch(t){}}function Ge(){}var Ze=function(){return new se({xdomain:!1}).responseType!=null}(),X=class extends A{constructor(e){if(super(e),this.polling=!1,typeof location!="undefined"){let s=location.protocol==="https:",r=location.port;r||(r=s?"443":"80"),this.xd=typeof location!="undefined"&&e.hostname!==location.hostname||r!==e.port,this.xs=e.secure!==s}let t=e&&e.forceBase64;this.supportsBinary=Ze&&!t}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";let t=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let s=0;this.polling&&(s++,this.once("pollComplete",function(){--s||t()})),this.writable||(s++,this.once("drain",function(){--s||t()}))}else t()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){let t=s=>{if(this.readyState==="opening"&&s.type==="open"&&this.onOpen(),s.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(s)};ge(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){let e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,ye(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let e=this.query||{},t=this.opts.secure?"https":"http",s="";this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=z()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.opts.port&&(t==="https"&&Number(this.opts.port)!==443||t==="http"&&Number(this.opts.port)!==80)&&(s=":"+this.opts.port);let r=J(e),n=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(n?"["+this.opts.hostname+"]":this.opts.hostname)+s+this.opts.path+(r.length?"?"+r:"")}request(e={}){return Object.assign(e,{xd:this.xd,xs:this.xs},this.opts),new y(this.uri(),e)}doWrite(e,t){let s=this.request({method:"POST",data:e});s.on("success",t),s.on("error",(r,n)=>{this.onError("xhr post error",r,n)})}doPoll(){let e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,s)=>{this.onError("xhr poll error",t,s)}),this.pollXhr=e}},y=class extends h{constructor(e,t){super(),v(this,t),this.opts=t,this.method=t.method||"GET",this.uri=e,this.async=t.async!==!1,this.data=t.data!==void 0?t.data:null,this.create()}create(){let e=W(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;let t=this.xhr=new se(e);try{t.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders){t.setDisableHeaderCheck&&t.setDisableHeaderCheck(!0);for(let s in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(s)&&t.setRequestHeader(s,this.opts.extraHeaders[s])}}catch(s){}if(this.method==="POST")try{t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(s){}try{t.setRequestHeader("Accept","*/*")}catch(s){}"withCredentials"in t&&(t.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(t.timeout=this.opts.requestTimeout),t.onreadystatechange=()=>{t.readyState===4&&(t.status===200||t.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof t.status=="number"?t.status:0)},0))},t.send(this.data)}catch(s){this.setTimeoutFn(()=>{this.onError(s)},0);return}typeof document!="undefined"&&(this.index=y.requestsCount++,y.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr=="undefined"||this.xhr===null)){if(this.xhr.onreadystatechange=Ge,e)try{this.xhr.abort()}catch(t){}typeof document!="undefined"&&delete y.requests[this.index],this.xhr=null}}onLoad(){let e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}};y.requestsCount=0;y.requests={};if(typeof document!="undefined"){if(typeof attachEvent=="function")attachEvent("onunload",Ae);else if(typeof addEventListener=="function"){let i="onpagehide"in l?"pagehide":"unload";addEventListener(i,Ae,!1)}}function Ae(){for(let i in y.requests)y.requests.hasOwnProperty(i)&&y.requests[i].abort()}var P=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0))(),q=l.WebSocket||l.MozWebSocket,$=!0,Re="arraybuffer";var Ce=typeof navigator!="undefined"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative",Q=class extends A{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;let e=this.uri(),t=this.opts.protocols,s=Ce?{}:W(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(s.headers=this.opts.extraHeaders);try{this.ws=$&&!Ce?t?new q(e,t):new q(e):new q(e,t,s)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType||Re,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){let s=e[t],r=t===e.length-1;H(s,this.supportsBinary,n=>{let o={};$||(s.options&&(o.compress=s.options.compress),this.opts.perMessageDeflate&&(typeof n=="string"?Buffer.byteLength(n):n.length)<this.opts.perMessageDeflate.threshold&&(o.compress=!1));try{$?this.ws.send(n):this.ws.send(n,o)}catch(a){}r&&P(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws!="undefined"&&(this.ws.close(),this.ws=null)}uri(){let e=this.query||{},t=this.opts.secure?"wss":"ws",s="";this.opts.port&&(t==="wss"&&Number(this.opts.port)!==443||t==="ws"&&Number(this.opts.port)!==80)&&(s=":"+this.opts.port),this.opts.timestampRequests&&(e[this.opts.timestampParam]=z()),this.supportsBinary||(e.b64=1);let r=J(e),n=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(n?"["+this.opts.hostname+"]":this.opts.hostname)+s+this.opts.path+(r.length?"?"+r:"")}check(){return!!q}};var ie={websocket:Q,polling:X};var je=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,et=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function O(i){let e=i,t=i.indexOf("["),s=i.indexOf("]");t!=-1&&s!=-1&&(i=i.substring(0,t)+i.substring(t,s).replace(/:/g,";")+i.substring(s,i.length));let r=je.exec(i||""),n={},o=14;for(;o--;)n[et[o]]=r[o]||"";return t!=-1&&s!=-1&&(n.source=e,n.host=n.host.substring(1,n.host.length-1).replace(/;/g,":"),n.authority=n.authority.replace("[","").replace("]","").replace(/;/g,":"),n.ipv6uri=!0),n.pathNames=tt(n,n.path),n.queryKey=st(n,n.query),n}function tt(i,e){let t=/\/{2,9}/g,s=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&s.splice(0,1),e.slice(-1)=="/"&&s.splice(s.length-1,1),s}function st(i,e){let t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(s,r,n){r&&(t[r]=n)}),t}var p=class extends h{constructor(e,t={}){super(),this.writeBuffer=[],e&&typeof e=="object"&&(t=e,e=null),e?(e=O(e),t.hostname=e.host,t.secure=e.protocol==="https"||e.protocol==="wss",t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=O(t.host).host),v(this,t),this.secure=t.secure!=null?t.secure:typeof location!="undefined"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location!="undefined"?location.hostname:"localhost"),this.port=t.port||(typeof location!="undefined"&&location.port?location.port:this.secure?"443":"80"),this.transports=t.transports||["polling","websocket"],this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=_e(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){let t=Object.assign({},this.opts.query);t.EIO=j,t.transport=e,this.id&&(t.sid=this.id);let s=Object.assign({},this.opts.transportOptions[e],this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new ie[e](s)}open(){let e;if(this.opts.rememberUpgrade&&p.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch(t){this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",t=>this.onClose("transport close",t))}probe(e){let t=this.createTransport(e),s=!1;p.priorWebsocketSuccess=!1;let r=()=>{s||(t.send([{type:"ping",data:"probe"}]),t.once("packet",w=>{if(!s)if(w.type==="pong"&&w.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;p.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{s||this.readyState!=="closed"&&(k(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{let x=new Error("probe error");x.transport=t.name,this.emitReserved("upgradeError",x)}}))};function n(){s||(s=!0,k(),t.close(),t=null)}let o=w=>{let x=new Error("probe error: "+w);x.transport=t.name,n(),this.emitReserved("upgradeError",x)};function a(){o("transport closed")}function m(){o("socket closed")}function _(w){t&&w.name!==t.name&&n()}let k=()=>{t.removeListener("open",r),t.removeListener("error",o),t.removeListener("close",a),this.off("close",m),this.off("upgrading",_)};t.once("open",r),t.once("error",o),t.once("close",a),this.once("close",m),this.once("upgrading",_),t.open()}onOpen(){if(this.readyState="open",p.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade){let e=0,t=this.upgrades.length;for(;e<t;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":let t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){let e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let s=0;s<this.writeBuffer.length;s++){let r=this.writeBuffer[s].data;if(r&&(t+=be(r)),s>0&&t>this.maxPayload)return this.writeBuffer.slice(0,s);t+=2}return this.writeBuffer}write(e,t,s){return this.sendPacket("message",e,t,s),this}send(e,t,s){return this.sendPacket("message",e,t,s),this}sendPacket(e,t,s,r){if(typeof t=="function"&&(r=t,t=void 0),typeof s=="function"&&(r=s,s=null),this.readyState==="closing"||this.readyState==="closed")return;s=s||{},s.compress=s.compress!==!1;let n={type:e,data:t,options:s};this.emitReserved("packetCreate",n),this.writeBuffer.push(n),r&&this.once("flush",r),this.flush()}close(){let e=()=>{this.onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},s=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?s():e()}):this.upgrading?s():e()),this}onError(e){p.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,t){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){let t=[],s=0,r=e.length;for(;s<r;s++)~this.transports.indexOf(e[s])&&t.push(e[s]);return t}};p.protocol=j;var ds=p.protocol;function Oe(i,e="",t){let s=i;t=t||typeof location!="undefined"&&location,i==null&&(i=t.protocol+"//"+t.host),typeof i=="string"&&(i.charAt(0)==="/"&&(i.charAt(1)==="/"?i=t.protocol+i:i=t.host+i),/^(https?|wss?):\/\//.test(i)||(typeof t!="undefined"?i=t.protocol+"//"+i:i="https://"+i),s=O(i)),s.port||(/^(http|ws)$/.test(s.protocol)?s.port="80":/^(http|ws)s$/.test(s.protocol)&&(s.port="443")),s.path=s.path||"/";let n=s.host.indexOf(":")!==-1?"["+s.host+"]":s.host;return s.id=s.protocol+"://"+n+":"+s.port+e,s.href=s.protocol+"://"+n+(t&&t.port===s.port?"":":"+s.port),s}var ae={};Ie(ae,{Decoder:()=>F,Encoder:()=>oe,PacketType:()=>c,protocol:()=>Le});var it=typeof ArrayBuffer=="function",rt=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i.buffer instanceof ArrayBuffer,Se=Object.prototype.toString,nt=typeof Blob=="function"||typeof Blob!="undefined"&&Se.call(Blob)==="[object BlobConstructor]",ot=typeof File=="function"||typeof File!="undefined"&&Se.call(File)==="[object FileConstructor]";function I(i){return it&&(i instanceof ArrayBuffer||rt(i))||nt&&i instanceof Blob||ot&&i instanceof File}function D(i,e){if(!i||typeof i!="object")return!1;if(Array.isArray(i)){for(let t=0,s=i.length;t<s;t++)if(D(i[t]))return!0;return!1}if(I(i))return!0;if(i.toJSON&&typeof i.toJSON=="function"&&arguments.length===1)return D(i.toJSON(),!0);for(let t in i)if(Object.prototype.hasOwnProperty.call(i,t)&&D(i[t]))return!0;return!1}function Be(i){let e=[],t=i.data,s=i;return s.data=re(t,e),s.attachments=e.length,{packet:s,buffers:e}}function re(i,e){if(!i)return i;if(I(i)){let t={_placeholder:!0,num:e.length};return e.push(i),t}else if(Array.isArray(i)){let t=new Array(i.length);for(let s=0;s<i.length;s++)t[s]=re(i[s],e);return t}else if(typeof i=="object"&&!(i instanceof Date)){let t={};for(let s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=re(i[s],e));return t}return i}function Ne(i,e){return i.data=ne(i.data,e),delete i.attachments,i}function ne(i,e){if(!i)return i;if(i&&i._placeholder===!0){if(typeof i.num=="number"&&i.num>=0&&i.num<e.length)return e[i.num];throw new Error("illegal attachments")}else if(Array.isArray(i))for(let t=0;t<i.length;t++)i[t]=ne(i[t],e);else if(typeof i=="object")for(let t in i)Object.prototype.hasOwnProperty.call(i,t)&&(i[t]=ne(i[t],e));return i}var Le=5,c;(function(i){i[i.CONNECT=0]="CONNECT",i[i.DISCONNECT=1]="DISCONNECT",i[i.EVENT=2]="EVENT",i[i.ACK=3]="ACK",i[i.CONNECT_ERROR=4]="CONNECT_ERROR",i[i.BINARY_EVENT=5]="BINARY_EVENT",i[i.BINARY_ACK=6]="BINARY_ACK"})(c||(c={}));var oe=class{constructor(e){this.replacer=e}encode(e){return(e.type===c.EVENT||e.type===c.ACK)&&D(e)?this.encodeAsBinary({type:e.type===c.EVENT?c.BINARY_EVENT:c.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===c.BINARY_EVENT||e.type===c.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){let t=Be(e),s=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(s),r}},F=class extends h{constructor(e){super(),this.reviver=e}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);let s=t.type===c.BINARY_EVENT;s||t.type===c.BINARY_ACK?(t.type=s?c.EVENT:c.ACK,this.reconstructor=new ce(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(I(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0,s={type:Number(e.charAt(0))};if(c[s.type]===void 0)throw new Error("unknown packet type "+s.type);if(s.type===c.BINARY_EVENT||s.type===c.BINARY_ACK){let n=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);let o=e.substring(n,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");s.attachments=Number(o)}if(e.charAt(t+1)==="/"){let n=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););s.nsp=e.substring(n,t)}else s.nsp="/";let r=e.charAt(t+1);if(r!==""&&Number(r)==r){let n=t+1;for(;++t;){let o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}s.id=Number(e.substring(n,t+1))}if(e.charAt(++t)){let n=this.tryParse(e.substr(t));if(F.isPayloadValid(s.type,n))s.data=n;else throw new Error("invalid payload")}return s}tryParse(e){try{return JSON.parse(e,this.reviver)}catch(t){return!1}}static isPayloadValid(e,t){switch(e){case c.CONNECT:return typeof t=="object";case c.DISCONNECT:return t===void 0;case c.CONNECT_ERROR:return typeof t=="string"||typeof t=="object";case c.EVENT:case c.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="string"||typeof t[0]=="number");case c.ACK:case c.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}},ce=class{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){let t=Ne(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}};function d(i,e,t){return i.on(e,t),function(){i.off(e,t)}}var ct=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),S=class extends h{constructor(e,t,s){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,s&&s.auth&&(this.auth=s.auth),this._opts=Object.assign({},s),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;let e=this.io;this.subs=[d(e,"open",this.onopen.bind(this)),d(e,"packet",this.onpacket.bind(this)),d(e,"error",this.onerror.bind(this)),d(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){if(ct.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;let s={type:c.EVENT,data:t};if(s.options={},s.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){let o=this.ids++,a=t.pop();this._registerAckCallback(o,a),s.id=o}let r=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!r||!this.connected)||(this.connected?(this.notifyOutgoingListeners(s),this.packet(s)):this.sendBuffer.push(s)),this.flags={},this}_registerAckCallback(e,t){var s;let r=(s=this.flags.timeout)!==null&&s!==void 0?s:this._opts.ackTimeout;if(r===void 0){this.acks[e]=t;return}let n=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);t.call(this,new Error("operation has timed out"))},r);this.acks[e]=(...o)=>{this.io.clearTimeoutFn(n),t.apply(this,[null,...o])}}emitWithAck(e,...t){let s=this.flags.timeout!==void 0||this._opts.ackTimeout!==void 0;return new Promise((r,n)=>{t.push((o,a)=>s?o?n(o):r(a):r(o)),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());let s={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...n)=>s!==this._queue[0]?void 0:(r!==null?s.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(r)):(this._queue.shift(),t&&t(null,...n)),s.pending=!1,this._drainQueue())),this._queue.push(s),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;let t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:c.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case c.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case c.EVENT:case c.BINARY_EVENT:this.onevent(e);break;case c.ACK:case c.BINARY_ACK:this.onack(e);break;case c.DISCONNECT:this.ondisconnect();break;case c.CONNECT_ERROR:this.destroy();let s=new Error(e.data.message);s.data=e.data.data,this.emitReserved("connect_error",s);break}}onevent(e){let t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){let t=this._anyListeners.slice();for(let s of t)s.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){let t=this,s=!1;return function(...r){s||(s=!0,t.packet({type:c.ACK,id:e,data:r}))}}onack(e){let t=this.acks[e.id];typeof t=="function"&&(t.apply(this,e.data),delete this.acks[e.id])}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:c.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){let t=this._anyListeners;for(let s=0;s<t.length;s++)if(e===t[s])return t.splice(s,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){let t=this._anyOutgoingListeners;for(let s=0;s<t.length;s++)if(e===t[s])return t.splice(s,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){let t=this._anyOutgoingListeners.slice();for(let s of t)s.apply(this,e.data)}}};function R(i){i=i||{},this.ms=i.min||100,this.max=i.max||1e4,this.factor=i.factor||2,this.jitter=i.jitter>0&&i.jitter<=1?i.jitter:0,this.attempts=0}R.prototype.duration=function(){var i=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*i);i=Math.floor(e*10)&1?i+t:i-t}return Math.min(i,this.max)|0};R.prototype.reset=function(){this.attempts=0};R.prototype.setMin=function(i){this.ms=i};R.prototype.setMax=function(i){this.max=i};R.prototype.setJitter=function(i){this.jitter=i};var B=class extends h{constructor(e,t){var s;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,v(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((s=t.randomizationFactor)!==null&&s!==void 0?s:.5),this.backoff=new R({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;let r=t.parser||ae;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new p(this.uri,this.opts);let t=this.engine,s=this;this._readyState="opening",this.skipReconnect=!1;let r=d(t,"open",function(){s.onopen(),e&&e()}),n=d(t,"error",o=>{s.cleanup(),s._readyState="closed",this.emitReserved("error",o),e?e(o):s.maybeReconnectOnOpen()});if(this._timeout!==!1){let o=this._timeout;o===0&&r();let a=this.setTimeoutFn(()=>{r(),t.close(),t.emit("error",new Error("timeout"))},o);this.opts.autoUnref&&a.unref(),this.subs.push(function(){clearTimeout(a)})}return this.subs.push(r),this.subs.push(n),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");let e=this.engine;this.subs.push(d(e,"ping",this.onping.bind(this)),d(e,"data",this.ondata.bind(this)),d(e,"error",this.onerror.bind(this)),d(e,"close",this.onclose.bind(this)),d(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){P(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let s=this.nsps[e];return s?this._autoConnect&&!s.active&&s.connect():(s=new S(this,e,t),this.nsps[e]=s),s}_destroy(e){let t=Object.keys(this.nsps);for(let s of t)if(this.nsps[s].active)return;this._close()}_packet(e){let t=this.encoder.encode(e);for(let s=0;s<t.length;s++)this.engine.write(t[s],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;let e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{let t=this.backoff.duration();this._reconnecting=!0;let s=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},t);this.opts.autoUnref&&s.unref(),this.subs.push(function(){clearTimeout(s)})}}onreconnect(){let e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}};var M={};function G(i,e){typeof i=="object"&&(e=i,i=void 0),e=e||{};let t=Oe(i,e.path||"/socket.io"),s=t.source,r=t.id,n=t.path,o=M[r]&&n in M[r].nsps,a=e.forceNew||e["force new connection"]||e.multiplex===!1||o,m;return a?m=new B(s,e):(M[r]||(M[r]=new B(s,e)),m=M[r]),t.query&&!e.query&&(e.query=t.queryKey),m.socket(t.path,e)}Object.assign(G,{Manager:B,Socket:S,io:G,connect:G});function Pe(){let i=document.querySelector(".game-status"),e=document.querySelector(".red-chip"),t=document.querySelector(".yellow-chip"),s=document.querySelectorAll(".game-field"),r=7,n=6,o=new Map,a=!0;t.classList.add("not-active"),s.forEach((u,f)=>{o.set(f,u),u.addEventListener("drop",b=>{b.preventDefault(),m(f)}),u.addEventListener("dragover",b=>{b.preventDefault()})});function m(u){let f=a?"red":"yellow",b=u%r,T=-1;for(let E=n-1;E>=0;E--){let C=o.get(w(E,b));if(C.classList.length<2){C.classList.add(f),T=E;break}}T!==-1&&(_(T,b)?console.log("win"):x()&&console.log("draw"),qe())}function _(u,f){let b=a?"red":"yellow",T=[[1,0],[0,1],[1,1],[1,-1]];for(let[E,C]of T){let he=k(u,f,[-E,-C]),Z=0,U=he[0]+E,V=he[1]+C;for(;U>=0&&U<n&&V>=0&&V<r;){if(o.get(w(U,V)).classList.contains(b)){if(Z++,Z===4)return!0}else Z=0;U+=E,V+=C}}return!1}function k(u,f,[b,T]){for(;u>=0&&u<n&&f>=0&&f<r;)u+=b,f+=T;return[u,f]}function w(u,f){return u*r+f}function x(){return[...o.values()].every(u=>u.classList.length===2)}function qe(){a=!a,i.textContent=a?"Turn red":"Turn yellow",e.draggable=a,t.draggable=!a,t.classList.toggle("not-active"),e.classList.toggle("not-active")}}Pe();})();
