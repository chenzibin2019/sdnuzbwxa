var app = getApp()
var Constant = require('../../utils/constant.js')

Page({
  data: {
    'colleges': [
      {
        
      },
      {

      },
      {

      },
    ]
  },
  onLoad: function(){
    this.loadData()
  },
  loadData: function() {
    var that = this
    Constant.SHOW_LOAD('正在下载学院数据')
    wx.request({
      url: Constant.SERVER_ADDRESS + 'cms/api/getCollegeIntro?token=' + Constant.CMS_API,
      success: function (res) {
        if (res.data.errcode != 0) {
          wx.showModal({
            title: '错误',
            content: '发生错误',
          })
          Constant.HIDE_LOAD()
          return
        }
        console.log(res)
        that.setData({ colleges: res.data.data })
        Constant.HIDE_LOAD()
      },
      fail: function () {
        Constant.HIDE_LOAD()
      }
    })
  },
  viewCollege: function(e) {
    var targetUrl = "/pages/WebView/WebView"
    console.log(e)
    targetUrl = targetUrl + '?uri=' + encodeURIComponent(e.currentTarget.dataset.url)
    targetUrl = targetUrl + '&title=山东师范大学' + e.currentTarget.dataset.name
    wx.navigateTo({
      url: targetUrl
    });
  },
  onPullDownRefresh: function () {
    this.loadData()
  }
})