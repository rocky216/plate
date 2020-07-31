import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, DatePicker, Upload, Select} from "antd";
import {editAttaCheck, getPlanInfo} from "@/actions/otherAction"
import moment from "moment"

const {TextArea} = Input;
const {Option} = Select;

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


class EditInspect extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      this.props.actions.editAttaCheck({
        id: this.props.detail.id,
        ...values,
        buildTimeOwner: moment(values.buildTimeOwner).format("YYYY-MM-DD"),
        planId: this.props.match.params.id,
        attaUrls: this.props.utils.submitFiles(values.attaUrls)
      }, res=>{
        this.props.utils.OpenNotification("success")
        this.props.callback();
        this.props.onCancel();
      })
    })
  }

  getImgs(arr){
    if(!_.isArray(arr)) return [];
    let newArr=[];
    _.each(arr, item=>{
      newArr.push({
        url: item.sysAttachmentList,
        uid: item.id,
        name: item.buildTime
      })
    })
    return newArr;
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles, selstaff, detail} = this.props
    
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
          <Form.Item label="巡查时间" hasFeedback>
            {getFieldDecorator('buildTimeOwner', {
              initialValue: detail?moment(detail.buildTimeOwner):null,
              rules: [
                {
                  required: true,
                  message: '巡查时间!',
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="巡查人" hasFeedback>
            {getFieldDecorator('checkUserid', {
              initialValue: detail.checkUserid,
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
          <Form.Item label="附件" >
            {getFieldDecorator('attaUrls', {
              initialValue: this.getImgs(detail.sysAttachmentList),
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
          <Form.Item label="巡查说明" hasFeedback>
            {getFieldDecorator('planInfo', {
              initialValue: detail.planInfo,
              rules: [
                {
                  required: true,
                  message: '填写表名巡查说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editAttaCheck, getPlanInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    selstaff: state.other.selstaff,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditInspect)) );