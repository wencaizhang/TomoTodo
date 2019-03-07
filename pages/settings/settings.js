// pages/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentValue: 30,
  },
  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  },
  onChange () {

  },
})