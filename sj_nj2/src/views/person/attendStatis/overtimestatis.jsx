import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Table, Col, Select, Input, Card } from "antd";
import ReactEcharts from 'echarts-for-react';
import moment from "moment"
import Searchbox from "./searchbox"
import {overWorkAnalysis} from "@/actions/personAction"
import Item from "antd/lib/list/Item";
import {optionOverStatis1, optionOverStatis2} from "./data"

const {Option} = Select

class Overtimestatis extends React.Component {
  constructor(props){
    super(props)
    this.state={
      detail:"",
      data:"",
      key:"fJbTop5s",
      params: {
        deptId: "",
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
      },
      columns:[
        {
          title: "排名",
          dataIndex: "key"
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "计划加班时长",
          dataIndex: "hours1",
          render(item){return item?parseFloat(item).toFixed(2):0}
        },
        {
          title: "非计划加班时长",
          dataIndex: "hours2",
          render(item){return item?parseFloat(item).toFixed(2):0}
        },
        {
          title: "总加班时长",
          dataIndex: "hours3",
          render(item, rows){
            return !item || !parseInt(item) ? (parseFloat(rows.hours1?rows.hours1:0)+parseFloat(rows.hours2?rows.hours2:0)).toFixed(2):parseFloat(item).toFixed(2)
          }
        },
      ],
      optionOver1: "",
      optionOver2:""
    }
  }

  componentDidMount(){
    this.initial(this.state.params)
  }
  initial(params){
    this.props.actions.overWorkAnalysis(params, res=>{
      this.setState({detail: res, data: res.top5})
      
      this.handlenData(res)
    })
  }
  handlenData(res){
    if(!res)return
    optionOverStatis1.series[0].data[0]["value"] = res.sjsbNum
    optionOverStatis1.series[0].data[1]["value"] = res.alljbNum
    console.log(optionOverStatis2, "optionOverStatis2")
    optionOverStatis2.series[0].data[0]["value"] = res.jhsbNum
    optionOverStatis2.series[0].data[1]["value"] = res.fjhjbNum
    this.setState({optionOver1: optionOverStatis1, optionOver2: optionOverStatis2})
  }
  handleSearch(values){
    if(values===null){
      this.initial(this.state.params)
      return
    }
    this.initial(values)
  }
  render(){
    const {utils} = this.props
    const {detail, data, key, columns, optionOver1, optionOver2} = this.state
    console.log(optionOver1, "optionOver1")
    return (
      <div>
        <div className="fixedend">
          <Searchbox handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/hAttendanceAnalysis" />
        </div>
        <Row className="mgt10" gutter={12}>
          <Col span={12}>
            <Row gutter={12} className="mgb10">
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出勤人数" value={detail?detail.cqrsNum:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;&nbsp;计划加班时长(H)" value={detail?detail.jhjbNum:0} />
              </Col>
            </Row>
            <Row gutter={12} className="mgb10">
              <Col span={8}>
                <Input addonBefore="计划上班时长(H)" value={detail?detail.jhsbNum:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="非计划加班时长(H)" value={detail?detail.fjhjbNum:0} />
              </Col>
            </Row>
            <Row gutter={12} className="mgb10">
              <Col span={8}>
                <Input addonBefore="实际上班时长(H)" value={detail?detail.sjsbNum:0} />
              </Col>
              <Col span={8}>
                <Input addonBefore="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总加班时长(H)" value={detail?detail.alljbNum:0} />
              </Col>
            </Row>
            <div className="mgt10 mgb10">
              <span>Top5排名：</span>
              <Select value={key} onChange={(v)=>this.setState({key:v})} style={{width: 150}}>
                <Option value="allJbTOP5">总加班</Option>
                <Option value="jbTop5s">计划内加班</Option>
                <Option value="fJbTop5s">非计划加班</Option>
              </Select>
            </div>
            <Table size="small" columns={columns} dataSource={detail?utils.addIndex(detail[this.state.key]):[]} 
              pagination={false} />
          </Col>
          <Col span={12}>
            <Card size="small" title="正常上班与加班分布">
              {optionOver1?<ReactEcharts option={optionOver1} />:null}
            </Card>
            <Card className="mgt10" size="small" title="计划与非计划工作分布">
              {optionOver2?<ReactEcharts option={optionOver2} />:null}
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({overWorkAnalysis}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Overtimestatis)