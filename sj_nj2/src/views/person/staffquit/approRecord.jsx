import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Table} from "antd";
import {getQuitRecord} from "@/actions/personAction"
import {staffRecordColumns} from "../columns"

class ApproRecord extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      record: ""
    }
  }

  componentDidMount(){
    this.props.actions.getQuitRecord({
      id: this.props.detail.flowId
    }, res=>{
      this.setState({record: res})
    })
  }

  handlenSubmit(){
    
  }

  render(){
    const {utils, spinning, onCancel, visible, detail} = this.props
    const {record} = this.state

    return (
      <Modal
        destroyOnClose
        title={`人员离职记录(${detail.name})`}
        width={"60%"}
        size="small"
        footer={false}
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Table size="small" columns={staffRecordColumns} dataSource={record?utils.addIndex(record):[]} pagination={false} />
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getQuitRecord}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ApproRecord)