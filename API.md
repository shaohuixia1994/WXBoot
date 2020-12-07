# WXBoot

**WXBoot**是一个轻量级的小程序框架，主要目的让开发者快速启动一个小程序项目，注重专注业务，降低技术难度，从而节省人力成本，缩短项目周期，提高软件安全质量。同时对小程序端从多个方面进行优化。与腾讯云开发友好。项目主要基于WXPage开发，整合wx-updata、obaa等优秀开源框架。

[TOC]

# 云开发方法工具封装

## 1.云开发初始化



```js
APP.js
require('./lib/wxboot');//常规安装
require('wxbootstart');//npm 安装
App.A({
    config:{
        route:'/pages/$page/$page', //必须指定路由。使用路由方法用
        pageApi:api,//页面挂载方法,挂载后可以直接用this调用
        consts:constants,//页面全局常量参数
         initCloud:{ 
             // env: '',
           traceUser: true,},//初始化云开发参数
    }，
    getOpenidFunc: function(){
    return this.cloud.callFunction({
      name:"getWXContext"
    }).then(res=>{
      return  res.result.openid;
    }).catch(err=>{ 
      console.error(err)
      return ""
    })
  },// 云开发获取openid必须函数 getOpenidFunc
})

```

## 2.全局方法



```js
this.$getOpenid();//app.js 和 page.js可用 //async函数 优先：内存>缓存>云函数(需创建默认函数getWXContext)
this.$db() 或 this.db 均可以取到当前页面唯一 wx.cloud.database()实例
this.$collection("collectionName") 当前页面数据表对应的唯一实例
```

## 3.云函数插件（utils/cloudUtils.js）

页面挂载参见config

```js
page.js async函数
对返回结果 异常进行细节处理
this.$callFun(options) //相当于wx.cloud.callFunction(options)
this.$add(collectionName, data, openParse = false)
this.$get(collectionName, query, openParse = false) 
this.$count(collectionName, query, openParse = false)
this.$update(collectionName, query, updata, openParse = false) 
this.$remove(collectionName, query, openParse = false)
query为字符串的时候为doc 为object时为参数对象 openParse=true 可用‘{openid}’替换真实openid
```



# 一、快速启动

## 1.将lib文件夹放到小程序项目同层目录下

### 1）常规安装（仅21KB）

```js
lib/
   wxboot.js
pages/
```

### 2）npm安装

```
npm init
npm i wxbootstart
```



## 2.引入并挂载

### 1）程序引入

```js
require('./lib/wxboot');//常规安装
require('wxbootstart');//npm 安装
//将App({})修改为
App.A({
    config:{
        route:'/pages/$page/$page' //必须指定路由。使用路由方法用
    }
})
```

### 2）页面引入

```js
Page.P({

});

Page.P('{PNAME}',{
	onPreload(res){
  	 ... 
	}
});
//{PNAME} 预加载用
```

### 3）组件引入

```js
Component.C({

});
```

# 二、程序配置（app.js）

## 1.config

```js
const WXBoot = require('./lib/wxboot');
import api from "./utils/api";
import constants from "./constants/constants"
//将App({})修改为
App.A({
    config:{
        route:'/pages/$page/$page', //必须指定路由。使用路由方法用
        pageApi:api,//页面挂载方法,挂载后可以直接用this调用
        consts:constants,//页面全局常量参数
         initCloud:{ 
             // env: '',
           traceUser: true,},//初始化云开发参数
    }
})

//api.js
module.exports = {
  warn() {
    console.log("warn")
  },
  error() {
    console.log("error")
  },
}
```

## 2.全局数据仓库

```js
import settings from "./store/settings
App.A({
  globalData: {
    id:0,
    userInfo: null,
    addressInfo: null,
    sessionKey: null,
    loginTime: 0,
    openid: "",
    isLogin:false
  },
  store:{
    ...  
  },
  settings:settings
  //使用全局仓库需要在app.js对数据进行初始化。可以通过引入js的方式导入    
})
```

## 3.全局常量仓库

```js
import constants from "./constants/constants"
App.A({
  config:{
        route:'/pages/$page/$page', //必须指定路由。使用路由方法用
        consts:constants 
    }
})
  //页面使用
  //constants对象
  this.$consts //constants
  //动态生成
  this.$conUsername //constants.username 
```

##4.混入模式（mixins） 

混入方法，先执行 数据依次覆盖，方法依次执行（支持生命周期方法）

```js
import login from "./login/login"
//全局混入
App.A({
  config:{
        route:'/pages/$page/$page', //必须指定路由。使用路由方法用
        mixins:[login,App.A.Options] //App.A.Options为页面混合后当前Options
    }
})
//页面混入

Page.P({
  
  mixins:[login,Page.P.Options] //Page.P.Options为混合前当前Options
   
})
```



# 三、页面方法

## 1.存储

- **$cache**

  本地缓存的封装, 方法如下：

  - ```
    set(key, value[, expire][, cb])
    ```

     

    如果传

     

    ```
    cb
    ```

     

    参数，会使用异步模式并回调，否则直接同步返回结果。

    - `value` 缓存数据，可以为对象
    - `expire` 缓存过期时间，单位为毫秒。如果为 `true` ，那么保持已存在的缓存时间，如果没有缓存，那么认为过期，不保存。
    - `cb` 可选，异步写的时候回调，接收参数：cb(err), err不为空代表失败。

  - ```
    get(key[, cb])
    ```

     

    如果传

     

    ```
    cb
    ```

     

    参数，会使用异步模式并回调

    - `cb` 可选，异步读的时候回调，接收参数：cb(err, data), err不为空代表失败。

  - ```
    remove(key[, cb])
    ```

     

    如果传

     

    ```
    cb
    ```

     

    参数，会使用异步模式并回调 (

    ```
    since v1.1.9
    ```

    )

    - `cb` 可选，异步删除的时候回调，接收参数：cb(err, data), err不为空代表失败。

  ```js
  Page.P({
    onLoad: function () {
      // 同步写
      this.$cache.set('page_data', {
          name: '首页'
      })
      // 异步写
      this.$cache.set('page_data_another', {
          name: '首页'
      }, function (err) {
        // success or fail
      })
      var data = this.$cache.set('page_data') // {name : '首页'}
      // 异步读
      this.$cache.get('page_data', function (err, data) {
        // success or fail
        if (err) {
          console.log('Get data error', err)
        } else {
          console.log('Get data success', data)
        }
      })
      // 设定缓存时间，例如：1000 毫秒
      this.$cache.set('page_data', {
          name: '首页'
      }, 1000)
      setTimeout(()=> {
        // 保持上次缓存时间: 1000-200毫秒
        this.$cache.set('page_data', {
            name: '首页'
        }, true)
      }, 200)
    }
  });
  ```

- **$session**

  使用本地缓存实现的session, 小程序退出后session会消失，`适用于大数据对象的临时存储` 方法如下：

  - `set(key, value[, cb])` 如果传 `cb` 参数，会使用异步模式并回调
  - `get(key[, cb])` 如果传 `cb` 参数，会使用异步模式并回调
  - `remove(key[, cb])` 如果传 `cb` 参数，会使用异步模式并回调

  ```
  Page({
    onLoad: function () {
      this.$session.set('page_session_data', {
          name: '首页'
      })
    }
  });
  ```

- **$put**(id, value)

  指定 `id` 存在一份数据，可以为任何类型，以供其它逻辑获取使用

- **$take**(id)

  根据 `id` 获取数据，数据只能被存在一次，获取一次。如果只存放一次，第二次获取 会得到 null 。

  示例：

  ```js
  this.$put('play:prefetch', new Promise(function (resolve, reject) {
    wx.request(url, function (err, data) {
      resolve(data)
    })
  }));
  this.$take('play:prefetch').then(function (data) {
    // get data
  });
  this.$take('play:prefetch'); // => null
  ```

## 2.数据绑定

### 1)绑定单页面数据中心

page.js

```js
var pageData = {
    pageDataId:0,
    pageDataName:'页面方法'
}
Page.P({
  //数据绑定放在onShow生命周期中
  onShow: function () {
    /**1.绑定页面数据,回调函数e为变化的键值对，绑定后data对应关系：
    *data:{
    *	pageDataId:0,
    *	pageDataName:'页面方法'
    *}
    */
     
    this.$bindPageStore(pageData,function(e){
        console.log(e)
    })  
  }
  //页面数据改变
  pageData.id=1;//全局数据{storeName}  
 //数据绑定后动态生成的set新属性绑定的方法 prop 属性名 val 值
  this.$setPageStore( prop, val);
});
```

### 2)绑定全局数据中心

page.js

```js
Page.P({
  //数据绑定放在onShow生命周期中
  onShow: function () {   
   /**1.绑定全局数据,回调函数e为变化的键值对,{storeName}替换为在app.js的数据名，如"globalData","store","settings
    *data:{
    *	"{storeName}":{
    *	...
    *	id:0//具体内容有app.js初始化决定
    *}
    *}
    */
    this.$bindStore("{storeName}",function(e){
        console.log(e)
    })  
    //绑定app globalData
    this.$bindGlobalData(function(e){
        console.log(e)
    })  
  }
  //全局数据改变
  this.$getStore("{storeName}").id=1;//全局数据{storeName}
  this.$globalData.id=1;//全局数据globalData   
  //数据绑定后动态生成的set新属性绑定的方法  prop 属性名 val 值
  this.$setGlobalData( prop, val);
  this.$setBind"{StoreName}"( prop, val);//驼峰命名 {storeName}首字母大写
});
```

## 3.页面方法挂载（全局挂载参考 程序配置）

```js
import api from "./utils/api"
Page.P({
  //数据绑定放在onShow生命周期中
  onLoad: function () {   
   /**1.绑定全局数据,回调函数e为变化的键值对,{storeName}替换为在app.js的数据名，如"globalData","store","settings
    *data:{
    *	"{storeName}":{
    *	...
    *	id:0//具体内容有app.js初始化决定
    *}
    *}
    */
    this.$bindFunction("{functionName}",function(e){
        console.log(e)
    })  
    //绑定app globalData
    this.$bindApi(api)
    //方法调用,支持参数
    this.{functionName}();
    this.warn();
    this.error();
  }
});
//api.js
module.exports = {
  warn() {
    console.log("warn")
  },
  error() {
    console.log("error")
  },
}
```

# 四、页面通信

```js
/**挂载在 message 实例上
*app.js 中 App.A 
*page.js 中 Page.P
*component.js 中 Component.C
*以下统一用{message}代替
*/
```

- {message}.**on**(key<`String`>, handler<`Function`>)

  监听APP与页面间的消息

- {message}.**emit**(key<`String`>, message<`任意`>)

  监听APP与页面间的消息

- {message}.**off**(key<`String`>, handler<`Function`>)

  取消监听APP与页面间的消息

```js
{message}.on('some_message', function (msg) {
      console.log('Receive message:', msg)
})
{message}.emit('some_message', 'it is a message')
{message}.off('some_message', function () {
      console.log('off some_message')
})
```

# 五、页面优化

## 1.整合wx-updata

