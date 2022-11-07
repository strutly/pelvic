Component({
  data: { 
    
  },
  properties: {
    mold:{
      type:Number,
      value:0
    },
    selected:{
      type:Number,
      value:0
    }
  },
  methods: {
    switch(e) {
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})
