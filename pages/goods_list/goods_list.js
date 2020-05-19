// pages/goods_list/goods_list.js

import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],

    goodsList:[]//商品列表
  },
// 接口需要的参数
QueryParams: {
  query:'',
  cid:"",
  pagenum:1,
  pagesize:10
},
// 总页数
totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  // 获取商品列表数据
async getGoodsList() {
  const res = await request({url:"/goods/search",data:this.QueryParams})
  console.log(res)
  
  // 获取 总条数
  const total = res.data.message.total
  // 计算总页数
  this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
  this.setData({
    goodsList:[...this.data.goodsList,...res.data.message.goods]
  })
  wx.stopPullDownRefresh()
},
  // 标题点击事件  从子组件中传过来的
  handleTabsItemChange(e) {
    // 获取被点击标题的下标
    const {index} = e.detail;
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data
    this.setData({
      tabs
    })
  },

  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断有没有下一页
    if(this.QueryParams.pagenum>=this.totalPages) {
      // 没有下一页数据
      wx.showToast({title: '没有下一页数据了'});
    }else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})