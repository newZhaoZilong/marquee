// components/marquee.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //跑马灯对象数组
    //对象有三个字段,分别是id,content,delay
    marqueeList: {
      type: Array,
      observer: function() {
        // console.log('有值了');
        this.startMarquee();
      }
    },
    //当前角标
    current: {
      type: Number,
      value: 0
    },
    //滑动时间
    duration: {
      type: Number,
      value: 3
    },
    //滑动方向
    direction: {
      type: String,
      value: 'left'
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      // this.executeAnimation();
      if (this.data.isNotFirst && this.data.marqueeList.length > 0) {
        this.data.isStop = false;
        this.startMarquee();
      }
      this.data.isNotFirst = true;
    },
    hide: function() {
      // 页面被隐藏
      // console.log('清除计时器', this.data.marqueeTimeoutId, this.data.animationTimeoutId);
      this.stopMarquee();
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 执行跑马灯,跑马灯的等待时间根据条目的delay的值变化
     */
    startMarquee() {
      clearTimeout(this.data.marqueeTimeoutId);
      var interval = this.data.marqueeList[this.data.current].delay * 1000 || 3000;
      if (!this.data.isStop) {
        this.data.marqueeTimeoutId = setTimeout(() => {
          this.executeAnimation(this.data.direction);
        }, interval);
      }
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
        // console.log('executeAnimation');
        //准备就绪后开始执行动画，将当前元素向左移动,将下一个元素移动到中间
        //这里不加个延时器手机上就可能有bug,
        if (!this.data.isStop) {
          this.data.animationTimeoutId = setTimeout(() => {
            this.setData({
              currentClass: currentClass,
              nextClass: 'moveto-center'
            })
          }, 500);
        }

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
        // console.log('transitionend')
        //将当前的next元素转化为current元素,前提是清除了transform样式,否则转换的过程中nextClass变成了currentClass会造成元素
        //移动,动画结束,先清除样式,再调整当前current位置
        this.setData({
          current: this.data.nextIndex,
        })
        this.startMarquee();
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
    },
    /**
     *停止跑马灯 
     */
    stopMarquee() {
      // console.log('停止计时器');
      clearTimeout(this.data.marqueeTimeoutId);
      clearTimeout(this.data.animationTimeoutId);
      this.data.isStop = true;
    }
  }
})