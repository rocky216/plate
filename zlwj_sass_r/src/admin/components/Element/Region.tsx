/**
 * onChange  地区框改变回调
 */

import React, {useEffect, useState} from "react"
import {Cascader} from "antd"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getRegions} from "@admin/actions/appAction"



interface Props {
  actions: any;
  region: any[];
  onChange?: (value:any)=>void;
  value?:any
}

const RegionElement:React.FC<Props> = ({
  actions,
  region,
  onChange,
  value
})=>{
  
  useEffect(() => {
    actions.getRegions({})
  }, [])

  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange(changedValue );
    }
  };

  return (
    <Cascader
      value={value} 
      onChange={triggerChange}
      options={region} 
      fieldNames={{ label: 'name', value: 'code', children: 'child' }}
      placeholder="请选择省/市/区"/>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getRegions}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    region: state.app.region
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionElement);