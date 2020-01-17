export const workshopColumns = function(title){
  return [
    {
      title:title,
      dataIndex: "ks"
    },
    {
      title:"编制",
      dataIndex: "bianZhi"
    },
    {
      title:"实际",
      dataIndex: "shiJi"
    },
    {
      title:"到岗率",
      dataIndex: "rate",
      render(item){
        return item? parseFloat(item)*100+'%':""
      }
    },
    {
      title:"偏差",
      dataIndex: "pianCha"
    },
  ]
}

export const optAgv1 = {
  tooltip:{
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid:{
    bottom: "35%",
  },
  legend: {
    data: ["到岗率"],
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
  series: [{
      name: "到岗率",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      itemStyle:{
        normal:{
          color:'#1e9eff'
        },
        
      }
  }]
}

export const optAgv2 = {
  tooltip:{
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid:{
    bottom: "35%",
  },
  legend: {
    data: ["在岗", "编制", "偏差"],
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLabel: {
      interval:0,  
      rotate:30 ,
      textStyle:{
        fontSize: 12
      }
    },
  },
  yAxis: {
      type: 'value'
  },
  series: [{
    name: "在岗",
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'bar',
    barWidth: "15%"
  },{
    name: "编制",
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'bar',
    barWidth: "15%"
  },{
    name: "偏差",
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'bar',
    barWidth: "15%"
  },]
}