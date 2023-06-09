var that,interval;
const App = getApp()
import Api from '../../config/api';
import Util from '../../utils/util';
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
      console.log("onReady", value);
      if (value.login && value.auth) {
        Api.serviceRecordDetail({id:that.data.options.id}).then(res=>{
          console.log(res);
          that.setData({
            record:res.data
          })
          that.serveTime(res.data);
        })
      }
    })
  },

  serveTime(serve) {
    if (interval) clearInterval(interval);
    console.log(serve);
    if (!serve.startTime) {
      that.setData({
        serveTime: "服务未开始"
      })
    } else if (serve.startTime && serve.endTime) {
      that.setData({
        serveTime: serve.serveTime
      })
    } else {
      interval = setInterval(function () {
        that.setData({
          serveTime: Util.serveTime(serve.startTime)
        })
      }, 1000);
    }
  },
  async serveUpdate(e){
    let type = e.currentTarget.dataset.type;
    let param = {
      id:that.data.options.id,
    };
    let time = Util.formatTime(new Date());
    param[type] = time;
    let res = await Api.serviceRecordUpdate(param);
    that.setData({
      record:res.data
    })
    that.serveTime(res.data);
  },
  toList(){
    wx.reLaunch({
      url: '/pages/appointment/list',
    })
  },
  onUnload() {
    if (interval) clearInterval(interval);
  }
})