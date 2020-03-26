import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select} from "antd";
import {addSwitch, getDeviceDictTree, getQueues, getSwitch} from "@/actions/dictAction"
import {getCompany} from "@/actions/companyAction"

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

class AddSwitch extends React.Component {

  componentDidMount(){
    this.props.actions.getDeviceDictTree({})
    this.props.actions.getCompany({})
    this.props.actions.getQueues({pageSize: 1000})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {exchangesType, queues} = values
        this.props.actions.addSwitch({
          ...values,
          queues: exchangesType=="Fanout"?queues && queues.length?queues.join():"":queues
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getSwitch({})
        })
      }
    })
  }
  

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, visible, onCancel, dictdevice, company, queues } = this.props
    
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
          <Form.Item label="公司" hasFeedback>
            {getFieldDecorator('companyId', {
              rules: [
                {
                  required: true,
                  message: '选择公司!',
                }
              ],
            })(
              <Select>
                {company?company.map(item=>(
                  <Option key={item.id} value={item.id}>{item.companyName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="设备类型" hasFeedback>
            {getFieldDecorator('deviceTypeId', {
              rules: [
                {
                  required: true,
                  message: '选择设备类型!',
                }
              ],
            })(
              <Select>
                {dictdevice?dictdevice.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="交换机类别" hasFeedback>
            {getFieldDecorator('exchangesType', {
              rules: [
                {
                  required: true,
                  message: '交换机类别!',
                }
              ],
            })(
              <Select>
                <Option value="Topic">Topic</Option>
                <Option value="Fanout">Fanout</Option>
                <Option value="Direct">Direct</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="队列选择" hasFeedback>
            {getFieldDecorator('queues', {
              rules: [
                {
                  required: true,
                  message: '队列选择!',
                }
              ],
            })(
              <Select mode={getFieldValue("exchangesType")=="Fanout"?"multiple":false}>
                {queues && queues.list?queues.list.map(item=>(
                  <Option key={item.id} value={item.id}>{item.queuesName}</Option>
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
    actions: bindActionCreators({addSwitch, getDeviceDictTree, getCompany, getQueues, getSwitch}, dispatch)
  }
}

function mapStateProps(state){
  return {
    queues: state.dict.queues,
    company: state.company.company,
    dictdevice: state.dict.dictdevice,
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddSwitch))