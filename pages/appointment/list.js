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
      console.log("onReady",value);
      if (value.login && value.auth) {
        that.getPatientPage(1, '');
      }
    })
  },
  onShow() {
    App.watch(function (value) {
      console.log("show",value);
      if (value.login && value.auth) {
        that.getAppointments();
      }
    })
  },
  async getAppointments() {
    try {
      let res = await Api.appointmentList();
      console.log(res);
      if (res.code == 0) {
        that.setData({
          appointments: res.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getPatientPage(pageNum, name) {
    try {
      let res = await Api.patientPage({
        pageNum: pageNum,
        pageSize: 10,
        name: name
      });
      console.log(res);
      if (res.code == 0) {
        let patients = that.data.patients || [];
        that.setData({
          patients: patients.concat(res.data.content),
          endline: res.data.last,
          pageNum: pageNum,
          name: name
        })
      }
    } catch (error) {
      console.log(error)
    }
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