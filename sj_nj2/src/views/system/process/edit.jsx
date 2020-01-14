import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Timeline, Row, Col, Icon, Form, Input, Select, InputNumber, Button, List, TreeSelect, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import "./index.less"
import {flowType} from "./data"
import AddNode from "./addNode"
import EditNode from "./editNode"
import {getSelectDict, getSelectRole, editProcess, getSelectDept, getProcessDetail, } from "@/actions/systemAction"

const {Option} = Select
const { TreeNode } = TreeSelect;
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EditProcess extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      selectDept:[],
      index: -1,
      info: "",
      nodeList: []
    }
  }

  componentDidMount(){
    this.props.actions.getProcessDetail({id: this.props.match.params.id}, res=>{
      console.log(res)
      this.setState({info: res, nodeList: res.flowNodeTemplateList})
    })

    this.props.actions.getSelectDept({loadType: 1}, res=>{
      this.setState({selectDept: res})
    })

    this.props.actions.getSelectDict({dictTypeKey: "dict_position"}, res=>{
      this.setState({jobList: res})
    })
    this.props.actions.getSelectRole({}, res=>{
      this.setState({roleList: res})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  onSubmit(type, values){
    
    const {index, nodeList} = this.state
    if(type=="add"){
      if(index>-1){
        nodeList.splice(index+1, 0, values)
        this.setState({index: -1})
      }else{
        console.log("add")
        nodeList.push(values)
      }
      this.setState({nodeList})
    }else if(type=="edit"){
      console.log(type, "type")
      nodeList[index] = values
      this.setState({nodeList, index: -1})
    }
  }


  handlenSumbit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editProcess({
          ...values,
          id: this.props.match.params.id,
          flowNodeTemplates: JSON.stringify(this.state.nodeList)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/system/process")
        })
      }
    })
  }

  handlenDelete(item, index){
    this.state.nodeList.splice(index, 1)
    this.setState({nodeList: this.state.nodeList})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning} = this.props
    const {addVisible, nodeList, selectDept, editVisible, detail, info} = this.state
    console.log(nodeList, "nodeList")

    return (
      <JCard spinning={spinning}>
        <AddNode visible={addVisible} onSubmit={this.onSubmit.bind(this, "add")} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible?<EditNode visible={editVisible} onSubmit={this.onSubmit.bind(this, "edit")} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        
        <Row>
          <Col span={12}>
            <Card size="small" extra={(
              <div>
                <Button type="primary" onClick={this.handlenSumbit.bind(this)} ><Icon type="save" />保存</Button>
              </div>
            )}>
              <Form {...formItemLayout} >
            <Form.Item label="流程名称" hasFeedback>
              {getFieldDecorator('flowName', {
                initialValue: info.flowName,
                rules: [
                  {
                    required: true,
                    message: '填写流程名称!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="适用部门" hasFeedback>
              {getFieldDecorator('flowOrgan', {
                initialValue: info.flowOrgan,
                rules: [
                  {
                    required: true,
                    message: '填写流程组织!',
                  }
                ],
              })(
                <TreeSelect>
                  <TreeNode key="0" value="0" title="通用"></TreeNode>
                  {this.createNode(selectDept)}
                </TreeSelect>
              )}
            </Form.Item>
            <Form.Item label="标识" hasFeedback>
              {getFieldDecorator('flowSign', {
                initialValue: info.flowSign,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="过滤重复" hasFeedback>
              {getFieldDecorator('flowFilter', {
                initialValue: info.flowFilter,
              })(
                <Select >
                  <Option value="0">不过滤</Option>
                  <Option value="1">过滤</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="流程描述" hasFeedback>
              {getFieldDecorator('remark', {
                initialValue: info.remark,
              })(<TextArea />)}
            </Form.Item>
            <Form.Item label="流程版本" hasFeedback>
              {getFieldDecorator('flowVersion', {
                initialValue: info.flowVersion,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="流程类型" hasFeedback>
              {getFieldDecorator('flowType', {
                initialValue: info.flowType,
                rules: [
                  {
                    required: true,
                    message: '流程类型!',
                  }
                ],
              })(
                <Select style={{width: "100%"}}>
                  {flowType.map(item=>(
                    <Option key={item.value} value={item.value}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="添加流程节点" >
              <div className="fixedend">
                <Button size="small" onClick={()=>this.setState({addVisible: true})} type="primary" ghost><Icon type="plus" />添加节点</Button>
              </div>
              <List 
              className="mgt10"
              size="small" 
              bordered
              dataSource={nodeList} 
              renderItem={(item, index)=>{
                return <List.Item actions={[
                  <Icon type="plus" onClick={()=>this.setState({addVisible: true, index: index})} />,
                  <Icon type="edit" onClick={()=>this.setState({editVisible:true, detail: item, index: index})} />, 
                  <Popconfirm
                    placement="topRight" 
                    title="是否删除？"
                    okText="是"
                    cancelText="否"
                    onConfirm={this.handlenDelete.bind(this, item, index)}>
                      <Icon type="delete" />
                    </Popconfirm>]} >{item.nodeTitle}</List.Item>
              }}/>
            </Form.Item>
          </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card  size="small" title="预览" extra={<Link to="/system/process"><Button><Icon type="rollback" />返回</Button></Link>}> 
              <div className="processBox" >
              <Timeline mode="alternate">
                <Timeline.Item dot={<div className="start">开始</div>}>
                  <div  style={{minHeight: 100}}></div>
                </Timeline.Item>
                {nodeList.map((item, index)=>(
                  <Timeline.Item key={index} dot={<div className="nodeBox">{item.nodeTitle}</div>} >
                    <div style={{minHeight: 100}}></div>
                  </Timeline.Item>
                ))}
                
                <Timeline.Item dot={<div className="start">结束</div>}>
                  <div  style={{minHeight: 100}}></div>
                </Timeline.Item>
              </Timeline>
            </div>
            </Card>
          </Col>
        </Row>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({ getSelectDict, getSelectRole, editProcess, getSelectDept, getProcessDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditProcess) )