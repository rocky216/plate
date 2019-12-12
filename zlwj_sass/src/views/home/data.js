

export const options = {
  color: ['#3398DB', '#e5323e'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    xAxis : [
        {
            type : 'category',
            data : ['庐陵公馆', '金庐名居', '尚公馆',"德逸国际", '测试小区8'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
      {
        name: "入住人数",
        type : 'value'
      },
      {
        name: "入住率",
        type : 'value',
        min: 0,
        max: 100,
      },
    ],
    series : [
      {
          name:'入住人数',
          type:'bar',
          barWidth: '20%',
          data:[1000, 500, 500,200, 334]
      },
      {
        name:'入住率',
        type:'bar',
        yAxisIndex:1,
        barWidth: '20%',
        data:[70, 60, 20,30, 34]
    },
    ]
}