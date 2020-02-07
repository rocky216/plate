export const option = { //给每个饼图模块添加颜色
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

export const stackOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['在职人员', '离职人员']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
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
        type: 'value',
    },
    series: [
        {
            name: '在职人员',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            itemStyle: {
                normal: {
                    color: "blue"
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '离职人员',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'inside'
            },
            itemStyle: {
                normal: {
                    color: "red"
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        }
    ]
};