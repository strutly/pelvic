var that, callBack;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
const recorderManager = wx.getRecorderManager();

CustomPage({

  data: {
    voiceIndex: 0
  },

  async onLoad(options) {
    that = this;
    that.detail();
  },
  async detail() {
    let res = await Api.voiceprintDetail();
    console.log(res);
    that.setData({
      voiceprint: res.data
    })
  },
  async create() {
    let res = await Api.voiceprintTrainingGet({
      textType: "TWO"
    });
    if (res.code == 0) {
      that.setData({
        trainingText: res.data,
        voiceIndex: 0,
        modalvoiceprint: true
      })
    }
    console.log(res);
  },
  async verif(){
    let res = await Api.voiceprintVerif();
    if (res.code == 0) {
      that.setData({
        trainingText: res.data,
        voiceIndex: 0,
        modalverif: true
      })
    }
  },
  verifStart(){
    recorderManager.start({
      format: "wav",
      sampleRate: 16000,
      numberOfChannels: 1
    });
    that.setData({
      start: true
    })
    callBack = async function (res) {
      Api.voiceprintScore({
        filePath: res.tempFilePath,
        sessionId: that.data.trainingText.session_id,
        sid: that.data.trainingText.sid
      }).then(resp=>{
        console.log(resp);
        let data = JSON.parse(resp.data);
        console.log(data);
        if(data.code==0){
          that.showTips("验证成功","success");          
        }else{
          that.showTips(data.msg);
        }
        that.setData({
          modalverif:false
        })
      })
    }
  },


  async onTouchStart() {
    console.log(1);
    recorderManager.start({
      format: "wav",
      sampleRate: 16000,
      numberOfChannels: 1
    });
    that.setData({
      start: true
    })

    callBack = function (res) {
      console.log(res);
      let trainingText = that.data.trainingText;
      let voiceIndex = parseInt(that.data.voiceIndex) + 1;
      let last = trainingText.text.length == voiceIndex ? 1 : 0;
      Api.voiceprintUpload({
        filePath: res.tempFilePath,
        sessionId: that.data.trainingText.session_id,
        sid: that.data.trainingText.sid,
        voiceIndex: voiceIndex,
        last: last
      }).then(resp => {
        console.log(resp);
        let data = JSON.parse(resp.data);
        console.log(data);
        if(data.code==0){
          that.setData({
            voiceIndex: voiceIndex,
            modalvoiceprint: last ? false : true
          })
          if (data.data.reserve) {
            that.setData({
              voiceprint: data.data
            })
            that.showTips("声纹锁创建成功", "success");
          } else {
            if(last){
              that.showTips("声纹锁创建失败,请重新再试");
            }else{
              that.showTips("请继续~","info");
            }
          }
        }else{
          that.showTips(data.msg);
        }        
      })
    }
  },
  onTouchEnd() {
    console.log(2)
    recorderManager.stop();
    that.setData({
      start: false
    });
    recorderManager.onStop(function (res) {
      console.log(res);
      const { tempFilePath } = res;
      console.log(tempFilePath);
      if (callBack) {
        callBack(res);
      }
    });
  },
  async delete(){
    let res = await Api.voiceprintDelete();
    console.log(res);
    if(res.code==0){
      that.showTips("删除成功","success");
      that.setData({
        modaldelete:false,
        voiceprint:res.data
      })
    }else{
      that.showTips(res.msg);
    }
  }
})