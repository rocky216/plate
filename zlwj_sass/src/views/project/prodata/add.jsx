import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {addBuild, getBuildList} from "@/actions/projectAction"

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

class AddProdata extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isEve: "1"
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addBuild({
          ...values
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getBuildList({current:1})
          this.props.onCancel()
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    const {isEve } = this.state

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
          <Form.Item label="楼宇名称" hasFeedback>
            {getFieldDecorator('buildingName', {
              rules: [
                {
                  required: true,
                  message: '楼宇名称!',
                }
              ],
            })(
              <div>
                <InputNumber min={1}/><span>栋</span>
              </div>
            )}
          </Form.Item>
          <Form.Item label="楼宇展示编号" hasFeedback>
            {getFieldDecorator('showCode', {
              rules: [
                {
                  required: true,
                  message: '填写楼宇展示编号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="楼宇编号" hasFeedback>
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: '填写楼宇编号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="是否有电梯" hasFeedback>
            {getFieldDecorator('elevatorBuilding', {
              rules: [
                {
                  required: true,
                  message: '选择是否有电梯!',
                }
              ],
            })(
              <Select onChange={(value)=>this.setState({isEve: value})} >
                <Option value="0">楼梯房</Option>
                <Option value="1">电梯房</Option>
              </Select>
            )}
          </Form.Item>
          {isEve=="1"?<Form.Item label="电梯个数" hasFeedback>
            {getFieldDecorator('elevatorCount', {
              rules: [
                {
                  required: true,
                  message: '填写电梯个数!',
                }
              ],
            })(
              <div>
                <InputNumber min={1} /><span>个</span>
              </div>
            )}
          </Form.Item>:null}
          
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addBuild, getBuildList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddProdata) )