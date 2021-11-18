// pages/orderWine/orderWine.js
Page({
  data:{
    showModalStatus:false,             //Whether to show mask and selection menu
    chooseFactory:{},                   //Selected facturer
    factoryList:{},                     //factory List
    goodsList:{},                       //goods List
    tabs: ['Wet garbage', 'Dry garbage','Recyclable', 'Harmful Waste'],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0 ,
    windowHeight:null,
    
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
    // Page display
  },
  onHide:function(){
    // Page hidden
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
