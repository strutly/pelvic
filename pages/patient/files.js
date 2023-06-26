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
      Api.patientDetail({
        id: that.options.id
      }).then(res => {
        console.log(res);
        that.setData({
          patient: res.data
        })
      })
    })
  },
  onShow() {

  },

  textareaChange(e) {
    console.log(e);
    let patient = that.data.patient;
    patient.file = patient.file || {};
    patient.file[e.currentTarget.dataset.name] = e.detail.value;
    that.setData({
      patient: patient
    })
  },
  submit(e) {
    console.log(e);
    Api.patientUpdate({
      patientId: that.data.options.id,
      files: that.data.patient.file
    }).then(res => {
      wx.navigateBack();
    }, err => {
      that.showTips(err.msg);
    });
  }

})