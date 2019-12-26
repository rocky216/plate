import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input, Table} from "antd";
import JCard from "@/components/JCard"
import {getTreeRole, editRole, getRoleDetail} from "@/actions/systemAction"
import {addAuthColumns} from "../columns"


class EditSystemAuth extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: [],
      selectAll: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getRoleDetail({
      id: this.props.match.params.id
    }, res=>{
      this.setState({detail: res})
    })

    this.props.actions.getTreeRole({
      id: this.props.match.params.id
    }, res=>{
      _.each(res, item=>{
        if(item.nextMenu && item.nextMenu.length){
          _.each(item.nextMenu, elem=>{
            elem.levelthree = elem.nextMenu
            elem.children = null
          })
          item.children = item.nextMenu
        }else{
          item.children = null
        }
        item.levelthree = null
      })
      this.setState({treeData:res})
    })
  }

  selectAllChecked(){
    const {selectAll, treeData} = this.state
    let handlenData = function(treeData, type){
      _.each(treeData, item=>{
        item.select = type
        if(item.children && item.children.length){
          handlenData(item.children, type)
        }
        if(item.levelthree && item.levelthree.length){
          handlenData(item.levelthree, type)
        }
      })
    }
    handlenData(treeData, !selectAll)
    this.setState({treeData, selectAll:!selectAll})
  }

  handlenChange(rows, {target}){
    const {treeData} = this.state
    let handlenData = function(treeData, type){
      _.each(treeData, item=>{
        
        if(item.id==rows.id){
          item.select = type
        }else{
          if(item.children && item.children.length){
            handlenData(item.children, type)
          }
        }
      })
    }
    handlenData(treeData, target.checked)
    this.setState({treeData})
    
  }

  handlenChangeChild(elem, {target}){
    const {treeData} = this.state
    let handlenData = function(treeData, elem, type){
      _.each(treeData, item=>{
        if(item.levelthree){
          _.each(item.levelthree, el=>{
            if(el.id == elem.id){
              el.select = type
            }
          })
        }else if(item.children && item.children.length){
          handlenData(item.children, elem, type)
        }
      })
    }
    handlenData(treeData, elem, target.checked)
    this.setState({treeData})
  }

  handlenDataPower(item, {target}){
    const {treeData} = this.state
    console.log(item)
    let handlenData = function(treeData){
      _.each(treeData, elem=>{
        if(elem.id == item.id){
          elem.dataPower = target.value
        }else {
          if(elem.children && elem.children.length){
            handlenData(elem.children)
          }
        }
      })
    }
    handlenData(treeData)
    this.setState({treeData})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.editRole({
          ...values,
          id: this.props.match.params.id,
          menuKeys: this.getMenuKeys().join(),
          menuDataPowerKeys: this.getDataPower().join(),
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/system/auth")
        })
      }
    });
  }

  getMenuKeys(){
    const {treeData} = this.state
    let arr = []
    let handlenData = function(treeData){
      _.each(treeData, item=>{
        if(item.select){
          arr.push(item.id)
        }
        if(item.children && item.children.length){
          handlenData(item.children)
        }else if(item.levelthree && item.levelthree.length){
          handlenData(item.levelthree)
        }
      })
    }
    handlenData(treeData)
    return arr
  }

  getDataPower(){
    const {treeData} = this.state
    let arr = []
    let handlenData = function(treeData){
      _.each(treeData, item=>{
        if(item.partPower=="1" && item.dataPower){
          arr.push(item.id+':'+item.dataPower)
        }
        if(item.children && item.children.length){
          handlenData(item.children)
        }
      })
    }
    handlenData(treeData)
    return arr
  }
  

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils} = this.props
    const {treeData, selectAll, detail} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card size="small"  >
          <div className="fixedend mgb10">
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
              <Form.Item label="角色名称">
                {getFieldDecorator('roleName', {
                  initialValue: detail.roleName,
                  rules: [{ required: true, message: '请输入角色名称！' }],
                })(
                  <Input/>,
                )}
              </Form.Item>
              <Form.Item label="角色代码">
                {getFieldDecorator('remark', {
                  initialValue: detail.remark,
                  rules: [{ required: true, message: '请输入角色代码！' }],
                })(
                  <Input/>,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="save" />保存</Button>
                <Link to="/system/auth" className="mgl10"><Button><Icon type="rollback" />返回</Button></Link>
              </Form.Item>
            </Form>
          </div>
          <div>
              <Button size="small" type="primary" className="mgb10" onClick={this.selectAllChecked.bind(this)}>{selectAll?"反选":"全选"}</Button>
          </div>
          {treeData.length?<Table bordered size="small" defaultExpandAllRows columns={addAuthColumns(this)} dataSource={utils.addIndex(treeData)} pagination={false} />:null}
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTreeRole, editRole, getRoleDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditSystemAuth))