import { Empty } from './wx-updata'
import { objToPath } from './wx-updata'
import obaa from './obaa'
import { getPath, needUpdate, fixPath, getUsing } from './path'
/*!
 * 1.自动整合 wx-updata.js 页面方法 增加$upData,Empty
 * 2.修改路由支持多$page替换
 * 3.页面绑定APP.js全局变量
 * $getStore $bindStore $setBind+绑定数据字段名
 * 4.加载绑定方法，绑定方法库
 * todo-统一数据中心 ,全局方法栈，后台方法栈
 *  v1.0.0
 * https://github.com/shaohuixia1994/WXBoot/
 * License MIT
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var undef = void(0)
function hasOwn (obj, prop) {
	return obj && obj.hasOwnProperty && obj.hasOwnProperty(prop)
}
function _nextTick() {
	// global
	var ctx = this
	return function () {
		return setTimeout.apply(ctx, arguments)
	}
}
var fns = {
	type: function(obj) {
		if (obj === null) return 'null'
		else if (obj === undef) return 'undefined'
		var m = /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))
		return m ? m[1].toLowerCase() : ''
	},
	extend: function(obj) {
		if (fns.type(obj) != 'object' && fns.type(obj) != 'function') return obj;
		var source, prop;
		for (var i = 1, length = arguments.length; i < length; i++) {
			source = arguments[i];
			for (prop in source) {
				if (hasOwn(source, prop)) {
					obj[prop] = source[prop];
				}
			}
		}
		return obj;
	},
	objEach: function (obj, fn) {
		if (!obj) return
		for(var key in obj) {
			if (hasOwn(obj, key)) {
				if(fn(key, obj[key]) === false) break
			}
		}
	},
	nextTick: _nextTick(),
	/**
	 * Lock function before lock release
	 */
	lock: function lock(fn) {
		var pending
		return function () {
			if (pending) return
			pending = true
			var args = [].slice.call(arguments, 0)
			args.unshift(function () {
				pending = false
			})
			return fn.apply(this, args)
		}
	},
	/**
	 * Queue when pending, execute one by one
	 * @param {Function} fn executed function
	 * @param {Number} capacity Allow run how much parall task at once
	 * @async
	 */
	queue: function queue(fn, capacity) {
		capacity = capacity || 1
		var callbacks = []
		var remains = capacity
		function next() {
			var item = callbacks.shift()
			if (!item) {
				remains = capacity
				return
			}
			remains--
			var fn = item[0]
			var ctx = item[1]
			var args = item[2]
			args.unshift(function () {
				// once task is done, remains increasing
				remains ++
				// then check or call next task
				next.apply(this, arguments)
			})
			fns.nextTick(function () {
				return fn.apply(ctx, args)
			})
		}
		return function () {
			callbacks.push([fn, this, [].slice.call(arguments, 0)])
			if (!remains) return
			return next()
		}
	},
	/**
	 * Queue and wait for the same result
	 * @param {Function} delegate method
	 * @return {Function} the method receive a callback function
	 */
	delegator: function (fn) {
		var pending
		var queue = []
		return function (cb) {
			if (pending) return queue.push(cb)
			pending = true
			fn.call(this, function () {
				pending = false
				var ctx = this
				var args = arguments
				cb && cb.apply(ctx, args)
				queue.forEach(function (f) {
					f && f.apply(ctx, args)
				})
			})
		}
	},
	/**
	 * Call only once
	 */
	once: function (fn/*[, ctx]*/) {
		var args = arguments
		var called
		return function () {
			if (called || !fn) return
			called = true
			return fn.apply(args.length >=2 ? args[1] : null, arguments)
		}
	},
	/**
	 *  解析 query 字符串
	 **/
	queryParse: function(search, spliter) {
		if (!search) return {};

		spliter = spliter || '&';

		var query = search.replace(/^\?/, ''),
			queries = {},
			splits = query ? query.split(spliter) : null;

		if (splits && splits.length > 0) {
			splits.forEach(function(item) {
				item = item.split('=');
				var key = item.splice(0, 1),
					value = item.join('=');
				queries[key] = value;
			});
		}
		return queries;
	},
	/**
	 * URL添加query
	 */
	queryJoin: function (api, queries, unencoded) {
		var qs = fns.queryStringify(queries, '&', unencoded)
		if (!qs) return api

		var sep
		if (/[\?&]$/.test(api)) {
			sep = ''
		} else if (~api.indexOf('?')) {
			sep = '&'
		} else {
			sep = '?'
		}
		return api + sep + qs
	},
	/**
	 * query 对象转换字符串
	 */
	queryStringify: function (params, spliter, unencoded) {
		if (!params) return ''
		return Object.keys(params).map(function (k) {
			var v = params[k]
			return k + '=' + (unencoded ? v : encodeURIComponent(v))
		}).join(spliter || '&')
	},
	wrapFun: function (pre, wrapper) {
		return function () {
			try {
				wrapper && wrapper.apply(this, arguments)
			} finally{
				pre && pre.apply(this, arguments)
			}
		}
	}
}

module.exports = fns


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fns = __webpack_require__(0)
var sessionId = +new Date()
var sessionKey = 'session_'
console.log('[Session] Current ssid:', sessionId)
var cache = {
	session: {
		set: function (k, v, asyncCB) {
			return cache.set(sessionKey+k, v, -1*sessionId, asyncCB)
		},
		get: function (k, asyncCB) {
			return cache.get(sessionKey+k, asyncCB)
		},
		remove: function (k, asyncCB) {
			return cache.remove(sessionKey+k, asyncCB)
		}
	},
	/**
	 * setter
	 * @param {String} k      key
	 * @param {Object} v      value
	 * @param {Number} expire 过期时间，毫秒，为负数的时候表示为唯一session ID，为 true 表示保持上一次缓存时间
	 * @param {Function} asyncCB optional, 是否异步、异步回调方法
	 */
	set: function (k, v, expire, asyncCB) {
		if (fns.type(expire) == 'function') {
			asyncCB = expire
			expire = 0
		} else if (asyncCB && fns.type(asyncCB) != 'function') {
			asyncCB = noop
		}
		var data = {
			expr: 0,
			data: v
		}
		var expireTime
		/**
		 * 保持上次缓存时间
		 */
		if (expire === true) {
			var _cdata = wx.getStorageSync('_cache_' + k)
			// 上次没有缓存，本次也不更新
			if (!_cdata) return
			// 使用上次过期时间
			data.expr = _cdata.expr || 0
			expireTime = 1
		}
		if (!expireTime) {
			expire = expire || 0
			if (expire > 0) {
				var t = + new Date()
				expire = expire + t
			}
			data.expr = +expire
		}
		/**
		 * 根据异步方法决定同步、异步更新
		 */
		if (asyncCB) {
			wx.setStorage({
				key: '_cache_' + k,
				data: data,
				success: function () {
					asyncCB()
				},
				fail: function (e) {
					asyncCB(e || `set "${k}" fail`)
				}
			})
		} else {
			wx.setStorageSync('_cache_' + k, data)
		}
	},
	/**
	 * getter
	 * @param {String} k      key
	 * @param {Function} asyncCB optional, 是否异步、异步回调方法
	 */
	get: function (k, asyncCB) {
		if (asyncCB) {
			if (fns.type(asyncCB) != 'function') asyncCB = noop
			var errMsg = `get "${k}" fail`
			wx.getStorage({
				key: '_cache_' + k,
				success: function (data) {
					if (data && data.data) {
						asyncCB(null, _resolve(k, data.data))
					} else {
						asyncCB(data ? data.errMsg || errMsg : errMsg)
					}
				},
				fail: function (e) {
					asyncCB(e || errMsg)
				}
			})
		} else {
			return _resolve(k, wx.getStorageSync('_cache_' + k))
		}
	},
	remove: function (k, asyncCB) {
		if (asyncCB) {
			if (fns.type(asyncCB) != 'function') asyncCB = noop
			var errMsg = `remove "${k}" fail`
			wx.removeStorage({
				key: '_cache_' + k,
				success: function () {
					asyncCB(null, true)
				},
				fail: function (e) {
					asyncCB(e || errMsg)
				}
			})
		} else {
			return _resolve(k, wx.removeStorageSync('_cache_' + k))
		}
	}
}
function _resolve(k, v) {
	if (!v) return null
	// 永久存储
	if (!v.expr) return v.data
	else {
		if (v.expr < 0 && -1*v.expr == sessionId) {
			// session
		 	return v.data
		} else if (v.expr > 0 && new Date() < v.expr) {
			// 普通存储
			return v.data
		} else {
		 	wx.removeStorage({
		 		key: k
		 	})
			return null
		}
	}
}
function noop() {}
module.exports = cache


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var fns = __webpack_require__(0)
var _conf = {
	nameResolve: function () {}
}
module.exports = {
	set: function (k, v) {
		switch(k) {
			case 'resolvePath':
				if (fns.type(v) == 'function') {
					_conf.customRouteResolve = v
				}
				break
			case 'route':
				let t = fns.type(v)
				if (t == 'string' || t == 'array') {
						let routes = (t == 'string' ? [v]:v)
						let mainRoute = routes[0]
						routes = routes.map(function (item) {
							return new RegExp('^'+item
								.replace(/^\/?/, '/?')
								.replace(/[\.]/g, '\\.')
								.replace(/\$page/g, '([\\w\\-]+)')
								//back .replace('$page', '([\\w\\-]+)')
							)
						})
						_conf.routeResolve = function (name) {
							return mainRoute.replace(/\$page/g, name)
							//back return mainRoute.replace('$page', name)
						}
						_conf.nameResolve = function (url) {
							var n = ''
							routes.some(function (reg) {
								var m = reg.exec(url)	
								if (m) {
									n = m[1]
									return true
								}
							})
							return n
						}

				} else {
					console.error('Illegal routes option:', v)
				}
				break
			default:
				_conf[k] = v
		}
	},
	get: function (k) {
		return _conf[k]
	}
}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 *  Simple Pub/Sub module
 *  @tencent/message and 减掉fns依赖
 **/


function Message() {
	this._evtObjs = {};
}
Message.prototype.on = function (evtType, handler, _once) {
	if (!this._evtObjs[evtType]) {
		this._evtObjs[evtType] = [];
	}
	this._evtObjs[evtType].push({
		handler: handler,
		once: _once
	})
	var that = this
	return function () {
		that.off(evtType, handler)
	}
}
Message.prototype.off = function (evtType, handler) {
	var types;
	if (evtType) {
		types = [evtType];
	} else {
		types = Object.keys(this._evtObjs)
	}
	var that = this;
	types.forEach(function (type) {
		if (!handler) {
			// remove all
			that._evtObjs[type] = [];
		} else {
			var handlers = that._evtObjs[type] || [],
				nextHandlers = [];

			handlers.forEach(function (evtObj) {
				if (evtObj.handler !== handler) {
					nextHandlers.push(evtObj)
				}
			})
			that._evtObjs[type] = nextHandlers;
		}
	})

	return this;
}
Message.prototype.emit = function (evtType) {
	var args = Array.prototype.slice.call(arguments, 1)

	var handlers = this._evtObjs[evtType] || [];
	handlers.forEach(function (evtObj) {
		if (evtObj.once && evtObj.called) return
		evtObj.called = true
		try {
			evtObj.handler && evtObj.handler.apply(null, args);
		} catch(e) {
			console.error(e.stack || e.message || e)
		}
	})
}
Message.prototype.assign = function (target) {
	var msg = this;
	['on', 'off', 'emit', 'assign'].forEach(function (name) {
		var method = msg[name]
		target[name] = function () {
			return method.apply(msg, arguments)
		}
	})
}
/**
 *  Global Message Central
 **/
;(new Message()).assign(Message)
module.exports = Message;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * 对wx.navigateTo、wx.redirectTo、wx.navigateBack的包装，在它们的基础上添加了事件
 */
var Message = __webpack_require__(3)
var exportee = module.exports = new Message()
var timer, readyTimer, pending

exportee.on('page:ready', function () {
	readyTimer = setTimeout(function () {
		pending = false
	}, 100)
})
function route(type, cfg, args) {
	if (pending) return
	pending = true
	clearTimeout(timer)
	clearTimeout(readyTimer)
	/**
	 * 2s内避免重复的跳转
	 */
	timer = setTimeout(function () {
		pending = false
	}, 2000)
	exportee.emit('navigateTo', cfg.url)

	// 会存在不兼容接口，例如：reLaunch
	if (wx[type]) {
		return wx[type].apply(wx, args)
	}
}
exportee.navigateTo = function (cfg) {
	return route('navigateTo', cfg, arguments)
}
exportee.redirectTo = function (cfg) {
	return route('redirectTo', cfg, arguments)
}
exportee.switchTab = function (cfg) {
	return route('switchTab', cfg, arguments)
}
exportee.reLaunch = function (cfg) {
	return route('reLaunch', cfg, arguments)
}
exportee.navigateBack = function () {
  return wx.navigateBack.apply(wx, arguments)
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var cache = __webpack_require__(1)
var redirector = __webpack_require__(4)
var conf = __webpack_require__(2)
var fns = __webpack_require__(0)
var navigate = route({type: 'navigateTo'})
var redirect = route({type: 'redirectTo'})
var switchTab = route({type: 'switchTab'})
var reLaunch = route({type: 'reLaunch'})
var routeMethods = {navigate, redirect, switchTab, reLaunch}
var bindNavigate = clickDelegate('navigate')
var bindRedirect = clickDelegate('redirect')
var bindSwitch = clickDelegate('switchTab')
var bindReLaunch = clickDelegate('reLaunch')
var channel = {}
var dispatcher
var getRef

module.exports = {
	channel,
	dispatcher: function (d) {
		dispatcher = d
	},
	ref: function (fn) {
		getRef = fn
	},
	mount: function (e) {
		var payload = e.detail
		switch(payload.type) {
			case 'attached':
				let ref = getRef && getRef(payload.id)
				if (!ref) return

				let refName = ref._$ref
				if (refName && this.$refs) {
					this.$refs[refName] = ref
				}
				ref._$attached(this)
				break
			case 'event:call':
				let method = this[payload.method]
				method && method.apply(this, payload.args)
			default:
				break
		}
	},
	redirectDelegate: function (emitter, dispatcher) {
		;['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].forEach(function (k) {
			emitter.on(k, function (url) {
				var name = getPageName(url)
				name && dispatcher.emit(k+':'+name, url, fns.queryParse(url.split('?')[1]))
			})
		})
	},
	methods: function (ctx) {
		/**
		 * 缓存
		 */
		ctx.$cache = cache
		ctx.$session = cache.session
		/**
		 * 存一次，取一次
		 */
		ctx.$put = put
		/**
		 * 只能被取一次
		 */
		ctx.$take = take
		/**
		 * 实例引用集合
		 */
		ctx.$refs = {}

		/**
		 * 路由方法
		 */
		ctx.$route = ctx.$navigate = navigate
		ctx.$redirect = redirect
		ctx.$switch = switchTab
		ctx.$launch = reLaunch
		ctx.$back = back
		/**
		 * 页面预加载
		 */
		ctx.$preload = preload
		/**
		 * 点击跳转代理
		 */
		ctx.$bindRoute = ctx.$bindNavigate = bindNavigate
		ctx.$bindRedirect = bindRedirect
		ctx.$bindSwitch = bindSwitch
		ctx.$bindReLaunch = bindReLaunch
		/**
		 * 页面信息
		 */
		ctx.$curPage = getPage
		ctx.$curPageName = curPageName
	},
	getPageName
}
/**
 * Navigate handler
 */
function route ({type}) {
	// url: $page[?name=value]
	return function (url, config) {
		var parts = url.split(/\?/)
		var pagepath = parts[0]
		if (/^[\w\-]+$/.test(pagepath)) {
			pagepath = (conf.get('customRouteResolve') || conf.get('routeResolve'))(pagepath)
		}
		if (!pagepath) {
			throw new Error('Invalid path:', pagepath)
		}
		config = config || {}
		// append querystring
		config.url = pagepath + (parts[1] ? '?' + parts[1] : '')
		redirector[type](config)
	}
}

