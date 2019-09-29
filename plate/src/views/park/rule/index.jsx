import React from "react"
import {Link, Switch, Route} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card,
  Button,
  Icon,
  Table,
  Popconfirm
} from "antd"
import JCard from "@/components/JCard"
import AddParkRule from "@/views/park/rule/add"
import {getLeaseConfigList, delLeaseConfig} from "@/actions/parkAction"
import {parkColumns} from "../columns"
import {addIndex, OpenNotification} from "@/utils"

class Rule extends React.Component {

  componentWillMount(){
    this.props.actions.getLeaseConfigList({})
  }

  handlenConfirm(item){
    this.props.actions.delLeaseConfig({
      cid: item.id
    },res=>{
      OpenNotification("success")
      this.props.actions.getLeaseConfigList({})
    })
  }

  getCol(){
    let _this = this
    return parkColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            {/* <Button type="link">编辑</Button> */}
            <Popconfirm placement="topRight" title="是否删除？" onConfirm={_this.handlenConfirm.bind(_this, item)} >
              <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, parkRuleList} = this.props

    return (
      <JCard spinning={spinning}>
        <div>
          <div className="mgb10">
            <Switch>
              <Route path="/park/rule/add" component={AddParkRule} />
            </Switch>
          </div>
          <Card
            size="small"
            title={<Button type="primary"><Link to="/park/rule/add"><Icon type="plus" />添加租赁规则</Link></Button>}
          >
            <Table columns={this.getCol()} dataSource={addIndex(parkRuleList)} />
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getLeaseConfigList, delLeaseConfig}, dispatch)
  }
}

function mapStateProps(state){
  return {
    houseInfo: state.app.houseInfo,
    parkRuleList: state.park.parkRuleList,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Rule)