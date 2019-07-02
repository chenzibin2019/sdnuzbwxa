

//服务器地址
var SERVER_ADDRESS = 'https://app.zsb.sdnuxmt.cn/'
var CMS_API = 'crk6l8sobQYYpfgJBWz7is5oUi5iFJxf'

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function showLoading(str) {
  wx.showLoading({
    title: str,
  })
}

function hideLoading() {
  wx.hideLoading()
}

function request(url, data, method) {
  wx.request({
    url: SERVER_ADDRESS + url + '?token=' + CMS_API,
    data: data,
    method: method,
    success: function(res) {
      if(res.data.errcode != 0) {
        console.log(res)
        return false
      }
      return res.data
    },
    fail: function() {
      return false
    }
  })
}

module.exports = {
    CMS_API: CMS_API,
    SERVER_ADDRESS: SERVER_ADDRESS,
    CMP_VER: compareVersion,
    SHOW_LOAD: showLoading,
    HIDE_LOAD: hideLoading,
    REQUEST: request
}
