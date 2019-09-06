//app.js
const config = require('./config.js');

App({
  onLaunch: function () {
    const that = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            updateManager.applyUpdate();
          });
        }
      });
    }

    try {
      // Retrieve user info 
      if (!this.globalData.userInfo) {
        var storedUserinfo = wx.getStorageSync('userinfo');
        console.log("Locally stored userInfo retrieved as: ", storedUserinfo);
        if (storedUserinfo) {
          this.globalData.userInfo = storedUserinfo;
        }
        console.log("globalData.userInfo now set to: ", this.globalData.userInfo);
      }
    } catch (e) {
      // Do something when catch error
      console.error("Error retrieving token ID and shopper ID.");
    }

    var tokenId = wx.getStorageSync('tokenid');
    console.log("Token ID locally retrived as: ", tokenId);
    if (tokenId) {
      this.globalData.gdUserAuthToken = tokenId;
    }
    wx.login({
      success: function (ret) {
        wx.request({
          url: config.service.addUser,
          header: {
            Authorization: `sso-jwt ${config.staticBackendToken}`,
          },
          method: 'post',
          data: {
            authCode: ret.code
          }
        })
      }
    })
  },

  onShow: function (options) {
    this.getUnionId().then(results => {
      if (this.globalData.gdUserAuthToken && options.query.source !== "share") {
        this.checkUserWechatBinding()
        this.preloadData()
      }
    })
  },

  getUnionId: function (resData) {
    console.warn("---------- getUnionId() is called.");
    const that = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          // success
          var resCode = res.code;
          console.warn("---------- wx.login() res.code = ", res.code);
          wx.request({
            url: `${config.service.getOpenId}${resCode}`,
            header: {
              Authorization: `sso-jwt ${config.staticBackendToken}`,
            },
            method: 'GET',
            data: {},
            success: function (res) {
              that.globalData.unionId = res.data.unionid
              console.warn("---------- unionId: ", res.data);
              resolve(res)
            }
          })
        }
      })
    })
  },

  setGlobalCacheAndRedirect: function (oToken, useCase) {
    this.setGlobalToken(oToken);
    const that = this;
    setInterval(function () {
      that.getSslCertsData()
    }, 300000);
    let pagesData = config.reLaunchPages[useCase];
    if (pagesData) {
      wx.reLaunch({
        url: pagesData
      });
    } else {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }
  },

  checkUserWechatBinding: function () {
    this.getWechatBindingInfo().then(res => {
      this.checkUserBinding();
    })
  },

  getWechatBindingInfo: function () {
    console.log(this.globalData.gdUserAuthToken)
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${config.service.checkWechatBinding}`,
        header: {
          Authorization: `sso-jwt ${this.globalData.gdUserAuthToken}`
        },
        success: function (res) {
          resolve(res)
        }
      })
    })
  },

  checkUserBinding: function (redirAdd, currentPage, _scope) {
    /*
    this.globalData.currentPage = currentPage; //Record call current page
    var that = this;
    wx.showLoading({
      title: '',
      mask: true
    })*/
    wx.login({
      success: function (res) {
        wx.request({
          url: config.service.login,
          method: "post",
          data: {
            code: res.code
          },
          success: function (ret) {
            console.warn("-----------ret.data.data.token: ", ret.data.data.token)
            that.setGlobalCacheAndRedirect(ret.data.data.token, redirAdd);
            /*
            // wx.hideLoading()
            if (ret.statusCode === 400) {
              wx.reLaunch({
                url: '/pages/login/login?doNotCheckBinding=true',
              })
            }
            if (ret.data.code === config.staticData.twoFASuccessCode) {
              that.setGlobalCacheAndRedirect(ret.data.data.token, redirAdd);
            } else if (ret.data.code === config.staticData.twoFAWithoutSMSCode || ret.data.code === config.staticData.twoFAWithSMSCode) {
              that.globalData.twoFAObj = ret.data.data;
              that.globalData.twoFAObj.type = "login";
              wx.reLaunch({
                url: '/pages/twoFA/twoFA',
              });
            }*/
          },
          /*
          fail: function () {
            wx.hideLoading();
            if (_scope) {
              util.errorTipModule(_scope, "onLoad", util.placeholderImage.serviceError, _scope.data.i18n.msg_service_error_1, _scope.data.i18n.msg_service_error_2)
            }
          },*/
          complete: function () {
            // wx.hideLoading();
          }
        });
      },/*
      fail: function () {
        wx.hideLoading()
        if (_scope) {
          util.errorTipModule(_scope, "onLoad", util.placeholderImage.serviceError, _scope.data.i18n.msg_service_error_1, _scope.data.i18n.msg_service_error_2)
        }
      }*/
    });
  },

  refreshToken: function () {
    const that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          wx.request({
            url: config.service.login,
            method: "post",
            data: {
              code: res.code
            },
            success: function (ret) {
                that.setGlobalToken(ret.data.data.token)
                resolve();
            }
          });
        }
      });
    })
  },
  
  setGlobalToken: function (oToken) {
    this.globalData.gdUserAuthToken = oToken;
    wx.setStorageSync('tokenid', oToken)
    var decodedToken = parseJwtToken(oToken);
    this.globalData.gdShopperId = decodedToken ? decodedToken.shopperId : null;
    wx.setStorageSync('gdShopperId', this.globalData.gdShopperId)
    this.globalData.gdCustomerId = decodedToken ? decodedToken.cid : null;
    wx.setStorageSync('gdCustomerId', this.globalData.gdCustomerId)

    console.warn("-------------shopperId set to: ", this.globalData.gdShopperId);
  },

  parseJwtToken: function (token) {
    var decodedJson = null;
    console.log("Input token to parse = ", token);
    try {
      decodedJson = JSON.parse(atob(token.split('.')[1]));
      console.log("JWT token parsed as Json: ", decodedJson);
      return decodedJson;
    } catch (e) {
      console.warn("Error parsing JWT token. ", e.stack);
      return decodedJson;
    }
  },

  globalData: {
    autoRenewSwitchEnable: false, //判断是否有信用卡
    productsArr: '', //products
    shopperProfile: '', //登录信息
    paymentProfile: '', //paymentProfile
    paymentProfileId: 'undefined',
    friendlyName: null,
    paymentMethod: null,
    userInfo: null,
    gdSsoTokenEndpoint: 'https://sso.godaddy.com/v1/api/token',
    gdUserName: null,
    gdPassword: null,
    gdRealm: 'idp',
    gdShopperId: 'o2o',
    gdCustomerId: null,
    gdUserAuthToken: null,
    userCart: [],
    domainList: [],
    contactPhone: '14805058877',
    tabActiveIndex: 0, // Tracking MyAccount tab index, default to MyRenew tab (3)
    orderProductInfoData: null, //orderProductInfoData
    checkboxArrGlobal: null, //续费准备的global Arr
    checkboxdata: null, //call cart API续费准备的global Arr
    renewSuccessOrderData: null, //renewSuccessOrderData   
    currentPage: null, //curpage
    certificateData: null, //certificateData
    domainsListData: [], //domainsListData
    productNavListData: null,
    myDomains: null,
    profileData: null,
    wxTokenId: null,
    gotExpiredSubscriptions: false,
    expiredSubscriptionsData: null,
    unionId: null
  },
});