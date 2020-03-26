import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Select, Spin, Input, Icon} from "antd";
import {getOwnersListByNameOrPhone} from "@/actions/appAction"
import AddHouse from "./add"

const {Option} = Select

class Test extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
  }

  onChange(item){
    this.props.onChange(item)
    // this.props.onChange({name: item.ownersName+item.ownersPhone, id: item.ownersId})
  }

  render(){
    const {utils, placeholder, style, value, detail, onlyHe} = this.props
    const { visible} = this.state
    
    return (
      <span style={{display: "flex"}}>
        <AddHouse visible={visible} onlyHe={onlyHe} onChange={this.onChange.bind(this)} detail={detail} onCancel={()=>this.setState({visible: false})}/>
        <Input value={value?value.ownersName+value.ownersPhone:""} />
        <Icon type="select" 
          onClick={()=>this.setState({visible: true})}
        style={{padding:"5px 0 0 5px", cursor:"pointer", fontSize: 20, color: "#45a3fc"}} />
      </span>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOwnersListByNameOrPhone}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Test)