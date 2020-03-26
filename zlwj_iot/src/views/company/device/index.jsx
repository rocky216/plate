import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import {getCompanyDevice} from "@/actions/companyAction"
import JCard from "@/components/JCard"
import AddDevice from "./add"
import EditDevice from "./edit"
import {companyDeviceColumns} from "../columns"
import SearchBox from "./searchBox"


class Device extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      initParams: {
        current: 1,
        companyId: props.match.params.id,
        deviceType:"",
        iotId:"",
        online:"",
        deviceSerial:""
      },
      params: {
        current: 1,
        companyId: props.match.params.id,
        deviceType:"",
        iotId:"",
        online:"",
        deviceSerial:""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getCompanyDevice(this.state.params)
  }

  getCol(){
    let _this = this
    return companyDeviceColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
          </div>
        )
      }
    }])
  }

  handlenSearch(values){
    const {initParams, params} = this.state
    if(values==null){
      this.props.actions.getCompanyDevice(initParams)
      this.setState({params: initParams})
      return
    }
    const {deviceType, iotId, online, deviceSerial} = values
    params.deviceType = deviceType
    params.iotId = iotId
    params.online = online
    params.deviceSerial = deviceSerial
    this.setState({params})
    this.props.actions.getCompanyDevice(params)
  }
  
  render(){
    const {utils, spinning, deviceList} = this.props
    const {addVisible, editVisible, detail, params} = this.state

    return (
      <JCard spinning={spinning}>
        <AddDevice visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {detail?<EditDevice visible={editVisible} detail={detail} 
          onCancel={()=>this.setState({editVisible: false,detail: ""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus"/>新增设备</Button>}>
          <div className="fixedend mgb10">
            <SearchBox handlenSearch={this.handlenSearch.bind(this)} />
          </div>
          
          <Table columns={this.getCol()} dataSource={deviceList?utils.addIndex(deviceList.list):[]} 
            pagination={utils.Pagination(deviceList, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getCompanyDevice(params)
            })}  />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompanyDevice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    deviceList: state.company.deviceList,
    spinning: state.company.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Device)