import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {editBuild, getBuildList} from "@/actions/projectAction"

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
        this.props.actions.editBuild({
          ...values,
          id: this.props.detail.id
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
    const {spinning, visible, onCancel, detail} = this.props
    const {isEve } = this.state
    console.log(detail.elevatorCount)
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
              initialValue: detail.buildingName,
              rules: [
                {
                  required: true,
                  message: '楼宇名称!',
                }
              ],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="楼宇编号" hasFeedback>
            {getFieldDecorator('showCode', {
              initialValue: detail.showCode,
              rules: [
                {
                  required: true,
                  message: '填写楼宇编号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="楼宇编号" hasFeedback>
            {getFieldDecorator('code', {
              initialValue: detail.code,
              rules: [
                {
                  required: true,
                  message: '填写楼栋编号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="是否有电梯" hasFeedback>
            {getFieldDecorator('elevatorBuilding', {
              initialValue: String(detail.elevatorBuilding),
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
              initialValue: String(detail.elevatorCount),
              rules: [
                {
                  required: true,
                  message: '填写电梯个数!',
                }
              ],
            })(<InputNumber/>)}
          </Form.Item>:null}
          
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editBuild, getBuildList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddProdata) )