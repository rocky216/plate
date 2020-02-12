import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Button, Icon, TreeSelect, Select, Radio, DatePicker, Row, Col, Table} from "antd";
import {getDayPlanFormDay, loadSelectDeptByRole, getMonthPlanFormM, getMonthPlanFormW} from "@/actions/personAction"
import {analyColumns} from "../columns"
import ReactEcharts from 'echarts-for-react';
import {option} from "./data"
import moment from "moment";
import WeekRangePicker from "./WeekRangePicker"

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
    this.initial("day",{})
    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/plan"}, res=>{
      this.setState({deptList: res})
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  initial(type, params){
    console.log(type=="week", "asasas")
    if(type=="day"){
      this.props.actions.getDayPlanFormDay(params, res=>{
        this.setState({data: res, chartData:""})
        this.handlenOption(res)
      })
    }else if(type=="month"){
      this.props.actions.getMonthPlanFormM(params, res=>{
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
      option.title.text=res.deptName
      _.each(res.listData, item=>{
        time.push(item.planTime)
        planHs.push(item.planH)
        planJbHs.push(item.planJbH)
      })
      option.title.text=res.deptName
      option.xAxis.data = time
      option.series[0].data = planHs
      option.series[1].data = planJbHs
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
  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      const {deptId,type, day,week,month} = values
      let obj= {
        deptId: values.deptId,
        
      }
      if(type=="day"){
        this.initial(type, {
          deptId,
          startTime: day && day.length?moment(day[0]).format("YYYY-MM-DD"):"",
          endTime: day && day.length?moment(day[1]).format("YYYY-MM-DD"):"",
        })
      }else if(type=="month"){
        this.initial(type, {
          deptId,
          startTime: moment(month).format("YYYY"),
        })
      }else {
        const {startWeek, endWeek} = this.state
        if(!startWeek || !endWeek){
          this.props.utils.OpenNotification("error","请选择开始周和结束周!")
          return
        }
        this.initial(type,{
          deptId,
          startTime: startWeek?this.getWeekR(startWeek).start:"",
          endTime: endWeek?this.getWeekR(endWeek).end:"",
        })
      }
      
    })
  }
  handlenReset(){

  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils} = this.props
    const {deptList, dateType, data, chartData, startWeek, endWeek} = this.state
    
    return (
      <div >
        <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
          <Form.Item  label="车间/部门">
            {getFieldDecorator('deptId')( 
              deptList && deptList.length?
              <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll style={{width: 150}}>
                {this.createNode(deptList)}
              </TreeSelect>:<span></span>
            )}
          </Form.Item>
          <Form.Item label="统计类型" >
            {getFieldDecorator('type', {
              initialValue: "day"
            })(
              <Select style={{width: 150}}>
                <Option value="day">按日统计</Option>
                <Option value="week">按周统计</Option>
                <Option value="month">按月统计</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Radio.Group value={dateType} onChange={this.handlenDateType.bind(this)}>
              <Radio.Button value="1">本周</Radio.Button>
              <Radio.Button value="2">自定义</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {dateType==="2" && getFieldValue("type")=="day"?
          <Form.Item  >
            {getFieldDecorator('day', {
            })(
              <RangePicker disabled={dateType==="1"} />
            )}
          </Form.Item>:null}
          {dateType==="2" &&  getFieldValue("type")=="week"?
          <Form.Item  >
            <WeekRangePicker onChange={this.handlenWeek.bind(this)} />
            {/* <WeekPicker value={moment(new Date())} /><span>-</span>
            <WeekPicker value={moment(new Date())} /> */}
          </Form.Item>:null}
          {dateType==="2" && getFieldValue("type")=="month"?
          <Form.Item  >
            {getFieldDecorator('month', {
              initialValue: moment(new Date().getFullYear(),"YYYY")
            })(
              <DatePicker mode="year" format="YYYY" />
            )}
          </Form.Item>:null}
          
          <Form.Item >
            <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
            {/* <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button> */}
          </Form.Item>
        </Form>
        <Row className="mgt10">
          <Col span={8}>
            <Table size="small" columns={analyColumns} 
              dataSource={data?utils.addIndex(data.listData):[]} pagination={false} />
          </Col>
          <Col span={16}>
            {chartData?<ReactEcharts option={chartData} />:null}
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