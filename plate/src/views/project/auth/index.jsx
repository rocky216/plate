import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Tree,
  Form,
  Button,
  Input,
  Card,
  Icon,
  Select
} from "antd"
import JCard from "@/components/JCard"
import {addMeun, getSysMeunList, delMeun, setRoleMeun, getRoleMeunList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"
import Edit from "./eidt"
import Add from "./add"

const { TreeNode } = Tree;
const {Option} = Select


class Auth extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData:[],
      editVisible: false,
      addVisible: false,
      addetail:'',
      detail: '',
      getKeys: [],
    }
  }

  componentWillMount(){
    this.props.actions.getSysMeunList()
    this.getRoleMeunList()
  }

  getRoleMeunList(){
    if(this.props.match.params.id>0){
      this.props.actions.getRoleMeunList({roleId: this.props.match.params.id}, res=>{
        let arr = []
        _.each(res, item=>{
          arr.push(item.menuId.toString()) 
        })
        
        this.setState({getKeys: arr})
      })
    }
  }

  renderTreeNodes(data){
    return data.map(item => {
        if (item.children && item.children.length>0) {
          return (
            <TreeNode title={this.optionsTitle(item)} key={item.menuId}   >
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.menuId} title={this.optionsTitle(item)}   />;
    })
  }

  optionsTitle(item){
    let _this = this
    const {match} = this.props
    return (
      <div style={{width: "100%"}}>
        <span className="mgr10">{item.menuName}</span>
        {match.params.id==0?
        <span style={{float: "right"}}>
          <Icon type="plus" className="mgr10 mgl10" onClick={_this.handlenAdd.bind(_this, item)} />
          <Icon type="edit" className="mgr10 mgl10" onClick={_this.handlenEdit.bind(_this, item)} />
          <Icon type="delete" className="mgl10" onClick={_this.handlenDelete.bind(_this, item)} />
        </span>:null}
      </div>
    )
  }
  handlenAdd(item){
    this.setState({addVisible: true, addetail: item})
  }

  handlenEdit(item){
    this.setState({editVisible: true, detail: item})
  }

  handlenDelete(item){
    this.props.actions.delMeun({
      mid: item.menuId
    }, res=>{
      OpenNotification("success")
      this.props.actions.getSysMeunList()
    })
  }
    
  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addMeun({
          ...values,
          parentId:0,
          url:0,
          icon: 0,
          sort:0
        }, res=>{
          OpenNotification("success")
          this.props.form.resetFields();
          this.props.actions.getSysMeunList()
        })
      }
    });
  }
  handlenSubmitKeys(){
    this.props.actions.setRoleMeun({
      roleId: this.props.match.params.id,
      menuId: this.state.getKeys.join()
    }, res=>{
      this.props.history.push("/project/role")
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {spinning, sysMeunList, match} = this.props
    const {treeData, addVisible, editVisible, detail, addetail, getKeys} = this.state
    
    return (
      <JCard spinning={spinning}>
        <div>
          {match.params.id==0?<div>
            <Add addVisible={addVisible} detail={addetail} onCancel={()=>this.setState({addVisible: false})} />
            <Edit editVisible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false})} />
            <div className="mgb10">
              <Card
                title="添加一级菜单"
                size="small"
              >
                <Form layout="inline" onSubmit={this.handlenSubmit.bind(this)} >
                  <Form.Item>
                    {getFieldDecorator("menuName", {
                      rules: [{ required: true, message: '请输入名称!' }],
                    })(
                      <Input/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("perms", {
                      rules: [{ required: true, message: '权限标识!' }], 
                    })(
                      <Input/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("reserveOne", {
                      initialValue: "alone",
                      rules: [{ required: true, message: '是否公共权限!' }], 
                    })(
                      <Select style={{width: 100}}>
                        <Option value="alone">私有</Option>
                        <Option value="common">公有</Option>
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit"  >保存</Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>:null}
          
          
          
          <Card
            title="权限菜单"
            extra={match.params.id==0?'':<div>
              <Button type="primary" className="mgr10" onClick={this.handlenSubmitKeys.bind(this)} ><Icon type="save" />保存</Button>
              <Button><Link to="/project/role"><Icon type="rollback" />返回</Link></Button>
            </div>}
          >
            <Tree
              checkable={match.params.id>0}
              defaultExpandAll
              blockNode
              onCheck={(keys)=>this.setState({getKeys: keys})}
              checkedKeys={getKeys}  
            >
              {this.renderTreeNodes(sysMeunList?sysMeunList:[])}
            </Tree>
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addMeun, getSysMeunList, delMeun, setRoleMeun, getRoleMeunList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    sysMeunList: state.project.sysMeunList,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Auth))