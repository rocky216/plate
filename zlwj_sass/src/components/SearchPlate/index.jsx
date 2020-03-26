import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tag, Icon} from "antd";
import AddSearchPlate from "./add"


class SearchPlate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
  }
  onChange(item){
    let index = _.findIndex(this.props.value, o=>o.id==item.id)
    if(index>-1)return
    this.props.value.push(item)
    this.props.onChange(this.props.value)
  }
  onClose(item){
    _.remove(this.props.value, o=>o.id==item.id)
    this.props.onChange(this.props.value)
  }

  render(){
    const {utils, detail, onChange, value} = this.props
    const {visible} = this.state
    console.log(value)
    return (
      <div style={{display: "flex"}}>
        <AddSearchPlate visible={visible} onChange={this.onChange.bind(this)} 
        detail={detail} onCancel={()=>this.setState({visible:false})} />
        <div style={{width:"100%", padding: "0 5px 0 5px", minHeight: 32,border: "1px solid #ddd", borderRadius: 5}}>
          {value && value.length?value.map(item=>(
            <Tag key={item.id} closable onClose={this.onClose.bind(this, item)} >{item.licensePlate}</Tag>
          )):null}
        </div>
        <Icon type="select" 
          onClick={()=>this.setState({visible: true})}
          style={{padding:"5px 0 0 5px", cursor:"pointer", fontSize: 20, color: "#45a3fc"}} />
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

export default connect(mapStateProps, mapDispatchProps)(SearchPlate)