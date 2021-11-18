const app = getApp()

Page({
  data: {
    imgPath: '',
  },
  onLoad: function (options) {
    console.log(options);
    console.log(options.imgPath)
    this.setData({
      imgPath: options.imgPath
    })
  },
  toLast:function (){
    wx.switchTab({
      url: '../index/index',
    })
  },
  predictImg:function (){
    var that = this;
    wx.showLoading({
      title: 'Predicting...',
    }) 
    wx.uploadFile({
      url: 'https://c.idazhe.net/api/pic/',//
      filePath: this.data.imgPath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        wx.hideLoading();
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
        data = JSON.stringify(data.result)
        wx.navigateTo({
          url: '../predict/predict?result=' + data
        })
          // that.data.picPaths.push(data['msg'])
          // that.setData({
          //   picPaths: that.data.picPaths
          // })
          // console.log(that.data.picPaths)
      }
    })
  }
});