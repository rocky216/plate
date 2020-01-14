export const option = { //给每个饼图模块添加颜色
  color: ['#7bca61', '#68d1da', '#61c1e6',  '#f4cb4d'],
  grid:{
    top: 0,
    bottom:0,
    height: 100
  },
  series: [ //添加一个模型
      {
          type: 'pie', //模型的类型（饼图，柱状图等）
          radius: '55%',//半径
          clockwise: false,//饼图是否顺时针排列
          center: ['50%', '50%'],//圆心的位置
          data: [
              {
                  value: 5,
                  name: '请假人次'
              },
              {
                  value: 8,
                  name: '迟到人次'
              },
              {
                  value: 6,
                  name: '正常人次'
              },
              {
                  value: 7,
                  name: '旷工人次'
              }
          ],
          itemStyle: {//鼠标移到图标上的效果
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      },
      
  ]
}