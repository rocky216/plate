export const optionOverStatis1 = { //给每个饼图模块添加颜色
  color: ['#7bca61', '#68d1da'],
  title:{
      text: ""
  },
  grid:{
    top: 0,
    bottom:0,
    height: 100
  },
  series: [ //添加一个模型
      {
          type: 'pie', //模型的类型（饼图，柱状图等）
          radius: '61%',//半径
          clockwise: false,//饼图是否顺时针排列
          center: ['50%', '50%'],//圆心的位置
          data: [
              {
                  value: 5,
                  name: '正常上班时长'
              },
              {
                  value: 8,
                  name: '总加班时长'
              },
          ],
          itemStyle: {//鼠标移到图标上的效果
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          },
          label: {
    　　　　normal : {
    　　　　　　formatter: '{b}({d}%)',
    　　　　　　textStyle : {
    　　　　　　　　fontWeight : 'normal',
    　　　　　　　　fontSize : 12
    　　　　　　}
    　　　　}
          }
      },
      
  ]
}

export const optionOverStatis2 = { //给每个饼图模块添加颜色
  color: ['#7bca61', '#68d1da'],
  title:{
      text: ""
  },
  grid:{
    top: 0,
    bottom:0,
    height: 100
  },
  series: [ //添加一个模型
      {
          type: 'pie', //模型的类型（饼图，柱状图等）
          radius: '60%',//半径
          clockwise: false,//饼图是否顺时针排列
          center: ['50%', '50%'],//圆心的位置
          data: [
              {
                  value: 5,
                  name: '计划内上班时长'
              },
              {
                  value: 8, 
                  name: '非计划加班时长'
              },
          ],
          itemStyle: {//鼠标移到图标上的效果
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          },
          label : {
    　　　　normal : {
    　　　　　　formatter: '{b}({d}%)',
    　　　　　　textStyle : {
    　　　　　　　　fontWeight : 'normal',
    　　　　　　　　fontSize : 12
    　　　　　　}
    　　　　}
          }
      },
      
  ]
}



export const optionTrendPie = { //给每个饼图模块添加颜色
  color: ['#7bca61', '#68d1da', '#61c1e6',  '#f4cb4d'],
  title:{
      text: ""
  },
  grid:{
    top: 0,
    bottom:0,
    height: 100
  },
  series: [ //添加一个模型
      {
          type: 'pie', //模型的类型（饼图，柱状图等）
          radius: '80%',//半径
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
          },
          label : {
    　　　　normal : {
    　　　　　　formatter: '{b}({d}%)',
    　　　　　　textStyle : {
    　　　　　　　　fontWeight : 'normal',
    　　　　　　　　fontSize : 12
    　　　　　　}
    　　　　}
          }
      },
      
  ]
}



export const optionTrend = {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['计划上班时长', '计划加班时长', '实际上班时长', '非计划加班时长', '总加班时长']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLabel: {
      interval:0,  
      rotate:30,
      textStyle:{
        fontSize: 12
      }
    }
  },
  yAxis: {
      type: 'value'
  },
  series: [
    {
        name: '计划上班时长',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: '计划加班时长',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '实际上班时长',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '非计划加班时长',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '总加班时长',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
  ]
};


export const option = {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['请假人次', '旷工人次', '迟到人次']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLabel: {
      interval:0,  
      rotate:30,
      textStyle:{
        fontSize: 12
      }
    }
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: '请假人次',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
          name: '旷工人次',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '迟到人次',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
  ]
};

export const optionRate = {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
    data: ['请假率', '旷工率', '迟到率']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLabel: {
      interval:0,  
      rotate:30,
      textStyle:{
        fontSize: 12
      }
    }
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: '请假率',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
          name: '旷工率',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '迟到率',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
  ]
};