import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Select} from "antd";
import {getSelectHeList} from "@/actions/appAction"

const {Option} = Select

class HeList extends React.Component {
  componentDidMount(){
    this.props.actions.getSelectHeList(this.props.data?this.props.data:{})
  }

  render(){
    const {utils, allHeList} = this.props

    return (
      <Select {...this.props}>
        <Option value="">全部</Option>
        {allHeList?allHeList.map(item=>(
          <Option value={item.id} key={item.id}>{item.name}</Option>
        )):null}
      </Select>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSelectHeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(HeList)