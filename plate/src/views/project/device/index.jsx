import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Table, Button
} from "antd"
import JCard from "@/components/JCard"
import {getDeviceList} from "@/actions/projectAction"
import { deviceListColumns } from "../columns";
import { addIndex } from "@/utils";
import EditDevice from "./edit"


class ProjectDevice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pagination: { 
        current: 1,
        total:0
      },
      editVisible: false,
      detail: ''
    }
  }

  componentWillMount(){
    this.getDeviceList(this.state.pagination.current)
  }
  getDeviceList(page){
    this.props.actions.getDeviceList({
      nowPage: page
    })
  }

  handlenEdit(item){
    this.setState({detail: item, editVisible: true})
  }
  getCol(){
    let _this = this
    return deviceListColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={_this.handlenEdit.bind(_this, item)} >编辑</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {device, spinning} = this.props
    const {pagination, editVisible, detail} = this.state

    device?pagination.total=device.pages.sumRow:null
    pagination.onChange = (page)=>{
      pagination.current = page
      this.getDeviceList(page)
      this.setState({pagination})
    }
    return (
      <JCard spinning={spinning} >
        <div>
          <EditDevice detail={detail} editVisible={editVisible} pagination={pagination} onCancel={()=>this.setState({editVisible: false})}/>
          <Card>
            <Table columns={this.getCol()} 
                dataSource={device?addIndex(device.plateDevices):[]} 
                pagination={pagination}/>
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeviceList }, dispatch)
  }
}

function mapStateProps(state){
  return {
    device: state.project.device,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ProjectDevice)