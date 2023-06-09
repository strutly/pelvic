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
  onShow() {

  },
  async serve(e) {
    console.log(e);
    let res = await Api.serviceRecordAdd(e.currentTarget.dataset);
    if (res.code == 0) {
      wx.reLaunch({
        url: '/pages/serve/task?id=' + res.data.id
      })
    } else {
      that.showTips(res.msg);
    }
  }

})