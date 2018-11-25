//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
    /**
   * 执行跑马灯,跑马灯的等待时间根据条目的stayTime的值变化
   */
  executeMarquee() {
    clearTimeout(this.data.marqueeTimeoutId);
    var interval = this.data.marqueeList[this.data.current].stayTime * 1000 || 3000;
    this.data.marqueeTimeoutId = setTimeout(() => {
      this.executeAnimation(this.data.direction);
    }, interval);
  },
  /**
   * 执行动画
   */
  executeAnimation(direction) {
    clearTimeout(this.data.animationTimeoutId);
    //首先获取下一个即将移动到中间的view角标
    var nextIndex = this.getNextIndex();
    var nextClass, currentClass;
    if (direction === 'left') {
      nextClass = 'moveto-right', currentClass = 'moveto-left';
    } else if (direction === 'right') {
      nextClass = 'moveto-left', currentClass = 'moveto-right';
    }
    //应该是先添加class使下个元素移动到指定位置，再渲染元素，就是none转为block
    //这个是动画前的准备操作

    this.setData({
      nextClass: nextClass,
      nextIndex: nextIndex,
    }, () => {
      console.log('executeAnimation');
      //准备就绪后开始执行动画，将当前元素向左移动,将下一个元素移动到中间
      //这里不加个延时器手机上就可能有bug,
      this.data.animationTimeoutId = setTimeout(() => {
        this.setData({
          currentClass: currentClass,
          nextClass: 'moveto-center'
        })
      }, 200)
    })
  },

  /**
   * 动画结束后,首先清除添加的class，就是transform样式，transform:translateX(-100%);
   * 对于元素清除transform样式后,除非元素自身携带有类似translateX的样式,否则清除transform样式后，
   * 元素并不会回到中间,这说明transform属性改变的是元素真实的位置,想要还原就需要添加一条
   * transform:translateX(0%);的样式,否则不会还原
   */
  transitionend() {
    // console.log('结束')
    //首先清除transform样式
    this.setData({
      nextClass: null,
      currentClass: null,
    }, () => {
      console.log('transitionend')
      //将当前的next元素转化为current元素,前提是清除了transform样式,否则转换的过程中nextClass变成了currentClass会造成元素
      //移动,动画结束,先清除样式,再调整当前current位置
      this.setData({
        current: this.data.nextIndex,
      })
      this.executeMarquee();
    })
  },

  /**
   * 获取需要准备移动到中间的控件的角标
   */
  getNextIndex() {
    //首先获取当前正中间控件的角标
    var centerIndex = this.data.current;
    var marqueeLength = this.data.marqueeList.length;
    //然后判断一下当前跑马灯方向
    if (this.data.direction === 'left') {
      //跑马灯向左移动
      return (centerIndex + 1) % marqueeLength;
    } else {
      //跑马灯向右移动
      return (centerIndex - 1 + marqueeLength) % marqueeLength;
    }
  }
})
