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
        Api.puerperalSetmealRecordDetail({id:that.data.options.id}).then(res=>{
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
    if (!serve.recordInfo.startTime) {
      that.setData({
        serveTime: "服务未开始"
      })
    } else if (serve.recordInfo.startTime && serve.recordInfo.endTime) {
      that.setData({
        serveTime: serve.recordInfo.serveTime
      })
    } else {
      interval = setInterval(function () {
        that.setData({
          serveTime: Util.serveTime(serve.recordInfo.startTime)
        })
      }, 1000);
    }
  },
  serveStart(){
    Api.serviceRecordStart({
      setmealRecordId:that.data.options.id
    }).then(res=>{
      let data = res.data;
      let record = that.data.record;
      record.recordInfo = data;
      record.useTimes += 1;
      that.setData({
        record:record
      })
      that.serveTime(record);
    },err=>{
      console.log(err)
      that.showTips(err.msg);
    });
  },
  serveEnd(e){
    console.log(e);
    Api.serviceRecordUpdate({
      id:e.currentTarget.dataset.id,
      endTime:Util.formatTime(new Date())
    }).then(res=>{
      let record = that.data.record;
      record.recordInfo = res.data;
      that.setData({
        record:record
      })
      that.serveTime(record);
    },err=>{
      that.showTips(err.msg);
    });
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