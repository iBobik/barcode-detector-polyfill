var w=(r,e,n)=>new Promise((i,o)=>{var m=d=>{try{h(n.next(d))}catch(c){o(c)}},A=d=>{try{h(n.throw(d))}catch(c){o(c)}},h=d=>d.done?i(d.value):Promise.resolve(d.value).then(m,A);h((n=n.apply(r,e)).next())});import{ZBarSymbolType as s,ZBarConfigType as E,scanRGBABuffer as C,ZBarScanner as D}from"https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.12/dist/main.js";function O(r,e,n,i){return new(n||(n=Promise))(function(o,m){function A(c){try{d(i.next(c))}catch(f){m(f)}}function h(c){try{d(i.throw(c))}catch(f){m(f)}}function d(c){var f;c.done?o(c.value):(f=c.value,f instanceof n?f:new n(function(x){x(f)})).then(A,h)}d((i=i.apply(r,e||[])).next())})}var t=class{constructor(e,n=E.ZBAR_CFG_ENABLE,i=1){this.symbolType=e,this.configType=n,this.number=i,this.configSteps=[this]}static register(e,n,i=n.symbolType){return t.formatsToConfigs[e]=n,t.typesToFormats[i]=t.typesToFormats[i]||e,n}static formats(){return Object.keys(t.formatsToConfigs)}static toFormat(e){return t.typesToFormats[e]}static configure(e,n){var i;(i=t.formatsToConfigs[n])===null||i===void 0||i.configSteps.forEach(o=>e.setConfig(o.symbolType,o.configType,o.number))}add(e){return this.configSteps.push(e),this}},_;t.formatsToConfigs={},t.typesToFormats={},t.register("codabar",new t(s.ZBAR_CODABAR)),t.register("code_39",new t(s.ZBAR_CODE39)),t.register("code_93",new t(s.ZBAR_CODE93)),t.register("code_128",new t(s.ZBAR_CODE128)),t.register("databar",new t(s.ZBAR_DATABAR)),t.register("databar_exp",new t(s.ZBAR_DATABAR_EXP)),t.register("ean_2",new t(s.ZBAR_EAN2)),t.register("ean_5",new t(s.ZBAR_EAN5)),t.register("ean_8",new t(s.ZBAR_EAN8)),t.register("ean_13",new t(s.ZBAR_EAN13)),t.register("ean_13+2",new t(s.ZBAR_EAN13)).add(new t(s.ZBAR_EAN2)),t.register("ean_13+5",new t(s.ZBAR_EAN13)).add(new t(s.ZBAR_EAN5)),t.register("isbn_10",new t(s.ZBAR_ISBN10)).add(new t(s.ZBAR_EAN13)),t.register("isbn_13",new t(s.ZBAR_ISBN13)).add(new t(s.ZBAR_EAN13)),t.register("isbn_13+2",new t(s.ZBAR_ISBN13)).add(new t(s.ZBAR_EAN13)).add(new t(s.ZBAR_EAN2)),t.register("isbn_13+5",new t(s.ZBAR_ISBN13)).add(new t(s.ZBAR_EAN13)).add(new t(s.ZBAR_EAN5)),t.register("itf",new t(s.ZBAR_I25)),t.register("qr_code",new t(s.ZBAR_QRCODE)),t.register("sq_code",new t(s.ZBAR_SQCODE)),t.register("upc_a",new t(s.ZBAR_UPCA)).add(new t(s.ZBAR_EAN13)),t.register("upc_e",new t(s.ZBAR_UPCE)).add(new t(s.ZBAR_EAN13)),function(r){r[r.UNKNOWN=-1]="UNKNOWN",r[r.UPRIGHT=0]="UPRIGHT",r[r.ROTATED_RIGHT=1]="ROTATED_RIGHT",r[r.UPSIDE_DOWN=2]="UPSIDE_DOWN",r[r.ROTATED_LEFT=3]="ROTATED_LEFT"}(_||(_={}));var N=class{},I=(()=>{try{return new OffscreenCanvas(1,1).getContext("2d")instanceof OffscreenCanvasRenderingContext2D}catch(r){return!1}})(),g=class{constructor(e={}){if(e.formats!==void 0){if(!Array.isArray(e.formats)||!e.formats.length)throw new TypeError(`Barcode formats should be a non-empty array of strings but are: ${JSON.stringify(e)}`);let n=e.formats.filter(i=>!t.formats().includes(i));if(n.length)throw new TypeError(`Unsupported barcode format(s): ${n.join(", ")}`)}this.formats=e.formats||t.formats(),this.zbarConfig=e.zbar||new N}static getSupportedFormats(){return Promise.resolve(t.formats())}detect(e){if(!g.isImageBitmapSource(e))throw new TypeError("BarcodeDetector.detect() argument is not an ImageBitmapSource");let n=g.intrinsicDimensions(e);if(n.width===0||n.height===0)return Promise.resolve([]);try{return Promise.all([this.toImageData(e),this.getScanner()]).then(i=>{let o=i[0],m=i[1];return this.zbarConfig.enableCache!==void 0&&m.enableCache(this.zbarConfig.enableCache),C(o.data,o.width,o.height,m)}).then(i=>i.map(o=>this.toBarcodeDetectorResult(o)))}catch(i){return Promise.reject(i)}}getScanner(){return new Promise((e,n)=>O(this,void 0,void 0,function*(){if(!this.scanner){let i=yield D.create();this.formats.length>0&&(i.setConfig(s.ZBAR_NONE,E.ZBAR_CFG_ENABLE,0),this.formats.forEach(o=>t.configure(i,o))),this.scanner=i}e(this.scanner)}))}toImageData(e){let n=i=>{let o=g.intrinsicDimensions(i);this.canvas&&this.canvas.width===o.width&&this.canvas.height===o.height||(this.canvas=function(h,d){if(I)return new OffscreenCanvas(h,d);{let c=document.createElement("canvas");return c.width=h,c.height=d,c}}(o.width,o.height));let m=this.canvas,A=m.getContext("2d");return A.drawImage(i,0,0),A.getImageData(0,0,m.width,m.height)};if(e instanceof ImageData)return Promise.resolve(e);if(e instanceof Blob){let i=document.createElement("img");return i.src=URL.createObjectURL(e),i.decode().then(()=>n(i)).finally(()=>URL.revokeObjectURL(i.src))}return e instanceof CanvasRenderingContext2D?Promise.resolve(e.getImageData(0,0,e.canvas.width,e.canvas.height)):Promise.resolve(n(e))}toBarcodeDetectorResult(e){let n={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};return e.points.forEach(i=>{n.minX=Math.min(n.minX,i.x),n.maxX=Math.max(n.maxX,i.x),n.minY=Math.min(n.minY,i.y),n.maxY=Math.max(n.maxY,i.y)}),{format:t.toFormat(e.type),rawValue:e.decode(this.zbarConfig.encoding),orientation:e.orientation,quality:e.quality,boundingBox:DOMRectReadOnly.fromRect({x:n.minX,y:n.minY,width:n.maxX-n.minX,height:n.maxY-n.minY}),cornerPoints:[{x:n.minX,y:n.minY},{x:n.maxX,y:n.minY},{x:n.maxX,y:n.maxY},{x:n.minX,y:n.maxY}]}}static isImageBitmapSource(e){return e instanceof HTMLImageElement||e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof Blob||e instanceof ImageData||e instanceof CanvasRenderingContext2D||e instanceof ImageBitmap||e&&e.width==0||e&&e.height==0}static intrinsicDimensions(e){return{width:Number(e.naturalWidth||e.videoWidth||e.width),height:Number(e.naturalHeight||e.videoHeight||e.height)}}};var a={};document.querySelectorAll("[id]").forEach(r=>a[r.id]=r);var l=a.canvas,u=l.getContext("2d"),R,y,B=null;function p(){return w(this,null,function*(){R=yield g.getSupportedFormats(),a.formats.innerHTML=R.join(", "),y=new g({formats:R,zbar:{encoding:a.encoding.value}})})}function T(r){return y.detect(r).then(e=>{l.width=r.naturalWidth||r.videoWidth||r.width,l.height=r.naturalHeight||r.videoHeight||r.height,u.clearRect(0,0,l.width,l.height),e.forEach(n=>{let i=n.cornerPoints[n.cornerPoints.length-1];u.moveTo(i.x,i.y),n.cornerPoints.forEach(o=>u.lineTo(o.x,o.y)),u.lineWidth=3,u.strokeStyle="#00e000ff",u.stroke()}),a.details.checked||e.forEach(n=>{delete n.boundingBox,delete n.cornerPoints}),a.result.innerText=JSON.stringify(e,null,2)})}function Z(){v(!1),a.video.srcObject&&(a.video.srcObject.getTracks().forEach(r=>r.stop()),a.video.srcObject=null),setTimeout(()=>a.img.decode().then(()=>T(a.img)),100)}function v(r){r||u.clearRect(0,0,l.width,l.height),typeof r=="undefined"&&(r=!0),r?T(a.video).then(()=>B=requestAnimationFrame(()=>v(!0))):(cancelAnimationFrame(B),B=null)}function b(){a.imgUrl.validity.valid&&(a.imgBtn.className=a.videoBtn.className="",a.imgUrl.className="active",a.img.src=a.imgUrl.value,Z())}p();a.encoding.addEventListener("change",p);a.imgUrl.addEventListener("change",b);a.imgUrl.addEventListener("focus",b);a.fileInput.addEventListener("change",r=>{a.imgUrl.className=a.videoBtn.className="",a.imgBtn.className="button-primary",a.img.src=URL.createObjectURL(a.fileInput.files[0]),a.fileInput.value=null,Z()});a.imgBtn.addEventListener("click",r=>{a.fileInput.dispatchEvent(new MouseEvent("click"))});a.videoBtn.addEventListener("click",r=>{B?(a.imgUrl.className=a.imgBtn.className=a.videoBtn.className="",v(!1)):navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment"}}).then(e=>{a.imgUrl.className=a.imgBtn.className="",a.videoBtn.className="button-primary",a.video.srcObject=e,v()}).catch(e=>{a.result.innerText=JSON.stringify(e)})});
/*!
 * @undecaf/barcode-detector-polyfill v0.9.15
 * A WebAssembly polyfill for the Barcode Detection API
 * Built 2023-01-26T12:39:45.098Z
 * (c) 2021-present Ferdinand Kasper <fkasper@modus-operandi.at>
 * Released under the MIT license.
 * 
 * This work uses https://github.com/undecaf/zbar-wasm.git as per
 * LGPL-2.1 section 6 (https://opensource.org/licenses/LGPL-2.1).
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
