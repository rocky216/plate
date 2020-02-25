import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Button, Icon, TreeSelect, Select, Radio, DatePicker, Row, Col, Table, Card} from "antd";
import {getDayPlanFormDay, loadSelectDeptByRole, getMonthPlanFormM, getMonthPlanFormW} from "@/actions/personAction"
import {analyColumns} from "../columns"
import ReactEcharts from 'echarts-for-react';
import {option} from "./data"
import moment from "moment";
import WeekRangePicker from "./WeekRangePicker"
import Statiscon from "../attendStatis/statiscon"

const {TreeNode} = TreeSelect
const {Option} = Select
const {RangePicker, WeekPicker} = DatePicker



class Analy extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList: "",
      dateType: "2",
      data: "",
      chartData: "",
      startWeek:null,
      endWeek: null,
      params: {

      }
    }
  }
  componentDidMount(){
    this.initial({type:"day"})
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  initial(params){
    const {type, day, deptId, month} = params
    if(type=="day"){
      this.props.actions.getDayPlanFormDay({
        deptId,
        startTime: day && day.length?moment(day[0]).format("YYYY-MM-DD"):"",
        endTime: day && day.length?moment(day[1]).format("YYYY-MM-DD"):""
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }else if(type=="month"){
      this.props.actions.getMonthPlanFormM({
        deptId,
        startTime: month?moment(month).format("YYYY"):"",
      }, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }else if(type=="week"){
      this.props.actions.getMonthPlanFormW(params, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }
    
  }
  handlenOption(res){
    if(res){
      let time = [], planHs = [], planJbHs = []
      _.each(res.listData, item=>{
        time.push(item.planTime)
        planHs.push(parseFloat(item.planH))
        planJbHs.push(parseFloat(item.planJbH))
      })
      
      option.xAxis.data = time
      option.series[0].data = planJbHs
      option.series[1].data = planHs
      this.setState({chartData:option})
    }
  }
  getWeekR(d){
    let week = d.format("E")
    ,start=d.subtract(week-1, 'days').format("YYYY-MM-DD")
    ,end=d.subtract(-6, 'days').format("YYYY-MM-DD")
    return {start, end}
  }
  handlenDateType({target}){
    this.setState({dateType: target.value})
    this.props.form.setFieldsValue({type:"week"})
    this.setState({
      startWeek: moment(),
      endWeek: moment(),
    })
  }
  getCol(){
    return [{
      title: ""
    }]
  }
  handlenWeek(startWeek, endWeek){
    this.setState({startWeek, endWeek})
  }
  handleSearch(values){
    if(values===null){
      this.initial({type:"day"})
      return
    }
    this.initial(values)
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils} = this.props
    const {deptList, dateType, data, chartData, startWeek, endWeek} = this.state
    console.log(chartData, "chartData")
    return (
      <div >
        <Statiscon handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/plan" />
        
        <Row className="mgt10" gutter={12}>
          <Col span={8}>
            <Table size="small" columns={analyColumns} 
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
    actions: bindActionCreators({getDayPlanFormDay, loadSelectDeptByRole, getMonthPlanFormM, getMonthPlanFormW}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Analy) )