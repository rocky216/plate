import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select} from "antd";
import {getPartnerCompanyList, getCompany, setAssignedParent, getPartnerCompanyListPage} from "@/actions/systemAction"

const {Option} = Select

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

class EditParent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      companyList: []
    }
  }

  componentDidMount(){
    this.props.actions.getPartnerCompanyList({}, res=>{
      this.setState({companyList: res})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.setAssignedParent({
          ...values,
          id: this.props.detail.id
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCompany({current: 1})
          this.props.actions.getPartnerCompanyListPage({})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    const {companyList} = this.state
    
    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="上级公司" hasFeedback>
            {getFieldDecorator('parentCompanyId', {
              rules: [
                {
                  required: true,
                  message: '填写字典名称!',
                }
              ],
            })(
              <Select>
                <Option value="0">无上级公司</Option>
                {companyList?companyList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPartnerCompanyList, getCompany, setAssignedParent, getPartnerCompanyListPage}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditParent))