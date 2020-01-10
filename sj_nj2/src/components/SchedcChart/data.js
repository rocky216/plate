export const option = {
  title: {
    text: '车间周排产计划',
    textStyle: {
        fontSize: 14
    },
    textVerticalAlign: "middle",
    padding: 10
  },
  tooltip: {
    //   trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  legend: {
    bottom:0,
      data: ['晚上工作', '上午工作', '下午工作', '晚餐', '其他时间']
  },
  grid: {
      top: "10%",
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
  },
  xAxis: {
    position:"top",
      type: 'value',
      max: 1440,
      interval: 120,
      axisLabel: {
        formatter: function(value){
          return `${(value/60)>9?value/60:'0'+(value/60)}:00`
        }
      }
  },
  yAxis: {
      type: 'category',
      data: ['11-17','11-16','11-15','11-14','11-13','11-12','11-11']
  },
  series: [
      {
          name: '晚上工作',
          type: 'bar',
          stack: '总量',
          barWidth: "10",
          label: {
              show: true,
              position: 'insideRight'
          },
          data: [{
              value: 120,
              itemStyle: {
                opacity: 0
              }
          }]
      },
      {
          name: '上午工作',
          type: 'bar',
          stack: '总量',
          label: {
              show: true,
              position: 'insideRight'
          },
          data: [120]
      },
      {
        name: '中餐',
          type: 'bar',
          stack: '总量',
          label: {
              show: true,
              position: 'insideRight'
          },
          data: [120, ]
      },
      {
        name: '下午工作',
          type: 'bar',
          stack: '总量',
          label: {
              show: true,
              position: 'insideRight'
          },
          data: [120, ]
      },
      {
        name: '晚餐',
          type: 'bar',
          stack: '总量',
          label: {
              show: true,
              position: 'insideRight'
          },
          data: [120, ]
      },
      {
        name: '其他时间',
          type: 'bar',
          stack: '总量',
          label: {
              show: true,
              position: 'insideRight'
          },
          data: [120, ]
      },
  ]
};