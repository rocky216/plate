import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {} from "antd";
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import {options} from "./data"



class DeviceChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      option: ""
    }
  }

  componentDidMount(){
    options.xAxis.data = this.handleData("signal",  "key")
    options.series[0].data = this.handleData("signal")
    this.setState({option: options})
  }

  handleData(attr,type){
    let arr = [];
    _.each(this.props.data[attr], item=>{
      if(type=="key"){
        arr.push(item.buildTimeStr)
      }else{
        arr.push(item.signalStrength)
      }
      
    })
    return arr
  }

  render(){
    const {utils} = this.props
    const {option} = this.state
    console.log(option, "asas")
    return (
      <div>
        {option?<ReactEchartsCore echarts={echarts} option={option}/>:null}
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

export default connect(mapStateProps, mapDispatchProps)(DeviceChart)