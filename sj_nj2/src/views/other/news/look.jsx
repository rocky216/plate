import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Typography} from "antd";
import JCard from "@/components/JCard"
import {readNotice, getNoticeNum} from "@/actions/appAction" 


class NewsLook extends React.Component {
  componentDidMount(){
    this.props.actions.readNotice({id: this.props.detail.id}, res=>{
      this.props.actions.getNoticeNum({})
    })
  }
  render(){
    const {utils, spinning, detail, visible, onCancel} = this.props

    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        footer={false}
        onCancel={onCancel}
      >
        <Typography.Text>{detail.noticeContent}</Typography.Text>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({readNotice, getNoticeNum}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.app.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(NewsLook)