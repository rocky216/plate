import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Table, Card} from "antd";
import Statiscon from "./statiscon"
import {attendanceTrendAnalysisDay, attendanceTrendAnalysisM, attendanceTrendAnalysisW} from "@/actions/personAction"
import {attendAnanlyColumns} from "../columns"
import {option, optionRate} from "./data"
import ReactEcharts from 'echarts-for-react';
import moment from "moment"

class Atttrendanaly extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data: "",
      chartData:"",
      chartDataRate:""
    }
  }

  componentDidMount(){
    this.initial({type:"day"})
  }
  initial(params){
    const {deptId, day, month} = params
    if(params.type=="day"){
      this.props.actions.attendanceTrendAnalysisDay({
        deptId,
        startTime: day && day.length?moment(day[0]).format("YYYY-MM-DD"):"",
        endTime: day && day.length?moment(day[1]).format("YYYY-MM-DD"):""
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
    if(params.type=="month"){
      this.props.actions.attendanceTrendAnalysisM({
        deptId: params.deptId,
        startTime: month?moment(month).format("YYYY"):""
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
    if(params.type=="week"){
      console.log(params,"params")
      this.props.actions.attendanceTrendAnalysisW({
        ...params
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
  }
  
  handlenOption(res){
    if(res){
      let time = [], qjCounts = [], kgCounts = [], cdCounts = [],qjCountRates = [], kgCountRates = [], cdCountRates = []
      _.each(res.listData, item=>{
        time.push(item.cqTime )
        qjCounts.push(item.qjCount)
        kgCounts.push(item.kgCount)
        cdCounts.push(item.cdCount)

        qjCountRates.push(item.cqCount && parseInt(item.cqCount)?(item.qjCount/item.cqCount*100).toFixed(2):0)
        kgCountRates.push(item.cqCount && parseInt(item.cqCount)?(item.kgCount/item.cqCount*100).toFixed(2):0)
        cdCountRates.push(item.cqCount && parseInt(item.cqCount)?(item.cdCount/item.cqCount*100).toFixed(2):0)
      })
      
      option.xAxis.data = time
      option.series[0].data = qjCounts
      option.series[1].data = kgCounts
      option.series[2].data = cdCounts

      optionRate.xAxis.data = time
      optionRate.series[0].data = qjCountRates
      optionRate.series[1].data = kgCountRates
      optionRate.series[2].data = cdCountRates
      
      this.setState({chartData:option, chartDataRate: optionRate})
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
    const {data, chartData, chartDataRate} = this.state

    return (
      <div>
        <Statiscon handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/hAttendanceAnalysis" />
        <Row className="mgt10" gutter={12}>
          <Col span={8}>
            <Table size="small" columns={attendAnanlyColumns} 
              dataSource={data?utils.addIndex(data.listData):[]} pagination={false} />
          </Col>
          <Col span={16}>
            {chartData?
            <Card size="small" title={data.deptName}>
              <ReactEcharts option={chartData} />
              <ReactEcharts option={chartDataRate} />
            </Card>:null}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({attendanceTrendAnalysisDay, attendanceTrendAnalysisM, attendanceTrendAnalysisW}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Atttrendanaly)