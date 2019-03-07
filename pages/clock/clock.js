// pages/canvas/canvas.js

Page({
  data: {
    // 控制progress
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器
    progress_txt: '倒计时开始', // 提示文字
    totalSeconds: 60,
    // totalSeconds: 25 * 60,

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
  onLoad (options) {
    const { circle, progress } = this.data;
    this.setData({
      progress: Object.assign({}, circle, progress)
    })
    this.drawCircle(circle);  //绘制背景
    this.startProgress();  //开始progress
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

  /**
   * 开始progress
   */
  startProgress () {
    this.setData({
      count: 0
    });
    // 开始倒计时 定时器每1000毫秒执行一次，计数器 count+1 ,耗时 totalSeconds 绘一圈
    let countTimer = setInterval(() => {
      let { totalSeconds, count } = this.data;
      if (this.data.count <= totalSeconds) {
        /**
         * 绘制彩色圆环进度条
         * 计算进度，完整的圆是 2 * Math.PI，那么当前进度就是：已经完成的倒计时 / 全部时间 * 2
         */

        const step = this.data.count / totalSeconds * 2;
        this.setData({
          progress: Object.assign({}, this.data.progress, { eAngle: (step - 0.5) * Math.PI} ),
          count: count + 1,
          progress_txt: totalSeconds - count - 1
        })
        this.drawCircle(this.data.progress)
      } else {
        clearInterval(this.data.countTimer);
        this.startProgress();
      }
    }, 1000)

    this.setData({ countTimer })
  },

})