import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Button, TreeSelect, DatePicker, Select, Radio, Icon} from "antd";
import {loadSelectDeptByRole} from "@/actions/personAction"
import moment from "moment"


const {TreeNode} = TreeSelect
const {Option} = Select
const {RangePicker, WeekPicker} = DatePicker

class Searchbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList: "",
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
  getWeekR(){
    let week = moment().format("E")
    ,start=moment().subtract(week-1, 'days').format("YYYY-MM-DD")
    ,end=moment().subtract(-6, 'days').format("YYYY-MM-DD")
    return {start, end}
  }
  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {type,deptId, time, dimen, isStaff} = values
      let startTime="", endTime=""
      if(type=="1"){
        startTime = endTime = moment().format("YYYY-MM-DD")
      }
      if(type=="2"){
        startTime = this.getWeekR().start
        endTime = this.getWeekR().end
      }
      if(type=="3"){
        startTime = moment().month(moment().month()).startOf('month').format("YYYY-MM-DD")
        endTime = moment().month(moment().month()).endOf('month').format("YYYY-MM-DD")
      }
      if(type=="4"){
        startTime = time && time.length?moment(time[0]).format("YYYY-MM-DD"):""
        endTime = time && time.length?moment(time[1]).format("YYYY-MM-DD"):""
      }
      if(this.props.quitanaly){
        
        this.props.handleSearch({
          type:dimen,
          isStaff,
          deptId,
          startTime,
          endTime
        })
      }else{
        this.props.handleSearch({
          deptId,
          startTime,
          endTime
        })
      }
      
    })
  }
  handlenReset(){
    this.props.form.resetFields()
    this.props.handleSearch(null)
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, quitanaly} = this.props
    const {deptList} = this.state

    return (
      <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
        {quitanaly?
        <Form.Item  label="分析维度">
          {getFieldDecorator('dimen',{
            initialValue: "quitAvg1"
          })( 
            <Select>
              <Option value="quitAvg1">按车间统计分析</Option>
              <Option value="itemAvg2">按分类统计分析</Option>
              <Option value="gradeAvg3">按岗级统计分析</Option>
              <Option value="yearAvg4">年度离职统计分析</Option>
            </Select>
          )}
        </Form.Item>:null}
        {quitanaly?
        <Form.Item  >
          {getFieldDecorator('isStaff', {
            initialValue: "1"
          })( 
            <Select>
              <Option value="1">全部</Option>
              <Option value="2">职员</Option>
              <Option value="3">工人</Option>
            </Select>
          )}
        </Form.Item>:null}
        <Form.Item  label="车间/部门">
          {getFieldDecorator('deptId')( 
            deptList && deptList.length?
            <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll style={{width: 150}}>
              {this.createNode(deptList)}
            </TreeSelect>:<span></span>
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('type', {
            initialValue: "1"
          })( 
              <Radio.Group >
                <Radio.Button value="1">今天</Radio.Button>
                <Radio.Button value="2">本周</Radio.Button>
                <Radio.Button value="3">本月</Radio.Button>
                <Radio.Button value="4">自定义</Radio.Button>
              </Radio.Group>
          )}
        </Form.Item>
        {getFieldValue("type")=="4"?
        <Form.Item >
          {getFieldDecorator('time')( 
            <RangePicker/>
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

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Searchbox) )