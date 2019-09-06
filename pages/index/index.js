const app = getApp();
var config = require("../../config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    myList: [],
    total:"0",
    refreshLock: false,
    displayGetAvatarBtn: true,
    userNavatarUrl:"../../images/my_icon_avator.png",
    openDataUserDisplay: false,
    getUserInfo: "getUserInfo",
    getAccountFileUrl: "",
    hasToken: "",
    source: '',
    shopperId: app.globalData.gdShopperId
  },

  onShow: function (options) {
    this.setData({
      shopperId: app.globalData.gdShopperId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (this.data.hasUserInfo) {
      this.setData({
        displayGetAvatarBtn: false
      })
    }

    var curPages = getCurrentPages();
    console.log("当前页面", curPages[0].route);
    this.setData({
      getAccountFileUrl: config.service.shoppers + "/" + app.globalData.gdShopperId + "?includes=contact,preference,customerId&auditClientIp=9.9.0.0",
      myList: [
        {
          navUrl: "null",
          classImg: "../../images/my_account_my_product_icon.png",
          content: "My Products",
          rightImg: "../../images/list_back_gray.png",
          listId: "myProducts",
          total: "0"
        },
        {
          navUrl: "null",
          classImg: "../../images/my_account_my_order_icon.png",
          content: "My Orders",
          rightImg: "../../images/list_back_gray.png",
          listId: "myOrders",
          total: "0"
        },
        {
          navUrl: "null",
          classImg: "../../images/my_account_auto_renew_icon.png",
          content: "My Renewals",
          rightImg: "../../images/list_back_gray.png",
          listId: "manageAutoRenew",
          total: "0"
        },
        {
          navUrl: "null",
          classImg: "../../images/my_account_phone_service_icon.png",
          content: "Customer Phone call",
          rightImg: "../../images/list_back_gray.png",
          listId: "support",
          total: "0"
        },
        {
          navUrl: "../shopper/shopper",
          classImg: "../../images/my_account_feedback_icon.png",
          content: 'Customer Live Chat',
          rightImg: "../../images/list_back_gray.png",
          listId: "message",
          total: "0"
        },
        {
          navUrl: "null",
          classImg: "../../images/my_account_set_icon.png",
          content: "Settings",
          rightImg: "../../images/list_back_gray.png",
          listId: "mySetting",
          total: "0"
        }
      ],
      hasToken: !!app.globalData.gdUserAuthToken
    });
    const that = this;
    if (options && options.source) {
      that.setData({
        source: options.source
      });
    }
  },

  // Get userinfo
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // Get avatar
  bindGetUserInfo:function (res) {
    var that = this;
    console.log(res);
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                displayGetAvatarBtn: false,
                userInfo: res.userInfo,
                openDataUserDisplay: true
              });
            },
            fail:function () { 
              that.setData({
                displayGetAvatarBtn: true
              });
             }
          })
        } else {
          that.setData({
            displayGetAvatarBtn: true
          });
        }
      }
    })
  },

});