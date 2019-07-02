Page({
  data: {
    uri: 'https://bkzspy.sdnu.edu.cn',
    pageTitle: '山东师范大学本科招生'
  },
  onLoad: function (options) {
    var that = this
    var uri = decodeURIComponent(options.uri)
    this.setData({ uri: uri, pageTitle: options.title })
    wx.setNavigationBarTitle({
      title: that.data.pageTitle,
    })
  },
  onShareAppMessage: function() {
    var path = '/pages/WebView/WebView?uri='
    path = path + encodeURIComponent(this.data.uri)
    path = path + '&title=' + this.data.pageTitle
    return {
      title: this.data.pageTitle,
      path: path
    }
  }
})