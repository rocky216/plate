import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Button, Icon, Table} from "antd";
import JCard from "@/components/JCard"
import {getRepairList} from "@/actions/otherAction"
import AddRepair from "./add"
import StampRepair from "./stamp"
import {repairColumns} from "../colmuns"


class RepairManage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      stampVisible: false,
      stampDetail:""
    }
  }

  componentDidMount(){
    this.props.actions.getRepairList({})
  }

  getCol(){
    let _this = this
    return repairColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({stampVisible: true, stampDetail: item})} >标记</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, repair} = this.props
    const {addVisible, stampVisible, stampDetail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddRepair visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {stampVisible?
        <StampRepair visible={stampVisible} detail={stampDetail} 
          onCancel={()=>this.setState({stampVisible: false, stampDetail: ""})} />:null}

        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增报修单</Button>}>
          <Table columns={this.getCol()} dataSource={repair?utils.addIndex(repair.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getRepairList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    repair: state.other.repair,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(RepairManage)