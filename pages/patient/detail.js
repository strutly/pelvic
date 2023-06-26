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
    App.watch(function (value) {
      console.log("ready", value);
      if (value.login && value.auth) {
        Api.patientDetail({
          id: that.options.id
        }).then(res => {
          console.log(res);
          that.setData({
            patient: res.data
          })
        })
      }

    })
  },
  async serve(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    Api.puerperalSetmealRecordDetail(e.currentTarget.dataset).then(res=>{
      wx.reLaunch({
        url: '/pages/serve/task?id=' + dataset.id
      })
    },err=>{
      that.showTips(err.msg);      
    });
  }

})