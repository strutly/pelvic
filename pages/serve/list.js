var that;
const app = getApp()
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    datas:[]
  },

  onLoad(options) {
    that = this;
    that.getHomeData();
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
  
})