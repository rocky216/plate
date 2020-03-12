import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Row, Col, Button} from "antd";
import {quitAnalysis} from "@/actions/personAction"
import {quitAvg1Columns, itemAvg2Columns, yearAvg4Columns,itemAvg3Columns, optAgv1, } from "./columns"
import ReactEcharts from 'echarts-for-react';
import {stackOption} from "./data"
import Searchbox from "../attendStatis/searchbox"
import moment from "moment"
import Persondetail from "./persondetail"


class PersonQuit extends React.Component {
  constructor(props){
    super(props) 
    this.state={
      visible: false,
      detail: "",
      columns: quitAvg1Columns,
      type:"quitAvg1",
      initParam: {
        type: "quitAvg1",
        isStaff:"1",
        deptId:"",
        startTime:moment().format("YYYY-MM-DD")+" 00:00:00",
        endTime: moment().format("YYYY-MM-DD")+" 23:59:59"
      },
      params: {
        type: "quitAvg1",
        isStaff:"1",
        deptId:"",
        startTime:moment().format("YYYY-MM-DD")+" 00:00:00",
        endTime: moment().format("YYYY-MM-DD")+" 23:59:59"
      },
      quitAvg1_data: "",
      source_data: "",
      quitAvg1Bar_data: ""
    }
  }
  componentDidMount(){
    this.initial(this.state.initParam)
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
      dataLine.push( (item.worker+item.quit)==0?0:( item.quit/(item.worker+item.quit)*100 ).toFixed(2) )
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
    
    this.setState({quitAvg1_data: coptAgv1, quitAvg1Bar_data: cstackOption})
  }

  handleSearch(values){
    
    let col = quitAvg1Columns
    if(values){
      const {type} = values 
      if(type=="itemAvg2"){
        col = itemAvg2Columns
      }else if(type=="gradeAvg3"){
        col = itemAvg3Columns
      }else if(type=="quitAvg1"){
        col = quitAvg1Columns
      }else if(type=="yearAvg4"){
        col = yearAvg4Columns
      }
    }else{
      col=quitAvg1Columns
    }
    
    this.setState({columns: col})

    if(values===null){
      this.initial(this.state.initParam)
      this.setState({params: _.cloneDeep(this.state.initParam)})
      return
    }
    this.setState({params: values})
    this.initial({
      ...values
    })
    
  }

  render(){
    let _this = this
    const {utils} = this.props
    const {quitAvg1_data, source_data, quitAvg1Bar_data, columns, visible, params, detail } = this.state
    
    return (
      <div>
        {detail?<Persondetail visible={visible} detail={detail} params={params} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}
        
        <div className="mgb10 fixedend">
          <Searchbox handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/hResourceAnalysis" quitanaly />
        </div>
        <Row> 
          <Col span={10}>
            <Table size="small" columns={columns.concat([{
              title: "操作",
              render(item){
                return <Button type="link" size="small" onClick={()=>_this.setState({visible: true, detail: item})} >查看</Button>
              }
            }])} pagination={false}
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