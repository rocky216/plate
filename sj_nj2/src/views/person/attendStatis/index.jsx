import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tabs, Card} from "antd";
import JCard from "@/components/JCard"
import Attstanaly from "./attstanaly"  
import Atttrendanaly from "./atttrendanaly"
import Overtrendanaly from "./overtrendanaly"

const { TabPane } = Tabs;

class AttendStatis extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabs: [
        {title: "出勤统计分析", key: "1"},
        {title: "加班统计分析", key: "2"},
        {title: "出勤趋势分析", key: "3"},
        {title: "加班趋势分析", key: "4"},
        {title: "人员考勤统计表", key: "5"},
      ],
      tabKey: "1"
    }
  }

  render(){
    const {utils, spinning} = this.props
    const {tabKey, tabs} = this.state

    return (
      <JCard spinning={spinning} >
        <Card size="small">
        <Tabs activeKey={tabKey} onChange={key=>this.setState({tabKey:key})}>
          {tabs.map(item=>(
            <TabPane key={item.key} key={item.key} tab={item.title} />
          ))}
        </Tabs>
        {tabKey=="1"?<Attstanaly/>:null}
        {tabKey=="3"?<Atttrendanaly/>:null}
        {tabKey=="4"?<Overtrendanaly/>:null}
        
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
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AttendStatis)