import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Row, Col} from "antd";



class DeviceMonitorPile extends React.Component {
  render(){
    const {utils } = this.props

    return (
      <div>
        <Row>
          <Col span={18}>
            <Table/>
          </Col>
          <Col span={6}>
          </Col>
        </Row>
      </div>
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
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceMonitorPile)