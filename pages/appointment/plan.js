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
  getAppointmentPlan(){
    Api.appointmentPlan().then(res=>{
      that.setData({
        plan:res.data
      })
    },err=>{
      that.showTips(err.msg);
    });    
  }
 
})