import React from "react"
import {connect} from "react-redux"
import {withRouter, Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge, Button, Icon, Select} from "antd";
import SelectHouse from "@/components/SelectHouse"
import JCard from "@/components/JCard"
import "./index.less"
import {propertyfeeColmuns} from "../colmuns"
import {getPropertyfee} from "@/actions/otherAction"
import AddPropertyfee from "./add"

const {TabPane} = Tabs
const {Option} = Select

class PropertyFee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      houseType: "1",
      houseId: "",
      addVisible: false,
      houseItem: ""
    }
  }

  componentDidMount(){
    this.props.actions.getPropertyfee()
  }

  getCol(){
    return propertyfeeColmuns.concat([{
      title: "操作",
      render(){
        return (
          <div>
            <Button type="link">打印</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, propertyfee} = this.props
    const {houseType, houseId, addVisible, houseItem} = this.state
    
    return (
      <JCard spinning={spinning}>
        <div className="propertyfee">
          <div className="select_house">
            <Card title="选择房间" size="small">
              <SelectHouse showLine onSelect={data=>this.setState({houseId: data.id, houseItem: data})} />
              
              
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card title={houseItem?houseItem.showCodeAll:null} extra={houseId?<Button type="primary" onClick={()=>this.setState({addVisible:true})}>
                <Icon type="plus" />新增物业费订单</Button>:null} >
                  {houseId && addVisible?<AddPropertyfee visible={addVisible} 
                              showName={houseItem?houseItem.showCodeAll:null}
                              houseType={houseType} houseId={houseId} onCancel={()=>this.setState({addVisible: false})} />:null}
                

              <Tabs>
                <TabPane tab={<Badge count={propertyfee?propertyfee.allCount:0} offset={[10,0]} showZero>全部订单</Badge>} key="allCount" /> 
                <TabPane tab={<Badge count={propertyfee?propertyfee.waitCount:0} offset={[10,0]} showZero>待审核订单</Badge>} key="waitCount" />
                <TabPane tab={<Badge count={propertyfee?propertyfee.rightCount:0} offset={[10,0]} showZero>正常订单</Badge>} key="rightCount" />
                <TabPane tab={<Badge count={propertyfee?propertyfee.abnormalCount:0} offset={[10,0]} showZero>异常订单</Badge>} key="abnormalCount" />
                <TabPane tab={<Badge count={propertyfee?propertyfee.closeCount:0} offset={[10,0]} showZero>关闭订单</Badge>} key="closeCount" />
              </Tabs>
              <Table columns={this.getCol()} 
                dataSource={propertyfee?utils.addIndex(propertyfee.page.list):[]}
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