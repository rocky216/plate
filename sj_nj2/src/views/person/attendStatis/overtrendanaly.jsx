import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Table, Card} from "antd";
import ReactEcharts from 'echarts-for-react';
import moment from "moment"
import Statiscon from "./statiscon"
import {overtimeTrendAnalysisDay, overtimeTrendAnalysisM, overtimeTrendAnalysisW} from "@/actions/personAction"
import {overtrendanalyColumns} from "../columns"
import {optionTrend} from "./data"

class Overtrendanaly extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: "",
      chartData:""
    }
  }

  componentDidMount(){
    this.initial({type: "day"})
  }

  initial(params){
    const {type, deptId, day, month} = params
    if(type=="day"){
      this.props.actions.overtimeTrendAnalysisDay({
        deptId,
        startTime: day && day.length?moment(day[0]).format("YYYY-MM-DD"):"",
        endTime: day && day.length?moment(day[1]).format("YYYY-MM-DD"):""
      },res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
    if(params.type=="month"){
      this.props.actions.overtimeTrendAnalysisM({
        deptId: params.deptId,
        startTime: month?moment(month).format("YYYY"):""
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
    if(params.type=="week"){
      this.props.actions.overtimeTrendAnalysisW({
        ...params
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
    
  }
  handlenOption(res){
    if(res){
      let time = [], planHs = [], planJbHs = [], trueHs = [],notPlanJbHs = [], sumJbHs = []
      _.each(res.listData, item=>{
        time.push(item.jbTime )
        planHs.push(item.planH)
        planJbHs.push(item.planJbH)
        trueHs.push(item.trueH)
        notPlanJbHs.push(item.notPlanJbH)
        sumJbHs.push(item.sumJbH)
      })
      
      optionTrend.xAxis.data = time
      optionTrend.series[0].data = planHs
      optionTrend.series[1].data = planJbHs
      optionTrend.series[2].data = trueHs
      optionTrend.series[3].data = notPlanJbHs
      optionTrend.series[4].data = sumJbHs
      
      this.setState({chartData:optionTrend})
    }
  }

  handleSearch(values){
    if(values===null){
      this.initial({type:"day"})
      return
    }
    this.initial(values)
  }

  render(){
    const {utils} = this.props
    const {data, chartData} = this.state

    return (
      <div>
        <Statiscon handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/hAttendanceAnalysis" />
        <Row className="mgt10" gutter={12}>
          <Col span={8}>
            <Table size="small" columns={overtrendanalyColumns} 
              dataSource={data?utils.addIndex(data.listData):[]} pagination={false} />
          </Col>
          <Col span={16}>
            {chartData?
            <Card size="small" title={data.deptName}>
              <ReactEcharts option={chartData} />
            </Card>:null}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({overtimeTrendAnalysisDay, overtimeTrendAnalysisM, overtimeTrendAnalysisW}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Overtrendanaly)