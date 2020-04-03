import React from "react"
import {connect} from "react-redux"
import {Switch,withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Tabs} from "antd";
import AuthRoute from "@/routers/AuthRoute"
import JCard from "@/components/JCard"
import PileDevice from "./pile"
import PlateDevice from "./plate"
import ControlDevice from "./control"


const {TabPane } = Tabs

class DeviceManage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: ""
    }
  }
  componentDidMount(){
    let arr = this.props.location.pathname.split("/")
    this.setState({activeKey:arr[arr.length-1]})
  }
  handlenSwitch(key){
    this.props.history.push("/system/device/"+key)
    this.setState({activeKey:key})
  }

  render(){
    const {utils, spinning} = this.props
    const {activeKey} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Tabs activeKey={activeKey} onChange={this.handlenSwitch.bind(this)}>
            <TabPane tab="充电桩" key="pile"></TabPane>
            <TabPane tab="车牌识别" key="plate"></TabPane>
            <TabPane tab="控制器" key="control"></TabPane>
          </Tabs>
          <Switch>
            <AuthRoute exact path="/system/device/pile" Component={PileDevice} auth="9-06-01" name="充电桩设备管理" />
            <AuthRoute exact path="/system/device/plate" Component={PlateDevice} auth="9-06-02" name="车牌识别设备管理" />
            <AuthRoute exact path="/system/device/control" Component={ControlDevice} auth="9-06-03" name="门禁管理" />
            
          </Switch> 
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceManage)