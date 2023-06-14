var that;
const App = getApp();
import Api from '../../config/api';
import Util from '../../utils/util';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    homeWork:{}
  },

  onLoad(options) {
    that = this;
  },

  onShow() {
    App.watch(function (value) {
      console.log("onReady", value);
      if (value.login && value.auth) {
        Api.homeWorkDetail({
          serviceRecordId:that.data.options.id
        }).then(res=>{
          let homeworks = res.data;
          let map = Util.groupBy(homeworks,'time');
          that.setData({
            homeWork:map
          })
        })


      }
    })
  },

  
})