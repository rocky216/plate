import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select, Row, Col, Cascader} from "antd";
import {editPileDevice, getPileDevice} from "@/actions/systemAction"
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

class EditPile extends React.Component {
  componentDidMount(){
    this.props.actions.getCompanyProject({})
  }

  handlenSubmit(){
    const {detail} = this.props
    this.props.form.validateFieldsAndScroll((err, values)=>{

      if(!err){
        const {companyId} = values
        this.props.actions.editPileDevice({
          ...values,
          companyId: companyId && companyId.length ?companyId[0]:"",
          heId: companyId && companyId.length ?companyId[1]:"",
          id: this.props.detail.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getPileDevice({})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail, companyPro} = this.props
    console.log(detail, "detail")
    return (
      <Modal 
        destroyOnClose
        title="修改充电桩"
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}>
        <Form {...formItemLayout}>
          <Form.Item label="端口数量" hasFeedback>
            {getFieldDecorator('deviceAttrPort', {
              initialValue: detail.deviceAttrPort,
              rules: [
                {
                  required: true,
                  message: '填写端口数量!',
                }
              ],
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="小区" hasFeedback>
            {getFieldDecorator('companyId', {
              initialValue: detail.heId?[detail.companyId, detail.heId]:[],
            })(<Cascader options={companyPro?companyPro:[]} 
              fieldNames={{ label: 'name', value: 'id' }}/>)}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark', {
              initialValue: detail.remark,
            })(<TextArea  />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editPileDevice,getPileDevice, getCompanyProject}, dispatch)
  }
}

function mapStateProps(state){
  return {
    companyPro: state.app.companyPro,
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditPile) )