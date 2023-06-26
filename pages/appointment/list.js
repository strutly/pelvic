var that;
const App = getApp();
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    appointments: []
  },
  onLoad() {
    that = this;
  },
  onReady() {
    App.watch(function (value) {
      console.log("onReady", value);
      if (value.login && value.auth) {
        that.getPatientPage(1, '');
      }
    })
  },
  onShow() {
    App.watch(function (value) {
      console.log("show", value);
      if (value.login && value.auth) {
        that.getAppointments();
      }
    })
  },
  getAppointments() {
    Api.appointmentList().then(res => {
      that.setData({
        appointments: res.data
      })
    }, err => {
      that.showTips(err.msg);
    });
  },
  getPatientPage(pageNum, name) {
    Api.patientPage({
      pageNum: pageNum,
      pageSize: 10,
      name: name
    }).then(res => {
      let patients = that.data.patients || [];
      that.setData({
        patients: patients.concat(res.data.content),
        endline: res.data.last,
        pageNum: pageNum,
        name: name
      })
    }, err => {
      that.showTips(err.msg);
    });
  },
  onReachBottom() {
    let endline = that.data.endline;
    let name = that.data.name;
    if (!endline) {
      let pageNum = that.data.pageNum + 1;
      that.getPatientPage(pageNum, name);
    }
  },
  submit(e) {
    console.log(e);
    let name = e.detail.value;
    that.setData({
      patients: []
    })
    that.getPatientPage(1, name);
  },
})