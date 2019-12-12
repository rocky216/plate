import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge} from "antd";
import SelectHouse from "@/components/SelectHouse"
import JCard from "@/components/JCard"
import "./index.less"
import {propertyfeeColmuns} from "../colmuns"
import {getPropertyfee} from "@/actions/otherAction"

const {TabPane} = Tabs

class PropertyFee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.props.actions.getPropertyfee()
  }

  render(){
    const {spinning, utils, propertyfee} = this.props

    return (
      <JCard spinning={spinning}>
        <div className="propertyfee">
          <div className="select_house">
            <Card title="业主列表" size="small">
              <SelectHouse showLine/>
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card>
              <Tabs>
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>全部订单</Badge>} key="allCount" /> 
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>待审核订单</Badge>} key="waitCount" />
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>正常订单</Badge>} key="rightCount" />
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>异常订单</Badge>} key="abnormalCount" />
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>关闭订单</Badge>} key="closeCount" />
              </Tabs>
              <Table columns={propertyfeeColmuns} 
                // dataSource={propertyfee?utils.addIndex(propertyfee.page.list):[]}
              />
            </Card>
          </div>
        </div>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPropertyfee}, dispatch)
  }
}

function mapStateProps(state){
  return {
    propertyfee: state.other.propertyfee,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(PropertyFee)