//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    disabled:true,
    start:false,
    stop:false,
    restart:false,
    timerId:undefined,
    marginTop:30,
    marginTop2: 0,
    listHeight:0,
    admin:1,//管理人员
    loginlist:[
      {
        name:'1',
        prizeNumber:111111
      },
      {
        name: '2',
        prizeNumber: 222222
      },
      {
        name: '3',
        prizeNumber: 333333
      },
      {
        name: '4',
        prizeNumber: 444444
      },
      {
        name: '5',
        prizeNumber: 555555
      },
    ],//签到名单

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },




  backOrigin(){
    let { listHeight } = this.data
    let marginTop = this.data.marginTop - 30
    let marginTop2 = this.data.marginTop2 - 30
    if (Math.abs(marginTop) > listHeight) {
      marginTop = listHeight - 30
      this.setData({marginTop: marginTop})
    }
    if (Math.abs(marginTop2) > listHeight) {
      marginTop2 = listHeight - 30
      this.setData({marginTop2: marginTop2})
    }
    this.setData({
      marginTop: marginTop,
      marginTop2: marginTop2
    })
  },
  startLuck(){
    if(this.data.timerId){
      clearTimeout(this.data.timerId)
      this.data.timerId = undefined
      return
    }
    
    this.clearSelectedStyle()
    let run = ()=>{
      this.backOrigin()
      // let index = this.getSelectedIndex()
      // this.setSelectedStyle(index)
      let timerId = setTimeout(run,200)
      this.setData({
        timerId:timerId
      })
    }
    run()

    let luckDelay = Math.floor((Math.random() * 2500) + 1500)
    console.log(luckDelay)
    setTimeout(()=>{
      clearTimeout(this.data.timerId)
      this.data.timerId = undefined
      this.getSelectedValue()
    }, luckDelay)
  },
  getListHeight(){
    let _this = this
    var query = wx.createSelectorQuery();
    query.select('.roll-wrap').boundingClientRect()
    query.exec(function (res) {
      let listHeight = res[0].height
      _this.setData({
        marginTop2: listHeight + 30,
        listHeight: listHeight
      })
    })
  },
  getSelectedList(){
    const { marginTop, marginTop2 } = this.data
    console.log(marginTop - 30, marginTop2 - 30) // 每个item高度30
    let currentList //当前选中项所在的列表
    if (marginTop < 0 || (marginTop - 30) == 0) { //只有是负数或者0的时候 才会是当前列表（在屏幕上）
      currentList = marginTop
    } else {
      currentList = marginTop2
    }
    return currentList
  },
  getSelectedIndex(){
    let currentList = this.getSelectedList()
    //减去默认的30 /30 就知道了选中项的下标
    let index = Math.abs(currentList - 30) / 30
    //大于5说明是第二个列表
    if (index >= 5) { index = index - 5 } //减去上一个列表总数 就是当前列表坐标 
    return index
  },
  getSelectedValue(){
    let index = this.getSelectedIndex()
    let luckNumber = this.data.loginlist[index] //取出选中项
    this.setSelectedStyle(index)
    console.log(luckNumber)    
  },
  setSelectedStyle(index){
    let loginlist = this.data.loginlist
    loginlist[index].selected = true
    this.setData({
      loginlist:loginlist
    })
  },
  clearSelectedStyle(){
    let loginlist = this.data.loginlist
    loginlist.forEach(item => {
      item.selected = false
    })
    this.setData({
      loginlist:loginlist
    })
  },
  









  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getListHeight()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
