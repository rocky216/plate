import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select, Row, Col, Cascader} from "antd";
import {editControl, getControlPage} from "@/actions/systemAction"
import {getCompanyProject} from "@/actions/appAction"

const {Option} = Select
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EditControl extends React.Component {
  componentDidMount(){
    this.props.actions.getCompanyProject({})
  }

  handlenSubmit(){
    const {detail} = this.props
    this.props.form.validateFieldsAndScroll((err, values)=>{

      if(!err){
        const {companyId} = values
        this.props.actions.editControl({
          ...values,
          companyId: companyId && companyId.length ?companyId[0]:"",
          heId: companyId && companyId.length ?companyId[1]:"",
          id: this.props.detail.id,
          iotId: this.props.detail.iotId,
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getControlPage({})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail, companyPro} = this.props
    
    return (
      <Modal 
        destroyOnClose
        title="修改控制器"
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}>
        <Form {...formItemLayout}>
          <Form.Item label="设备名称" hasFeedback>
            {getFieldDecorator('deviceName', {
              initialValue: detail.deviceName,
              rules: [
                {
                  required: true,
                  message: '填写设备名称!',
                }
              ],
            })(<Input min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="通道个数" hasFeedback>
            {getFieldDecorator('deviceAttrPort', {
              initialValue: detail.deviceAttrPort,
              rules: [
                {
                  required: true,
                  message: '填写通道个数!',
                }
              ],
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="公司小区" hasFeedback>
            {getFieldDecorator('companyId', {
              initialValue: detail.heId?[detail.companyId, detail.heId]:[],
              rules: [
                {
                  required: true,
                  message: '公司小区!',
                }
              ],
            })(<Cascader options={companyPro?companyPro:[]} 
              fieldNames={{ label: 'name', value: 'id' }}/>)}
          </Form.Item>
          
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editControl,getControlPage, getCompanyProject}, dispatch)
  }
}

function mapStateProps(state){
  return {
    companyPro: state.app.companyPro,
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditControl) )