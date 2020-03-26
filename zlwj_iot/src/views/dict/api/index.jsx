import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {getApiList} from "@/actions/dictAction"
import AddApi from "./add"
import EditApi from "./edit"
import {apiColumns} from "../columns"



class ApiList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  componentDidMount(){
    this.props.actions.getApiList({})
  }

  getCol(){
    let _this = this
    return apiColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail:item})} >编辑</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, api} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddApi visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {detail?
        <EditApi visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false,detail:""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增接口</Button>}>
          <Table columns={this.getCol()} dataSource={api?utils.addIndex(api):[]} pagination={false} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getApiList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    api: state.dict.api,
    spinning: state.dict.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ApiList)