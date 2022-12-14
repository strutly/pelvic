var that;
const app = getApp()
import Api from '../../config/api';
import Util from '../../utils/util';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    datas:{}
  },

  onLoad(options) {
    that = this;    
  },
  onShow(){
    that.getHomeData(Util.formatDate(new Date()));
  },
  async getHomeData(date) {
    console.log("homedata")
    try {
      let res = await Api.setmealServicePlan({
        appointmentDay:date
      });
      console.log(res);      
      that.setData({
        datas: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }

})