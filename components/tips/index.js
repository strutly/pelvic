Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    errorType: {
      type: String,
      value: 'error',
      observer: '_typeChange'
    },
    errorShow: {
      type: Boolean,
      value: false,
      observer: '_showChange'
    },
    errorMsg: {
      type: String,
      value: ''
    },
    delay: {
      type: Number,
      value: 1500
    },
    extClass: {
      type: String,
      value: ''
    }
  },
  data: {
    typeClassMap: {
      warn: 'weui-toptips_warn',
      info: 'weui-toptips_info',
      success: 'weui-toptips_success',
      error: 'weui-toptips_error'
    }
  },

  attached() {
    const data = this.data;
    this.setData({
      className: data.typeClassMap[data.errorType] || ''
    });
  },

  methods: {
    _typeChange(newVal) {
      this.setData({
        className: this.data.typeClassMap[newVal] || ''
      });
      return newVal;
    },

    _showChange(newVal) {
      this._showToptips(newVal);
    },

    _showToptips(newVal) {
      
      if (newVal && this.data.delay) {
        setTimeout(() => {
          this.setData({
            errorShow: false
          }, () => {
            // tooltips 隐藏了，触发 hide 事件
            this.triggerEvent('hide', {}, {});
          });
        }, this.data.delay);
      }

      this.setData({
        errorShow: newVal
      });
    }

  }
});