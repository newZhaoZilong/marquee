//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current:0,
    direction:'left',
    duration:3,
    marqueeList:[
      {
        id:1,
        content:'我是第一句跑马灯我是第一句跑马灯我是第一句跑马灯跑马灯我是第一句跑马灯我是第一句跑马灯',
        stayTime:2,
      },
      {
        id: 2,
        content: '我是第二句跑马灯我是第二句跑马灯我是第二句跑马灯我是第二句跑马灯',
        stayTime: 3
      },
      {
        id: 3,
        content: '我是第三句跑马灯',
        stayTime: 4
      },
      {
        id: 4,
        content: '我是第四句跑马灯',
        stayTime: 5
      }
    ]
  },

  onLoad(){
    // this.executeMarquee();
  },

})
