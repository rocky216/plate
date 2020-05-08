import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Table, Button, Icon } from "antd";
import JCard from "@/components/JCard"
import {getArguments} from "@/actions/dictAction"
import {argumentsColumns} from "../columns"
import AddArgumentsDict from "./add"
import EditArgumentsDict from "./edit"


class ArgumentsDict extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getArguments({})
  }

  getCol(){
    let _this = this
    return argumentsColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
          </div>
        )
      }
    }])
  }
  
  render(){
    const {utils, spinning, arg} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning} >
        <AddArgumentsDict visible={addVisible} onCancel={()=>this.setState({addVisible:false})} />
        {editVisible?
        <EditArgumentsDict visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}

        <Card  title={<Button type="primary" onClick={()=>this.setState({addVisible:true})}><Icon type="plus" />新增参数</Button>}>
          <Table columns={this.getCol()} dataSource={arg?utils.addIndex(arg):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getArguments}, dispatch)
  }
}

function mapStateProps(state){
  return {
    arg: state.dict.arguments,
    spinning: state.dict.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ArgumentsDict)