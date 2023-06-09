var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    domain:Api.domain,
    statics: {},
    setmealServices: [],
    datas:{}
  },

  onLoad(options) {
    that = this;
    
  },

  onShow(){
    console.log("show");
    
    getApp().watch(function (value) {
      console.log(value)
      if (value.login && value.auth) {
        that.caregiverStatics();
        that.getHomeData();
      }
    })
  },
  async getHomeData() {
    console.log("homedata")
    try {
      let res = await Api.homeData();
      console.log(res);      
      that.setData({
        datas: res.data||{}
      })
    } catch (error) {
      console.log(error)
    }
  },
  async caregiverStatics() {
    try {
      let res = await Api.caregiverStatics();
      that.setData({
        statics: res.data
      })
    } catch (error) {
      console.log(error)
    }
  },
  toWork(){
    let datas = that.data.datas;
    console.log(datas['id'])
    if(!datas['id']) return that.showToast("暂无工作中的服务");
    wx.navigateTo({
      url: `/pages/serve/task?id=${datas.id}`
    })
  }
  

})