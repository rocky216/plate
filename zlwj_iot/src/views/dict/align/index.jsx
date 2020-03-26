import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import AddAlign from "./add"
import {getQueues, deleteAlign} from "@/actions/dictAction"
import {queuesColumns} from "../columns"

class Align extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getQueues(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteAlign({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getQueues(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return queuesColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
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
    const {utils, spinning, queues} = this.props
    const {addVisible, params} = this.state

    return (
      <JCard spinning={spinning}>
        <AddAlign visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增对列</Button>}>
          <Table columns={this.getCol()} dataSource={queues?utils.addIndex(queues.list):[]} 
            pagination={utils.Pagination(queues, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getQueues(params)
            })} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getQueues, deleteAlign}, dispatch)
  }
}

function mapStateProps(state){
  return {
    queues: state.dict.queues,
    spinning: state.dict.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Align)