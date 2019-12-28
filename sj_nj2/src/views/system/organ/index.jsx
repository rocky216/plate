import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Tree, Form, Input} from "antd";
import JCard from "@/components/JCard"
import {getTreeDept} from "@/actions/systemAction"
import EditOrgan from "./edit"

const {TreeNode } = Tree


class Organ extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: ""
    }
    this.timer = null
  }

  componentDidMount(){
    this.props.actions.getTreeDept({}, res=>{
      this.setState({detail: res[0]})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handlenSelect(key, {node}){
    let dataRef = node.props.dataRef
    this.setState({detail: ""})
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.setState({detail: dataRef})
    },100)
    
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, organ} = this.props
    const {detail} = this.state

    return (
      <JCard spinning={spinning}>
        <Row gutter={10}>
          <Col span={6}>
            <Card size="small" title="企业组织机构管理">
              {organ?<Tree
              showLine 
              defaultExpandAll
              onSelect={this.handlenSelect.bind(this)}
              blockNode>
                {this.createNode(organ)}
              </Tree>:null}
            </Card>
          </Col>
          <Col span={18}>
            <Card size="small" title="组织节点信息">
              {detail?<EditOrgan detail={detail} />:null}
              
            </Card>
          </Col>
        </Row>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTreeDept}, dispatch)
  }
}

function mapStateProps(state){
  return {
    organ: state.system.organ,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Organ) )