import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import AddSwitch from "./add"
import EditSwitch from "./edit"
import {getSwitch, deleteSwitch} from "@/actions/dictAction"
import {switchColumns} from "../columns"

class Switch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      params: {
        current: 1, 
      }
    }
  }

  componentDidMount(){
    this.props.actions.getSwitch(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteSwitch({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSwitch(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return switchColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail:item})} >编辑</Button>
            <Popconfirm 
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button type="link" >删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, switchs} = this.props
    const {addVisible, editVisible, detail, params} = this.state

    return (
      <JCard spinning={spinning}>
        {addVisible?
        <AddSwitch visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />:null}
        {detail?
        <EditSwitch visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />添加交换机</Button>}>
          <Table columns={this.getCol()} dataSource={switchs?utils.addIndex(switchs.list):[]} 
          pagination={utils.Pagination(switchs, page=>{
            params.current = page
            this.setState({params})
            this.props.actions.getSwitch(params)
          })} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSwitch, deleteSwitch}, dispatch)
  }
}

function mapStateProps(state){
  return {
    switchs:state.dict.switch,
    spinning: state.dict.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Switch)