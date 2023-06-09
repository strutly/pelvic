var that;
const App = getApp()
import Api from '../../config/api';
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
          that.setData({
            record: res.data
          });
        })

        Api.trainProgramMap().then(res => {
          console.log(res);

          that.setData({
            trainProgramMap: res.data
          })

        })
      }
    })
  },

  onShow() {

  },

  checkboxChange(e) {
    console.log(e);
    let trainCheckMap = that.data.trainCheckMap || {};
    let trainProgramMap = that.data.trainProgramMap;
    let key = e.currentTarget.dataset.key;
    let value = e.detail.value;
    console.log(value);

    if (value.length == 0) {
      delete trainCheckMap[key];
    } else {
      let vals = [];
      trainProgramMap[key].forEach(item => {
        console.log(value.includes(item.id));

        if (value.includes(item.id + "")) vals.push(item);
      });
      trainCheckMap[key] = vals;
    }
    that.setData({
      trainCheckMap: trainCheckMap
    })
  },
  pickerChange(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let trainCheckMap = that.data.trainCheckMap;
    let trainValue = that.data.trainValue || {};
    let val = e.detail.value;
    trainCheckMap[dataset.parent][dataset.index].value = trainCheckMap[dataset.parent][dataset.index].optionList[val]
    trainValue[dataset.parent + '-' + dataset.name] = {
      ...dataset,
      value: trainCheckMap[dataset.parent][dataset.index].optionList[val]
    };
    that.setData({
      trainValue: trainValue,
      trainCheckMap: trainCheckMap
    });
  },
  async addPic(e) {
    console.log(e)
    try {
      let fileRes = await wx.chooseMedia({
        count: 1,
        mediaType: "image",
      });

      console.log(fileRes)
      let res = await Api.uploadFile(fileRes.tempFiles[0].tempFilePath);
      console.log(res);
      if (res.code == 0) {
        let imgList = that.data.imgList || []
        that.setData({
          imgList: imgList.concat(res.data)
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  textareaChange(e) {
    console.log(e)
    that.setData({
      summary: e.detail.value
    })
  },
  next(e) {
    let trainCheckMap = that.data.trainCheckMap;
    if (Object.keys(trainCheckMap).length == 0) return that.showTips("请先选择服务项目");
    let name = e.currentTarget.dataset.name;
    that.setData({
      ['modal' + name]: !that.data['modal' + name]
    })
  },
  async submit(e) {
    console.log(e);
    let trainCheckMap = that.data.trainCheckMap;
    try {
      console.log(Object.values(trainCheckMap))
      Object.values(trainCheckMap).forEach(list => {
        list.forEach(item=>{
          console.log(item)
          if(!item.value) throw new Error("请选择服务项"+item.name+"的评级");
        })
      })
    } catch (error) {
      console.log(JSON.stringify(error))
      return that.showTips(error.message);
    }
    let summary = that.data.summary;
    if(!summary) return that.showTips("请输入康复小结");
    let imgList = that.data.imgList;
    let trainValue = that.data.trainValue;
    let res = await Api.serviceRecordUpdate(JSON.stringify({
      id:that.data.options.id,
      summaryDetail:{
        imgList:imgList,
        summary:summary,
        serves:Object.values(trainValue)
      }
    }));
    if(res.code==0){

      console.log(that.data.options.type)
      console.log(!that.data.options.type)
      if(!that.data.options.type){
        wx.reLaunch({
          url: '/pages/appointment/list',
        })
      }else{
        wx.navigateBack();
      }      
    }else{
      that.showTips(res.msg);
    }
  }
})