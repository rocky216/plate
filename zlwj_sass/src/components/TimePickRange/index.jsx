import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {TimePicker} from "antd";
import moment from "moment"


class TimePickRange extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timepick1: false,
      timepick2: false,
      timeArr: props.values?_.cloneDeep(props.values):[]
    }
  }

  handlenChange(type, t){
    
    const {timeArr} = this.state
    if(type=="start"){
      timeArr[0]=t
      timeArr[1]=null
      this.setState({timepick1: false, timepick2: true})
    }else {
      console.log(timeArr[0], t)
      if(t!=null && timeArr[0]>t){
        this.props.utils.OpenNotification("error", "开始时间不能大于结束时间！")
        return
      }
      timeArr[1]=t
      this.setState({timepick2: false})
    }
    if(t===null){
      this.props.onChange("")
      return
    }
    this.props.onChange(timeArr)
    
  }

  render(){
    const {utils, values, onChange, format} = this.props
    const {timepick1,timepick2} = this.state
    
    return (
      <div style={{display: "flex"}}>
        <TimePicker 
          allowClear={false}
          format={format}
          value={values?values[0]:null} 
          open={timepick1}
          onChange={this.handlenChange.bind(this, "start")} 
          onFocus={(e)=>this.setState({timepick1: true})}/>
        <span style={{padding: "0 5px", lineHeight: "30px"}} >到</span>
        <TimePicker 
          value={values && values.length>1 && values[1]?values[1]:null} 
          format={format}
          onChange={this.handlenChange.bind(this, "end")} 
          open={timepick2} 
          onFocus={()=>this.setState({timepick2: true})}/>
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

export default connect(mapStateProps, mapDispatchProps)(TimePickRange)