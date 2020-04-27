import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Icon, Select} from "antd";
import {addRepair, getRepairList} from "@/actions/otherAction"

const {Option} = Select
const {TextArea} = Input


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

class DetailRepair extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addRepair({
          ...values,
          attaUrls:  this.props.utils.submitFiles(values.attaUrls),
        }, res=>{
          this.props.actions.getRepairList({})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles, baseInfo} = this.props
    
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
          <Form.Item label="上传图片" >
            {getFieldDecorator('attaUrls', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
            })(
              <Upload 
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                name="file"
                data={{fileType:"photo", fileSize: 1024*10}}>
                <Button><Icon type="upload" /></Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="报修单名称" hasFeedback>
            {getFieldDecorator('repairName', {
              rules: [
                {
                  required: true,
                  message: '报修单名称!',
                }
              ],
            })(<Input style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="报修单信息" hasFeedback>
            {getFieldDecorator('repairInfo', {
              rules: [
                {
                  required: true,
                  message: '报修单信息!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="报修单类型" hasFeedback>
            {getFieldDecorator('repairTypeId', {
            })(
              <Select>
                {baseInfo?baseInfo.sysDict.he_repair_info.repair_type_id.map(item=>(
                  <Option key={item.id} value={item.id}>{item.dictLabel}</Option>
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
    actions: bindActionCreators({addRepair, getRepairList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(DetailRepair)) )