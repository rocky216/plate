import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button} from "antd";
import GanttChart from "@/components/GanttChart"


class Home extends React.Component {
  componentDidMount(){
  }


  render(){
    return (
      <div>
        <GanttChart/>
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

  }
}

export default connect(mapStateProps, mapDispatchProps)(Home)