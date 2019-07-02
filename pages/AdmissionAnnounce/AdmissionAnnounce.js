var app = getApp()
var Constant = require('../../utils/constant.js')

Page({
  data: {
    'imageList': [
      {
        'cover': 'https://bkzspy.sdnu.edu.cn/uploads/images/20180917/5f7de29e3a85e09012d62a1efacd0d4f.jpg',
        'url': 'https://www.baidu.com'
      },
      {
        'cover': 'https://bkzspy.sdnu.edu.cn/uploads/images/20180917/5f7de29e3a85e09012d62a1efacd0d4f.jpg',
        'url': 'https://www.baidu.com'
      },
      {
        'cover': 'https://bkzspy.sdnu.edu.cn/uploads/images/20180917/5f7de29e3a85e09012d62a1efacd0d4f.jpg',
        'url': 'https://www.baidu.com'
      }
    ],
    'articleList': [
      {
        'title': '山东师范大学2018年山东省内提前批录取情况',
        'datetime': '2018年12月27日',
        'desc': '山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范',
        'url': 'https://mp.weixin.qq.com/s/Sx9ihjhoxJAUamo5Kzewpg'
      },
      {
        'title': '山东师范大学2018年山东省内提前批录取情况',
        'datetime': '2018年12月27日',
        'desc': '山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范',
        'url': 'https://mp.weixin.qq.com/s/Sx9ihjhoxJAUamo5Kzewpg'
      },
      {
        'title': '山东师范大学2018年山东省内提前批录取情况',
        'datetime': '2018年12月27日',
        'desc': '山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范大学2018年山东省内提前批录取情况山东师范',
        'url': 'https://mp.weixin.qq.com/s/Sx9ihjhoxJAUamo5Kzewpg'
      }
    ],
    'pageTitle': '招生公告'
  },
  loadData: function() {
    var that = this
    Constant.SHOW_LOAD('正在加载文章');
    wx.request({
      url: Constant.SERVER_ADDRESS + '/cms/api/getArticlesListOfficial?token=' + Constant.CMS_API,
      method: 'GET',
      success: function(res) {
        if(res.data.errcode != 0) {
          wx.showModal({
            title: '错误',
            content: '发生错误',
          })
          Constant.HIDE_LOAD()
          return
        }
        console.log(res)
        that.setData({ articleList: res.data.data})
        Constant.HIDE_LOAD()
        Constant.SHOW_LOAD('正在下载图片')
        wx.request({
          url: Constant.SERVER_ADDRESS + 'cms/api/getAllSlider?token=' + Constant.CMS_API,
          method: 'GET',
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
            that.setData({
              imageList: res.data.data
            }) 
            Constant.HIDE_LOAD()
          },
          fail: function () {
            Constant.HIDE_LOAD()
          }
        })
      },
      fail: function() {
        Constant.HIDE_LOAD()
      }
    })
  },
  onLoad: function(query) {
    this.loadData()
  },
  viewArticle: function(e) {
    console.log(e)
    var targetUrl = "/pages/WebView/WebView"
    var webvu = "https://app.zsb.sdnuxmt.cn/cms/document/detailOfficial/id/" + e.currentTarget.dataset.aid
    targetUrl = targetUrl + '?uri=' + encodeURIComponent(webvu)
    targetUrl = targetUrl + '&title=' + e.currentTarget.dataset.title
    wx.navigateTo({
      url: targetUrl
    });
  },
  viewBanner: function(e) {
    var targetUrl = "/pages/WebView/WebView"
    targetUrl = targetUrl + '?uri=' + encodeURIComponent(e.currentTarget.dataset.url)
    targetUrl = targetUrl + '&title=' + e.currentTarget.dataset.title
    wx.navigateTo({
      url: targetUrl
    });
  },
  onPullDownRefresh: function() {
    this.loadData()
  }
})