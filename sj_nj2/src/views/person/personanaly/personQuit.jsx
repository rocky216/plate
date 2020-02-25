import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Row, Col} from "antd";
import {quitAnalysis} from "@/actions/personAction"
import {quitAvg1Columns, optAgv1} from "./columns"
import ReactEcharts from 'echarts-for-react';
import {stackOption} from "./data"
import Searchbox from "../attendStatis/searchbox"
import moment from "moment"


class PersonQuit extends React.Component {
  constructor(props){
    super(props) 
    this.state={
      params: {
        type: "quitAvg1",
        isStaff:"1",
        deptId:"",
        startTime:moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD")
      },
      quitAvg1_data: "",
      source_data: "",
      quitAvg1Bar_data: ""
    }
  }
  componentDidMount(){
    this.initial(this.state.params)
  }
  initial(params){
    this.props.actions.quitAnalysis(params, res=>{
      this.setState({source_data: res})
      this.handlenData(res)
    })
  }
  handlenData(res){
    if(!res)return
    let xaxis = [], dataLine = [], dataBar1=[],dataBar2=[],dataBar3=[]
    _.each(res, item=>{
      xaxis.push(item.ks)
      dataLine.push(item.quit*100)
      dataBar1.push(item.worker)
      dataBar2.push(item.quit)
    })
    let coptAgv1 = _.cloneDeep(optAgv1)
    let cstackOption = _.cloneDeep(stackOption)
    coptAgv1.legend.data[0] = "离职率"
    coptAgv1.xAxis.data = xaxis
    coptAgv1.series[0]["name"]="离职率"
    coptAgv1.series[0].data = dataLine

    cstackOption.xAxis.data = xaxis
    cstackOption.series[0].data = dataBar1
    cstackOption.series[1].data = dataBar2
    console.log(cstackOption, "cstackOption")
    this.setState({quitAvg1_data: coptAgv1, quitAvg1Bar_data: cstackOption})
  }

  handleSearch(values){
    if(values===null){
      this.initial(this.state.params)
      return
    }
    this.initial({
      ...values
    })
  }

  render(){
    const {utils} = this.props
    const {quitAvg1_data, source_data, quitAvg1Bar_data} = this.state
    
    return (
      <div>
        <div className="mgb10 fixedend">
          <Searchbox handleSearch={this.handleSearch.bind(this)} quitanaly />
        </div>
        <Row>
          <Col span={10}>
            <Table size="small" columns={quitAvg1Columns} pagination={false}
              dataSource={source_data?utils.addIndex(source_data):[]} />
          </Col>
          <Col span={14}>
            {quitAvg1_data?<ReactEcharts option={quitAvg1_data} />:null}
            {quitAvg1Bar_data?<ReactEcharts option={quitAvg1Bar_data} />:null}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({quitAnalysis}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PersonQuit)