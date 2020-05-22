import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {editFloor, getUtilList} from "@/actions/projectAction"

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

class FloorEdit extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.editFloor({
          ...values,
          id: this.props.detail.id,
          unitId: this.props.detail.unitId,
          buildingId: this.props.detail.buildingId,
          heId: this.props.detail.heId,
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getUtilList({
            current:1,
            buildingId: this.props.detail.buildingId,
            heId: this.props.detail.heId,
          })
          this.props.onCancel()
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    
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
          <Form.Item label="楼层展示编号" hasFeedback>
            {getFieldDecorator('showFloorCode', {
              initialValue: detail.showFloorCode,
              rules: [
                {
                  required: true,
                  message: '填写楼层展示编号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="实际楼层数" hasFeedback>
            {getFieldDecorator('trueLevel', {
              initialValue: detail.trueLevel,
              rules: [
                {
                  required: true,
                  message: '填写实际楼层数!',
                }
              ],
            })(<InputNumber/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editFloor, getUtilList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(FloorEdit) )