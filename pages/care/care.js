const app = getApp()

Page({
  data: {
    focus: false,
    openId: '',
    inputValue: 'Hello, what\'s up?',
    history: 'Checking out chat history...',
    scrollTop: 5000,
    chatApi: 'https://www.test-godaddy.xyz/mp/api/v1/',
    jwt: 'sso-jwt eyJhbGciOiAiUlMyNTYiLCAia2lkIjogInBZNFBSU2lXQ1EifQ.eyJqdGkiOiAia242bUVmZ01DQ3pjQWg5dEZVaTFvQT09IiwgImlhdCI6IDE1NTQ2OTM3MjAsICJhdXRoIjogImJhc2ljIiwgInR5cCI6ICJjZXJ0IiwgImZhY3RvcnMiOiB7InBfY2VydCI6IDE1NTQ2OTM3MjB9LCAic2JqIjogeyJvIjogIiIsICJvdSI6ICJEb21haW4gQ29udHJvbCBWYWxpZGF0ZWQiLCAiY24iOiAiY2xpZW50LnBhcnRuZXJzLmRldi1nb2RhZGR5LmNvbSJ9fQ.Adx7nPGKJ4nAcJ9AGlqHNpNbaqARiZxzmUTGH_aGMzEiGmVXtToHf3Ah8vC258OAAGbMbIbVWpjHbviPI8B6a5Ywabs52S3QHOY6RMXoF1b7-__8-drqJlcSa65S52pMCHPmPSxN-neDx76Jc5pFDgbcZ59ANsRkKi8n7CXYKjU'
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendBtnClick: function () {
    var that = this;
    that.setData({
      history: that.data.history + 'Agent: ' + that.data.inputValue
    })

    // determine to send text, MP link, or web link
    var textToSend = that.data.inputValue;
    var inputFormat = 0;
    if (that.data.inputValue == '@1') {   // MP link
      inputFormat = 1;
      textToSend = 'Checkout this mini-program link';
    } else if (that.data.inputValue == '@2') {  // web link
      inputFormat = 2;
      textToSend = 'Checkout this web link';
    } else {
      inputFormat = 0;
      textToSend = that.data.inputValue;
    }
    console.log("Format = ", inputFormat);
    console.log("Text = ", textToSend);

    // Call backend to send agent answer
    wx.request({
      url: that.data.chatApi + 'answer',
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8',
        'authorization': that.data.jwt
      },
      data: {
        toUser: that.data.openId,
        format: inputFormat,
        text: textToSend,
        mpLink: 'pages/index/index',
        webLink: 'https://www.godaddy.com',
        imageUrl: ''
      },
      success: function (res) {
        console.log(res.data)
        that.reloadConversation();
      }
    })
  },
  reloadConversation: function () {
    console.log("Start reloading conversation of customer: ", this.data.openId)
    var that = this;
    var countdown = 50;  // to stop timer
    var timer = setInterval(function () {
      if (countdown == 1) {
        clearInterval(timer);
      }
      else {
        countdown--;
        // Call backend to reload chat log
        wx.request({
          url: that.data.chatApi + 'chatlog/' + that.data.openId,
          header: {
            'content-type': 'application/text; charset=utf-8'
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              history: res.data
            })
          }
        })
      }
    }, 2000);
    // scroll to bottom
    that.setData({
      scrollTop: that.data.scrollTop + 1000
    })
  },

  onShow: function () {
    this.reloadConversation();
  },
  onLoad: function(options) {
    this.setData({
      openId: options.openId
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})