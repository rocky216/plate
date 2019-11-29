import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Upload} from "antd";


class UploadBar extends React.Component {
  

  render(){
    const {name,action, data, showUploadList, utils, onChange, className} = this.props
    let newData = {token: utils.getCookie("token")}
    if(data){
      _.assign(newData, data)
    }
    return (
      <Upload
        name={name}
        showUploadList={showUploadList===undefined?true:showUploadList}
        action={action}
        data={newData}
        onChange={onChange}
        className={className}
      >{this.props.children}</Upload>
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

export default connect(mapStateProps, mapDispatchProps)(UploadBar)