//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    timer: 0,
    seconds: 0,
    timeStr: '',
    isStart: false,
    settings: {
      workTime: 25,
      restTime: 5,
      ringing: true,
    }
  },
  onLoad () {
    this.updateSettings();
    this.initTime();
  },
  updateSettings () {
    const settings = app.globalData.settings
    this.setData({ ...settings })
  },
  initTime () {
    const settings = this.data.settings;
    this.setData({
      timeStr: settings.workTime,
      seconds: settings.workTime * 60
    })
  },
  handleClick () {
    const self = this;
    let isStart = this.data.isStart;

    if (isStart) {
      wx.showModal({
        title: '放弃番茄',
        content: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
        success(res) {
          if (res.confirm) {
            self.handleStop();
            self.setData({
              isStart: !isStart,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      this.handleStart();
      this.setData({
        isStart: !isStart,
      })
    }


  },
  handleStop () {
    let timer = this.data.timer;
    clearInterval(timer);
    this.initTime();
  },
  handleNumberParse (n) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  },
  handleStart () {
    this.updateSettings();
    let timer = setInterval(() => {
      let seconds = this.data.seconds - 1;
      if (seconds === 0) {
        this.handleFinish();
      }
      let timeStr = this.handleNumberParse(parseInt(seconds / 60)) + ' : ' + this.handleNumberParse(seconds % 60);
      this.setData({
        seconds,
        timeStr
      })
    }, 1000)
    this.setData({
      timer,
    })
  },
  
  handleFinish () {
    Dialog.alert({
      title: '完成番茄',
      message: '您已经完成了一个番茄工作时间中，要放弃这个番茄吗？',
    }).then(() => {
      this.handleStop();
      this.setData({
        isStart: !isStart,
      })
    }).catch((e) => {
      console.log(e);
    });
  }
})
