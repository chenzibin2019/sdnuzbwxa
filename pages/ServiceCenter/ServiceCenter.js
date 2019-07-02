// pages/ServiceCenter/ServiceCenter.js
var app = getApp()
var Constant = require('../../utils/constant.js')

Page({
  data: {
    hotline: '0531-86182201',
    runningInWeWork: false,
    okFeedBack: false
  },
  onLoad: function (options) {
    Constant.SHOW_LOAD('请稍后')
    var that = this
    //第一步，获取热线电话
    wx.request({
      url: Constant.SERVER_ADDRESS + "cms/api/getHotLine?token=" + Constant.CMS_API,
      success: function (res) {
        console.log(res)
        that.setData({ hotline: res.data.hotline })
        Constant.HIDE_LOAD()
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (Constant.CMP_VER('2.1.0', res.SDKVersion) <= 0) that.setData({ okFeedBack: true })
        if (res.environment && res.environment == 'wxwork') that.setData({ runningInWeWork: true })
      },
    })
  },
  MakeCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.hotline,
    })
  },
  inqueryStart: function() {
    return
    wx.showLoading({
      title: '请稍等',
    })
  },
  inqueryOk: function(res) {
    return
    wx.hideLoading()
    console.log(res)
    wx.showModal({
      title: '操作完成',
      content: '请返回微信端查看会话'
    })
  }
})