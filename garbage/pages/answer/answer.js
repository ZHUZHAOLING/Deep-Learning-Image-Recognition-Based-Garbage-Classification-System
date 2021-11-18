const app = getApp()
Page({
  data:{
    index: 0,  // 题目序列
    chooseValue: [], // 选择的答案序列
    totalScore: 100, // 总分
    wrongList: [], // 错误的题目集合
    garbage: {"A": "Dry garbage", "B": "Wet garbage", "C":"Harmful Waste", "D": "Recyclable"}
  },

  onLoad: function (options) {

    this.setData({
      questionList: app.globalData.questionList,
    })
    let count = this.generateArray(0, this.data.questionList.length - 1); 
    this.setData({
      shuffleIndex: this.shuffle(count).slice(0, 10) // 生成随机题序并进行截取
    })
    console.log(this.data.shuffleIndex)
  },
  
  shuffle: function (arr) {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  },
  /**
   * 生成一个从 start 到 end 的连续数组
   */
  generateArray: function (start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start)
  },
  
  garbageClick1:function(e){
    this.data.chooseValue[this.data.index] = {
      "id": this.data.index,
      "question": this.data.questionList[this.data.shuffleIndex[this.data.index]].question,
      "answer": this.data.garbage[e.currentTarget.dataset.key],
      "right": this.data.garbage[this.data.questionList[this.data.shuffleIndex[this.data.index]].answer]
    }
    console.log(this.data.chooseValue)
    if (this.data.index < this.data.shuffleIndex.length - 1) {
      // 渲染下一题
      this.setData({
        index: this.data.index + 1
      })
    } else {
      // 跳转到结果页
      let chooseValue = JSON.stringify(this.data.chooseValue);
      wx.navigateTo({
        url: '../result/result?chooseValue=' + chooseValue,
    })
    }
  },
  
  tabClick(e) {
    //tab切换
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
 },
  showModal(){
     //显示遮罩层 选择界面
      var animation = wx.createAnimation({
              duration: 300,
              timingFunction: "ease",
              delay: 0
      })
      this.animation = animation
      animation.translateY(-300).step()
      this.setData({
              animationData: animation.export(),
              showModalStatus: true
      })
      setTimeout(function () {
              animation.translateY(0).step()
              this.setData({
                      animationData: animation.export()
              })
      }.bind(this), 300)
      
  },
  hideModal(){
    //隐藏遮罩层
     var animation = wx.createAnimation({
              duration: 300,
              timingFunction: "ease",
              delay: 0
      })
      this.animation = animation
      animation.translateY(-300).step()
      this.setData({
          animationData: animation.export(),
      })
      setTimeout(function () {
              animation.translateY(0).step()
              this.setData({
                      animationData: animation.export(),
                      showModalStatus: false
              })
      }.bind(this), 300)
  },
  chooseFactory(e){
    //console.log(e.currentTarget.dataset.id)
    let index= this.data.factoryList.findIndex((value, index, arr)=>{
       return value.id==e.currentTarget.dataset.id
    })
    this.setData({
        chooseFactory:this.data.factoryList[index]
    })
   
    setTimeout(()=>{this.hideModal()},200)

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    this.setData({
      questionList: app.globalData.questionList,
      index: 0
    })
    let count = this.generateArray(0, this.data.questionList.length - 1); 
    this.setData({
      shuffleIndex: this.shuffle(count).slice(0, 10) // 生成随机题序并进行截取
    })
    console.log(this.data.shuffleIndex)
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onReachBottom:function(){
    // 上拉触底时触发事件
    wx.showLoading({
      title: '加载中',
    }) 
    setTimeout(function(){
      wx.hideLoading()
    },2000)
  }
 

})