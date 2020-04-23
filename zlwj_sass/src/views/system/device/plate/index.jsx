import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Icon, Table} from "antd";
import {plateInit, getPlateDevice} from "@/actions/systemAction"
import {plateDeviceColumns} from "../../colmuns"
import EdotPlateDevice from "./edit"


class PlateDevice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      detail: ""
    }
  }
  componentDidMount(){
    this.props.actions.getPlateDevice({})
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
            <a href={`${BASEURL}/api/pc/admin/device/plate/appCreateImg?token=${_this.props.utils.getCookie("token")}&iotId=${item.iotId}`}>
              <Button type="link">下载APP码</Button>
            </a>
            <a href={`${BASEURL}/api/pc/admin/device/plate/miniCreateImg?token=${_this.props.utils.getCookie("token")}&iotId=${item.iotId}`}>
              <Button type="link">下载小程序码</Button> 
            </a>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, plateDevice} = this.props
    const {editVisible, detail} = this.state

    return (
      <div>
        {editVisible && detail?
        <EdotPlateDevice visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <div className="mgb10" >
          <Button type="primary" onClick={this.initData.bind(this)}><Icon type="redo" />初始化</Button>
        </div>
        <Table columns={this.getCol()} dataSource={plateDevice?utils.addIndex(plateDevice.list):[]} />
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({plateInit, getPlateDevice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    plateDevice: state.system.plateDevice,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PlateDevice)