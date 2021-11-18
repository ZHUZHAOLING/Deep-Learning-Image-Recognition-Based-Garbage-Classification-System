const app = getApp()

Page({
  data: {
    result: '',
    img: '',
    imgDict: {
      'Other garbage': '../../image/rubish-1.png',
      'Kitchen waste': '../../image/rubish-2.png',
      'Hazardous waste': '../../image/rubish-4.png',
      'Recyclables': '../../image/rubish-3.png',
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
        result: ['Something went wrong', '']
      })
    }
  },
  toLast:function (){
    wx.switchTab({
      url: '../index/index',
    })
  },
});
