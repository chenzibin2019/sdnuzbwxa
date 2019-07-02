var Constant = require('../../utils/constant.js')
var examIdPage = ''

Page({
  data: {
    xm: '',
    admission_college: '',
    admission_major: '',
    examid: '',
    shareText: '你不能分享'
  },
  onLoad: function (options) {
    console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      xm: options.xm,
      admission_college: options.admission_college,
      admission_major: options.admission_major,
      examid: options.examid
    })
    if (options.examid != '******') {
      this.setData({
        shareText: '设置分享/隐藏敏感信息'
      })
    }
    wx.hideShareMenu({})
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  setShare: function () {
    wx.showLoading({
      title: '处理中',
    })
    var that = this
    this.setData({
      examid: '******'
    })
    wx.showShareMenu({
      success: function () {
        wx.hideLoading()
        wx.showModal({
          title: '设置成功，已经隐藏你的考试号',
          showCancel: false,
          confirmText: '现在分享'
        })
        that.setData({
          shareText: '已设置分享'
        })
      }
    })
  },
  onShareAppMessage: function () {
    var that = this
    var pageData = that.data
    return {
      title: '我被山东师大录取啦！',
      path: '/pages/AdmissionQueryResult/AdmissionQueryResult?xm=' + pageData.xm + '&admission_college=' + pageData.admission_college + '&admission_major=' + pageData.admission_major + '&examid=******'
    }
  }
})
