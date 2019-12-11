import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Radio, InputNumber, Select} from "antd";
import {editAccount, getAccounts} from "@/actions/financeAction"

const {Option} = Select
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: "",
      linkType: ""
    }
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.detail && !this.state.type){
      this.setState({type: nextProps.detail.accountType})
    }
    if(nextProps.detail && !this.state.linkType){
      this.setState({linkType: nextProps.detail.linkType})
    }
    if(!nextProps.detail){
      this.setState({type:'',linkType: ''})
    }
  }

  handlenType({target}){
    console.log(target.value)
    this.setState({type: target.value})
  }

  handlenLinkType(){
    this.setState({type: target.value})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      if(!err){
        if(this.state.linkType=="1" && values.linkHeId=="0"){
          this.props.utils.OpenNotification("error", "关联项目不能为空！")
          return
        }
        this.props.actions.editAccount({
          ...values,
          linkType: this.state.linkType,
          accountType: this.state.type,
          id: this.props.detail.id,
          updateBeforeAmount: this.props.detail.amount
        }, res=>{
          this.props.actions.getAccounts({current:1})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, projectitem, detail} = this.props
    const {type, linkType} = this.state
    
    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        width={600}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="账户名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: '填写项目名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="资金" hasFeedback>
            {getFieldDecorator('amount', {
              initialValue: detail.amount,
              rules: [
                {
                  required: true,
                  message: '填写资金!',
                }
              ],
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="账户类型" >
            <Radio.Group value={String(type)} onChange={({target})=>this.setState({type: target.value})}>
              <Radio.Button value="bank">银行账户</Radio.Button>
              <Radio.Button value="alipay">支付宝账户</Radio.Button>
              <Radio.Button value="wechat">微信账户</Radio.Button>
              <Radio.Button value="cash">现金账户</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {type==="cash"?null
          :<Form.Item label="账号" hasFeedback>
            {getFieldDecorator('account', {
              initialValue: detail.account,
              rules: [
                {
                  required: true,
                  message: '填写资金!',
                }
              ],
            })(<Input />)}
          </Form.Item>}
          
          <Form.Item label="是否关联" hasFeedback>
            <Radio.Group value={String(linkType)} onChange={({target})=>this.setState({linkType: target.value})}>
              <Radio.Button value="0">不关联</Radio.Button>
              <Radio.Button value="1">关联项目</Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          {linkType=="1"?<Form.Item label="关联项目" >
            {getFieldDecorator('linkHeId', {
              initialValue: String(detail.linkHeId),
              rules: [
                {
                  required: true,
                  message: '选择关联项目!',
                }
              ],
            })(
              <Select placeholder="选择小区">
                <Option value="0">选择小区</Option>
                {projectitem?projectitem.list.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
                
              </Select>
            )}
          </Form.Item>:null}

          <Form.Item label="账户说明" hasFeedback>
            {getFieldDecorator('accountInfo', {
              initialValue: detail.accountInfo,
            })(<TextArea maxLength={249} allowClear autoSize={{minRows: 3}} placeholder="最多可输入250字节" />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editAccount, getAccounts}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddItem))