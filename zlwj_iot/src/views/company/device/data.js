

export const  options = {
  tooltip: {
      trigger: 'axis'
  },
  // legend: {
  //     data: ['住宅物业费订单', '非住宅物业费订单']
  // },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      // axisLabel: {  
      //   interval:0,  
      //   rotate:40  
      // },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
        // name: '住宅物业费订单',
        type: 'line',
        itemStyle : {  
          normal : {  
              lineStyle:{  
                  color:'#45a3fc'  
              },
              color:'#45a3fc',
          }  
        }, 
        data: [120, 132, 101, 134, 90, 230, 210],
          
      },
  ]
};