// app.js
var jsonList = require('data/data.js');
var jsonDict = require('data/data2.js');

App({
  onLaunch() {
    // Demonstrate local storage capabilities
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //Log in
    wx.login({
      success: res => {
        // Send res.code to the background in exchange for openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    garbageDict: jsonDict.garbageDict,
    questionList: jsonList.questionList  // Get answer data
  }
})
