import React from "react"
import {Spin } from "antd"

class JCard extends React.Component {
  render(){
    const {spinning} = this.props
    return (
      <div>
        <Spin spinning={spinning==true}>
          {this.props.children}
        </Spin>
      </div>
    )
  }
}

export default JCard