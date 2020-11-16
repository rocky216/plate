import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Button, Icon, Table} from "antd";
import {autoControlInit, getControlPage} from "@/actions/systemAction"
import {controlDeviceColumns} from "../../colmuns"
import EditControl from "./edit"
import EditPassControl from "./editpass"
import MySearch from "../search"
import DetailDevicesMonitor from "@/views/center/devicemonitor/detail"

let params = {
  current: 1,
  companyId: "",
  heId: "",
  online: "",
  serial: ""
}

class ControlDevice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      visible: false,
      detail: "",
      classes: [
        {title: "在线设备", key: "iotOnLine"},
        {title: "离线设备", key: "iotOffline"},
        {title: "24小时掉线次数", key: "offCount"},
      ],
    }
  }
  componentDidMount(){
    this.props.actions.getControlPage(params)
  }
  componentWillUnmount(){
    params={}
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
            <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})}>查看</Button>
            <Link to={`/system/pass/${item.id}/pass`}>
              <Button type="link">通道设置</Button>
            </Link>
            {/* <Button type="link">删除</Button> */}
          </div>
        )
      }
    }])
  }

  handleSearch(values){
    params.companyId = values.companyId
    params.heId = values.heId
    params.online = values.online
    params.serial = values.serial
    this.props.actions.getControlPage(params)
  }

  render(){
    const {utils, controldevice} = this.props
    const {editVisible, detail, classes, visible} = this.state

    return (
      <div>
        <MySearch className="flexend" handleSearch={this.handleSearch.bind(this)} />
        {editVisible && detail ?
          <EditControl visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        {visible?
        <DetailDevicesMonitor visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}
        
        <div className="mgb10" style={{display:"flex"}}>
          <Button type="primary" onClick={this.initData.bind(this)}><Icon type="redo" />初始化</Button>
          <div>
            {classes.map(item=>(
              <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{controldevice?controldevice[item.key]:""}</span></Button>
            ))}
          </div>
        </div>
        <Table columns={this.getCol()} dataSource={controldevice?utils.addIndex(controldevice.data.list):[]} 
          pagination={controldevice?utils.Pagination(controldevice.data, page=>{
            params.current = page
            this.props.actions.getControlPage(params)
          }):false}/>
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