> [wx-updata](https://github.com/SHERlocked93/wx-updata)
>
> //page页面使用 

**$setData**([prefix<`String`>, ]obj) //数组覆盖

指定 `prefix` 的时候可以为data的每一个项添加访问路径前缀。不传相当于 **setData(obj)**

**$upData**(obj,prefix,store,config)

参见wx-updata

**Empty** 

this.Empty

```js
 this.$upData({
        info: { height: 155 },
        desc: [{ age: 13 }, '帅哥'],
        family: [this.Empty, , [this.Empty, this.Empty, this.Empty, { color: '灰色' }]]
    })
```

## 2.预加载

**onPreload(res)**

调用 this.**$preload**('{PNAME}') 的时候触发，此时对应的页面并未被加载，`res`:

```
{
  url: '', //完整的来源url
  query: {} //url上解析出来的查询参数
}
```

```js
Page.P('{PNAME}',{
	onPreload(res){
  	 ... 
	}
});
//其他页面调用
    this.$preload('{PNAME}');
//一般结合数据存储实现数据预拉取
```

# 六、其他页面方法和生命周期

#### 程序-生命周期

- **onAwake**(time`<Number>`)

  小程序进入后台模式后再激活的时候触发。`time`是耗时。

### 组件

基于小程序原生组件方案的扩展，提供了父-子组件间的关系引用，一些实用的实例方法等

#### 组件-定义

- 构造方法、配置声明

{COMPONENT}.js

```js
Component.C({
  data: {},
  attached: function () {
    /**
     * this.$root
     * this.$parent
     */
  }
});
```

{COMPONENT}.json

```json
{
  "component": true
}
```

- 使用

{PAGE}.json

```json
{
  "usingComponents": {
    "{COMPONENT}": "/comps/{COMPONENT}/{COMPONENT}"
  }
}
```

{PAGE}.wxml

```html
<custom-component binding="$" />
```

#### 组件-实例方法

- **$set**({...})

  同 **this.setData({...})**

- **$data**()

  获取当前组件的 `data` 对象，同 `this.data`

- **$curPage**()

  获取当前页面实例。取 **getCurrentPages** 的最后一个项。

- **$curPageName**()

  获取当前页面实例对应的页面名。根据[A.config.route](https://github.com/tvfe/wxpage#-a扩展的配置config) 的配置解析当前页面实例的route。

  > Notice: 由于基础库1.2.0以下不支持 Page.prototype.route，故不兼容场景只能取到空字符串

- **$on**(key, handler)

  监听跨页面间的消息

- **$emit**(key, data)

  派发页面间的消息

- **$off**(key, handler)

  取消监听消息

- **$call**(method, arg1, arg2[, ...])

  通过消息的方式调用父组件方法，方法不存在也不会报错

- **$route**(pagename[, config]) => 别名 **$navigate**

  wx.`navigateTo`的封装。跳转到指定页面，pagename 可以带上 `queryString`, 例如

  ```js
  this.$route('play?vid=xxx&cid=xxx');
  ```

- **$redirect**(pagename[, config])

  wx.`redirectTo`的封装。跳转到指定页面, **替换页面，不产生历史**，pagename 可以带上 `queryString`, 例如

  ```js
  this.$redirect('play?vid=xxx&cid=xxx');
  ```

- **$switch**(pagename[, config])

  wx.`switchTab`的封装。

- **$launch**(pagename[, config])

  wx.`reLaunch`的封装。

- **$back**([delta])

  wx.`navigateBack`的封装。

  ```
  this.$back();
  ```

- **$bindRoute**()

> 同页面

- **$bindRedirect**()

  同 **$bindRoute**, 绑定 `$onRedirect`

- **$bindSwitch**()

  同 **$bindRoute**, 绑定 `$onSwitch`

- **$on**(key, handler)

  监听跨页面间的消息

- **$emit**(key, data)

  派发页面间的消息。

- **$off**(key, handler)

  取消监听消息


#### 组件-实例属性

- **$root**

当前组件所属的页面组件实例 只在 `attached`, `ready`生命周期后生效

- **$parent**

在组件内获取父组件实例引用

```js
Component.C({
  attached: function () {
    this.$parent.data // 父组件
    this.$root.data   // 根组件，可能是父组件
  }
});
```

- **$refs**

  指定了 `ref` 的子组件实例Map，在父组件获取子组件引用：

```js
<custom-component binding="$" ref="customComp"/>
Page.P({
  onLoad: function () {
    this.$refs.customComp // 根据ref属性获取子组件的实例引用
  }
});
```


- **$emitter**

  页面内的消息模块，作用于当前页面实例与及引用的子组件实例，方法：

  - `on` 监听
  - `emit` 派发
  - `off` 取消监听

- **$refs**

  指定了 `ref` 的子组件实例Map

#### 页面-生命周期

- **onPageLaunch()**

  小程序第一次运行的时候调用，此时对应的页面并未被加载。

- **onAppLaunch(opts)**

  App.onLaunch 触发时调用。 opts:

  - `path` String 打开小程序的路径
  - `query` Object 打开小程序的query
  - `scene` Number 打开小程序的场景值

- **onAppShow(opts)**

  App.onShow 第一次触发时调用。只会触发一次，需要多次调用的请使用原生的 App.onShow opts:

  - `path` String 打开小程序的路径
  - `query` Object 打开小程序的query
  - `scene` Number 打开小程序的场景值

- **onAwake(time`<Number>`)**

  小程序进入后台模式后再激活的时候触发。`time`是耗时。

- **onPreload(res)**

  使用url时候{'PNAME'}和页面全路径须符合路由转换

  ```js
  /**如页面全路径 /pages/index/index 
  *  PNAME index  
  *  config.route  /pages/$page/$page
  */
  ```

  调用 this.**$preload**({'PNAME'}) 的时候触发，此时对应的页面并未被加载，`res`:

  ```
  {
    url: '', //{'PNAME'}
    query: {} //url上解析出来的查询参数
  }
  ```

- **onNavigate(res)**

  使用时候{'PNAME'}和页面全路径须符合路由转换

  ```js
  /**如页面全路径 /pages/index/index 
  *  PNAME index  
  *  config.route  /pages/$page/$page
  */
  ```

  页面间跳转开始时调用，此时对应的页面并未被加载，`res`:

  ```
  {
    url: '', //完整的来源url
    query: {} //url上解析出来的查询参数
  }
  ```

#### 页面-实例方法

- **$setData**([prefix<`String`>, ]obj)

  指定 `prefix` 的时候可以为data的每一个项添加访问路径前缀。不传相当于 **setData(obj)**

- **$curPage**()

  获取当前页面实例。取 **getCurrentPages** 的最后一个项。

- **$curPageName**()

  获取当前页面实例对应的页面名。根据[A.config.route](https://github.com/tvfe/wxpage#-a扩展的配置config) 的配置解析当前页面实例的route。

  > Notice: 由于基础库1.2.0以下不支持 Page.prototype.route，故不兼容场景只能取到空字符串

- **$route**(pagename[, config]) => 别名 **$navigate**

  wx.`navigateTo`的封装。跳转到指定页面，pagename 可以带上 `queryString`, 例如

  ```js
  this.$route('play?vid=xxx&cid=xxx');
  ```

- **$redirect**(pagename[, config])

  wx.`redirectTo`的封装。跳转到指定页面, **替换页面，不产生历史**，pagename 可以带上 `queryString`, 例如

  ```js
  this.$redirect('play?vid=xxx&cid=xxx');
  ```

- **$switch**(pagename[, config])

  wx.`switchTab`的封装。

- **$launch**(pagename[, config])

  wx.`reLaunch`的封装。

- **$back**([delta])

  wx.`navigateBack`的封装。

  ```js
  this.$back();
  ```

- **$preload**(pagename)

  提前预加载指定页面（会触发对应页面的`onPreload`声明周期）

  ```js
  this.$preload('play?vid=xxx&cid=xxx');
  ```

- **$bindRoute**()

  点击代理方法，绑定 `$onRoute` 逻辑，在元素上声明 `data-url` 作为跳转地址，支持切面方法：

  - `data-before` 跳转前执行
  - `data-after` 跳转后执行

  示例：

  ```js
  <button
    bindtap="$bindRoute"
    data-url="/pages/play"
    data-before="onClickBefore"
  >click redirect</button>
  ```

- **$bindRedirect**()

  同 **$bindRoute**, 绑定 `$onRedirect`

- **$bindSwitch**()

  同 **$bindRoute**, 绑定 `$onSwitch`

- **$on**(key, handler)

  监听跨页面间的消息

- **$emit**(key, data)

  派发页面间的消息。

- **$off**(key, handler)

  取消监听消息

> 有问题可直接联系QQ：1656924707