import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Table} from "antd";
import {getPostsRecord} from "@/actions/personAction"
import {staffRecordColumns} from "../columns"

class PostsRecord extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      record: ""
    }
  }

  componentDidMount(){
    this.props.actions.getPostsRecord({
      id: this.props.detail.id
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
        title={`人员调岗记录(${detail.name})`}
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
    actions: bindActionCreators({getPostsRecord}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PostsRecord)