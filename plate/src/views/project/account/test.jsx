import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {

} from "antd"
import JCard from "@/components/JCard"


class Account extends React.Component {
  render(){
    return (
      <JCard>
        <div>
          as
        </div>
      </JCard>
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