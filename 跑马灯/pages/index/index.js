//index.js
//获取应用实例
Page({
  data: {
    marqueeList:[
      {
        content:'我是第一句跑马灯我是第一句跑马灯我是第一句跑马灯跑马灯我是第一句跑马灯我是第一句跑马灯',
        delay:2,//停留秒数，不写默认3秒
      },
      {
        content: '我是第二句跑马灯我是第二句跑马灯我是第二句跑马灯我是第二句跑马灯',
        delay: 3
      },
      {
        content: '我是第三句跑马灯',
        delay: 4
      },
      {
        content: '我是第四句跑马灯',
        delay: 5
      }
    ]
  },
})
