var that, interval;
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
import Util from '../../utils/util';
CustomPage({

  data: {
    serve: {},
    serveTime: "服务未开始",
    feedbacks: [{ title: '配合不佳', choose: false }, { title: '情绪不佳', choose: false }, { title: '反应良好', choose: false }, { title: '修复效果明显', choose: false }],
    modalServer: false,
    conclusion: "输入服务中的问题",
    pic: ''
  },

  async onLoad(options) {
    that = this;
    that.showData();
  },
  async showData() {
    let res = await Api.setmealServiceDetail({ id: that.data.options.id });
    console.log(res);
    that.setData({
      serve: res.data
    })
    that.serveTime(res.data);
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
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
  onUnload() {
    if (interval) clearInterval(interval);
  },
  async start() {
    let startTime = Util.formatTime(new Date());
    let res = await Api.setmealServiceUpdate({
      id: that.data.options.id,
      startTime: startTime
    })
    if (res.code == 0) {
      that.showTips("操作成功,计时开始", "success");
      that.showData()
    }
    console.log(res);
  },
  async end() {

    let res = await Api.setmealServiceUpdate({
      id: that.data.options.id,

    })
    console.log(res);
    if (res.code == 0) {
      that.showTips("操作成功,服务结束", "success");
      that.showData()
    }
  },
  chooseFeed(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let feedbacks = that.data.feedbacks;
    feedbacks[index].choose = !feedbacks[index].choose;
    let conclusion = feedbacks.filter(item => {
      return item.choose
    }).map(item => item.title).join(",");
    console.log(conclusion)
    that.setData({
      feedbacks: feedbacks,
      conclusion: conclusion
    })
  },
  async serveEnd() {
    let serve = that.data.serve;
    let pic = that.data.pic;
    if (serve.needPic && !pic) return that.showTips("请拍摄按摩仪的评估照片病上传");
    let feedbacks = that.data.feedbacks;
    let conclusion = feedbacks.filter(item => {
      return item.choose
    }).map(item => item.title).join(",");
    console.log(conclusion);
    serve.setmealDetailItems.forEach(item => {
      if (item.finish==undefined) {
        item.finish = true;
      }
    })
    console.log({
      id: that.data.options.id,
      conclusion: conclusion,
      pic: pic,
      endTime: Util.formatTime(new Date()),
      setmealDetailItems: serve.setmealDetailItems
    })

    let res = await Api.setmealServiceUpdate({
      id: that.data.options.id,
      conclusion: conclusion,
      pic:pic,
      endTime: Util.formatTime(new Date()),
      setmealDetailItems:serve.setmealDetailItems
    })
    if (res.code == 0) {
      that.showTips("评论成功","success");
      that.setData({
        modalServer: false
      })
      that.showData();
      setTimeout(() => {
        that.back();
      }, 1500);

    }
  },
  checkboxChange(e) {
    console.log(e);
    let serve = that.data.serve;
    serve.setmealDetailItems[e.currentTarget.dataset.index].finish = e.detail.value[0]||false;
    that.setData({
      serve: serve
    })
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
        that.setData({
          pic: res.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})