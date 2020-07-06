import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Radio, InputNumber, Select} from "antd";
import {getCostActive, addCostActive} from "@/actions/financeAction"
import HeList from "@/components/HeList"

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

class AddActivity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: "bank",
      linkType: "1"
    }
  }

  handlenType({target}){
    console.log(target.value)
    this.setState({type: target.value})
  }

  handlenLinkType(){
    this.setState({type: target.value})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      
      if(!err){
        this.props.actions.addCostActive({
          ...values,
        }, res=>{
          this.props.actions.getCostActive({current:1})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, visible, onCancel,} = this.props
    
    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        width={600}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="活动名称" >
            {getFieldDecorator('activeName', {
              rules: [
                {
                  required: true,
                  message: '填写活动名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="项目" >
            {getFieldDecorator('heId', {
              rules: [
                {
                  required: true,
                  message: '项目!',
                }
              ],
            })(<HeList />)}
          </Form.Item>
          <Form.Item label="奖励类型" >
            {getFieldDecorator('activeType', {
              rules: [
                {
                  required: true,
                  message: '奖励类型!',
                }
              ],
            })(
              <Select>
                <Option value="discount">折扣奖励</Option>
                <Option value="date">时间奖励</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="奖励" >
            {getFieldDecorator('reward', {
              rules: [
                {
                  required: true,
                  message: '填写活动名称!',
                }
              ],
            })(<Input suffix={getFieldValue("activeType")=="discount"?"折":"月"} />)}
          </Form.Item>
          
          <Form.Item label="条件类型" >
            {getFieldDecorator('conditionsType', {
              rules: [
                {
                  required: true,
                  message: '条件类型!',
                }
              ],
            })(
              <Select>
                <Option value="money">金额</Option>
                <Option value="date">时间</Option>
              </Select>
            )}
          </Form.Item>
            
          <Form.Item label="活动条件" >
            {getFieldDecorator('conditions', {
              rules: [
                {
                  required: true,
                  message: '活动条件!',
                }
              ],
            })(<Input suffix={getFieldValue("conditionsType")=="date"?"月":"元"} />)}
          </Form.Item>

          {getFieldValue("activeType")=="date"?
          <Form.Item label="重复奖励" >
            {getFieldDecorator('isLoop', {
              rules: [
                {
                  required: true,
                  message: '重复奖励!',
                }
              ],
            })(
              <Select>
                <Option value="Y">是</Option>
                <Option value="N">否</Option>
              </Select>
            )}
          </Form.Item>:null}
          <Form.Item label="状态" >
            {getFieldDecorator('status', {
              initialValue: "0",
              rules: [
                {
                  required: true,
                  message: '状态!',
                }
              ],
            })(
              <Select>
                <Option value="0">正常</Option>
                <Option value="1">停用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="备注" >
            {getFieldDecorator('remark', {
            })(<TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCostActive, addCostActive}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddActivity))