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
  async getSummaryPage(pageNum, name) {
    try {
      let res = await Api.summaryPage({
        pageNum: pageNum,
        pageSize: 10,
        name: name
      });
      console.log(res);
      if (res.code == 0) {
        let summarys = [];
        that.setData({
          summarys: summarys.concat(res.data.content),
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
      that.getSummaryPage(pageNum, name);
    }
  },
})