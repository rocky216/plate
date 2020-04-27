import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Button, Icon, Table, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getHeLinkMan, deleteHeLinkMan} from "@/actions/projectAction"
import AddItemConact from "./add"
import EditItemConact from "./edit"
import {itemConcactColumns} from "../../colmuns"



class ItemContact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getHeLinkMan({heId: this.props.match.params.id})
  }

  handlenDelete(item){
    this.props.actions.deleteHeLinkMan({id:item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getHeLinkMan({heId: this.props.match.params.id})
    })
  }

  getCol(){
    let _this = this;
    return itemConcactColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button  type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, heLink} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddItemConact visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible?
        <EditItemConact visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}

        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增联系人</Button>}>
          <Table columns={this.getCol()} dataSource={heLink?utils.addIndex(heLink):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHeLinkMan, deleteHeLinkMan}, dispatch)
  }
}

function mapStateProps(state){
  return {
    heLink: state.project.heLink,
    spinning :state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ItemContact)