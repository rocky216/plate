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
        return item? (parseFloat(item)*100).toFixed(2)+'%':""
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
    barWidth: "20%"
  },{
    name: "编制",
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'bar',
    barWidth: "20%"
  },{
    name: "偏差",
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'bar',
    barWidth: "20%"
  },]
}

export const quitAvg1Columns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "车间/部门",
    dataIndex: "ks"
  },
  {
    title: "在职人数",
    dataIndex: "worker"
  },
  {
    title: "离职人数",
    dataIndex: "quit"
  },
  {
    title: "离职率",
    render(item){
      return (item.worker+item.quit)==0?0:( item.quit/(item.worker+item.quit)*100 ).toFixed(2)
    }
  },
]
export const itemAvg2Columns = [ 
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "人员来源",
    dataIndex: "ks"
  },
  {
    title: "在职人数",
    dataIndex: "worker"
  },
  {
    title: "离职人数",
    dataIndex: "quit"
  },
  {
    title: "离职率",
    render(item){
      return (item.worker+item.quit)==0?0:( item.quit/(item.worker+item.quit)*100 ).toFixed(2)
    }
  },
]

export const yearAvg4Columns = [ 
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "月份",
    dataIndex: "ks"
  },
  {
    title: "在职人数",
    dataIndex: "worker"
  },
  {
    title: "离职人数",
    dataIndex: "quit"
  },
  {
    title: "离职率",
    render(item){
      return (item.worker+item.quit)==0?0:( item.quit/(item.worker+item.quit)*100 ).toFixed(2)
    }
  },
]

export const personDetailColumns = [ 
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "工号",
    dataIndex: "jobNumber"
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(item){
      return item==0?"女":"男"
    }
  },
  {
    title: "岗级",
    dataIndex: "level"
  },
  {
    title: "所属机构",
    dataIndex: "allDeptNameStr"
  },
  {
    title: "联系电话",
    dataIndex: "phone"
  },
  {
    title: "成本中心",
    dataIndex: "intoCenterName"
  },
  {
    title: "入职日期",
    dataIndex: "entryTime"
  },
  {
    title: "离职日期",
    dataIndex: "leaveTime"
  },
  {
    title: "人员类别",
    dataIndex: "personTypeName"
  },
]


