var that;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    domain:Api.domain,
    statics: {},
    setmealServices: []
  },

  onLoad(options) {
    that = this;
    
  },

  onReady(){
    console.log("show");
    
    getApp().watch(function (value) {
      if (value.login && value.auth) {
        that.caregiverStatics();
        that.getList(1);
      }
    })
  },

  async caregiverStatics() {
    try {
      let res = await Api.caregiverStatics();
      that.setData({
        statics: res.data
      })
    } catch (error) {

    }
  },

  async getList(pageNo) {
    try {
      let res = await Api.setmealServiceRecord({ pageNum: pageNo });
      console.log(res);
      let setmealServices = that.data.setmealServices;
      that.setData({
        pageNo: pageNo,
        endline: res.data.last,
        setmealServices: setmealServices.concat(res.data.content)
      });
    } catch (error) {

    }
  },

})