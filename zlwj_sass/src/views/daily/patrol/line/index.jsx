import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Card, Table} from "antd";
import {getPpPatrolLine } from "@/actions/dailyAction"
import {patrolLineColmuns} from "../../colmuns"
import AddPatrolLine from "./add"
import EditPatrolLine from "./edit"

let params = {
  current: 1,

}

class DailyPatrolLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  

  componentDidMount(){
    this.props.actions.getPpPatrolLine(params)
  }

  getCol(){
    let _this = this
    return patrolLineColmuns.concat([{
      title: "操作",
      render(item){
        
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
          </div>
        )
      }
    }])
  }
  render(){
    const {utils, spinning, patrolLine} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <div>
        <AddPatrolLine visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible && detail?<EditPatrolLine visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ""})} />:null}
        
        <Card title={(
          <Button type="primary" icon="plus" onClick={()=>this.setState({addVisible: true})}>创建路线</Button>
        )} bordered={false} size="small" >
          
          <Table columns={this.getCol()}  dataSource={patrolLine?utils.addIndex(patrolLine.list):[]} 
          pagination={utils.Pagination(patrolLine, page=>{
            params.current = page
            this.props.actions.getPpPatrolLine(params)
          })}/>
        </Card>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPpPatrolLine}, dispatch)
  }
}

function mapStateProps(state){
  return {
    patrolLine: state.daily.patrolLine,
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(DailyPatrolLine)