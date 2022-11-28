var that;
const app = getApp()
import Api from '../../config/api';
import Util from '../../utils/util';
import CustomPage from '../../CustomPage';
CustomPage({

  /**
   * 页面的初始数据
   */
  data: {
    serve:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that = this;
    that.showData();
  },

  async showData(){
    let res = await Api.setmealServiceDetail({ id: that.data.options.id});
    console.log(res);
    that.setData({
      serve: res.data
    })
    
  },
})