import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Button, Icon, Table} from "antd";
import {autoControlInit, getControlPage} from "@/actions/systemAction"
import {controlDeviceColumns} from "../../colmuns"
import EditControl from "./edit"
import EditPassControl from "./editpass"


class ControlDevice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      detail: "",
      params: {
        current: 1
      }
    }
  }
  componentDidMount(){
    this.props.actions.getControlPage(this.state.params)
  }

  initData(){
    this.props.actions.autoControlInit({}, res=>{
      this.props.utils.OpenNotification("success", "初始化数据成功！")
    })
  }
  getCol(){
    let _this = this
    return controlDeviceColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true,detail:item})} >编辑</Button>
            <Link to={`/system/pass/${item.id}/pass`}>
              <Button type="link">通道设置</Button>
            </Link>
            <Button type="link">删除</Button>
          </div>
        )
      }
    }])
  }
  render(){
    const {utils, controldevice} = this.props
    const {editVisible, detail, params} = this.state

    return (
      <div>
        
        {editVisible && detail ?
          <EditControl visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <div className="mgb10" >
          <Button type="primary" onClick={this.initData.bind(this)}><Icon type="redo" />初始化</Button>
        </div>
        <Table columns={this.getCol()} dataSource={controldevice?utils.addIndex(controldevice.list):[]} 
          pagination={utils.Pagination(controldevice, page=>{
            params.current = page
            this.setState({params})
            this.props.actions.getControlPage(params)
          })}/>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({autoControlInit, getControlPage}, dispatch)
  }
}

function mapStateProps(state){
  return {
    controldevice: state.system.controldevice,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ControlDevice)