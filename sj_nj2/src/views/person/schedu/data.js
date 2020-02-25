export const option = {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['排产工作时长','计划性加班时长', ]
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
    data: [],
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
          name: '计划性加班时长',
          type: 'line',
          data: []
      },
      {
          name: '排产工作时长',
          type: 'line',
          data: []
      },
  ]
};