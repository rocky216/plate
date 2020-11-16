import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Tabs } from "antd";
import JCard from "@/components/JCard"
import CenterPileOrderStatis from "./pileorder"
import CenterPlateOrderStatis from "./plateorder"

const {TabPane} = Tabs

class CenterOrderStatis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs:[
        {title: "充电订单", key: "1", view: <CenterPileOrderStatis/>},
        {title: "停车订单", key: "2", view: <CenterPlateOrderStatis/>},
      ]
    }
  }
  
  render(){
    const {utils, spinning } = this.props
    const {tabs} = this.state;

    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Tabs>
            {tabs.map(item=>(
              <TabPane tab={item.title} key={item.key} >
                {item.view}
              </TabPane>
            ))}
          </Tabs>
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
    spinning: state.center.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CenterOrderStatis)