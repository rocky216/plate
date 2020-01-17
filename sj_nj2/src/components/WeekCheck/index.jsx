import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Input } from "antd";
import {getWeekCheck} from "@/actions/appAction"
import ReactEcharts from 'echarts-for-react';
import {option} from "./data"


class WeekCheck extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: "",
      options: ""
    }
  }
  componentDidMount(){
    this.props.actions.getWeekCheck({},res=>{
      this.setState({detail:res})
      this.chartData(res)
    })
  }

  handlenData(str,all){
    if(str && all){
      return ((str/all)*100).toFixed(2)+'%'
    }else{
      return 0
    }
  }
  chartData(res){
    option["series"][0]["data"] = [
      {
        value: res.leaveCount,
        name: `请假人次${res.leaveCount}`
      },
      {
        value: res.lateCount,
        name: `迟到人次${res.lateCount}`
      },
      {
        value: res.normalCount,
        name: `正常人次${res.normalCount}`
      },
      {
        value: res.absenceCount,
        name: `旷工人次${res.absenceCount}`
      },
    ]
    this.setState({options: option})
  }

  render(){
    const {utils, weekcheck} = this.props
    const {detail, options} = this.state

    return (
      <Card size="small" title={detail?detail.dept.deptName+'异常考勤':""}>
        <Row gutter={10} className="mgb5">
          <Col span={8}>
            <Input addonBefore="正常人次" value={detail.normalCount} />
          </Col>
          <Col span={8}>
            <Input addonBefore="迟到人次" value={detail.lateCount} />
          </Col>
          <Col span={8}>
            <Input addonBefore="旷工人次" value={detail.absenceCount} />
          </Col>
        </Row>
        <Row gutter={10} className="mgb5">
          <Col span={8}>
              <Input addonBefore="&nbsp;&nbsp;&nbsp;正常率" value={this.handlenData(detail.normalCount, detail.sumCount)} />
            </Col>
            <Col span={8}>
              <Input addonBefore="&nbsp;&nbsp;&nbsp;迟到率" value={this.handlenData(detail.lateCount, detail.sumCount)} />
            </Col>
            <Col span={8}>
              <Input addonBefore="&nbsp;&nbsp;&nbsp;旷工率" value={this.handlenData(detail.absenceCount, detail.sumCount)} />
            </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Input addonBefore="请假人次" value={detail.leaveCount} />
          </Col>
          <Col span={8}>
            <Input addonBefore="&nbsp;&nbsp;&nbsp;请假率" value={this.handlenData(detail.leaveCount, detail.sumCount)} />
          </Col>
        </Row>
        <div >
          {options?<ReactEcharts option={options}/>:null}
        </div>
        
        

      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getWeekCheck}, dispatch)
  }
}

function mapStateProps(state){
  return {
    weekcheck: state.app.weekcheck,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(WeekCheck)