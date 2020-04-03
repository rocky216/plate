import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Cascader} from "antd";
import {getBuildAndUnitByHeId} from "@/actions/systemAction"

class Mycascader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      options: []
    }
  }
  componentDidMount(){
    this.props.actions.getBuildAndUnitByHeId({id: this.props.heId}, res=>{
      this.setState({options: res})
    })
  }
  render(){
    const {utils, fieldNames, value, onChange} = this.props
    const {options} = this.state

    return (
      <Cascader 
        value={value} 
        changeOnSelect
        expandTrigger="hover"
        options={options} 
        onChange={onChange}
        fieldNames={fieldNames}/>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBuildAndUnitByHeId}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Mycascader)