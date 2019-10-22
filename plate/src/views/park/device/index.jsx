import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Table
} from "antd"
import JCard from "@/components/JCard"
import {deviceList} from "@/actions/parkAction"
import {deviceListColumns} from "../columns"
import {addIndex} from "@/utils"


class DeviceList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pagination: { 
        current: 1,
        total:0
      }
    }
  }

  componentWillMount(){
    this.getDeviceList(this.state.pagination.current)
  }

  getDeviceList(page){
    this.props.actions.deviceList({
      nowPage: page
    })
  }

  render(){
    const {device, spinning} = this.props
    const {pagination} = this.state
    device && device.pages?pagination.total = device.pages.sumRow:null
    console.log(pagination, "pagination")
    pagination.onChange= (page)=>{
      pagination.current = page
      this.getDeviceList(page)
    }

    return (
      <JCard spinning={spinning}>
        <Card>
          <Table columns={deviceListColumns} 
            dataSource={device?addIndex(device.plateDevices):[]} 
            pagination={pagination}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({deviceList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    device: state.park.deviceList,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceList)