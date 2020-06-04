import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Select, Input} from "antd";

const {Option } = Select;

class SpecialBox extends React.Component {

  handleSelect(codeType){
    this.triggerChange({codeType})
  }

  handleCode({target}){
    this.triggerChange({code: target.value})
  }

  triggerChange(changedValue){
    const { onChange, value } = this.props;
    
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  }

  render(){
    const {utils, value} = this.props
    
    return (
      <div style={{display:"flex",}}>
        <Select value={value?value.codeType:""} 
          onChange={this.handleSelect.bind(this)}
        style={{width: 120}}>
          <Option value="house" >住宅编号</Option>
          <Option value="other" >非住宅编号</Option>
          <Option value="parking" >停车位编号</Option>
        </Select>
        <span>：</span>
        <Input value={value?value.code:""} onChange={this.handleCode.bind(this)} style={{width: 150}} />
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

export default connect(mapStateProps, mapDispatchProps)(SpecialBox)