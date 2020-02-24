import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {TreeSelect, Select, DatePicker, Button, Form, Icon} from "antd";
import {loadSelectDeptByRole} from "@/actions/personAction"
import moment from "moment"
import WeekRangePicker from "../schedu/WeekRangePicker"

const {TreeNode} = TreeSelect
const {Option} = Select
const {RangePicker, WeekPicker} = DatePicker

class Statiscon extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList: "",
      startWeek:null,
      endWeek: null,
      isOpen: false
    }
  }

  componentDidMount(){
    
    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: this.props.roleUrl}, res=>{
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
  handlenWeek(startWeek, endWeek){
    this.setState({startWeek, endWeek})
  }
  handlenYear(v){
    this.setState({isOpen: false})
    this.props.form.setFieldsValue({month: v})
  }
  handleOpenChange(status){    
    // console.log(status)    
    if(status){      
        this.setState({isOpen: true})    
    } else {      
        this.setState({isOpen: false})    
    }  
  }  
  getWeekR(d){
    let week = d.format("E")
    ,start=d.subtract(week-1, 'days').format("YYYY-MM-DD")
    ,end=d.subtract(-6, 'days').format("YYYY-MM-DD")
    return {start, end}
  }
  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(values.type=="week"){
        const {startWeek, endWeek } = this.state
        this.props.handleSearch({
          ...values,
          startTime: startWeek?this.getWeekR(startWeek).start:"",
          endTime: endWeek?this.getWeekR(endWeek).end:"",
        })
        return
      }
      this.props.handleSearch(values)
    })
  }

  handlenReset(){
    this.props.form.resetFields()
    this.props.handleSearch(null)
    this.setState({
      startWeek:null,
      endWeek: null
    })
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils} = this.props
    const {deptList, startWeek, endWeek, isOpen} = this.state

    return (
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
        {getFieldValue("type")=="day"?
        <Form.Item  label="按日统计">
          {getFieldDecorator('day', {
          })(
            <RangePicker />
          )}
        </Form.Item>:null}
        {getFieldValue("type")=="week"?
        <Form.Item label="按周统计" >
          <WeekRangePicker onChange={this.handlenWeek.bind(this)} />
        </Form.Item>:null}
        {getFieldValue("type")=="month"?
        <Form.Item label="按月统计" >
          {getFieldDecorator('month', {
            
          })(
            <DatePicker mode="year" format="YYYY" allowClear={false} 
            onFocus={()=>this.setState({isOpen:true})} open={isOpen} 
            onOpenChange={this.handleOpenChange.bind(this)}
            onPanelChange={this.handlenYear.bind(this)}/>
          )}
        </Form.Item>:null}
        <Form.Item >
          <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
          <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Statiscon) )