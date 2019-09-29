import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal
} from "antd"


class Account extends React.Component {
  render(){
    const {roleVisible} = this.props

    return (
      <Modal
        visible={roleVisible}
      >
        
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Account)