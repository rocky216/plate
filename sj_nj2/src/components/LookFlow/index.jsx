import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Timeline} from "antd";
import {getLookFlow} from "@/actions/personAction"
import "./index.less"


class LookFlow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      info: ""
    }
  }

  componentDidMount(){
    this.props.actions.getLookFlow({id: this.props.detail.flowId}, res=>{
      this.setState({info: res})
    })
  }

  render(){
    const {utils, spinning, visible, onCancel, detail} = this.props
    const {info} = this.state
    
    return (
      
        <Modal
            destroyOnClose
            title={info.flowName}
            okText="确定"
            cancelText="取消"
            confirmLoading={spinning}
            visible={visible}
            onCancel={onCancel}
            footer={false}
          >
          <div className="lookprocessBox">
            <Timeline mode="alternate">
              <Timeline.Item dot={<div className="start">开始</div>}>
                <div  style={{minHeight: 100}}></div>
              </Timeline.Item>
              {info && info.sysFlowNodes?info.sysFlowNodes.map((item, index)=>(
                <Timeline.Item key={index} dot={<div className={`nodeBox ${item.approveId?"yellow":""}`}>{item.nodeTitle}</div>} >
                  <div style={{minHeight: 100, paddingRight: 50, paddingLeft: 50}}>
                    <span style={{color: "red"}}>{item.approveName}</span>
                  </div>
                </Timeline.Item>
              )):null}
              
              <Timeline.Item dot={<div className="start">结束</div>}>
                <div  style={{minHeight: 100}}></div>
              </Timeline.Item>
            </Timeline>
          </div>
        </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getLookFlow }, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(LookFlow)