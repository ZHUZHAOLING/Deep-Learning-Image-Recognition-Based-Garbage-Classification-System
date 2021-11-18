const app = getApp()

Page({
  data: {
    result: '',
    img: '',
    imgDict: {
      '其他垃圾': '../../image/rubish-1.png',
      '厨余垃圾': '../../image/rubish-2.png',
      '有害垃圾': '../../image/rubish-4.png',
      '可回收物': '../../image/rubish-3.png',
      "": '../../image/wrong.png'
    }
  },
  onLoad: function (options) {
    let b = options.result;
    let a = JSON.parse(b)
    console.log(a);
    if (a.code === 'ok'){
      console.log(a.result)
      this.setData({
        result: a.result
      })
      this.setData({
        img: this.data.imgDict[this.data.result[0]]
      })
      console.log(this.data.img)
    }else{
      this.setData({
        result: ['出错啦', '']
      })
    }
  },
  toLast:function (){
    wx.switchTab({
      url: '../index/index',
    })
  },
});