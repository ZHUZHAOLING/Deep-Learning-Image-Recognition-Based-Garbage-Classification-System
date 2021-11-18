const { garbageDict } = require("../../data/data2");

const app = getApp()

Page({
  data: {
    actionapic: 'http://q0h9j0jdx.bkt.clouddn.com/rubish.jpg',
    actionbpic: 'http://img.weiye.me/zcimgdir/thumb/t_148784476958aeb5a19a2d1.jpg', 
    garbageDict: app.globalData.garbageDict,
  },
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    console.log(111)
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: '../pic/pic?imgPath=' + res.tempFilePaths[0]
      })
    }
    }) 
  },
  showInput: function () {
    this.setData({
    inputShowed: true
    });
    },
    hideInput: function () {
    this.setData({
    inputVal: "",
    inputShowed: false
    });
    // getList(this);
    },
    clearInput: function () {
    this.setData({
    inputVal: ""
    });
    // getList(this);
    },
    search:function(){
      console.log(this.data.inputVal)
      console.log(this.data.garbageDict)
      let data = this.data.garbageDict[this.data.inputVal]
      console.log(data)
      let result = []
      if (data){
        result = [data, this.data.inputVal]
      }else{
        result = ['', 'No search results found']
      }
      let re = JSON.stringify({
        'code': 'ok',
        'result': result
      })
      wx.navigateTo({
        url: '../predict/predict?result=' + re
      })
    },
    inputTyping: function (e) {
    //Search data
    // getList(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
    }
});
