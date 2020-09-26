import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, Upload, Button, Select} from "antd";
import {getRepairType, addDailyRepair, getDeilyRepair} from "@/actions/dailyAction";

const {TextArea} = Input
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

class AddDailyRepair extends React.Component {


  

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addDailyRepair({
          ...values,
          imgUrls: this.props.utils.submitFiles(values.imgUrls)
        }, res=>{
          this.props.actions.getDeilyRepair(this.props.params)
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles, repairType} = this.props
    

    return (
      <Modal 
        destroyOnClose
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        confirmLoading={spinning}
        onOk={this.handlenSubmit.bind(this)}>
        <Form className="mgt10" {...formItemLayout} >
          <Form.Item label="报修类型" >
            {getFieldDecorator('repairTypeId', {
              rules: [
                {
                  required: true,
                  message: '报修类型!',
                }
              ],
            })(
              <Select>
                {repairType?repairType.map(item=>(
                  <Option key={item.id} value={item.id}>{item.dictLabel}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="报修标题" >
            {getFieldDecorator('repairName', {
              rules: [
                {
                  required: true,
                  message: '报修标题!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="报修说明" >
            {getFieldDecorator('repairInfo', {
              rules: [
                {
                  required: true,
                  message: '报修说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="上传图片">
            {getFieldDecorator('imgUrls', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
              rules: [
                {
                  required: true,
                  message: '上传图片!',
                }
              ],
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
    actions: bindActionCreators({getRepairType, addDailyRepair, getDeilyRepair}, dispatch)
  }
}

function mapStateProps(state){
  return {
    repairType: state.daily.repairType,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.base.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddDailyRepair) )