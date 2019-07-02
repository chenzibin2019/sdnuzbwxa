var app = getApp()
var Constant = require('../../utils/constant.js')

Page({
  data: {
    xm: '',
    sfzhl: ''
  },
  onLoad: function (options) {
    var that = this
    //载入本地缓存中姓名和身份证号数据
    wx.getStorage({
      key: 'xm',
      success: function (res) {
        that.setData({
          xm: res.data
        })
      },
    })
    wx.getStorage({
      key: 'sfzhl',
      success: function (res) {
        that.setData({
          sfzhl: res.data
        })
      },
    })
    
  },
  actQuery: function (e) {
    console.log(e)
    var xm = e.detail.value.xm
    var sfzhl = e.detail.value.sfzhl
    if (xm == 'startDebug' && sfzhl == '82201') {
      wx.setEnableDebug({
        enableDebug: true,
      })
      return
    }
    if (xm == 'endDebug' && sfzhl == '82201') {
      wx.setEnableDebug({
        enableDebug: false,
      })
      return
    }
    this.setData({
      xm: xm,
      sfzhl: sfzhl
    })
    this.requestAdmissionQuery()
  },
  requestAdmissionQuery: function () {
    var that = this
    if (this.data.xm == "" || this.data.sfzhl == "") {
      wx.showModal({
        title: '提示',
        content: '姓名和身份证号后六位不能为空！',
        showCancel: false,
        confirmText: '返回检查'
      })
      return
    }
    //验证通过
    //写入本地缓存
    wx.setStorage({
      key: 'xm',
      data: that.data.xm
    })
    wx.setStorage({
      key: 'sfzhl',
      data: that.data.sfzhl
    })
    //请求服务器数据
    Constant.SHOW_LOAD('正在查询...')
    wx.request({
      url: Constant.SERVER_ADDRESS + "cms/api/AdmissionQuery?token=" + Constant.CMS_API,
      data: {
        xm: that.data.xm,
        sfzhl: that.data.sfzhl
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.admission_state == 0) {
          wx.hideLoading()
          wx.showModal({
            title: '查询结果',
            content: '很抱歉，我们没有查询到你的录取信息\n可能是录取信息尚未公布\n或者是你的信息有误!',
            showCancel: false
          })
        } else {
          Constant.HIDE_LOAD()
          var strUrl = "/pages/AdmissionQueryResult/AdmissionQueryResult?"
          strUrl = strUrl + "admission_college=" + res.data.admission_data.admission_college
          strUrl = strUrl + "&admission_major=" + res.data.admission_data.admission_major
          strUrl = strUrl + "&examid=" + res.data.admission_data.examid
          strUrl = strUrl + "&xm=" + that.data.xm
          console.log(strUrl)
          wx.navigateTo({
            url: strUrl,
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络错误',
          duration: 1000
        })
      }
    })
  }

})
