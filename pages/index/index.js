var that;
const app = getApp()
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    authModal: true
  },
  
  onLoad() {
    that = this;
  },
  async getHomeData() {
    console.log("homedata")
    try {
      let res = await Api.homeData();
      console.log(res);      
      that.setData({
        datas: res.data
      })
    } catch (error) {
      console.log(error)
    }
  },
  onShow(){
    console.log("show");
    
    getApp().watch(function (value) {
      console.log(value);
      /*
        登录成功,并且授权成功 ,获取首页数据
      */
      if (value.login && value.auth) {
        if(!that.data.show)that.showTips('登录成功', 'success');
        that.setData({
          modalauth: false,
          show:true,
        })
        that.getHomeData();
      }
      /**
       * 登录成功,授权失败,提示授权
       */
      else if (value.login && !value.auth) {
        that.setData({
          modalauth: true
        })
      }
      /**
       * 登录不成功等提示错误信息
       */
      else {
        that.showTips(app.globalData.msg);
      }
      that.setData({
        authSuccess: value.auth,
        loginMsg: app.globalData.msg,
        userInfo: wx.getStorageSync('userInfo')
      })
    })
  },
  

  async getPhoneNumber(e) {
    console.log(e);
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      let code = await Api.getCode();
      let res = await Api.phone({
        encryptedData: e.detail.encryptedData,
        code: code,
        iv: e.detail.iv
      })
      console.log(res);
      if (res.code == 0) {
        if (res.data.login) {
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userInfo', res.data.info);
        } else {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
        }
        app.globalData.msg = res.data.msg;
        app.globalData.status = { login: res.data.login, auth: res.data.auth };
      } else {
        wx.removeStorageSync('code');
        that.showTips(res.msg)
      }
    } else {
      that.showTips('您已拒绝授权获取手机号~')
    }
  },
})
