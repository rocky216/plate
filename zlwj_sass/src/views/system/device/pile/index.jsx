import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Table, Button, Icon, Popconfirm} from "antd";
import {getPileDevice, autoInitDevice, deletePileDevice} from "@/actions/systemAction"
import {pileDeviceColumns} from "../../colmuns"
import EditPileDevice from "./edit"


class PileDevice extends React.Component {
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
    this.props.actions.getPileDevice(this.state.params)
    
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
      this.props.actions.getPileDevice(this.state.params)
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

  render(){
    const {utils, piledevice} = this.props
    const {editVisible, detail, params} = this.state

    return (
      <div>
        {editVisible && detail?
        <EditPileDevice visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false})} />:null}
        
        <div className="mgb10" >
          <Button type="primary" onClick={this.initData.bind(this)}><Icon type="redo" />初始化</Button>
        </div>
        <Table columns={this.getCol()} dataSource={piledevice?utils.addIndex(piledevice.list):[]} 
          pagination={utils.Pagination(piledevice, page=>{
            params.current = page
            this.setState({params})
            this.props.actions.getPileDevice(params)
          })}/>
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