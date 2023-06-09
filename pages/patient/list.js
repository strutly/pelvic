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
      console.log("ready",value);
      if (value.login && value.auth) {
        that.getPatientPage(1, '');
      }
    })
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