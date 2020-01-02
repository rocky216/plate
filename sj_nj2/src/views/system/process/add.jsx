import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Timeline, Row, Col, Icon, Form, Input, Select, InputNumber, Button, List, TreeSelect} from "antd";
import JCard from "@/components/JCard"
import "./index.less"
import {flowType} from "./data"
import AddNode from "./addNode"
import EditNode from "./editNode"
import {getSelectDict, getSelectRole, addProcess, getSelectDept} from "@/actions/systemAction"

const {Option} = Select
const { TreeNode } = TreeSelect;

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

class AddProcess extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      selectDept:[],
      index: -1,
      nodeList: []
    }
  }

  componentDidMount(){
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
        nodeList.push(values)
      }
      this.setState({nodeList})
    }else if(type=="edit"){
      nodeList[index] = values
      this.setState({nodeList, index: -1})
    }
  }

  handlenPreview(){

  }

  handlenSumbit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addProcess({
          ...values,
          flowNodeTemplates: JSON.stringify(this.state.nodeList)
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning} = this.props
    const {addVisible, nodeList, selectDept, editVisible, detail} = this.state
    console.log(nodeList)

    return (
      <JCard spinning={spinning}>
        <AddNode visible={addVisible} onSubmit={this.onSubmit.bind(this, "add")} onCancel={()=>this.setState({addVisible: false})} />
        <EditNode visible={editVisible} onSubmit={this.onSubmit.bind(this, "edit")} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />
        
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
                rules: [
                  {
                    required: true,
                    message: '填写流程名称!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="流程类型" hasFeedback>
              {getFieldDecorator('flowType', {
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
            <Form.Item label="流程组织" hasFeedback>
              {getFieldDecorator('flowOrgan', {
                rules: [
                  {
                    required: true,
                    message: '填写流程组织!',
                  }
                ],
              })(
                <TreeSelect>
                  {this.createNode(selectDept)}
                </TreeSelect>
              )}
            </Form.Item>
            <Form.Item label="流程版本" hasFeedback>
              {getFieldDecorator('flowVersion', {
                rules: [
                  {
                    required: true,
                    message: '填写流程版本!',
                  }
                ],
              })(<Input />)}
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
                  <Icon type="edit" onClick={()=>this.setState({editVisible:true, detail: item, index: index})} />, <Icon type="delete" />]} >{item.nodeTitle}</List.Item>
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
    actions: bindActionCreators({ getSelectDict, getSelectRole, addProcess, getSelectDept}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddProcess) )