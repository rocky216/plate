import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Upload, Select, InputNumber, DatePicker } from "antd";
import {getTransferRecord, addAccountTurns, getAccountTurns} from "@/actions/financeAction"
import moment from "moment"

const {TextArea} = Input
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

class AddFinanceTransfer extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addAccountTurns({
          ...values,
          attaUrls: this.props.utils.submitFiles(values.attaUrls),
          turnTime: moment(values.turnTime).format("YYYY-MM-DD HH:mm:ss")
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getTransferRecord(this.props.params)
          this.props.actions.getAccountTurns({})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles, accounturns} = this.props
    
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
          <Form.Item label="转出账户" hasFeedback>
            {getFieldDecorator('accountId', {
              rules: [
                {
                  required: true,
                  message: '转出账户!',
                }
              ],
            })(
              <Select >
                <Option value="">全部</Option>
                {accounturns?accounturns.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="账户总金额" hasFeedback>
            <span>{accounturns && getFieldValue("accountId") ?_.filter(accounturns, o=>o.id == getFieldValue("accountId"))[0]["amount"]:0}元</span>
          </Form.Item>
          <Form.Item label="转入账户" hasFeedback>
            {getFieldDecorator('turnAccountId', {
              rules: [
                {
                  required: true,
                  message: '转入账户!',
                }
              ],
            })(
              <Select>
                <Option value="">全部</Option>
                {accounturns?accounturns.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="转账金额" hasFeedback>
            {getFieldDecorator('money', {
              rules: [
                {
                  required: true,
                  message: '转账金额!',
                }
              ],
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="转账时间" hasFeedback>
            {getFieldDecorator('turnTime', {
              rules: [
                {
                  required: true,
                  message: '转账时间!',
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="转账说明" hasFeedback>
            {getFieldDecorator('info', {
              rules: [
                {
                  required: true,
                  message: '转账说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          
          <Form.Item label="附件" hasFeedback>
            {getFieldDecorator('attaUrls', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
              rules: [
                {
                  required: true,
                  message: '附件!',
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
    actions: bindActionCreators({getTransferRecord, addAccountTurns, getAccountTurns}, dispatch)
  }
}

function mapStateProps(state){
  return {
    accounturns: state.finance.accounturns,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddFinanceTransfer))