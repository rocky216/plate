import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";


class Home extends React.Component {
  render(){
    return (
      <div>Home</div>
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

export default connect(mapStateProps, mapDispatchProps)(Home)