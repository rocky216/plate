import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal, Form, Select, InputNumber 
} from "antd"
import {getPlateConfigList, updatePlateConfig} from "@/actions/parkAction"
import {OpenNotification} from "@/utils"

const {Option} = Select


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class EditPlateConfig extends React.Component {

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.updatePlateConfig({
          ...values,
          cid: this.props.detail.id
        }, res=>{
          OpenNotification("success")
          this.props.actions.getPlateConfigList({})
          this.props.onCancel()
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {editVisible, detail, onCancel} = this.props
    console.log(detail, "detail")
    return (
      <Modal
        destroyOnClose
        visible={editVisible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout}  >
          <Form.Item label="车位数量">
            {getFieldDecorator('carNum', {
              initialValue: detail?detail.carNum:'',
              rules: [{required: true, message: '车位数量不能为空！' }],
            })(
              <InputNumber/>
            )}
          </Form.Item>
          <Form.Item label="没车位时是否控制外来车辆">
            {getFieldDecorator('foreignControl', {
              initialValue: detail?detail.foreignControl:'',
              rules: [{required: true, message: '没车位时是否控制外来车辆!' }],
            })(
              <Select>
                <Option value="0">没车位也允许</Option>
                <Option value="1">没车位时不允许</Option>
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
    actions: bindActionCreators({getPlateConfigList, updatePlateConfig}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditPlateConfig))