// packageA/index/index.

Page.P("pindex",{
  onPreload:function(res){
    console.log(res)
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  changeId(){
   
    this.$getStore("store").id= this.randomNum();
    // this.setData({
    //   globalData:this.store.globalData
    // })
    
    
  },
  randomNum(start = 0, span = 10) {
    return Math.floor(Math.random() * (span + 1)) + start
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if(await this.canUseXXX()){
      console.log("confirm")
    }else{
      console.log("confirmno")
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.$bindStore("store")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})