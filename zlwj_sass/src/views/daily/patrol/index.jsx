import React from "react"
import {connect} from "react-redux"
import {Switch, Route, Redirect} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Tabs} from "antd";
import JCard from "@/components/JCard"
import DailyPatrolRecord from "./record"
import DailyPatrolLine from "./line"
import DailyPatrolPoint from "./point"

const {TabPane} = Tabs

class DailyPatrol extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: this.props.history.location.pathname.split("/")[3],
      tabs: [
        {title: "巡更记录", key: "record"},
        {title: "巡更路线配置", key: "line"},
        {title: "巡更点配置", key: "point"},
      ]
    }
  }
  componentDidMount(){
    this.props.history.listen((value)=>{
      this.setState({
        activeKey: value.pathname.split("/")[3] 
      })
    })
  }
  

  render(){
    const {utils, spinning, history} = this.props
    const {tabs, activeKey} = this.state
    return (
      <JCard spinning={spinning} >
        <Card size="small">
          <Tabs onChange={(key)=>{
            
            history.push("/daily/patrol/"+key)
          }}
          activeKey={activeKey|| "record"}
          >
            {tabs.map(item=>(
              <TabPane tab={item.title} key={item.key} />
            ))}
          </Tabs>
          <Switch>
            <Route path="/daily/patrol/record" component={DailyPatrolRecord} />
            <Route path="/daily/patrol/line" component={DailyPatrolLine} />
            <Route path="/daily/patrol/point" component={DailyPatrolPoint} />
            <Redirect from="/daily/patrol" to="/daily/patrol/record" />
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
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(DailyPatrol)