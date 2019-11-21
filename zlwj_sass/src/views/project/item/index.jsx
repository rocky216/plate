import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Card, Button} from "antd";
import {getHeHousingEstate } from "@/actions/projectAction"
import JCard from "@/components/JCard"
import {itemColmuns } from "../colmuns"

class ProjectItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getHeHousingEstate(this.state.params)
  }

  getCol(){
    return itemColmuns.concat([{
      title: "操作",
      width: 200,
      render(item){
        return (
          <div>
            <Button  type="link">编辑</Button>
            <Button  type="link" >详情</Button>
            <Button  type="link" >删除</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, projectitem, utils } = this.props
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Button type="primary" >新增项目</Button>}>
          <Table 
            size="small" 
            columns={this.getCol()}
            dataSource={projectitem?utils.addIndex(projectitem.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHeHousingEstate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    spinning: state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ProjectItem)