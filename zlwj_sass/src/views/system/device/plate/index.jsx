import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Icon, Table} from "antd";
import {plateInit, getPlateDevice,} from "@/actions/systemAction"
import {plateDeviceColumns} from "../../colmuns"
import EdotPlateDevice from "./edit"
import MySearch from "../search"
import DetailDevicesMonitor from "@/views/center/devicemonitor/detail"

let params = {
  current: 1,
  companyId: "",
  heId: "",
  online: "",
  serial: ""
}

class PlateDevice extends React.Component { 
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
    this.props.actions.getPlateDevice(params)
  }
  componentWillUnmount(){
    params={}
  }

  initData(){
    this.props.actions.plateInit({}, res=>{
      this.props.utils.OpenNotification("success", "初始化数据成功！")
    })
  }
  getCol(){
    let _this = this
    return plateDeviceColumns.concat([{
      title: "操作",
      render(item){ 
        return (
          <div> 
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})}>查看</Button>
            <a href={`${BASEURL}/api/pc/admin/device/plate/createImg?token=${_this.props.utils.getCookie("token")}&iotId=${item.iotId}`}>
              <Button type="link">下载二维码</Button>
            </a>
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
    this.props.actions.getPlateDevice(params)
  }

  render(){
    const {utils, plateDevice} = this.props
    const {editVisible, detail, classes, visible} = this.state

    return (
      <div>
        <MySearch className="flexend" handleSearch={this.handleSearch.bind(this)} />
        {editVisible && detail?
        <EdotPlateDevice visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        {visible?
        <DetailDevicesMonitor visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}
        
        <div className="mgb10"  style={{display:"flex"}} >
          <Button type="primary" onClick={this.initData.bind(this)}><Icon type="redo" />初始化</Button>
          <div>
            {classes.map(item=>(
            <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{plateDevice?plateDevice[item.key]:""}</span></Button>
          ))}
          </div>
        </div>
        <Table columns={this.getCol()} dataSource={plateDevice?utils.addIndex(plateDevice.data.list):[]} 
          pagination={plateDevice?utils.Pagination(plateDevice.data, page=>{
            params.current = page
            this.props.actions.getPlateDevice(params)
          }):false}/>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({plateInit, getPlateDevice, }, dispatch)
  }
}

function mapStateProps(state){
  return {
    plateDevice: state.system.plateDevice,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PlateDevice)