var that;
const App = getApp()
import Api from '../../config/api';
import Util from '../../utils/util';
import CustomPage from '../../CustomPage';
CustomPage({

  data: {
    trainProgramMap: {},
    record: {},
    modalTrain: false,
    trainValue: {},
    imgList: [],
    trainCheckMap: {}
  },

  onLoad(options) {
    that = this;
  },

  onReady() {
    App.watch(function (value) {
      console.log("onReady", value);
      if (value.login && value.auth) {
        Api.serviceRecordDetail({ id: that.data.options.id }).then(res => {
          console.log(res);
          let record = res.data;
          let serves = record.summaryDetail.serves;
          record.serves = Util.groupBy(serves,'parent');
          that.setData({
            record: record
          });
        })
      }
    })
  },
})