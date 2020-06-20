import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, DatePicker, Select} from "antd";
import moment from "moment"
import {removeOwnersLink, loadAssetsInfo} from "@/actions/otherAction"

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

class EndLink extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {id, type, linkId} = this.props.detail
        this.props.actions.removeOwnersLink({
          endTime: moment(values.endTime).format("YYYY-MM-DD"),
          linkId,
          assetType: type,
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
          <Form.Item label="关联开始时间">
            {getFieldDecorator("startDate", {
              initialValue: detail.startDate? moment(detail.startDate):null,
              rules: [{ required: true, message: '关联结束时间' }],
            })(
              <DatePicker style={{width: "100%"}} />
            )}
          </Form.Item>
          <Form.Item label="关联结束时间">
            {getFieldDecorator("endTime", {
              rules: [{ required: true, message: '关联结束时间' }],
            })(
              <DatePicker style={{width: "100%"}} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({removeOwnersLink, loadAssetsInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EndLink) )