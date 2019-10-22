import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal,Form,Select,Input, InputNumber
} from "antd"
import {editDeviceInfo, getDeviceList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"

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

class EditDevice extends React.Component {

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.editDeviceInfo(_.assign({},values,{
          did: this.props.detail.id
        }), res=>{
          OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getDeviceList({
            nowPage: this.props.pagination.current
          })
        })
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {editVisible, onCancel, detail} = this.props
    
    return (
      <Modal
        title="编辑"
        visible={editVisible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout}>
          <Form.Item label="设备进出口">
            {getFieldDecorator('inOut', {
              initialValue: detail?detail.inOut.toString():'',
              rules: [{required: true, message: 'Please input your E-mail!'}],
            })(
              <Select>
                <Option value="0">无</Option>
                <Option value="1">进口</Option>
                <Option value="2">出口</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="经度">
            {getFieldDecorator('longitude', {
              initialValue: detail?detail.longitude:'',
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="纬度">
            {getFieldDecorator('latitude', {
              initialValue: detail?detail.latitude:'',
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="设备描述">
            {getFieldDecorator('deviceDesc', {
              initialValue: detail?detail.deviceDesc:'',
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('remark', {
              initialValue: detail?detail.remark:'',
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editDeviceInfo, getDeviceList}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditDevice))