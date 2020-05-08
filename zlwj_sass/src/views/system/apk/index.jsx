import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getAppApk, deleteAppApk} from "@/actions/systemAction"
import {appApkColumns} from "../colmuns"
import AddApkSystem from "./add"


class ApkSystem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false
    }
  }
  

  componentDidMount(){
    this.props.actions.getAppApk({status: "0"})
  }

  handlenDelete(item){
    this.props.actions.deleteAppApk({id: item.id}, res=>{
      this.props.actions.getAppApk({})
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this
    return appApkColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
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
    const {utils, spinning, apk} = this.props
    const {addVisible} = this.state

    return (
      <JCard spinning={spinning}>
        <AddApkSystem visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />

        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增版本</Button>}>
          <Table columns={this.getCol()} dataSource={apk?utils.addIndex(apk):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAppApk, deleteAppApk}, dispatch)
  }
}

function mapStateProps(state){
  return {
    apk: state.system.apk,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ApkSystem)