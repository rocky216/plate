import React from "react"
import {connect } from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators } from "redux"
import {Card, Tree, Button} from "antd"
import {IProps} from "@/interface/app"
import {authPermMenu, getMenus, getAuthPermMenu} from "@/actions/sellAction"
import JCard from "@/components/JCard"
import {RollbackOutlined, SaveOutlined} from "@ant-design/icons"
import _ from "lodash"

const {TreeNode} = Tree;

interface Props extends IProps {
  menus:any;
}
interface State {
  checked: string[]
}

class SellRoleAuth extends React.Component<Props> {

  state:State = {
    checked: []
  }

  componentDidMount(){
    this.props.actions.getMenus({})
    this.props.actions.getAuthPermMenu({permId: this.props.match.params.id}, (res:any)=>{
      let arr:string[] = []
      _.each(res, (item)=> arr.push(String(item)) )
      this.setState({checked: arr})
    })
  }

  createNode(data:any[]){
    return data.map((item:any)=><TreeNode key={item.id} title={item.name} >
        {item.children && item.children.length?this.createNode(item.children):null}
      </TreeNode>)
  }


  handleSubmit(){
    this.props.actions.authPermMenu({
      permId: this.props.match.params.id,
      menus: this.state.checked.join()
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.history.push("/sell/role")
    })
  }

  render() {
    const {utils, spinning, menus} = this.props;
    const {checked} = this.state
    console.log(checked, "checked")
    return (
      <JCard spinning={spinning}>
        <Card size="small" title="权限编辑" extra={(
          <>
            <Button type="primary" icon={<SaveOutlined/>} className="mgr10" onClick={this.handleSubmit.bind(this)}>保存</Button>
            <Link to="/sell/role">
              <Button icon={<RollbackOutlined/>}>返回</Button>
            </Link>
          </>
        )}>
        {menus?<Tree
            checkedKeys={checked}
            checkable
            blockNode
            defaultExpandAll
            checkStrictly
            onCheck={({checked}:any)=>this.setState({checked})}
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
    actions: bindActionCreators({authPermMenu, getMenus, getAuthPermMenu}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    menus: state.sell.menus,
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellRoleAuth)