# WXBoot

**WXBoot**是一个轻量级的小程序框架，主要目的让开发者快速启动一个小程序项目，注重专注业务，降低技术难度，从而节省人力成本，缩短项目周期，提高软件安全质量。同时对小程序端从多个方面进行优化。与腾讯云开发友好。项目主要基于WXPage开发，整合wx-updata、obaa等优秀开源框架。



[**✨ API说明文档**](./API.md)

# 一、框架定位

## 1.提高开发效率

> 1）引入方便，支持npm引入和本地代码引入两种方式，全局只需要在app.js引入即可
>
> 2）支持全局、页面挂载工具方法，挂载方法支持bindtap
>
> 3）支持对全局数据，页面数据的响应式（数据可以分类）
>
> 4）提供全局消息策略，缓存方法等
>
> 5）支持全局、页面混入模式，混入组件有自己的页面逻辑和生命周期
>
> 6）提供预加载生命周期，可以在页面未实例化时拉取数据，结合缓存方法实现性能分层

## 2.优化程序性能

> 1）整合wx-updata 对数据进行差量修改
>
> 2）全局和页面数据中心，数据统一优化，架构层面对数据减少硬编码
>
> 3）提供预加载生命周期，可以在页面未实例化时拉取数据，结合缓存方法实现性能分层
>
> 4）整合云开发对cloud实例和collection实例，openid等进行单例优化

## 3.支持插件模式

#### 以整合云开发为例

[**cloudUtils.js**](./miniprogram/utils/cloudUtils.js)

```js
//和在整合中用this来使用框架方法
对count，add，get，update，remove进一步封装
比如 get(collectionName, query, openParse = false) 异常处理，根据query字符串为doc（id），对象为 
let {  where, order, skip, limit, field, pageIndex } = query; 使用起来更加灵活，安全高效
openParse=true 可用‘{openid}’替换真实openid
module.exports = {
  collection: collection,
  callFun: callFunction,
  $add: add,
  $get: get,
  $update: update,
  $remove: remove,
  $count:count
}
```

> 只需在app.js进行api绑定

## 4.云开发相关

> 1）全局cloud管理，可进一步支持tcb，其他资源的cloud实例等
>
> 2）openid全局管理，内存>缓存>云函数
>
> 3）db和collection单例模式，优化内存

## 5.To-Do

> 1）开发对应vscode插件，细化API文档
>
> 2）提供更多云开发工具插件，如云开发上传图片，登录模块，表单系统，统一权限管理，丰富样式MarkDown
>
> 3）支持uniapp，轻松实现APP，小程序，H5使用云开发

