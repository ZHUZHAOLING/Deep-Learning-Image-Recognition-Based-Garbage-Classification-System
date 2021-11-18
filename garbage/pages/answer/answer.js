const app = getApp()
Page({
  data:{
    index: 0,  //Question sequence
    chooseValue: [], // Selected answer sequence
    totalScore: 100, // Total score
    wrongList: [], // Wrong set of questions
    garbage: {"A": "Dry garbage", "B": "Wet garbage", "C":"Harmful Waste", "D": "Recyclable"}
  },

  onLoad: function (options) {

    this.setData({
      questionList: app.globalData.questionList,
    })
    let count = this.generateArray(0, this.data.questionList.length - 1); 
    this.setData({
      shuffleIndex: this.shuffle(count).slice(0, 10) // Generate random question sequence and intercept
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
   * Generate a continuous array from start to end
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
      // Render the next question
      this.setData({
        index: this.data.index + 1
      })
    } else {
      //Jump to the results page
      let chooseValue = JSON.stringify(this.data.chooseValue);
      wx.navigateTo({
        url: '../result/result?chooseValue=' + chooseValue,
    })
    }
  },
  
  tabClick(e) {
    //tab switch
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
 },
  showModal(){
     //Show mask layer selection interface
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
    //Hide mask layer
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
    // Page rendering is complete
  },
  onShow:function(){
    this.setData({
      questionList: app.globalData.questionList,
      index: 0
    })
    let count = this.generateArray(0, this.data.questionList.length - 1); 
    this.setData({
      shuffleIndex: this.shuffle(count).slice(0, 10) // Generate random question sequence and intercept
    })
    console.log(this.data.shuffleIndex)
  },
  onHide:function(){
    //Page hidden
  },
  onUnload:function(){
    // Page closed
  },
  onReachBottom:function(){
    // Trigger an event when the pull-up bottoms out
    wx.showLoading({
      title: 'Loading',
    }) 
    setTimeout(function(){
      wx.hideLoading()
    },2000)
  }
 

})
