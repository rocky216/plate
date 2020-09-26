import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Table, Popconfirm} from "antd";
import {getCarTempAccount, deleteCarTempAccount} from "@/actions/projectAction"
import AddAccountCar from "./addAccount"
import EditAccountCar from "./editAccount"

class TemCar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getCarTempAccount({parkId: this.props.match.params.id})
  }

  handlenDelete(item){
    this.props.actions.deleteCarTempAccount({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCarTempAccount({parkId: this.props.match.params.id})
    })
  }

  getCol(){
    let _this = this
    return [
      {title: "用户名", dataIndex: "userName"},
      {title: "账号", dataIndex: "account"},
      {title: "密码", dataIndex: "password"},
      {
        title:"操作",
        render(item) {
          return (
            <div>
              <Button type="link" size="small" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
              <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link">删除</Button>
              </Popconfirm>
            </div>
          );
        }
      }
    ]
  }
  
  render(){
    const {utils, temcar} = this.props
    const {addVisible, editVisible, detail} = this.state
    
    return (
      <Card
        title={(
          <div>
            <span className="mgr10">临时车配置</span>
            <a href="/carTemp/login">跳转到临时车系统</a>
          </div>
        )}
        extra={(
          <div>
            <Button icon="plus" type="primary" className="mgl10" onClick={()=>this.setState({addVisible: true})}>新增</Button>
          </div>
        )}
      >
        <AddAccountCar visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible?
        <EditAccountCar visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ""})} />:null}

        <Table size="small" columns={this.getCol()} dataSource={temcar?utils.addIndex(temcar):[]} pagination={false} />
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCarTempAccount, deleteCarTempAccount}, dispatch)
  }
}

function mapStateProps(state){
  return {
    temcar: state.project.temcar,
    utils: state.app.utils
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(TemCar) )