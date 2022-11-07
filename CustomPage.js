import Api from './config/api';
const CustomPage = function (page) {
  return Page(
    Object.assign({}, page, {
      onLoad(options) {
        this.setData({
          options:options
        });
        page.onLoad && page.onLoad.call(this, options)
      },
      reLoad(){
        this.onLoad(this.data.options)
      },
      onReady(){
        console.log(2)
        this.setData({
          userInfo:wx.getStorageSync('userInfo')
        })
        page.onReady && page.onReady.call(this)
      },
      toUrl(e) {
        console.log(e)
        let url = e.currentTarget.dataset.url;
        let msg = e.currentTarget.dataset.msg||'正在开发中~';
        if (url) {
          wx.navigateTo({
            url: url,
          })
        } else {
          wx.showToast({
            icon: "none",
            title: msg,
          })
        }
      },
      modalStatus(e){
        console.log(e)
        let name = e.currentTarget.dataset.name;
        this.setData({
          ['modal'+name]:!this.data['modal'+name]
        })
      },
      call(e){
        let phone = e.currentTarget.dataset.phone;
        if(phone){
          wx.makePhoneCall({
            phoneNumber: phone
          })
        }else{
          wx.showToast({
            title: '号码不存在',
            icon:'none'
          })
        }        
      },
      phoneChange(e) {
        console.log(e);
        this.setData({
          phone: e.detail.value
        })
      },
      getCode() {
        console.log(12)
        let phone = this.data.phone;
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        console.log(reg.test(phone));
        if (!reg.test(phone)) return this.showTips("请输入正确的手机号");
        Api.getPhoneCode({
          phone: phone
        }).then(res => {
          console.log(res);
        });

        this.timer();
      },
      timer() {
        let that = this;
        let min = 0
        let max = 60;
        let countdown = setInterval(() => {
          if (max > min) {
            max--;
            that.setData({
              countdown: max,
              disabled: true
            })
          } else {
            that.setData({
              disabled: false,
              countdown: "获取验证码"
            })
            clearInterval(countdown);
          }
        }, 1000)
      },
      back() {
        if (getCurrentPages().length > 1) {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      home() {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      },
      viewImage(e) {
        console.log(e)
        wx.previewImage({
          urls: [e.currentTarget.dataset.url],
          current: e.currentTarget.dataset.url
        })
      },
      showTips(msg = "出错了~", errorType = "error") {
        this.setData({
          errorMsg: msg,
          errorType: errorType,
          errorShow: true
        })
      },
      showToast(msg="出错了~"){
        wx.showToast({
          title: msg,
          icon:'none'
        })
      }
    })
  )
}

export default CustomPage