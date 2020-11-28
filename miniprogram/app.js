//app.js
// const {WXBoot} = require('wxbootstart');
const WXBoot = require('./lib/wxboot');
import utils from "./utils/utils"
import constants from "./constants/constants"
WXBoot.A({
  config: {
    route: '/pages/$page/$page',
    pageApi: utils,
    consts: constants
  },
  onLaunch: function (opts) {

    WXBoot.on('some_message', function (msg) {
      console.log('Receive message:', msg)
    })
    console.log('APP is Running', opts)

    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     // env 参数说明：
    //     //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //     //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //     //   如不填则使用默认环境（第一个创建的环境）
    //     env: '',
    //     traceUser: true,
    //   })
    // }


  },
  store: {
    id: 0
  },
  globalData: {
    version: "v1.0.0",
    id: 0,
    userInfo: null,
    addressInfo: null,
    sessionKey: null,
    loginTime: 0,
    openid: "",
    theme: {
      color: "#FFFFFF"
    },
    share: {
      title: "开启一天好运",
      imageUrl: "https://XXX.jpg",
      path: "/pages/index/index"
    },
    settings: null
  },

  onAwake: function (time) {
    console.log('onAwake, after', time, 'ms')
  },
  onShow: function () {
    console.log('App onShow')
  },
  /*小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '有新版本',
        content: '新版本已经准备好，即将重启',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  "navigateToMiniProgramAppIdList": [
    "wx8abaf00ee8c3202e"

  ]
})