import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Table, Input, Select} from "antd";
import Searchbox from "./searchbox"
import {AttendanceAnalysiss} from "@/actions/personAction"
import moment from "moment"
import {optionTrendPie} from "./data"
import ReactEcharts from 'echarts-for-react';

const {Option} = Select

class Attstanaly extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      optionTrend:"",
      key: "qj",
      detail: "",
      data:[],
      columns: [
        {
          title: "排名",
          dataIndex: "key"
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "请假天数",
          dataIndex: "count"
        },
      ]
    }
  }
  componentDidMount(){
    this.initial({
      startTime: moment().format("YYYY-MM-DD"),
      endTime: moment().format("YYYY-MM-DD"),
    })
  }

  initial(params){
    this.setState({optionTrend:""})
    this.props.actions.AttendanceAnalysiss(params, res=>{
      this.setState({detail: res, data: res.top5})
      this.handlenData(res)
    })
  }
  handlenData(res){
    if(!res)return
    optionTrendPie.series[0]["data"][0]["value"] =res.zc.count
    optionTrendPie.series[0]["data"][1]["value"] =res.cd.count
    optionTrendPie.series[0]["data"][2]["value"] =res.qj.count
    optionTrendPie.series[0]["data"][3]["value"] =res.kg.count
    this.setState({optionTrend: optionTrendPie})
  }

  handleSearch(values){
    if(values==null){
      this.initial({
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
      })
      return
    }
    this.initial(values)

  }

  render(){
    const {utils} = this.props
    const {detail, columns, data, key, optionTrend} = this.state

    return (
      <div>
        <div className="fixedend mgb10">
          <Searchbox handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/hAttendanceAnalysis" />
        </div>
        <Row className="mgt10">
          <Col span={12}>
            <Row gutter={12} className="mgb10">
              <Col span={8}>
                <Input addonBefore="出勤人数" value={detail?detail.cq.count:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="迟到人次" value={detail?detail.cd.count:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="旷工人次" value={detail?detail.kg.count:0} />
              </Col>
            </Row>
            <Row gutter={12} className="mgb10">
              <Col span={8}>
                <Input addonBefore="正常人次" value={detail?detail.zc.count:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;迟到率" value={detail?detail.cd.rate*100+"%":0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;旷工率" value={detail?detail.kg.rate*100+"%":0} />
              </Col>
            </Row>
            <Row gutter={12} className="mgb10">
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;正常率" value={detail?detail.zc.rate*100+"%":0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="请假人次" value={detail?detail.qj.count:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;请假率" value={detail?detail.qj.rate*100+"%":0} />
              </Col>
            </Row>
            <div className="mgt10 mgb10">
              <span>Top5排名：</span>
              <Select value={key} onChange={(v)=>this.setState({key:v})} style={{width: 150}}>
                <Option value="cd">迟到</Option>
                <Option value="kg">旷工</Option>
                <Option value="qj">请假</Option>
              </Select>
            </div>
            <Table size="small" columns={columns} dataSource={data?utils.addIndex(data[this.state.key]):[]} 
              pagination={false} />
          </Col>
          <Col span={12}>
            {optionTrend?<ReactEcharts option={optionTrend} />:null}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({AttendanceAnalysiss}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Attstanaly)