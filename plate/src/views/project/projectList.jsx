import React from "react"
import {connect } from "react-redux"
import {bindActionCreators} from "redux"
import {Link, Route, Switch} from "react-router-dom"
import {Card, Button, Icon, Table, Popconfirm } from "antd"
import JCard from "@/components/JCard"
import AddProject from "@/views/project/addProject"
import EditProject from "@/views/project/editProject"
import {getSysItemList, deleteSysItem} from "@/actions/projectAction"
import {projectColumns } from "./columns"
import {addIndex} from "@/utils"

class ProjectList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      dataInfo: ''
    }
  }
  
  componentWillMount(){
    this.props.actions.getSysItemList()
  }
  handlenEdit(item){
    this.setState({
      editVisible: true,
      dataInfo: item
    })
  }

  getCol(){
    let _this = this
    return projectColumns.concat([{
      title: "操作",
      render(item, row, index){
        return (
          <div>
            <Button size="small" type="primary" onClick={_this.handlenEdit.bind(_this, item)} >编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={_this.handlenDelete.bind(_this, row)} >
              <Button className="mgl10" size="small"  >删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }])
  }

  handlenDelete(row){
    this.props.actions.deleteSysItem({sid: row.id}, res=>{
      this.props.actions.getSysItemList()
    })
  }

  render(){
    const {spinning, sysItemList} = this.props

    return (
      <JCard spinning={spinning}>
        <div>
          <EditProject dataInfo={this.state.dataInfo} visible={this.state.editVisible} onCancel={()=>this.setState({editVisible: false})} />
          <div className="mgb10">
            <Switch >
              <Route  path="/project/list/add" component={AddProject} />
            </Switch>
          </div>
          <Card 
          title={<Button type="primary"><Link to="/project/list/add"><Icon type="plus" />新增</Link></Button>}
          size="small"
          >
            <Table columns={this.getCol()} dataSource={sysItemList?addIndex(sysItemList):[]} />
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSysItemList, deleteSysItem}, dispatch)
  }
}

function mapStateProps(state){
  return {
    sysItemList: state.project.sysItemList,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ProjectList)