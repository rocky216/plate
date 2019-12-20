import React from "react"
import {connect} from "react-redux"

import {bindActionCreators} from "redux"
import {Row, Col, Card, Button, Icon, Tabs, Badge } from "antd";
import JCard from "@/components/JCard"
import SelectShopL from "@/components/SelectShopL"
import {getShopOrder} from "@/actions/otherAction"
import AddShopfee from "./add"

const {TabPane} = Tabs

class Shopfee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      shopId: "",
      shopItem: "",
      params: {
        current: 1
      },
      addVisible: false
    }
  }

  componentDidMount(){
    this.props.actions.getShopOrder(this.state.params)
  }

  render(){
    const {spinning} = this.props
    const {shopItem, addVisible} = this.state

    return (
      <JCard spinning={spinning} >
        <div className="propertyfee">
          <div className="select_house">
            <Card size="small" title="选择商铺">
              <SelectShopL onSelect={data=>this.setState({shopId: data.id, shopItem: data})} />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card title={shopItem?shopItem.shopsName:null} 
                  extra={shopItem?<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus"/>新增物业费</Button>:null}>
              {shopItem && addVisible?<AddShopfee visible={addVisible} shopItem={shopItem} 
              onCancel={()=>this.setState({addVisible: false})} />:null}
              <Tabs>
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>全部订单</Badge>} key="allCount" /> 
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>待审核订单</Badge>} key="waitCount" />
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>正常订单</Badge>} key="rightCount" />
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>异常订单</Badge>} key="abnormalCount" />
                <TabPane tab={<Badge count={0} offset={[10,0]} showZero>关闭订单</Badge>} key="closeCount" />
              </Tabs>
            </Card>
          </div>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getShopOrder}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Shopfee)