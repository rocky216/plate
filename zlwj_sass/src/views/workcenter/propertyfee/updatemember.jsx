import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, DatePicker, Select} from "antd";
import moment from "moment"
import {addOwnerAndLink, loadAssetsInfo} from "@/actions/otherAction"

const {TextArea } = Input;
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

class Updatemember extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {id, type} = this.props.detail
        this.props.actions.addOwnerAndLink({
          ...values,
          startTime: moment(values.startTime).format("YYYY-MM-DD"),
          assetsId: id,
          assetsType: type,
        }, res=>{
          this.props.onCancel();
          this.props.actions.loadAssetsInfo({
            assetsId: id, 
            assetsType:type});
          this.props.utils.OpenNotification("success")
        })
      }
      
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, visible, onCancel, detail } = this.props;
    console.log(detail)
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
        <Form {...formItemLayout}>
          <Form.Item label="关联类型">
            {getFieldDecorator("linkType", {
              rules: [{ required: true, message: '住宅/非住宅编号' }],
            })(
              <Select>
                {detail.type=="shops"?null:
                <Option value="1">家庭成员</Option>}
                <Option value="2">租客</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="关联开始时间">
            {getFieldDecorator("startTime", {
              rules: [{ required: true, message: '关联开始时间' }],
            })(
              <DatePicker style={{width: "100%"}}/>
            )}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: '姓名' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: '电话' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator("sex")(
              <Select>
                <Option value="0">其他</Option>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="身份证号码">
            {getFieldDecorator("idCard", {
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="微信">
            {getFieldDecorator("weixin", {
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="qq">
            {getFieldDecorator("qq", {
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="电子邮箱">
            {getFieldDecorator("email", {
            })(
              <Input/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addOwnerAndLink, loadAssetsInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Updatemember) )