'use strict'

var fns = require('./wxpage/fns.js')
var message = require('./wxpage/message')
var redirector = require('./wxpage/redirector')
var cache = require('./wxpage/cache')
var C = require('./wxpage/component')
var bridge = require('./wxpage/bridge')
var _conf = require('./wxpage/conf')

var { Empty,objToPath } = require( './wxupdata/index')
var obaa = require( './obaa/obaa')
var { getPath, needUpdate, fixPath, getUsing } = require( './obaa/path')
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

  // make $name options work
  option.$name = name;

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
	//wxboot
	option.$setData = function (prefix, data) {
		if (fns.type(prefix) == 'string') {
			var props = {}
			fns.objEach(data, function (k,v) {
				props[prefix + '.' + k] = v
			})
			
			return  wxUpdata(props,this)
			//wxpage return this.setData(props) this.setData(objToPath(props))
		} else if (fns.type(prefix) == 'object') {
			return wxUpdata(prefix,this)
			//wxpage return this.setData(prefix) this.setData(objToPath(prefix))
			
		}
	}
	/**
	 * AOP life-cycle methods hook
	 */
	option.onLoad = fns.wrapFun(option.onLoad, function() {
		//wxboot 初始化db()
		Object.prototype.toString.call(this.$db)=="[object Function]"&&this.$db();
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
	option.$upData =  function(data, func) {
		const result = objToPath(data, { arrObjPath: false, arrCover:false })
		return this.setData(result, func)
}
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
	var initCloud = _conf.get('initCloud');
	if(initCloud){
	option.$db = function(){
	
		if(!this.db){
		const db = this.cloud.database();
		this.db = db;
		} 
		return this.db
		
		
	};
	option.cloud = wx.cloud;
	//初始化db
	option.db = null;
	option.collectionList = {};
	option.$getOpenid = option.$App["$getOpenid"]
	}

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
	//wxboot初始化云函数
	if( option.config.initCloud){
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力')
		} else {
			wx.cloud.init(option.config.initCloud)	
		}
	}
	/**
	 * APP sleep logical
	 */
	option.onShow = option.onShow ? fns.wrapFun(option.onShow, appShowHandler) : appShowHandler
	option.onHide = option.onHide ? fns.wrapFun(option.onHide, appHideHandler) : appHideHandler
	option.onLaunch = option.onLaunch ? fns.wrapFun(option.onLaunch, appLaunchHandler) : appLaunchHandler
	option.onLaunch = fns.wrapFun(option.onLaunch, function () {
		//wxboot
		if( this.config.initCloud){
		
			this.$getOpenid = async function(){
				if(this.openid){
				return this.openid;
			} else if(wx.getStorageSync('openid')){
				this.openid = wx.getStorageSync('openid');
				return this.openid;
			}else{return await	wx.cloud.callFunction({
				name:"getWXContext"
			}).then(res=>{
				console.log(res)
				this.openid = res.result.openid;
				wx.setStorageSync('openid', this.openid)
				return this.openid;
			}).catch(err=>{
				console.error(err)
			})}}
			this.$getOpenid();
		 }
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
		//console.log(functionName+"方法绑定成功")
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
module.exports = WXBoot
