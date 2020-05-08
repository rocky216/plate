import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getOperative, deleteOperative} from "@/actions/manageAction"
import AddOperative from "./add"
import EditOperative from "./edit"
import {operativeColumns} from "../columns"


class ManageOperative extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      params: {
        current:1,
        
      }
    }
  }

  componentDidMount(){
    this.props.actions.getOperative(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteOperative({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getOperative({})
    })
  }

  getCol(){
    let _this = this
    return operativeColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button onClick={()=>_this.setState({editVisible: true, detail: item})} type="link">编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, operative} = this.props
    const {addVisible, editVisible, detail, params} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增合作商</Button>}>
          <AddOperative visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <EditOperative visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})}  />
          <Table columns={this.getCol()} dataSource={operative?utils.addIndex(operative.list):[]} 
            pagination={utils.Pagination(operative, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getOperative(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOperative, deleteOperative}, dispatch)
  }
}

function mapStateProps(state){
  return {
    operative: state.manage.operative,
    spinning: state.manage.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ManageOperative)