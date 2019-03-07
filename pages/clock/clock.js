// pages/canvas/canvas.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 控制progress
    progress_txt: '倒计时开始', // 提示文字
    totalSeconds: 0,  // 倒计时的总共时长（秒）
    countSeconds: 0, // 设置 计数器 初始为0

    countTimer: 0, // 定时器
    isStart: false,
    settings: {
      workTime: 25,
      restTime: 5,
      ringing: true,
    },
    circle: {
      el: 'canvasProgressbg',
      width: 7,  // 圆环的宽度
      color: '#000000',  // 圆环的颜色
      lineCap: 'round',  // 圆环端点的形状
      x: 110,  // 圆心的 x 坐标
      y: 110,  // 圆心的 y 坐标
      r: 80,  // 圆的半径
      sAngle: -0.5 * Math.PI,  // 起始弧度，12 点钟方向
      eAngle: 1.5 * Math.PI,  // 终止弧度
      counterclockwise: false,  // 弧度的方向是否是逆时针
    },
    progress: {
      el: 'canvasProgress',
      color: '#FBE6C7',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // this.setTabBarStyle();
    this.updateSettings();
    this.initTime();
    const { circle, progress } = this.data;
    this.setData({
      progress: Object.assign({}, circle, progress)
    })
    this.drawCircle(circle);  //绘制背景
  },

  setTabBarStyle () {
    wx.setTabBarStyle({
      color: '#fff',
      backgroundColor: '#34343D',
    })
  },

  updateSettings () {
    const settings = app.globalData.settings
    this.setData({ settings })
  },
  initTime () {
    const settings = this.data.settings;
    this.setData({
      progress_txt: settings.workTime,
      totalSeconds: settings.workTime * 60,
      // 假设定时器周期是 1000 毫秒，定时器会在经过一个周期后才执行回调函数
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
    let countTimer = this.data.countTimer;
    clearInterval(countTimer);
    this.initTime();
  },
  handleNumberParse (n) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  },

  handleFinish () {
    const self = this;
    clearInterval(this.data.countTimer);
    wx.showModal({
      title: '完成番茄',
      content: '您已经完成了一个番茄钟',
      success(res) {
        if (res.confirm) {

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 画progress进度
   */
  drawCircle (config) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext(config.el);
    // 设置圆环的宽度
    context.setLineWidth(config.width);
    // 设置圆环的颜色
    context.setStrokeStyle(config.color);
    // 设置圆环端点的形状
    context.setLineCap(config.lineCap)
    //开始一个新的路径
    context.beginPath();
    //设置一个原点 (110,110)，半径为 80 的圆的路径到当前路径，注意 config.eAngle 是在变化的
    context.arc(config.x, config.y, config.r, config.sAngle, config.eAngle, config.counterclockwise);
    //对当前路径进行描边
    context.stroke();
    //开始绘制
    context.draw()
  },

  handleTextParse () {
    let { totalSeconds, countSeconds } = this.data;
    const seconds = totalSeconds - countSeconds;
    let progress_txt = this.handleNumberParse(parseInt(seconds / 60)) + ' : ' + this.handleNumberParse(seconds % 60);
    console.log(progress_txt)
    this.setData({ progress_txt });
  },

  /**
   * 绘制彩色圆环进度条
   * 计算进度，完整的圆是 2 * Math.PI，那么当前进度就是：已经完成的倒计时 / 全部时间 * 2
   */
  handleComputedProgress () {
    let { progress, totalSeconds, countSeconds } = this.data;
    const step = countSeconds / totalSeconds * 2;
    this.setData({
      progress: Object.assign({}, progress, { eAngle: (step - 0.5) * Math.PI} ),
      countSeconds: countSeconds + 1,
    });
    this.handleTextParse();
    if(step !== 0) {
      this.drawCircle(progress)
    }
  },
  handleStart () {
    this.setData({
      countSeconds: 0
    });
    this.updateSettings();
    this.handleTextParse();
    this.handleComputedProgress();
    // 开始倒计时 定时器每1000毫秒执行一次，计数器 countSeconds+1 ,耗时 totalSeconds 绘一圈
    let countTimer = setInterval(() => {
      let { totalSeconds, countSeconds } = this.data;
      if (countSeconds < totalSeconds) {
        this.handleComputedProgress();
      } else {
        this.handleFinish();
      }
    }, 1000)

    this.setData({ countTimer })
  },

})