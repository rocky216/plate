export const option = {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['排产工作时长', '计划性加班时长']
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
          name: '排产工作时长',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
          name: '计划性加班时长',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
      },
  ]
};