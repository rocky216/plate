import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Modal, Tree, Row, Col, Table} from "antd";
import {getTreeDept, getTeach} from "@/actions/personAction"
import {teachColumns} from "../columns"

const {TreeNode} = Tree

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Teach extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      staff: ""
    }
  }
  componentDidMount(){
    this.props.actions.getTreeDept({deptId: this.props.deptId?this.props.deptId:0},res=>{
      if(res && res.length){
        this.props.actions.getTeach({
          selectDeptId: res[0]["id"], activity: "2",selectDeptType:res[0]["deptType"] }, res1=>{
          this.setState({staff: res1})
        })
      }
      
    })
  }

  handlenSelect(key, {node}){
    
    this.props.actions.getTeach({
      selectDeptId: node.props.dataRef.id,
      selectDeptType: node.props.dataRef.deptType,
      activity: "2"
    }, res1=>{
      this.setState({staff: res1})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  

  handlenSubmit(){

  }

  

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, treeDept, onSelect} = this.props
    const {staff} = this.state
    console.log(treeDept)
    return (
      <Modal
        title="选择员工"
        destroyOnClose
        width={800}
        okText="确定"
        cancelText="取消"
        footer={false}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Row>
          <Col span={8}>
            {treeDept?
            <Tree 
              defaultExpandAll
              onSelect={this.handlenSelect.bind(this)}
              showLine>
              {this.createNode(treeDept)}
            </Tree>:null}
            
          </Col>
          <Col span={16}>
            <Table size="small" columns={teachColumns} dataSource={staff?utils.addIndex(staff):[]}
              pagination={false}
              onRow={record=>{
                return {
                  onClick(){
                    onSelect(record)
                    onCancel()
                  }
                }
              }}
            />
          </Col>
        </Row>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTreeDept, getTeach}, dispatch)
  }
}

function mapStateProps(state){
  return {
    treeDept: state.person.treeDept,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Teach) )