import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import "./index.less"
import ReactEcharts from 'echarts-for-react';


const itemStyle = {
  normal: {
    color: 'rgba(0,0,0,0)'
  }
}
var option = {
  // title: {
  //     text: '深圳月最低生活费组成（单位:元）',
  //     subtext: 'From ExcelHome',
  //     sublink: 'http://e.weibo.com/1341556070/AjQH99che'
  // },
  // tooltip : {
  //     trigger: 'axis',
  //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
  //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
  //     },
  //     formatter: function (params) {
  //         var tar = params[1];
  //         return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
  //     }
  // },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  xAxis: {
      type : 'value',
      splitLine: {show:false},
      interval: 120,
      max: 1440,
      axisLabel: {
        
        formatter: function(value){
          console.log(value)
          return `${(value/120)*2>=10?(value/120)*2:'0'+(value/120)*2}:00`
        }
      }
      
      // data : ['总费用','房租','水电费','交通费','伙食费','日用品数']
  },
  yAxis: {
      type : 'category',
      data : ["11-11", "11-12"] //['总费用','房租','水电费','交通费','伙食费','日用品数']
  },
  series: [
      {
          name: '晚上工作时间',
          type: 'bar',
          stack:  '总量',
          barWidth: "10%",
          label: {
            normal: {
                show: true,
                position: 'inside',
            }
          },
          data: [
            {
              value: 120,
              itemStyle: itemStyle
            },
            {
              value: 120,
            },
            
          ]
      },
      {
          name: '上午工作时间',
          type: 'bar',
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'inside',
              }
          },
          data:[
            {
              value: 110,
            },
            {
              value: 110,
            },
          ]
      },
      {
        name: '上午中餐',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'inside',
            }
        },
        data:[
          {
            value: 120,
          },
          {
            value: 120,
          },
        ]
      },
      {
        name: '下午工作时间',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'inside',
            }
        },
        data:[
          {
            value: 120,
          },
          {
            value: 120,
          },
        ]
      },
      {
        name: '其他时间',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'inside',
            }
        },
        data:[
          {
            value: 120,
          },
          {
            value: 120,
          },
        ]
      },
  ]
};

class Test extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {
          
        }
      ]
    }
  }
  componentDidMount(){
    
  }

  render(){
    
    return (
      <div className="ganttchart">
        <ReactEcharts option={option} />
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Test)