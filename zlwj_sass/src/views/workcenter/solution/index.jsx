import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Card, Table, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {getOneCardSystem} from "@/actions/otherAction"
import {onecardColumns} from "../colmuns"
import AddSolution from "./add"
import EditSolution from "./edit"
import Recharge from "./recharge"


class Solution extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      rechargeVisible: false,
      reDetail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getOneCardSystem({})
  }

  getCol(){
    let _this = this
    return onecardColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
            <Link to={`/workcenter/solution/${item.id}/log`}>
              <Button type="link">一卡通日志</Button>
            </Link>
            
            <Button type="link" onClick={()=>_this.setState({rechargeVisible: true, reDetail: item})}>充值</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, onecard} = this.props
    const {addVisible, editVisible, detail, rechargeVisible, reDetail} = this.state

    return (
      <JCard spinning={spinning}>
        {rechargeVisible && reDetail?
        <Recharge visible={rechargeVisible} detail={reDetail} onCancel={()=>this.setState({rechargeVisible: false, reDetail:""})} />:null}
        <AddSolution visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible && detail?
        <EditSolution visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />添加一卡通</Button>} >
          <Table columns={this.getCol()} dataSource={onecard?utils.addIndex(onecard.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOneCardSystem}, dispatch)
  }
}

function mapStateProps(state){
  return {
    onecard: state.other.onecard,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Solution)