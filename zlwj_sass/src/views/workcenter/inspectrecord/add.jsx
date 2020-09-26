import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, DatePicker, Upload } from "antd";
import {addCheckAttaList, getCheckRecord} from "@/actions/otherAction"
import moment from "moment"

const {Option} = Select;
const {TextArea} = Input;

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

class AddInspectrecord extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {selstaff, params} = this.props;
        const {attaUrls, checkTime,checkUserid} = values
        const {id, type, linkTypeId} = this.props.houseItem
        this.props.actions.addCheckAttaList({
          ...values,
          assetsId: id,
          type,
          linkTypeId,
          checkTime: moment(checkTime).format("YYYY-MM-DD"),
          attaUrls: this.props.utils.submitFiles(attaUrls),
          checkUserName: _.filter(selstaff, o=>o.id==checkUserid)[0]["name"],
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCheckRecord(params)
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, selstaff, commonFiles} = this.props
    
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
          <Form.Item label="巡查人" hasFeedback>
            {getFieldDecorator('checkUserid', {
              rules: [
                {
                  required: true,
                  message: '巡查人!',
                }
              ],
            })(
              <Select>
                {selstaff?selstaff.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
                
              </Select>
            )}
          </Form.Item>
          <Form.Item label="巡查时间" hasFeedback>
            {getFieldDecorator('checkTime', {
              rules: [
                {
                  required: true,
                  message: '巡查时间!',
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="巡查说明" hasFeedback>
            {getFieldDecorator('checkInfo', {
              rules: [
                {
                  required: true,
                  message: '巡查说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="附件" >
            {getFieldDecorator('attaUrls', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
            })(
              <Upload
                  action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                  name="file"
                  data={{fileType:"photo", fileSize: 1024*10}}
                >
                  <Button icon="upload"></Button>
              </Upload>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addCheckAttaList, getCheckRecord}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    selstaff: state.other.selstaff,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddInspectrecord))