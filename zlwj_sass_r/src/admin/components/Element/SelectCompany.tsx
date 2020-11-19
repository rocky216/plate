
import React, { useEffect, useState } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import {IState} from "@public/common/interface"
import { bindActionCreators } from "redux"
import {getCompanys} from "@admin/actions/appAction"


const {Option} = Select

interface Props {
  actions:any;
  companys: any;
  onChange?:(arg1:any)=>void;
  value?: any;
}

const SelectCompamy:React.FC<Props> = ({actions, companys, onChange, value})=>{

  useEffect(() => {
    actions.getCompanys({pageSize: 1000})
  }, [])

  const hanleChange = (val:any)=>{
    if(onChange){
      onChange(val);
    }
  }

  return (
    <Select
      showSearch
      filterOption={(input, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      value={value}
      onChange={hanleChange}
    >
      {companys?companys.list.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.name}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanys}, dispatch)
  }
}

const mapStateToProps = (state:IState) => {
  return {
    companys: state.app.companys
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompamy)