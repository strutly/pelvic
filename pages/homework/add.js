var that, timerId;
const App = getApp()
import Api from '../../config/api';
import Util from '../../utils/util';
import CustomPage from '../../CustomPage';
CustomPage({
  data: {
    record: {},
    homeWorks: [],
    missions: {},
    mask: false,
    multiIndex: ['', ''],
    multiArray: [[], []],
    timeList: Util.timeList()
  },
  onLoad(options) {
    that = this;
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e);
    let index = e.currentTarget.dataset.index;
    let homeWorks = that.data.homeWorks;
    let multiArray = that.data.multiArray;
    let missions = that.data.missions;
    let value = e.detail.value;
    let parent = multiArray[0][value[0]];
    let title = multiArray[1][value[1]];
    let mission = missions[parent].find(item => item.name == title);
    homeWorks[index] = {
      ...homeWorks[index],
      id: mission.id,
      description: mission.description,
      title: mission.name,
    }
    that.setData({
      homeWorks: homeWorks
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log(e);
    let detail = e.detail;
    let multiArray = that.data.multiArray;
    let missions = that.data.missions;
    console.log()
    if (detail.column === 0) {
      multiArray[1] = missions[multiArray[0][detail.value]].map(item => item.name);
      console.log(multiArray);
      that.setData({
        multiArray: multiArray,
        multiIndex: [detail.value, 0],
      })
    }
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
        });

        Api.missionGroupBy().then(res => {
          console.log(res);
          let missions = res.data;
          let multiArray = [[], []];
          multiArray[0] = Object.keys(missions);
          multiArray[1] = missions[multiArray[0][0]].map(item => item.name);
          that.setData({
            missions: missions,
            multiArray: multiArray,
          })
        })
      }
    })
  },
  inputChange(e) {
    console.log(e);

    let missions = that.data.missions;
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;

    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(async () => {
      let filters = missions.filter(item => {
        return item.name.indexOf(value) > -1 || item.missionType.name.indexOf(value) > -1
      });
      let homeWorks = that.data.homeWorks;
      let mask = false;
      if (value && filters.length > 0) {
        mask = true;
        homeWorks[index].missions = filters;
      } else {
        homeWorks[index].id = '';
      }
      homeWorks[index].title = value;
      that.setData({
        homeWorks: homeWorks,
        mask: mask
      })
    }, 300);
  },
  textareaChange(e) {
    console.log(e);
    let homeWorks = that.data.homeWorks;
    let dataset = e.currentTarget.dataset;
    homeWorks[dataset.index]['description'] = e.detail.value;
    that.setData({
      homeWorks: homeWorks
    })
  },
  add() {
    let homeWorks = that.data.homeWorks;
    let timeList = that.data.timeList;
    homeWorks.push({
      id: '',
      title: '',
      description: '',
      timeList: timeList.map(item => {
        return { ...item, checked: false };
      })
    })
    that.setData({
      homeWorks: homeWorks
    })
  },
  timeCheck(e) {
    console.log(e);
    let homeWorks = that.data.homeWorks;
    let dataset = e.currentTarget.dataset;
    homeWorks[dataset.j].timeList[dataset.k].checked = !homeWorks[dataset.j].timeList[dataset.k].checked;
    that.setData({
      homeWorks: homeWorks
    })
  },
  checkMission(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let homeWorks = that.data.homeWorks;
    homeWorks[dataset.j].id = dataset.id;
    homeWorks[dataset.j]['description'] = dataset.des;
    homeWorks[dataset.j]['missions'] = null;
    homeWorks[dataset.j]['title'] = dataset.title;
    that.setData({
      homeWorks: homeWorks,
      mask: false
    })
  },
  cancle(e) {
    let index = e.currentTarget.dataset.index;
    let homeWorks = that.data.homeWorks;
    homeWorks.splice(index, 1);
    that.setData({
      homeWorks: homeWorks
    })
  },
  checkForm() {
    let homeWorks = that.data.homeWorks;
    try {
      homeWorks.forEach((item, i) => {
        if (!item.id) throw new Error('请输入' + (i + 1) + '项的作业内容并选择');
        if (item.timeList.filter(time => time.checked).length == 0) throw new Error('请选择第' + (i + 1) + '项的完成时间');
      })
    } catch (error) {
      that.showTips(error.message);
      return false;
    }
    return true;
  },
  submit() {
    if (that.checkForm()) {
      let homeWorks = that.data.homeWorks;
      homeWorks = homeWorks.map(item => {
        let times = item.timeList.filter(time => time.checked).map(time => time.time);
        return {
          mid: item.id,
          demand: item.description,
          times: times
        }
      });
      Api.homeWorkAdd({
        serviceRecordId: that.data.options.id,
        homeWorks: homeWorks
      }).then(res => {
        wx.navigateBack();
      }, err => {
        that.showTips(err.msg);
      });
    }
  }

})