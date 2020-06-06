import React, {useState} from "react"
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import { Select } from "antd"
import {getCompanys} from "@/actions/powerAction"
import {IProps } from "@/interface/app"

const {Option } = Select

interface Props extends IProps {
  companys:any;
  style?:any,
  value?:any
  onChange?:(value:any)=>void;
}

class SelectCompany extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getCompanys()
  }
  handlenTrigger(value:number){
    if(this.props.onChange){
      this.props.onChange(value)
    }
  }

  render(){
    const {companys, utils, style={width: "100%"}, value} = this.props;
    console.log(value, "asas")

    return (
      <Select style={style} onChange={this.handlenTrigger.bind(this)}>
        {companys?companys.list.map((item:any)=>(
          <Option key={item.id} value={item.id}>{item.companyName}</Option>
        )):null}
      </Select>
    )
  }
}

const mapStateToProps = (state:any) => {
  return {
    utils: state.app.utils,
    companys: state.power.companys
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanys}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompany)



