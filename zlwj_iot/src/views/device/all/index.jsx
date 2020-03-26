import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Table, Card, Button } from "antd";
import {getAlldevice} from "@/actions/deviceAction"
import {companyDeviceColumns} from "../../company/columns"
import JCard from "@/components/JCard"
import EditDeviceAll from "./edit"


class DeviceAll extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getAlldevice({})
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

  render(){
    const {utils, spinning, allDevice } = this.props
    const {editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        {detail?<EditDeviceAll visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card>
          <Table columns={this.getCol()} dataSource={allDevice?utils.addIndex(allDevice):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAlldevice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.device.spinning,
    allDevice: state.device.allDevice,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceAll)