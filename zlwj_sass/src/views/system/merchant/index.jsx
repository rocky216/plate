import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Button, Icon, Table, Popconfirm, Switch} from "antd";
import JCard from "@/components/JCard"
import {merchantList, deleteMerchant, onOffMerchant} from "@/actions/systemAction"
import AddMerchant from "./add"
import EditMerchant from "./edit"
import {merchantColumns} from "../colmuns"


class Merchant extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  componentDidMount(){
    this.props.actions.merchantList({})
  }

  getCol(){
    let _this = this
    return merchantColumns.concat([{
      title: "状态",
      render(item){
        return <Switch checked={item.status=="0"?true:false} onChange={_this.hanldenChange.bind(_this, item)} />
      }
    },{
      title: "操作",
      render(item){
        return <div>
          <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
          <Popconfirm 
            placement="topRight" 
            title="是否删除？"
            okText="是"
            cancelText="否"
            onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button type="link" >删除</Button>
            </Popconfirm>
        </div>
      }
    }])
  }
  hanldenChange(item, type){
    this.props.actions.onOffMerchant({
      id: item.id,
      status: type?"0":"1"
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.merchantList({})
    })
  }

  handlenDelete(item){
    this.props.actions.deleteMerchant({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.merchantList({})
    })
  }

  render(){
    const {spinning,utils, merchant} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddMerchant visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible && detail?<EditMerchant visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增</Button>}>
          <Table columns={this.getCol()} dataSource={merchant?utils.addIndex(merchant):[]} pagination={false} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({merchantList, deleteMerchant, onOffMerchant}, dispatch)
  }
}

function mapStateProps(state){
  return {
    merchant: state.system.merchant,
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Merchant)