

export const  options = {
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['住宅物业费订单', '非住宅物业费订单', '缴费金额']
  },
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
      boundaryGap: true,
      axisLabel: {  
        interval:0,  
        rotate:40  
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: [
    {
      type: 'value'
    },
    {
      type: 'value'
    },
  ],
  series: [
      {
        name: '住宅物业费订单',
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
      {
        name: '非住宅物业费订单',
        type: 'line',
        itemStyle : {  
          normal : {  
              lineStyle:{  
                  color:'#ff4d4f'  
              },
              color:'#ff4d4f',
          }  
        }, 
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '缴费金额',
        type: 'bar',
        barWidth: "50%",
        itemStyle : {  
          normal : {  
              lineStyle:{  
                  color:'#ff9d48'  
              },
              color:'#ff9d48',
          }  
        }, 
        yAxisIndex:1,
        data: [220, 182, 191, 234, 290, 330, 310]
      }
  ]
};