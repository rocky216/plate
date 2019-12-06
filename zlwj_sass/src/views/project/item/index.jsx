import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Card, Button, Popconfirm} from "antd";
import {getHeHousingEstate, deleteHeHousingEstate} from "@/actions/projectAction"
import JCard from "@/components/JCard"
import {itemColmuns } from "../colmuns"
import AddItem from "./add"
import EditItem from "./edit"



class ProjectItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: '',
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getHeHousingEstate(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteHeHousingEstate({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getHeHousingEstate(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return itemColmuns.concat([{
      title: "操作",
      width: 200,
      render(item){
        return (
          <div>
            <Button  type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
            {/* <Button  type="link"  >详情</Button> */}
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button  type="link" >删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, projectitem, utils } = this.props
    const {addVisible,editVisible, detail, params} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增项目</Button>}>
          <AddItem visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <EditItem visible={editVisible} detail={detail} 
                    onCancel={()=>this.setState({editVisible: false, detail: ""})} />
          
          <Table 
            columns={this.getCol()}
            dataSource={projectitem?utils.addIndex(projectitem.list):[]}
            pagination={utils.Pagination(projectitem, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getHeHousingEstate(params)
            })} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHeHousingEstate, deleteHeHousingEstate}, dispatch)
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