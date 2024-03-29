var that;
const app = getApp()
import Api from '../../config/api';
import CustomPage from '../../CustomPage';
import WxValidate from '../../utils/WxValidate';
CustomPage({
  data: {
    titleArr: [],
    pickerIndex: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]],
    pickerData: [{
      parent: "功能及体态评估",
      title: "面接印象",
      checks: ['情绪正常', '焦虑', '抑郁'],
    }, {
      parent: "功能及体态评估",
      title: "阴道膨出",
      checks: ['是', '否'],
    }, {
      parent: "功能及体态评估",
      title: "阴道结节",
      checks: ['是', '否'],
    }, {
      parent: "功能及体态评估",
      title: "阴道瘢痕",
      checks: ['是', '否'],
    }, {
      parent: "功能及体态评估",
      title: "压力性尿失禁",
      checks: ['无', 'Ⅰ度（咳嗽/喷嚏/大笑）', 'Ⅱ度（行走/上楼梯）', 'Ⅲ度（站立）'],
    }, {
      parent: "功能及体态评估",
      title: "盆底肌肌力",
      checks: ['正常', '下降', '紧张'],
    }, {
      parent: "功能及体态评估",
      title: "耻骨联合分离",
      checks: ['正常', '分离'],
    }, {
      parent: "功能及体态评估",
      title: "姿势评价",
      checks: ['骨盆正常', '骨盆前倾', '骨盆后倾', '骨盆左倾', '骨盆右倾'],
    }, {
      parent: "功能及体态评估",
      title: "呼吸模式",
      checks: ['胸式呼吸', '腹式呼吸', '混合式呼吸'],
    }, {
      parent: "功能及体态评估",
      title: "睡眠",
      checks: ['失眠', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "左上肢-上臂",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "左上肢-前臂",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "左大腿-前",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "左大腿-后",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "左大腿-内",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "左大腿-外",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "右上肢-上臂",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "右上肢-前臂",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "右大腿-前",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "右大腿-后",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "右大腿-内",
      checks: ['紧张', '正常'],
    }, {
      parent: "肌肉力量评估",
      title: "右大腿-外",
      checks: ['紧张', '正常'],
    }
    ],
    multiArray: [['无', '膀胱', '子宫', '直肠'], ['无', '轻度', '中度', '重度']],
    multiIndex: [],
    formData: {}
  },

  onLoad(options) {
    that = this;
    that.initValidate();
  },
  initValidate() {
    let rules = { "面接印象": { "required": true }, "阴道结节": { "required": true }, "阴道瘢痕": { "required": true }, "压力性尿失禁": { "required": true }, "盆底肌肌力": { "required": true }, "盆底肌": { "required": true }, "耻骨联合分离": { "required": true }, "姿势评价": { "required": true }, "呼吸模式": { "required": true }, "睡眠": { "required": true }, "脏器脱垂": { "required": true }, "会阴区痛": { "required": true }, "腹直肌分离": { "required": true }, "腰痛": { "required": true }, "腰围": { "required": true }, "睡眠时长": { "required": true }, "近期目标": { "required": true }, "远期目标": { "required": true }, "居家宣教": { "required": true }, "康复计划": { "required": true }, "家庭作业": { "required": true }, "左上肢-上臂": { "required": true }, "左上肢-前臂": { "required": true }, "左大腿-前": { "required": true }, "左大腿-后": { "required": true }, "左大腿-内": { "required": true }, "左大腿-外": { "required": true }, "右上肢-上臂": { "required": true }, "右上肢-前臂": { "required": true }, "右大腿-前": { "required": true }, "右大腿-后": { "required": true }, "右大腿-内": { "required": true }, "右大腿-外": { "required": true }, "二类肌肌力(PⅡ)": { "required": true }, "一类肌肌力(P I)": { "required": true }, "募集时间": { "required": true }, "疲劳度": { "required": true }, "报告": { "required": true } }, messages = { "面接印象": { "required": "[面接印象]的内容不能为空" }, "阴道结节": { "required": "[阴道结节]的内容不能为空" }, "阴道瘢痕": { "required": "[阴道瘢痕]的内容不能为空" }, "压力性尿失禁": { "required": "[压力性尿失禁]的内容不能为空" }, "盆底肌肌力": { "required": "[盆底肌肌力]的内容不能为空" }, "盆底肌": { "required": "[盆底肌]的内容不能为空" }, "耻骨联合分离": { "required": "[耻骨联合分离]的内容不能为空" }, "姿势评价": { "required": "[姿势评价]的内容不能为空" }, "呼吸模式": { "required": "[呼吸模式]的内容不能为空" }, "睡眠": { "required": "[睡眠]的内容不能为空" }, "脏器脱垂": { "required": "[脏器脱垂]的内容不能为空" }, "会阴区痛": { "required": "[会阴区痛]的内容不能为空" }, "腹直肌分离": { "required": "[腹直肌分离]的内容不能为空" }, "腰痛": { "required": "[腰痛]的内容不能为空" }, "腰围": { "required": "[腰围]的内容不能为空" }, "睡眠时长": { "required": "[睡眠时长]的内容不能为空" }, "近期目标": { "required": "[近期目标]的内容不能为空" }, "远期目标": { "required": "[远期目标]的内容不能为空" }, "居家宣教": { "required": "[居家宣教]的内容不能为空" }, "康复计划": { "required": "[康复计划]的内容不能为空" }, "家庭作业": { "required": "[家庭作业]的内容不能为空" }, "左上肢-上臂": { "required": "[左上肢-上臂]的内容不能为空" }, "左上肢-前臂": { "required": "[左上肢-前臂]的内容不能为空" }, "左大腿-前": { "required": "[左大腿-前]的内容不能为空" }, "左大腿-后": { "required": "[左大腿-后]的内容不能为空" }, "左大腿-内": { "required": "[左大腿-内]的内容不能为空" }, "左大腿-外": { "required": "[左大腿-外]的内容不能为空" }, "右上肢-上臂": { "required": "[右上肢-上臂]的内容不能为空" }, "右上肢-前臂": { "required": "[右上肢-前臂]的内容不能为空" }, "右大腿-前": { "required": "[右大腿-前]的内容不能为空" }, "右大腿-后": { "required": "[右大腿-后]的内容不能为空" }, "右大腿-内": { "required": "[右大腿-内]的内容不能为空" }, "右大腿-外": { "required": "[右大腿-外]的内容不能为空" }, "二类肌肌力(PⅡ)": { "required": "[二类肌肌力(PⅡ)]的内容不能为空" }, "一类肌肌力(P I)": { "required": "[一类肌肌力(P I)]的内容不能为空" }, "募集时间": { "required": "[募集时间]的内容不能为空" }, "疲劳度": { "required": "[疲劳度]的内容不能为空" }, "报告": { "required": "请上传报告图片" } };
    that.WxValidate = new WxValidate(rules, messages);
  },

  pickerChange(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let formData = that.data.formData;
    let pickerData = that.data.pickerData;
    formData[dataset.title] =
    {
      ...dataset,
      type: 'picker',
      check: pickerData[dataset.index]['checks'][e.detail.value],
      index: e.detail.value
    };
    that.setData({
      formData: formData
    })
  },
  multiPickerChange(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let formData = that.data.formData;
    console.log(formData);
    let val = e.detail.value;
    let multiArray = that.data.multiArray;
    console.log(multiArray[0][val[0]]);
    console.log(multiArray[1][val[1]]);
    let check = multiArray[0][val[0]] + '-' + multiArray[1][val[1]];
    console.log(check)
    formData[dataset.title] = {
      ...dataset,
      type: 'multiPicker',
      check: check,
      index: val
    };
    that.setData({
      formData: formData,
      multiIndex: val
    });
  },
  radioChange(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let formData = that.data.formData;
    formData[dataset.title] = {
      ...dataset,
      type: 'radio',
      check: e.detail.value,
      des: ''
    };
    that.setData({
      formData: formData
    })
  },
  checkboxChange(e) {
    console.log(e);
    let val = e.detail.value;
    let dataset = e.currentTarget.dataset;
    let formData = that.data.formData;
    formData[dataset.title] = {
      ...dataset,
      type: 'checkbox',
      check: val.join(",")
    };
    that.setData({
      formData: formData
    })
  },
  inputChange(e) {
    console.log(e);

    let val = e.detail.value; if (!val) return;
    let dataset = e.currentTarget.dataset;

    let formData = that.data.formData;

    if (val < parseFloat(dataset.min) || parseFloat(dataset.max) < val) {
      formData[dataset.title] = formData[dataset.title] || {};
      delete formData[dataset.title];
      that.setData({
        formData: formData
      })
      return that.showTips("范围错误");
    }

    formData[dataset.title] = formData[dataset.title] || {};
    formData[dataset.title]['des'] = val;
    formData[dataset.title]['title'] = dataset.title;
    formData[dataset.title]['check'] = dataset.check;
    formData[dataset.title]['type'] = dataset.type;
    formData[dataset.title]['desVal'] = dataset.des.replace('{val}', val);
    that.setData({
      formData: formData
    })
    console.log(that.data.formData)
  },
  async addImg(e) {
    console.log(e);
    let dataset = e.currentTarget.dataset;
    let formData = that.data.formData;

    let fileRes = await wx.chooseMedia({
      count: 1,
      mediaType: "image",
    });
    console.log(fileRes)
    Api.uploadFile(fileRes.tempFiles[0].tempFilePath).then(res => {
      formData[dataset.title] = { ...dataset, pic: res.data };
      that.setData({
        formData: formData
      })
    }, err => {
      that.showTips(err.msg);
    });

  },
  submit() {
    let formData = that.data.formData;
    if (!that.WxValidate.checkForm(formData)) {
      let error = that.WxValidate.errorList[0]
      that.showTips(error.msg)
      return false;
    }
    wx.showModal({
      title: '确认提醒',
      content: '确认将此评估报告提交推送给客户?',
      complete: (res) => {
        if (res.confirm) {
          Api.puerperalAssessAdd({
            patientId: that.data.options.id,
            content: {
              data: Object.values(formData)
            }
          }).then(res => {
            wx.navigateBack();
          }, err => {
            that.showTips(err.msg);
          });
        }
      }
    })



  }
})