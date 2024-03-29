// miniprogram/pages/index/index.js
import api from "../../utils/promiseUtils"
import login from "../../login/login"
var pageData={
  id:2
}

Page.P('in',{

  /**
   * 页面的初始数据
   */
  data: {
    name: '蜡笔小新',
    info: { height: 140, color: '黄色' },
    desc: [{ age: 8 }, '靓仔'],
    family: [{ num: 4 }, '四口之家', [{ dad: '野原广治' }, { mum: '美伢' }, { son: '蜡笔小新' }, { dog: '小白', color: '白色' }]],
    
},
mixins:[login,Page.P.Options],
  onPageLaunch:function(){
    console.log(" index onPageLaunch")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(await this.$getOpenid())
    console.log(this.$curPageName())
    console.log(this.$name)
    console.log(await this.$getOpenid())
    console.log(await this.$add("article",{auth:"{openid}"}))
    const  db = this.$collection("article");
   console.log(this.$collectionList)
  
   const  db2 = this.$collection("article")
  console.log(await this.$get("article","6127fe145fc23579007fb63e1c15f221"))
  console.log(await this.$update("article","6127fe145fc23579007fb63e1c15f221",{name:1}))
  console.log(await this.$get("article",{
    where:{_openid:"{openid}"},
    order:[{name:"name",value:"desc"}]
  }))
  console.log(await this.$update("article",
  {auth:"{openid}"},{name:10}))
    console.log(this.$consts);
    console.log(this.$conUsername);
    this.$bindFunction("test",function (e) {
      console.log(e)
    })
    this.test("test cessss")
    this.$setData({
      list:[1,2,3,4,5]
    })
   
   
    this.$setData({
      list:[,,1]
    })
  
console.log(api)
    //  this.$bindApi(api)
   
    
    console.log(this.Empty);
    console.log(this.$globalData());
   this.$globalData().loginTime=1;
    console.log(this.$globalData());
    
  
    
    // this.$preload("rn?id=1")
    this.$preload("i?id=1")
    this.$preload("/pages/test/test?id=1")
    console.log(this.$refs)
    

    setTimeout(function () {
			Page.P.emit('some_message', 'I am index!')
    }, 100)
    
    		// cache test
		// console.log('[Step 1] cache get', this.$cache.get('cache'))
		// console.log('[Step 2] cache set "cache"')
		this.$cache.set('cache', {name: 'wxpage'})
		// console.log('[Step 3] cache get', this.$cache.get('cache'))

		// session test
		// console.log('[Step 1] session get', this.$session.get('session'))
		// console.log('[Step 2] session set "session"')
		this.$session.set('session', {name: 'wxpage'})
		// console.log('[Step 3] session get', this.$session.get('session'))
  },

  timeFastForward() {
    // noinspection JSConsecutiveCommasInArrayLiteral
    let start  = +new Date();
    this.$upData({
        info: { height: 155 },
        desc: [{ age: 13 }, '帅哥'],
        family: [this.Empty, this.Empty, [this.Empty, this.Empty, this.Empty, { color: '灰色' }]]
    })
  
 

   
},
changeId(){
  pageData.id= this.randomNum();
  this.$getStore("store").id= this.randomNum();
  // this.setData({
  //   globalData:this.store.globalData
  // })
 
  
},
routePa(){
  this.$route("/packageA/index/index")
},
/**
 * 生成随机数
 * @param start
 * @param span
 * @return {number}
 */
randomNum(start = 0, span = 10) {
    return Math.floor(Math.random() * (span + 1)) + start
},

/**
 * 随机穿梭
 */
timeRandom() {
    // noinspection JSConsecutiveCommasInArrayLiteral
    let start  = +new Date();
    for (let index = 0; index < 1000; index++) {
        this.$setData({
            info: { height: this.randomNum(100, 70) },
            desc: [{ age: this.randomNum(0, 50) },
                ['帅哥', '靓仔', '衰仔', '婴儿', '油腻大叔'][this.randomNum(0, 4)]],
            family: [, ['四口之家', '快乐之家', '幸福之家'][this.randomNum(0, 2)], [,this.Empty , , {
                color:
                  ['灰色', '白色', '黑色', '蓝色', '红色'][this.randomNum(0, 4)]
            }]]
        })
        
    }
        
    let end = +new Date();
 
    console.log(end-start)
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // route: function () {
  //   this.$route("/packageA/index/index")
  //  // this.$route("/pages/test/index")
  
  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    // if(await this.canUseXXX()){
    //   console.log("confirm")
    // }else{
    //   console.log("confirmno")
    // }
    this.$preload("pindex");
    console.log(this.$globalData());
    this.$bindPageStore(pageData)
    
    this.$bindStore("store",function(e){
      console.log(e)
    });
    //   this.$bindStore("store",function(e){
    //   console.log(e)
    // });
    // this.$setBindStore("ip",1);
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

  },
  callFromComponent: function (name) {
		console.log('!!! call from component:', name)
	},
})