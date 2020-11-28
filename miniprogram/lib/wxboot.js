module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1606547995219, function(require, module, exports) {
const WXBoot = require('./lib/wxboot');
module.exports =  WXBoot
}, function(modId) {var map = {"./lib/wxboot":1606547995220}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1606547995220, function(require, module, exports) {
function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function observeGlobalData(t,e,n){var r=getObaa(t,null,e,n);e.$setGlobalData||(e.$setGlobalData=function(e,n){_obaa2.default.set(t,e,n,r)})}function observeByStoreName(t,e,n,r){var a=getObaa(e,t,n,r);n["$setBind"+t.substring(0,1).toUpperCase()+t.substring(1)]||(n["$setBind"+t.substring(0,1).toUpperCase()+t.substring(1)]=function(t,n){_obaa2.default.set(e,t,n,a)})}function observePageStore(t,e,n){var r=getObaa(t,null,e,n);e.$setPageStore||(e.$setPageStore=function(e,n){_obaa2.default.set(t,e,n,r)})}function getObaa(t,e,n,r){return(0,_obaa2.default)(t,function(t,a,o,i){var c={};if(0===t.indexOf("Array-push"))for(var u=a.length-o.length,s=0;s<u;s++)c[(0,_path.fixPath)(i+"-"+(o.length+s))]=a[o.length+s];else 0===t.indexOf("Array-")?c[(0,_path.fixPath)(i)]=a:c[(0,_path.fixPath)(i+"-"+t)]=a;e?n.$setData(e,c):n.$setData(c),"[object Function]"==Object.prototype.toString.call(r)&&r(c)})}function bindFunction(t,e,n){n[t]?console.log("绑定失败 该方法已存在。"):(n[t]=e,console.log(t+"方法绑定成功"))}function bindApi(t,e){if("[object Object]"!=Object.prototype.toString.call(t))return void console.log("functionStore 格式错误");for(var n in t)if(t.hasOwnProperty(n)){var r=t[n];bindFunction(n,r,e)}}function bindConstants(t,e){if("[object Object]"!=Object.prototype.toString.call(t))return void console.log("constants 格式错误");e.$consts=t;for(var n in t)if(t.hasOwnProperty(n)){var r=t[n];e["$con"+n.substring(0,1).toUpperCase()+n.substring(1)]=r}}function wxUpdata(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{arrCover:!0};return e.setData((0,_wxUpdata.objToPath)(t,n))}var _wxUpdata=require("./wx-updata"),_obaa=require("./obaa"),_obaa2=_interopRequireDefault(_obaa),_path=require("./path");module.exports=function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e,n){function r(t,e){return t&&t.hasOwnProperty&&t.hasOwnProperty(e)}var a={type:function(t){if(null===t)return"null";if(void 0===t)return"undefined";var e=/\[object (\w+)\]/.exec(Object.prototype.toString.call(t));return e?e[1].toLowerCase():""},extend:function(t){if("object"!=a.type(t)&&"function"!=a.type(t))return t;for(var e,n,o=1,i=arguments.length;o<i;o++){e=arguments[o];for(n in e)r(e,n)&&(t[n]=e[n])}return t},objEach:function(t,e){if(t)for(var n in t)if(r(t,n)&&!1===e(n,t[n]))break},nextTick:function(){var t=this;return function(){return setTimeout.apply(t,arguments)}}(),lock:function(t){var e;return function(){if(!e){e=!0;var n=[].slice.call(arguments,0);return n.unshift(function(){e=!1}),t.apply(this,n)}}},queue:function(t,e){function n(){var t=r.shift();if(!t)return void(o=e);o--;var i=t[0],c=t[1],u=t[2];u.unshift(function(){o++,n.apply(this,arguments)}),a.nextTick(function(){return i.apply(c,u)})}e=e||1;var r=[],o=e;return function(){if(r.push([t,this,[].slice.call(arguments,0)]),o)return n()}},delegator:function(t){var e,n=[];return function(r){if(e)return n.push(r);e=!0,t.call(this,function(){e=!1;var t=this,a=arguments;r&&r.apply(t,a),n.forEach(function(e){e&&e.apply(t,a)})})}},once:function(t){var e,n=arguments;return function(){if(!e&&t)return e=!0,t.apply(n.length>=2?n[1]:null,arguments)}},queryParse:function(t,e){if(!t)return{};e=e||"&";var n=t.replace(/^\?/,""),r={},a=n?n.split(e):null;return a&&a.length>0&&a.forEach(function(t){t=t.split("=");var e=t.splice(0,1),n=t.join("=");r[e]=n}),r},queryJoin:function(t,e,n){var r=a.queryStringify(e,"&",n);if(!r)return t;var o;return o=/[\?&]$/.test(t)?"":~t.indexOf("?")?"&":"?",t+o+r},queryStringify:function(t,e,n){return t?Object.keys(t).map(function(e){var r=t[e];return e+"="+(n?r:encodeURIComponent(r))}).join(e||"&"):""},wrapFun:function(t,e){return function(){try{e&&e.apply(this,arguments)}finally{t&&t.apply(this,arguments)}}}};t.exports=a},function(t,e,n){function r(t,e){return e?e.expr?e.expr<0&&-1*e.expr==i?e.data:e.expr>0&&new Date<e.expr?e.data:(wx.removeStorage({key:t}),null):e.data:null}function a(){}var o=n(0),i=+new Date;console.log("[Session] Current ssid:",i);var c={session:{set:function(t,e,n){return c.set("session_"+t,e,-1*i,n)},get:function(t,e){return c.get("session_"+t,e)},remove:function(t,e){return c.remove("session_"+t,e)}},set:function(t,e,n,r){"function"==o.type(n)?(r=n,n=0):r&&"function"!=o.type(r)&&(r=a);var i,c={expr:0,data:e};if(!0===n){var u=wx.getStorageSync("_cache_"+t);if(!u)return;c.expr=u.expr||0,i=1}if(!i){if((n=n||0)>0){n+=+new Date}c.expr=+n}r?wx.setStorage({key:"_cache_"+t,data:c,success:function(){r()},fail:function(e){r(e||'set "'+t+'" fail')}}):wx.setStorageSync("_cache_"+t,c)},get:function(t,e){if(!e)return r(t,wx.getStorageSync("_cache_"+t));"function"!=o.type(e)&&(e=a);var n='get "'+t+'" fail';wx.getStorage({key:"_cache_"+t,success:function(a){a&&a.data?e(null,r(t,a.data)):e(a?a.errMsg||n:n)},fail:function(t){e(t||n)}})},remove:function(t,e){if(!e)return r(t,wx.removeStorageSync("_cache_"+t));"function"!=o.type(e)&&(e=a);var n='remove "'+t+'" fail';wx.removeStorage({key:"_cache_"+t,success:function(){e(null,!0)},fail:function(t){e(t||n)}})}};t.exports=c},function(t,e,n){var r=n(0),a={nameResolve:function(){}};t.exports={set:function(t,e){switch(t){case"resolvePath":"function"==r.type(e)&&(a.customRouteResolve=e);break;case"route":var n=r.type(e);if("string"==n||"array"==n){var o="string"==n?[e]:e,i=o[0];o=o.map(function(t){return new RegExp("^"+t.replace(/^\/?/,"/?").replace(/[\.]/g,"\\.").replace(/\$page/g,"([\\w\\-]+)"))}),a.routeResolve=function(t){return i.replace(/\$page/g,t)},a.nameResolve=function(t){var e="";return o.some(function(n){var r=n.exec(t);if(r)return e=r[1],!0}),e}}else console.error("Illegal routes option:",e);break;default:a[t]=e}},get:function(t){return a[t]}}},function(t,e,n){function r(){this._evtObjs={}}r.prototype.on=function(t,e,n){this._evtObjs[t]||(this._evtObjs[t]=[]),this._evtObjs[t].push({handler:e,once:n});var r=this;return function(){r.off(t,e)}},r.prototype.off=function(t,e){var n;n=t?[t]:Object.keys(this._evtObjs);var r=this;return n.forEach(function(t){if(e){var n=r._evtObjs[t]||[],a=[];n.forEach(function(t){t.handler!==e&&a.push(t)}),r._evtObjs[t]=a}else r._evtObjs[t]=[]}),this},r.prototype.emit=function(t){var e=Array.prototype.slice.call(arguments,1);(this._evtObjs[t]||[]).forEach(function(t){if(!t.once||!t.called){t.called=!0;try{t.handler&&t.handler.apply(null,e)}catch(t){console.error(t.stack||t.message||t)}}})},r.prototype.assign=function(t){var e=this;["on","off","emit","assign"].forEach(function(n){var r=e[n];t[n]=function(){return r.apply(e,arguments)}})},(new r).assign(r),t.exports=r},function(t,e,n){function r(t,e,n){if(!i)return i=!0,clearTimeout(a),clearTimeout(o),a=setTimeout(function(){i=!1},2e3),u.emit("navigateTo",e.url),wx[t]?wx[t].apply(wx,n):void 0}var a,o,i,c=n(3),u=t.exports=new c;u.on("page:ready",function(){o=setTimeout(function(){i=!1},100)}),u.navigateTo=function(t){return r("navigateTo",t,arguments)},u.redirectTo=function(t){return r("redirectTo",t,arguments)},u.switchTab=function(t){return r("switchTab",t,arguments)},u.reLaunch=function(t){return r("reLaunch",t,arguments)},u.navigateBack=function(){return wx.navigateBack.apply(wx,arguments)}},function(t,e,n){function r(t){var e=t.type;return function(t,n){var r=t.split(/\?/),a=r[0];if(/^[\w\-]+$/.test(a)&&(a=(v.get("customRouteResolve")||v.get("routeResolve"))(a)),!a)throw new Error("Invalid path:",a);n=n||{},n.url=a+(r[1]?"?"+r[1]:""),d[e](n)}}function a(t){var e=x[t];return function(t){if(t){var n=t.currentTarget.dataset,r=n.before,a=n.after,o=n.url,i=this;try{i&&r&&i[r]&&i[r].call(i,t)}finally{if(!o)return;e(o),i&&a&&i[a]&&i[a].call(i,t)}}}}function o(t){wx.navigateBack({delta:t||1})}function i(t){var e=u(t);e&&l&&l.emit("preload:"+e,t,y.queryParse(t.split("?")[1]))}function c(){return getCurrentPages().slice(0).pop()}function u(t){var e=/^[\w\-]+(?=\?|$)/.exec(t);return e?e[0]:v.get("nameResolve")(t)}function s(){var t=c().route;return t?u(t):""}function f(t,e){return A[t]=e,this}function p(t){var e=A[t];return A[t]=null,e}var l,h,g=n(1),d=n(4),v=n(2),y=n(0),b=r({type:"navigateTo"}),$=r({type:"redirectTo"}),w=r({type:"switchTab"}),m=r({type:"reLaunch"}),x={navigate:b,redirect:$,switchTab:w,reLaunch:m},_=a("navigate"),P=a("redirect"),S=a("switchTab"),O=a("reLaunch"),A={};t.exports={channel:A,dispatcher:function(t){l=t},ref:function(t){h=t},mount:function(t){var e=t.detail;switch(e.type){case"attached":var n=h&&h(e.id);if(!n)return;var r=n._$ref;r&&this.$refs&&(this.$refs[r]=n),n._$attached(this);break;case"event:call":var a=this[e.method];a&&a.apply(this,e.args)}},redirectDelegate:function(t,e){["navigateTo","redirectTo","switchTab","reLaunch"].forEach(function(n){t.on(n,function(t){var r=u(t);r&&e.emit(n+":"+r,t,y.queryParse(t.split("?")[1]))})})},methods:function(t){t.$cache=g,t.$session=g.session,t.$put=f,t.$take=p,t.$refs={},t.$route=t.$navigate=b,t.$redirect=$,t.$switch=w,t.$launch=m,t.$back=o,t.$preload=i,t.$bindRoute=t.$bindNavigate=_,t.$bindRedirect=P,t.$bindSwitch=S,t.$bindReLaunch=O,t.$curPage=c,t.$curPageName=s},getPageName:u}},function(t,e,n){function r(t){t||(console.error("Illegal component options."),t={});var e=u.get("extendComponentBefore");e&&e(t,p),t.created=o.wrapFun(t.created,function(){i.methods(this,a)}),t.attached=o.wrapFun(t.attached,function(){var t=++h;this.$id=t,l[t]=this,this._$ref=this.properties.ref||this.properties._ref,this.triggerEvent("ing",{id:this.$id,type:"attached"})}),t.detached=o.wrapFun(t.detached,function(){delete l[this.$id];var t=this.$parent&&this.$parent.$refs,e=this._$ref;e&&t&&delete t[e],this.$parent=null}),t.properties=o.extend({},t.properties,{ref:{type:String,value:"",observer:function(t){if(this._$ref!==t){var e=this.$parent&&this.$parent.$refs;if(e){var n=e[this._$ref];delete e[this._$ref],this._$ref=t,n&&t&&e[t]}}}}}),t.methods=o.extend({},t.methods,{$globalData:function(){return getApp().globalData},$set:function(){return this.setData.apply(this,arguments)},$data:function(){return this.data},$emit:function(){if(a)return a.emit.apply(a,arguments)},$on:function(){return a?a.on.apply(a,arguments):function(){}},$off:function(){if(a)return a.off.apply(a,arguments)},$call:function(t){var e=[].slice.call(arguments,1);this.triggerEvent("ing",{id:this.$id,type:"event:call",method:t,args:e})},_$attached:function(t){this.$root=t.$root||t,this.$parent=t},$:i.mount}),Component(t)}var a,o=n(0),i=n(5),c=n(1),u=n(2),s=n(4),f=n(3),p={fns:o,redirector:s,cache:c,message:f,dispatcher:a,channel:i.channel},l={},h=0;r.getRef=function(t){return l[t]},i.ref(r.getRef),r.dispatcher=function(t){a=t},Component.C=r,t.exports=r},function(t,e,n){function r(t,e){"object"==u.type(t)&&(e=t,t=e.name||"_unknow");var n=new s,r=g.get("extendPageBefore");if(r&&r(t,e,w),e.onNavigate){var a=function(t,n){e.onNavigate({url:t,query:n})};console.log("Page["+t+'] define "onNavigate".'),d.on("navigateTo:"+t,a),d.on("redirectTo:"+t,a),d.on("switchTab:"+t,a),d.on("reLaunch:"+t,a)}e.onPreload&&(console.log("Page["+t+'] define "onPreload".'),d.on("preload:"+t,function(t,n){e.onPreload({url:t,query:n})})),e.$state={firstOpen:!1},e.$emitter=n,h.methods(e),e.$on=function(){return d.on.apply(d,arguments)},e.$emit=function(){return d.emit.apply(d,arguments)},e.$off=function(){return d.off.apply(d,arguments)},e.$=h.mount,e.$setData=function(t,e){if("string"==u.type(t)){var n={};return u.objEach(e,function(e,r){n[t+"."+e]=r}),wxUpdata(n,this)}if("object"==u.type(t))return wxUpdata(t,this)},e.onLoad=u.wrapFun(e.onLoad,function(){var t=this;if(e.onAwake&&s.on("app:sleep",function(n){e.onAwake.call(t,n)}),!v){v=!0;this.$state.firstOpen=!0}}),e.onReady=u.wrapFun(e.onReady,function(){f.emit("page:ready")}),e.onPageLaunch&&e.onPageLaunch(),e.onAppLaunch&&(y?e.onAppLaunch.apply(e,y):d.on("app:launch",function(t){e.onAppLaunch.apply(e,t)})),e.onAppShow&&(y?e.onAppShow.apply(e,y):d.on("app:show",function(t){e.onAppShow.apply(e,t)})),e.$upData=function(t){return this.setData((0,_wxUpdata.objToPath)(t))},e.Empty=_wxUpdata.Empty,e.$App=getApp(),e.$globalData=function(){return e.$App.globalData},e.$bindGlobalData=function(t){this.setData({globalData:JSON.parse(JSON.stringify(e.$globalData()))}),observeGlobalData(e.$globalData(),this,t)},e.$getStore=function(t){return e.$App[t]=e.$App[t]||{}},e.$bindStore=function(t,n){e.$App[t]=e.$App[t]||{},this.setData(_defineProperty({},t,JSON.parse(JSON.stringify(e.$App[t])))),observeByStoreName(t,e.$App[t],this,n)},e.$bindPageStore=function(t,e){this.setData(JSON.parse(JSON.stringify(t))),observePageStore(t,this,e)},e.$bindFunction=function(t,e){bindFunction(t,e,this)},e.$bindApi=function(t){bindApi(t,this)};var o=g.get("pageApi");o&&bindApi(o,e);var i=g.get("consts");i&&bindConstants(i,e);var c=g.get("extendPageAfter");return c&&c(t,e,w),Page(e),e}function a(t){if(!t.config||!t.config.route||!t.config.route.length)throw new Error("config.route is necessary !");t.config&&r.config(t.config);var e=t;t.onShow=t.onShow?u.wrapFun(t.onShow,i):i,t.onHide=t.onHide?u.wrapFun(t.onHide,c):c,t.onLaunch=t.onLaunch?u.wrapFun(t.onLaunch,o):o,t.onLaunch=u.wrapFun(t.onLaunch,function(){e=this}),t.onAwake&&s.on("app:sleep",function(n){t.onAwake.call(e,n)}),App(t)}function o(){y=[].slice.call(arguments),s.emit("app:launch",y)}function i(){try{b||(b=[].slice.call(arguments),s.emit("app:show",b))}finally{if(!$)return;var t=$;$=0,s.emit("app:sleep",new Date-t)}}function c(){$=new Date}var u=n(0),s=n(3),f=n(4),p=n(1),l=n(6),h=n(5),g=n(2),d=new s,v=0,y=0,b=0,$=0,w={fns:u,redirector:f,cache:p,message:s,dispatcher:d,channel:h.channel};h.ref(l.getRef),h.dispatcher(d),l.dispatcher(d),h.redirectDelegate(f,d),Page.P=r,Page.C=Component.C=r.C=r.Comp=r.Component=l,Page.A=App.A=r.A=r.App=r.Application=a,r.redirector=f,r.message=s,r.cache=p,r.fns=u,r.getPageName=h.getPageName,r.config=function(t,e){return"object"==u.type(t)?u.objEach(t,function(t,e){g.set(t,e)}):g.set(t,e),this},s.assign(r),s.assign(l),s.assign(a),t.exports=r}]);
}, function(modId) { var map = {"./wx-updata":1606547995221,"./obaa":1606547995222,"./path":1606547995223}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1606547995221, function(require, module, exports) {
function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(r)}function r(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],e=!0,o=!1,a=void 0;try{for(var u,i=t[Symbol.iterator]();!(e=(u=i.next()).done)&&(n.push(u.value),!r||n.length!==r);e=!0);}catch(t){o=!0,a=t}finally{try{e||null==i.return||i.return()}finally{if(o)throw a}}return n}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return n(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function e(t){return Array.isArray(t)}function o(r){return"object"===t(r)&&null!==r&&!e(r)}var a=function t(r,n,a){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};r.forEach((function(r,f){if(r!==u){var l="".concat(n,"[").concat(f,"]");o(r)?c.arrObjPath?i(r,l+(Object.keys(r).every((function(t){return/^\[\d+]$/.test(t)||c.arrObjPath}))?"":"."),a,c):i(r,l+".",a,c):e(r)?t(r,l,a):a[l]=r}}))},u=Symbol("updata empty array item"),i=function t(n){var u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};"string"!=typeof u&&(c=u,u="");var f=!1;if(c.arrObjPath)if(Object.keys(n).every((function(t){return/^\[\d+]$/.test(t)})))f=!0;else{if(Object.keys(n).some((function(t){return/^\[\d+]$/.test(t)})))throw new Error("wx-updata: 数组路径对象需要每个属性都是对象路径 [数组下标] 形式");f=!1}for(var l=0,y=Object.entries(n);l<y.length;l++){var b=r(y[l],2),s=b[0],v=b[1],h=""===u?s:u.endsWith("].")||f?"".concat(u).concat(s):"".concat(u,".").concat(s);o(v)?t(v,h,i,c):!c.arrCover&&e(v)?a(v,h,i,c):i[h]=v}return i},c=function(t,r){var n=t;return function(t){return t.upData=function(t,n){var e,o,a=i(t,{arrObjPath:null!==(e=r.arrObjPath)&&void 0!==e&&e,arrCover:null!==(o=r.arrCover)&&void 0!==o&&o});return r.debug&&console.log("转化后效果:",a),this.setData(a,n)},n(t)}};if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'Empty', { enumerable: true, configurable: true, get: function() { return u; } });Object.defineProperty(exports, 'objToPath', { enumerable: true, configurable: true, get: function() { return i; } });Object.defineProperty(exports, 'updataInit', { enumerable: true, configurable: true, get: function() { return c; } });
//# sourceMappingURL=wx-updata.js.map

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1606547995222, function(require, module, exports) {
function obaa(r,e,t){var o=function(r,e,t){var o=this,n=[];obaa.isArray(r)&&(0===r.length&&o.track(r),o.mock(r)),r&&"object"===(void 0===r?"undefined":_typeof(r))&&0===Object.keys(r).length&&o.track(r);for(var a in r)r.hasOwnProperty(a)&&(t?obaa.isArray(e)&&obaa.isInArray(e,a)?(n.push(a),o.watch(r,a)):obaa.isString(e)&&a==e&&(n.push(a),o.watch(r,a)):(n.push(a),o.watch(r,a)));o.target=r,o.propertyChangedHandler||(o.propertyChangedHandler=[]);var i=t||e;o.propertyChangedHandler.push({all:!t,propChanged:i,eventPropArr:n})};return o.prototype={onPropertyChanged:function(r,e,t,o,n){if(e!==t&&(!nan(e)||!nan(t))&&this.propertyChangedHandler)for(var a=obaa._getRootName(r,n),i=0,s=this.propertyChangedHandler.length;i<s;i++){var p=this.propertyChangedHandler[i];(p.all||obaa.isInArray(p.eventPropArr,a)||0===a.indexOf("Array-"))&&p.propChanged.call(this.target,r,e,t,n)}0!==r.indexOf("Array-")&&"object"===(void 0===e?"undefined":_typeof(e))&&this.watch(o,r,o.$observeProps.$observerPath)},mock:function(r){var e=this;obaa.methods.forEach(function(t){r[t]=function(){var r=Array.prototype.slice.call(this,0),o=Array.prototype[t].apply(this,Array.prototype.slice.call(arguments));if(new RegExp("\\b"+t+"\\b").test(obaa.triggerStr)){for(var n in this)this.hasOwnProperty(n)&&!obaa.isFunction(this[n])&&e.watch(this,n,this.$observeProps.$observerPath);e.onPropertyChanged("Array-"+t,this,r,this,this.$observeProps.$observerPath)}return o},r["pure"+t.substring(0,1).toUpperCase()+t.substring(1)]=function(){return Array.prototype[t].apply(this,Array.prototype.slice.call(arguments))}})},watch:function(r,e,t){if("$observeProps"!==e&&"$observer"!==e&&!obaa.isFunction(r[e])){r.$observeProps||Object.defineProperty(r,"$observeProps",{configurable:!0,enumerable:!1,writable:!0,value:{}}),r.$observeProps.$observerPath=void 0!==t?t:"#";var o=this,n=r.$observeProps[e]=r[e];if(Object.defineProperty(r,e,{get:function(){return this.$observeProps[e]},set:function(t){var n=this.$observeProps[e];this.$observeProps[e]=t,o.onPropertyChanged(e,t,n,this,r.$observeProps.$observerPath)}}),"object"==(void 0===n?"undefined":_typeof(n))){obaa.isArray(n)&&(this.mock(n),0===n.length&&this.track(n,e,t)),n&&0===Object.keys(n).length&&this.track(n,e,t);for(var a in n)n.hasOwnProperty(a)&&this.watch(n,a,r.$observeProps.$observerPath+"-"+e)}}},track:function(r,e,t){r.$observeProps||(Object.defineProperty(r,"$observeProps",{configurable:!0,enumerable:!1,writable:!0,value:{}}),r.$observeProps.$observerPath=void 0!==t&&null!==t?t+"-"+e:void 0!==e&&null!==e?"#-"+e:"#")}},new o(r,e,t)}function nan(r){return"number"==typeof r&&isNaN(r)}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r};exports.default=obaa,obaa.methods=["concat","copyWithin","entries","every","fill","filter","find","findIndex","forEach","includes","indexOf","join","keys","lastIndexOf","map","pop","push","reduce","reduceRight","reverse","shift","slice","some","sort","splice","toLocaleString","toString","unshift","values","size"],obaa.triggerStr=["concat","copyWithin","fill","pop","push","reverse","shift","sort","splice","unshift","size"].join(","),obaa.isArray=function(r){return"[object Array]"===Object.prototype.toString.call(r)},obaa.isString=function(r){return"string"==typeof r},obaa.isInArray=function(r,e){for(var t=r.length;--t>-1;)if(e===r[t])return!0;return!1},obaa.isFunction=function(r){return"[object Function]"==Object.prototype.toString.call(r)},obaa._getRootName=function(r,e){return"#"===e?r:e.split("-")[1]},obaa.add=function(r,e){r.$observer.watch(r,e)},obaa.set=function(r,e,t,o){if(void 0===r[e]){(r.$observer||o).watch(r,e,r.$observeProps.$observerPath)}r[e]=t},Array.prototype.size=function(r){this.length=r};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1606547995223, function(require, module, exports) {
function getUsing(t,e){if(!e)return{};var r={};return e.forEach(function(e,a){if("string"!=typeof e){var n=Object.keys(e)[0],o=e[n];if("string"!=typeof o){var i=o[0];if("string"==typeof i){var f=getTargetByPath(t,i);r[n]=o[1]?o[1](f):f}else{var c=[];i.forEach(function(e){c.push(getTargetByPath(t,e))}),r[n]=o[1].apply(null,c)}}}}),r}function getTargetByPath(t,e){for(var r=e.replace(/]/g,"").replace(/\[/g,".").split("."),a=t,n=0,o=r.length;n<o;n++)a=a[r[n]];return a}function getPath(t){if("[object Array]"===Object.prototype.toString.call(t)){var e={};return t.forEach(function(t){if("string"==typeof t)e[t]=!0;else{var r=t[Object.keys(t)[0]];"string"==typeof r?e[r]=!0:"string"==typeof r[0]?e[r[0]]=!0:r[0].forEach(function(t){return e[t]=!0})}}),e}return getUpdatePath(t)}function getUpdatePath(t){var e={};return dataToPath(t,e),e}function dataToPath(t,e){Object.keys(t).forEach(function(r){e[r]=!0;var a=Object.prototype.toString.call(t[r]);a===OBJECTTYPE?_objToPath(t[r],r,e):a===ARRAYTYPE&&_arrayToPath(t[r],r,e)})}function _objToPath(t,e,r){Object.keys(t).forEach(function(a){r[e+"."+a]=!0,delete r[e];var n=Object.prototype.toString.call(t[a]);n===OBJECTTYPE?_objToPath(t[a],e+"."+a,r):n===ARRAYTYPE&&_arrayToPath(t[a],e+"."+a,r)})}function _arrayToPath(t,e,r){t.forEach(function(t,a){r[e+"["+a+"]"]=!0,delete r[e];var n=Object.prototype.toString.call(t);n===OBJECTTYPE?_objToPath(t,e+"["+a+"]",r):n===ARRAYTYPE&&_arrayToPath(t,e+"["+a+"]",r)})}function needUpdate(t,e){for(var r in t){if(e[r])return!0;for(var a in e)if(includePath(r,a))return!0}return!1}function includePath(t,e){if(0===t.indexOf(e)){var r=t.substr(e.length,1);if("["===r||"."===r)return!0}return!1}function fixPath(t){var e="";return t.replace("#-","").split("-").forEach(function(t,r){r?isNaN(Number(t))?e+="."+t:e+="["+t+"]":e+=t}),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getUsing=getUsing,exports.getTargetByPath=getTargetByPath,exports.getPath=getPath,exports.getUpdatePath=getUpdatePath,exports.needUpdate=needUpdate,exports.fixPath=fixPath;var OBJECTTYPE="[object Object]",ARRAYTYPE="[object Array]";
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1606547995219);
})()
//# sourceMappingURL=index.js.map