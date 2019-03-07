// pages/settings/settings.js
//获取应用实例
const app = getApp()
Page({
  data: {
    button: {
      size: '',
      loading: false,
      plain: true,
      disabled: false,
    },
    settings: {
      workTime: 25,
      restTime: 5,
      ringing: true,
    }
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: '设置'
    })

    const settings = app.globalData.settings
    this.setData({ ...settings })
  },
  handleCangeWorkTime (e) {
    // 取值方式：原生slider 为 e.detail.value，van-stepper 为 e.detail
    let value = e.detail.value || e.detail;
    const settings = this.data.settings;
    Object.assign(settings, {
      workTime: value
    })
    this.setData({ settings })
  },
  handleChangeRestTime(e) {
    let value = e.detail.value || e.detail;
    const settings = this.data.settings;
    Object.assign(settings, {
      restTime: value
    })
    this.setData({ settings })
  },
  handleChooseImage () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  handleSwitchRinging (e) {
    let value = e.detail.value;
    const settings = this.data.settings;
    Object.assign(settings, {
      ringing: value
    })
    this.setData({ settings })
  },
  handleUpdate () {
    const settings = this.data.settings;
    Object.assign(app.globalData.settings, settings);
    wx.showToast({
      title: '更新成功',
      icon: 'success',
      duration: 2000
    })
    console.log('app.globalData.settings', app.globalData.settings)
  }
})
