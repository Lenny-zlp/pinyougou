import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';

wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],// 轮播图数组
    cateList:[],// 导航数组
    floorList:[]// 楼层数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res)=>{
    //     console.log(res)
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
// 获取轮播图数据
async getSwiperList() {
  const res = await request({url: '/home/swiperdata'})
      this.setData({
          swiperList:res.data.message
        })
},
// 获取导航数据
async getCateList() {
  const res = await request({url: '/home/catitems'})
  this.setData({
          cateList:res.data.message
        })
},

// 获取楼层数据
async getFloorList() {
  const res = await request({url: '/home/floordata'})
  this.setData({
          floorList:res.data.message
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