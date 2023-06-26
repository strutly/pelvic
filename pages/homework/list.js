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
      console.log("onReady", value);
      if (value.login && value.auth) {
        that.getHomeWorkPage(1, '');
      }
    })
  },
  getHomeWorkPage(pageNum, name) {
    Api.homeWorkPage({
      pageNum: pageNum,
      pageSize: 10,
      name: name
    }).then(res => {
      let homeWorks = that.data.homeWork || [];
      that.setData({
        homeWorks: homeWorks.concat(res.data.content),
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
      that.getHomeWorkPage(pageNum, name);
    }
  },
})