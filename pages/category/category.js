// pages/category/category.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[], // 左侧数据
    rightContent: [], // 右侧数据
    currentIndex:0,// 被点击的左侧菜单
    scrollTop:0//距离顶部的距离
  },
  Cates:[],// 接口返回数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 本地存储
    const Cates = wx.getStorageSync("cates");
    if(!Cates) {
      // 不存在
      this.getCates();
    }else {
      // 定义一个过期时间
      if(Date.now() - Cates.time > 1000*10) {
        // 重新发送请求
        this.getCates()
      }else {
        // 可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
  },
  // 获取分类数据
  async getCates() {
    const res = await request({ url: '/categories' })
    // console.log(res)
    this.Cates = res.data.message;
    // 本地化存储
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
// 左侧菜单点击事件
handleIemTap(e) {
  const {index} = e.currentTarget.dataset;
  let rightContent = this.Cates[index].children;
  this.setData({
    currentIndex: index,
    rightContent,
    scrollTop:0
  })
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