function clickDelegate(type) {
	var _route = routeMethods[type]
	return function (e) {
		if (!e) return
		var dataset = e.currentTarget.dataset
		var before = dataset.before
		var after = dataset.after
		var url = dataset.url
		var ctx = this
		try {
			if (ctx && before && ctx[before]) ctx[before].call(ctx, e)
		} finally {
			if (!url) return
			_route(url)
			if (ctx && after && ctx[after]) ctx[after].call(ctx, e)
		}
	}
}

function back(delta) {
	wx.navigateBack({
		delta: delta || 1
	})
}
function preload(url){
	var name = getPageName(url)
	name && dispatcher && dispatcher.emit('preload:'+name, url, fns.queryParse(url.split('?')[1]))
}
function getPage() {
	return getCurrentPages().slice(0).pop()
}
function getPageName(url) {
	var m = /^[\w\-]+(?=\?|$)/.exec(url)
	return m ? m[0] : conf.get('nameResolve')(url)
}
function curPageName () {
	var route = getPage().route
	if (!route) return ''
	return getPageName(route)
}
function put (key, value) {
	channel[key] = value
	return this
}
function take (key) {
	var v = channel[key]
	// 释放引用
	channel[key] = null
	return v
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fns = __webpack_require__(0)
var bridge = __webpack_require__(5)
var cache = __webpack_require__(1)
var conf = __webpack_require__(2)
var redirector = __webpack_require__(4)
var message = __webpack_require__(3)
var modules = {
	fns, redirector, cache, message, dispatcher,
	channel: bridge.channel
}
var dispatcher
/**
 * Component constructor
 */
var refs = {}
var cid = 0
function component(def) {
	if (!def) {
		console.error(`Illegal component options.`)
		def = {}
	}
	// extend page config
	var extendComponentBefore = conf.get('extendComponentBefore')
	extendComponentBefore && extendComponentBefore(def, modules)

	def.created = fns.wrapFun(def.created, function () {
		bridge.methods(this, dispatcher)
	})
	def.attached = fns.wrapFun(def.attached, function () {
		var id = ++cid
		this.$id = id
		refs[id] = this
		this._$ref = this.properties.ref || this.properties._ref
		this.triggerEvent('ing', {
			id: this.$id,
			type: 'attached'
		})
	})
	def.detached = fns.wrapFun(def.detached, function () {
		delete refs[this.$id]
		var $refs = this.$parent && this.$parent.$refs
		var refName = this._$ref
		if (refName && $refs) {
			delete $refs[refName]
		}
		this.$parent = null
	})
	def.properties = fns.extend({}, def.properties, {
    'ref': {
    	type: String,
      value: '',
      observer: function(next) {
      	/**
      	 * 支持动态 ref
      	 */
      	if (this._$ref !== next) {
					var $refs = this.$parent && this.$parent.$refs
					if ($refs) {
						let ref = $refs[this._$ref]
						delete $refs[this._$ref]
						this._$ref = next
						if (ref && next) {
							$refs[next]
						}
					}
      	}
      }
    },
	})
	def.methods = fns.extend({}, def.methods, {
		// 与旧的一致
		$globalData: function(){ 
			return getApp().globalData
		},

		$set: function () {
			return this.setData.apply(this, arguments)
		},
		$data: function () {
			return this.data
		},
		$emit: function () {
			if (!dispatcher) return
			return dispatcher.emit.apply(dispatcher, arguments)
		},
		$on: function () {
			if (!dispatcher) return function () {}
			return dispatcher.on.apply(dispatcher, arguments)
		},
		$off: function () {
			if (!dispatcher) return
			return dispatcher.off.apply(dispatcher, arguments)
		},
		$call: function (method) {
			var args = [].slice.call(arguments, 1)
			this.triggerEvent('ing', {
				id: this.$id,
				type: 'event:call',
				method,
				args
			})
		},
		/**
		 * 由父组件调用
		 */
		_$attached: function (parent) {
			this.$root = parent.$root || parent
			this.$parent = parent
		},
		$: bridge.mount
	})

	Component(def)
}
component.getRef = function (id) {
	return refs[id]
}
bridge.ref(component.getRef)
component.dispatcher = function (d) {
	dispatcher = d
}
Component.C = component
module.exports = component


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fns = __webpack_require__(0)
var message = __webpack_require__(3)
var redirector = __webpack_require__(4)
var cache = __webpack_require__(1)
var C = __webpack_require__(6)
var bridge = __webpack_require__(5)
var _conf = __webpack_require__(2)
var dispatcher = new message()
var hasPageLoaded = 0
var isAppLaunched = 0
var isAppShowed = 0
var hideTime = 0
var modules = {
	fns, redirector, cache, message, dispatcher,
	channel: bridge.channel
}
bridge.ref(C.getRef)
bridge.dispatcher(dispatcher)
C.dispatcher(dispatcher)
function WXBoot(name, option) {
	if (fns.type(name) == 'object') {
		option = name
		name = option.name || '_unknow'
	}
	// page internal message
	var emitter = new message()

	// extend page config
	var extendPageBefore = _conf.get('extendPageBefore')
	extendPageBefore && extendPageBefore(name, option, modules)

	// mixin component defs
	
	// C.use(option, option.comps, `Page[${name}]`, emitter)
	if (option.onNavigate){
		let onNavigateHandler = function (url, query) {
			option.onNavigate({url, query})
		}
		console.log(`Page[${name}] define "onNavigate".`)
		dispatcher.on('navigateTo:'+name, onNavigateHandler)
		dispatcher.on('redirectTo:'+name, onNavigateHandler)
		dispatcher.on('switchTab:'+name, onNavigateHandler)
		dispatcher.on('reLaunch:'+name, onNavigateHandler)
	}
	/**
	 * Preload lifecycle method
	 */
	if (option.onPreload){
		console.log(`Page[${name}] define "onPreload".`)
		dispatcher.on('preload:'+name, function (url, query) {
			option.onPreload({url, query})
		})
	}
	/**
	 * Instance props
	 */
	option.$state = {
		// 是否小程序被打开首页启动页面
		firstOpen: false
	}
	option.$emitter = emitter
	bridge.methods(option)

	/**
	 * Cross pages message methods
	 */
	option.$on = function () {
		return dispatcher.on.apply(dispatcher, arguments)
	}
	option.$emit = function () {
		return dispatcher.emit.apply(dispatcher, arguments)
	}
	option.$off = function () {
		return dispatcher.off.apply(dispatcher, arguments)
	}
	/**
	 * 父子通信枢纽模块
	 */
	option.$ = bridge.mount
	/**
	 * setData wrapper, for component setData with prefix
	 * @param {String} prefix prefix of component's data
	 * @param {Object} data
	 */
	option.$setData = function (prefix, data) {
		if (fns.type(prefix) == 'string') {
			var props = {}
			fns.objEach(data, function (k,v) {
				props[prefix + '.' + k] = v
			})
			
			return  wxUpdata(props,this)
			//back return this.setData(props) this.setData(objToPath(props))
		} else if (fns.type(prefix) == 'object') {
			return wxUpdata(prefix,this)
			//back return this.setData(prefix) this.setData(objToPath(prefix))
			
		}
	}
	/**
	 * AOP life-cycle methods hook
	 */
	option.onLoad = fns.wrapFun(option.onLoad, function() {
		// After onLoad, onAwake is valid if defined
		option.onAwake && message.on('app:sleep', (t) => {
			option.onAwake.call(this, t)
		})
		if (!hasPageLoaded) {
			hasPageLoaded = true

			let $state = this.$state
			$state.firstOpen = true
		}
	})
	option.onReady = fns.wrapFun(option.onReady, function () {
		redirector.emit('page:ready')
	})

	// call on launch
	if (option.onPageLaunch) {
		option.onPageLaunch()
	}
	if (option.onAppLaunch) {
		isAppLaunched ? option.onAppLaunch.apply(option, isAppLaunched) : dispatcher.on('app:launch', function (args) {
			option.onAppLaunch.apply(option, args)
		})
	}
	if (option.onAppShow) {
		isAppLaunched ? option.onAppShow.apply(option, isAppLaunched) : dispatcher.on('app:show', function (args) {
			option.onAppShow.apply(option, args)
		})
	}

	//back option增加this.upData this.Empty
	option.$upData = function(data){
		return wxUpdata(data,this);
	};
	option.Empty = Empty;
	option.$App = getApp();
	option.$globalData = function(){ 
		return option.$App.globalData;
	};
	option.$bindGlobalData = function(callback){ 	
			this.setData({
				globalData:JSON.parse(JSON.stringify(option.$globalData()))
			})
			observeGlobalData(option.$globalData(),this,callback);
	};
	option.$getStore = function(storeName){ 
		return option.$App[storeName] = option.$App[storeName]||{} ; 
	};
	option.$bindStore= function(storeName,callback){ 	
		option.$App[storeName] = option.$App[storeName]||{} ; 
			this.setData({
				[storeName]:JSON.parse(JSON.stringify(option.$App[storeName]))
			})
			observeByStoreName(storeName,option.$App[storeName],this,callback);
	};
	option.$bindPageStore= function(pageStore,callback){ 	
		
			this.setData(JSON.parse(JSON.stringify(pageStore)))
			observePageStore(pageStore,this,callback);
	};
	option.$bindFunction= function(functionName ,callback){ 	
			//动态生成 绑定方法方法
			bindFunction(functionName ,callback,this);
	};

	option.$bindApi= function(functionStore){ 
		bindApi(functionStore,this)
	};
	//绑定页面
	var pageApi = _conf.get('pageApi')
	pageApi &&	bindApi(pageApi,option)
	
	var constants = _conf.get('consts');
	constants &&	bindConstants(constants,option)

	

	// extend page config
	var extendPageAfter = _conf.get('extendPageAfter')
	extendPageAfter && extendPageAfter(name, option, modules)
	// register page
	Page(option)
	return option;
}
/**
 * 由重定向模块转发到页面内派发器
 */
bridge.redirectDelegate(redirector, dispatcher)
/**
 * Application wrapper
 */
function Application (option) {

	if (!option.config || !option.config.route || !option.config.route.length) {
		throw new Error('config.route is necessary !')
	}
	if (option.config) {
		WXBoot.config(option.config)
	}
	var ctx = option
	/**
	 * APP sleep logical
	 */
	option.onShow = option.onShow ? fns.wrapFun(option.onShow, appShowHandler) : appShowHandler
	option.onHide = option.onHide ? fns.wrapFun(option.onHide, appHideHandler) : appHideHandler
	option.onLaunch = option.onLaunch ? fns.wrapFun(option.onLaunch, appLaunchHandler) : appLaunchHandler
	option.onLaunch = fns.wrapFun(option.onLaunch, function () {
		ctx = this
	})
	if (option.onAwake) {
		message.on('app:sleep', function(t){
			option.onAwake.call(ctx, t)
		})
	}
	/**
	 * Use app config
	 */
	App(option)
}
function appLaunchHandler() {
	isAppLaunched = [].slice.call(arguments)
	message.emit('app:launch', isAppLaunched)
}
function appShowHandler () {
	try {
		if (!isAppShowed) {
			// call onAppShow only once
			isAppShowed = [].slice.call(arguments)
			message.emit('app:show', isAppShowed)
		}
	} finally {
		if (!hideTime) return
		var t = hideTime
		hideTime = 0
		message.emit('app:sleep', new Date() - t)
	}
}
function appHideHandler() {
	hideTime = new Date()
}

Page.P = WXBoot
Page.C = Component.C = WXBoot.C = WXBoot.Comp = WXBoot.Component = C
Page.A = App.A = WXBoot.A = WXBoot.App = WXBoot.Application = Application
WXBoot.redirector = redirector
WXBoot.message = message
WXBoot.cache = cache
WXBoot.fns = fns
WXBoot.getPageName = bridge.getPageName

/**
 * Config handler
 */

WXBoot.config = function (key, value) {
	if (fns.type(key) == 'object') {
		fns.objEach(key, function (k, v) {
			_conf.set(k, v)
		})
	} else {
		_conf.set(key, value)
	}
	return this
}
message.assign(WXBoot)
message.assign(C)
message.assign(Application)
module.exports = WXBoot


/***/ })
/******/ ]);



