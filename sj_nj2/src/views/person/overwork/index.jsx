import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, BUtton, Form, Select, TreeSelect, DatePicker, Input, Row, Col,Popconfirm, InputNumber} from "antd";
import JCard from "@/components/JCard"
import {getOverWork, loadSelectDeptByRole} from "@/actions/personAction"
import {overworkColumns} from "../columns"
import moment from "moment"
import LookFlow from "@/components/LookFlow"

const {Option} = Select
const {TreeNode} = TreeSelect
const {RangePicker } = DatePicker;
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class OverWork extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList:[],
      flowVisible: false,
      flowDetail: "",
      params: {
        current: 1,
        startTimeLength:"",
        endTimeLength:"",
        builderName:"",
        employeeName:"",
        mDeptId:"",
        dateType:"",
        startTime:"",
        endTime:"",
        flowStatus:""
      }
    }
  }
  componentDidMount(){
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/workDetail"}, res=>{
      this.setState({deptList: res})
    })
    this.props.actions.getOverWork(this.state.params)
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  handlenSectionType(val){
    const {params} = this.state
    params.dateType = val
    this.setState({params})
  }
  handlenTime(type,val){
    const {params} = this.state
    if(type=="start"){
      params.startTimeLength = val
      this.setState({params})
    }else{
      params.endTimeLength = val
      this.setState({params})
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {params} = this.state
        const {
          builderName,
          employeeName,
          mDeptId,
          time,
          flowStatus
        } = values
        params.builderName = builderName
        params.employeeName = employeeName
        params.mDeptId = mDeptId
        params.flowStatus = flowStatus
        params.startTime = time && time.length?moment(time[0]).format("YYYY-MM-DD"):""
        params.endTime = time && time.length?moment(time[1]).format("YYYY-MM-DD"):""
        this.props.actions.getOverWork({
          ...params,
          startTimeLength: params.startTimeLength?Math.floor(params.startTimeLength):"",
          endTimeLength: params.endTimeLength?Math.ceil(params.endTimeLength):""
        })
        this.setState({params})
      }
    });
  }
  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      current: 1,
      startTimeLength:"",
      endTimeLength:"",
      builderName:"",
      employeeName:"",
      mDeptId:"",
      dateType:"",
      startTime:"",
      endTime:"",
      flowStatus:""
    }
    this.setState({params: obj})
    this.props.actions.getOverWork({current: 1})
  }
  handlenOverFlow(item){
    this.setState({flowVisible: true, flowDetail:item})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, overwork} = this.props
    const {deptList, params, flowVisible, flowDetail} = this.state
    console.log(flowDetail, "flowDetail")
    return (
      <JCard spinning={spinning} >
        {flowVisible?<LookFlow visible={flowVisible} detail={flowDetail} onCancel={()=>this.setState({flowVisible: false, flowDetail:""})} />:null}
        
        <Card size="small">
        <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col span={4}>
              <Form.Item label="加班人">
                {getFieldDecorator('employeeName')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="状态">
                {getFieldDecorator('flowStatus')(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="1">审批中</Option>
                    <Option value="2">已批准</Option>
                    <Option value="3">不批准</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="加班时长">
                <InputNumber value={params.startTimeLength} onChange={this.handlenTime.bind(this, "start")} /><span>-</span>
                <InputNumber value={params.endTimeLength} onChange={this.handlenTime.bind(this, "end")} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="创建人">
                {getFieldDecorator('builderName')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item labelCol={{sm: {span:5}}} label="组织机构">
                {getFieldDecorator('mDeptId')(
                  deptList && deptList.length?
                  <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll>
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={(
                <Select style={{width: "80%"}} value={params.dateType} onChange={this.handlenSectionType.bind(this)} >
                  <Option value="">全部</Option>
                  <Option value="1">创建日期</Option>
                  <Option value="2">加班日期</Option>
                  <Option value="3">审批日期</Option>
                </Select>
              )}>
                {getFieldDecorator('time')(<RangePicker />)}
              </Form.Item>
            </Col>
            
            <Col span={8}>
              <Form.Item >
                <Button type="primary" className="mgl10" htmlType="submit"><Icon type="search" />搜索</Button>
                <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
          
          <Table size="small" bordered columns={overworkColumns(this)} dataSource={overwork?utils.addIndex(overwork.list):[]} 
            pagination={utils.Pagination(overwork, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getOverWork(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOverWork, loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    overwork: state.person.overwork,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(OverWork) )