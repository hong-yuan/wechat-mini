const app = getApp();

Page({
  data: {
    chatApi: 'https://www.test-godaddy.xyz/mp/api/v1/',
    openIdList: [
      {
        openId: 'oZM354ocd02nhA6z0cGqlIew2fKo', 
        nickName: 'Hong',
        avatarUrl: '',
      }, 
      {
        openId: 'oZM354p1AnX4mD8L5F2ho9GrwwJo', 
        nickName: 'Michael',
        avatarUrl: '',
      },
      {
        openId: 'oZM354tYoRB9eVjjNiGmB7PZzwh0',
        nickName: 'Cindy',
        avatarUrl: '',
      }
    ]
  },
  loadChatSessions: function() {
    var that = this;
    // Calling backend to retrive chat sessions
    wx.request({
      url: this.data.chatApi + 'sessions',
      header: {
        'content-type': 'application/text; charset=utf-8'
      },
      success: function (res) {
        console.log("response data: ", res.data)
        that.setData({
          openIdList: res.data
        })
        console.log("Sessions from backend: ", that.data.openIdList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.loadChatSessions()
  },
  onLoad: function (options) {
  }
});