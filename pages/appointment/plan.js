var that;
const App = getApp();
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {

  },
  onLoad(options) {
    that = this;
  },
  onReady() {

  },
  onShow() {
    App.watch(function (value) {
      console.log("onReady",value);
      if (value.login && value.auth) {
        that.getAppointmentPlan();
      }
    })
  },
  async getAppointmentPlan(){
    let res = await Api.appointmentPlan();
    console.log(res);
    that.setData({
      plan:res.data
    })
  }
 
})