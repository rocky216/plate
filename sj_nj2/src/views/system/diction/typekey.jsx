import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {getDictData, deleteDictData} from "@/actions/systemAction"
import {typekeyColumns} from "../columns"
import AddType from "./addType"
import EditType from "./editType"


class TypeKeys extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getDictData({
      id: this.props.match.params.id
    })
  }

  handlenDelete(item){
    this.props.actions.deleteDictData({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getDictData({
        id: this.props.match.params.id
      })
    })
  }

  getCol(){
    let _this = this
    return typekeyColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button onClick={()=>_this.setState({editVisible: true, detail: item})} size="small" type="link">编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button size="small" type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, typekey} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" 
        title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增</Button>}
        extra={<Link to="/system/diction"><Button><Icon type="rollback" />返回</Button></Link>}>
          <AddType visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <EditType visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ""})} />
          <Table size="small" columns={this.getCol()} dataSource={typekey?utils.addIndex(typekey):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDictData, deleteDictData}, dispatch)
  }
}

function mapStateProps(state){
  return {
    typekey: state.system.typekey,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(TypeKeys)