function observeGlobalData(globalData, _self,callback) {
	const oba = getObaa(globalData,null,_self,callback)
		//动态生成 添加新属性方法
		if (!_self.$setGlobalData) {
			_self.$setGlobalData= function ( prop, val) {
				obaa.set(globalData, prop, val, oba)
			}
		}
}


function observeByStoreName(storeName,store, _self,callback) {
	const oba = getObaa(store,storeName,_self,callback)
	//动态生成 添加新属性方法
  if (!_self['$setBind'+storeName.substring(0, 1).toUpperCase() + storeName.substring(1)]) {
    _self['$setBind'+storeName.substring(0, 1).toUpperCase() + storeName.substring(1)] = function ( prop, val) {
      obaa.set(store, prop, val, oba)
    }
  }
}

function observePageStore(pageStore, _self,callback) {
  const oba = getObaa(pageStore,null,_self,callback)
	//动态生成 添加新属性方法
	if (!_self.$setPageStore) {
		_self.$setPageStore= function ( prop, val) {
			obaa.set(pageStore, prop, val, oba)
		}
	}

}
function getObaa(store,storeName,_self,callback){
	const oba = obaa(store, (prop, value, old, path) => {
    let patch = {}
    if (prop.indexOf('Array-push') === 0) {
      let dl = value.length - old.length
      for (let i = 0; i < dl; i++) {
        patch[fixPath(path + '-' + (old.length + i))] = value[(old.length + i)]
      }
    } else if (prop.indexOf('Array-') === 0) {
      patch[fixPath(path)] = value
    } else {
      patch[fixPath(path + '-' + prop)] = value
		}
		if(storeName){
		_self.$setData(storeName,patch)
		} else {
		_self.$setData(patch)
		}
		//回调函数
		if(Object.prototype.toString.call(callback)=="[object Function]"){
		callback(patch);
		}
	})	
	return oba;
}

