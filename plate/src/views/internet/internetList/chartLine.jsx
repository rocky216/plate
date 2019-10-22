import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Tag, Row, Col,List,Typography
} from "antd"
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';



class ChartLine extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      option: {
        tooltip: {
          show: true,
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            name: "单位(M)"
        },
        series: [{
            //data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            lineStyle: {
              color: "#1890ff"
            },
            itemStyle:{
              color: "#1890ff"
            }
        }]
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data){
      this.handlenData(nextProps.data.range15)
    }
  }

  handlenData(range15){
    const {option} = this.state
    let xAxios = [], yAxios = []
    _.each(range15, item=>{
      xAxios.push(item.date.substring(0,11))
      yAxios.push((item.usage/1024).toFixed(2))
    })
    option.xAxis.data = xAxios
    option.series[0].data = yAxios
    this.setState({option})
  }

  getStatus(){
    const {data} = this.props
    if(data && data.gprsStatus && data.gprsStatus.status){
      switch (data.gprsStatus.status) {
        case "ACTIVATED_NAME":
          return <Tag color="green">当前联网中</Tag>
        case "DEACTIVATED_NAME":
          return <Tag color="red">当前断网中</Tag>
        case "TEST_READY_NAME":
          return <Tag color="purple">当前处于测试期</Tag>
        default:
          return <Tag>无状态</Tag>
      }
    }else{
      return <Tag>无状态</Tag>
    }
    
  }

  mealStatus(item){
    switch (item) {
      case "active":
        return "当前套餐"
      case "finished":
        return "历史套餐"
      case "plan":
        return "计划套餐"
    }
  }

  render(){
    const {data} = this.props
    const {option} = this.state
    
    return (
      <div>
        {option.series[0]["data"]?<Card 
        size="small"
        title={this.getStatus()}
        >
        <Row>
          <Col span={18}>
            <ReactEchartsCore
              echarts={echarts}
              option={option}
            />
          </Col>
          <Col span={6}>
            <List
            header={<span>套餐列表</span>}
            bordered
            dataSource={data.plans?data.plans:[]}
            renderItem={item=>
              <List.Item>
                <Typography.Text className="mgr10" >{item.description}</Typography.Text> 
                <Typography.Text className="mgr10" >{item.price}</Typography.Text>
                <Typography.Text >{this.mealStatus(item.status)}</Typography.Text>
              </List.Item>}
            ></List>
          </Col>
        </Row>
      </Card>:null}
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

export default connect(mapStateProps, mapDispatchProps)(ChartLine)