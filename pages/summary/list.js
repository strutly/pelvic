var that;
const App = getApp();
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    summarys: [],
    endline: false,
    pageNum: 1,
    name: ''
  },
  onLoad(options) {
    that = this;
  },
  onShow() {
    App.watch(function (value) {
      console.log("onShow", value);
      if (value.login && value.auth) {
        that.getSummaryPage(1, '');
      }
    })
  },
  getSummaryPage(pageNum, name) {
    Api.summaryPage({
      pageNum: pageNum,
      pageSize: 10,
      name: name
    }).then(res => {
      let summarys = [];
      that.setData({
        summarys: summarys.concat(res.data.content),
        endline: res.data.last,
        pageNum: pageNum,
        name: name
      }, err => {
        console.log(err);
      })
    });

  },
  onReachBottom() {
    let endline = that.data.endline;
    let name = that.data.name;
    if (!endline) {
      let pageNum = that.data.pageNum + 1;
      that.getSummaryPage(pageNum, name);
    }
  },
})