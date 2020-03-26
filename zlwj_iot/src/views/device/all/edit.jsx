import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select} from "antd";
import {getCompany} from "@/actions/companyAction"
import {editAlldevice, getAlldevice} from "@/actions/deviceAction"

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

class EditDeviceAll extends React.Component {

  componentDidMount(){
    this.props.actions.getCompany({})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editAlldevice({
          id: this.props.detail.id,
          ...values
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getAlldevice({})
        })
      }
    })
  }
  
  getIotQueues(arr){
    let newArr = []
    _.each(arr, item=>{
      newArr.push(item.id)
    })
    return newArr
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, dictdevice, company, queues, detail} = this.props
    console.log(detail.id, "detial")
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
          <Form.Item label="公司" hasFeedback>
            {getFieldDecorator('companyId', {
              rules: [
                {
                  required: true,
                  message: '选择公司!',
                }
              ],
            })(
              <Select >
                {company?company.map(item=>(
                  <Option key={item.id} value={item.id}>{item.companyName}</Option>
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
    actions: bindActionCreators({getCompany, editAlldevice, getAlldevice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    queues: state.dict.queues,
    company: state.company.company,
    dictdevice: state.dict.dictdevice,
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditDeviceAll))