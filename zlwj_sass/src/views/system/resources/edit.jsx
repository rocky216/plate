import React from "react"
import {connect} from "react-redux"
import {Link } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon } from "antd";
import JCard from "@/components/JCard"
import {getMobileInfoList} from "@/actions/systemAction"
import {resourcesEditColumns} from "../colmuns"
import AddAdv from "./addAdv"
import EditAdv from "./editAdv"


class EditResources extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  
  componentDidMount(){
    this.props.actions.getMobileInfoList({
      typeId: this.props.match.params.id
    })
  }

  getCol(){
    let _this = this
    return resourcesEditColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, mobilesingledata} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddAdv visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible?
          <EditAdv visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card 
          title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增广告</Button>} 
          extra={<Link to="/system/resources"><Button><Icon type="rollback" />返回</Button></Link>}
          >
          <Table columns={this.getCol()} dataSource={mobilesingledata?utils.addIndex(mobilesingledata.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getMobileInfoList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    mobilesingledata: state.system.mobilesingledata,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(EditResources)