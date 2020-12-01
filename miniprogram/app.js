//app.js
// const {WXBoot} = require('wxbootstart');


const WXBoot = require('./lib/wxboot');
console.log(WXBoot)
import utils from "./utils/utils"
import constants from "./constants/constants"
App.A({
  config: {
    initCloud:{ 
      // env: '',
    traceUser: true,},
    route: '/pages/$page/$page',
    pageApi: utils,
    consts: constants,
    updata:{
      arrObjPath:false,
      arrCover:false
    }

  },
  onLaunch: function (opts) {

    App.A.on('some_message', function (msg) {
      console.log('Receive message:', msg)
    })
    console.log('APP is Running', opts)

    
    

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