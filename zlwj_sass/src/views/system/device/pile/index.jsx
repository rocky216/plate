import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Table, Button, Icon, Popconfirm} from "antd";
import {getPileDevice, autoInitDevice, deletePileDevice} from "@/actions/systemAction"
import {pileDeviceColumns} from "../../colmuns"
import EditPileDevice from "./edit"
import MySearch from "../search"
import DetailDevicesMonitor from "@/views/center/devicemonitor/detail"

let params = {
  current: 1,
  companyId: "",
  heId: "",
  online: "",
  serial: ""
}

class PileDevice extends React.Component {
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
        {title: "空闲中的端口", key: "portOffLine"},
        {title: "使用中端口数", key: "portOnLine"},
      ],
    }
  }

  componentDidMount(){
    this.props.actions.getPileDevice(params)
    
  }
  componentWillUnmount(){
    params={}
  }

  initData(){
    this.props.actions.autoInitDevice({}, res=>{
      this.props.utils.OpenNotification("success", "初始化数据成功！")
    })
  }

  handlenDelete(item){
    this.props.actions.deletePileDevice({
      id: item.id
    }, res=>{
      this.props.actions.getPileDevice(params)
      this.props.utils.OpenNotification("success")
    })
  }
  getCol(){
    const {utils} = this.props;
    let _this = this
    return pileDeviceColumns.concat([{ 
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
            <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})}>查看</Button>
            <a href={`${BASEURL}/api/pc/admin/devicePower/createImg/?token=${utils.getCookie("token")}&iotId=${item.iotId}`}>
              <Button type="link">下载二维码</Button>
            </a>
            
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

  handleSearch(values){
    params.companyId = values.companyId
    params.heId = values.heId
    params.online = values.online
    params.serial = values.serial
    this.props.actions.getPileDevice(params)
  }

  render(){
    const {utils, piledevice} = this.props
    const {editVisible, detail, classes, visible } = this.state


    return (
      <div>
        {editVisible && detail?
        <EditPileDevice visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false})} />:null}
        {visible?
        <DetailDevicesMonitor visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}
        
        <MySearch className="flexend" handleSearch={this.handleSearch.bind(this)} />
        <div className="mgb10" style={{display:"flex"}} >
          <Button type="primary" onClick={this.initData.bind(this)}><Icon type="redo" />初始化</Button>
          <div>
            {classes.map(item=>(
            <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{piledevice?piledevice[item.key]:""}</span></Button>
          ))}
          </div>
        </div>
        <Table columns={this.getCol()} dataSource={piledevice?utils.addIndex(piledevice.data.list):[]} 
          pagination={piledevice?utils.Pagination(piledevice.data, page=>{
            params.current = page
            this.props.actions.getPileDevice(params)
          }):false}/>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPileDevice, autoInitDevice, deletePileDevice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    piledevice: state.system.piledevice,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PileDevice)