function bindFunction(functionName ,callback,_self){ 	
	//动态生成 绑定方法方法
	if (!_self[functionName]) {
		_self[functionName]= callback
		console.log(functionName+"方法绑定成功")
	} else {
	console.log("绑定失败 该方法已存在。")
	}
};


function bindApi(functionStore,_self){ 	
	if(Object.prototype.toString.call(functionStore)!="[object Object]"){
		console.log("functionStore 格式错误");
		return;
	}
	for (const functionName in functionStore) {
		if (functionStore.hasOwnProperty(functionName)) {
			const callback = functionStore[functionName];
				//动态生成 绑定方法方法
				bindFunction(functionName ,callback,_self);
		}
	}		
};

function bindConstants(constants,_self){ 	
	if(Object.prototype.toString.call(constants)!="[object Object]"){
		console.log("constants 格式错误");
		return;
	}
	_self.$consts=constants;
	for (const constantName in constants) {
		if (constants.hasOwnProperty(constantName)) {
			const constantValue = constants[constantName];
				//动态生成 绑定方法方法
				_self['$con'+constantName.substring(0, 1).toUpperCase() + constantName.substring(1)]=constantValue;
		}
	}		
};

	/**
	 * wx-updata配置(Page, config)
	 * config 配置
   * 配置参数 { debug: true }，会将路径化后的 data 打印出来，帮助用户进行调试，默认 false 不开启；
   * 配置参数 { arrObjPath: true }，会开启数组的对象路径方式功能，默认 false 不开启；
   * 配置参数 { arrCover: true }，数组会直接覆盖，而不会只修改数组的某几项，默认 false 不开启（设置 true，*arrObjPath 会失效）
	 */
function wxUpdata(data,self,config={
	arrCover:true
}) {
	return self.setData(objToPath(data,config));
}