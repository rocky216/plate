import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Tree, Button, Card} from "antd"
import {IProps} from "@/interface/app"
import {getMenus, deleteMenus} from "@/actions/sellAction"
import JCard from "@/components/JCard"
import {PlusOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons"
import AddMenu from "./add"
import DeletePop from "@/components/DeletePop"

const {TreeNode } = Tree; 

interface Props extends IProps {
  menus: any
}

interface State {
  visible: boolean;
  detail: any;
  type: string
}

class SellMenu extends React.Component<Props, State> {

  state = {
    visible: false,
    detail: "",
    type: ""
  }

  componentDidMount(){
    this.props.actions.getMenus({})
  }

  handleDelete(item:any){
    this.props.actions.deleteMenus({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success");
      this.props.actions.getMenus({});
    })
  }

  createOption(item:any){
    return (
      <div style={{display:"flex", justifyContent: "space-between"}}>
        <span>{item.name}</span>
        <div>
          <PlusOutlined onClick={()=>this.setState({visible: true, detail: item})} />
          <EditOutlined className="mgl20" onClick={()=>this.setState({visible: true, detail: item, type: "edit"})} />
          <DeletePop confirm={this.handleDelete.bind(this, item)}>
            <DeleteOutlined className="mgl20" />
          </DeletePop>
          
        </div>
      </div>
    )
  }

  createNode(data:any[]){
      return data.map((item:any)=><TreeNode key={item.id} title={this.createOption(item)} >
          {item.children && item.children.length?this.createNode(item.children):null}
        </TreeNode>)
  }

  render() {
    const {utils, spinning, menus} = this.props;
    const {visible, detail, type} = this.state;
    

    return (
      <JCard spinning={spinning}>
        <AddMenu 
          visible={visible} 
          onCancel={()=>this.setState({visible: false,detail: "", type: ""})} 
          detail={detail} type={type} />

        <Card size="small" title={<Button type="primary" icon={<PlusOutlined />}  onClick={()=>this.setState({visible: true})} >新增菜单</Button>}>
          {menus?<Tree
            blockNode
            defaultExpandAll
            showLine
          >
            {this.createNode(menus)}
          </Tree>:null}
          
        </Card>
        
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getMenus, deleteMenus}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    menus: state.sell.menus,
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellMenu)