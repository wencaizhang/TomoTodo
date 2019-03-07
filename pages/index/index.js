//index.js
//获取应用实例
const app = getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    timer: 0,
    seconds: 25 * 60,
    timeStr: '25',
    isStart: false,
  },
  handleClick () {
    let isStart = this.data.isStart;

    if (isStart) {
      Dialog.alert({
        title: '放弃番茄',
        message: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
        showCancelButton: true,
      }).then(() => {
        this.handleStop();
        this.setData({
          isStart: !isStart,
        })
      }).catch((e) => {
        console.log(e);
      });
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
    this.setData({
      seconds: 25 * 60,
      timeStr: '25',
    })
  },
  handleStart () {
    let timer = setInterval(() => {
      let seconds = this.data.seconds - 1;
      if (seconds === 0) {
        this.handleFinish();
      }
      let timeStr = parseInt(seconds / 60) + ':' + seconds % 60
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
