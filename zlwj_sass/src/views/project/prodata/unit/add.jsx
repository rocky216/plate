import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withRouter} from "react-router-dom"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {addUtil, getUtilList} from "@/actions/projectAction"

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

class AddUtil extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isEve: "1"
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addUtil({
          ...values,
          heId: this.props.match.params.heId,
          buildingId: this.props.match.params.id,
          unitName: values.unitName
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getUtilList({
            current:1,
            heId: this.props.match.params.heId,
            buildingId: this.props.match.params.id,
          })
          this.props.onCancel()
        })
      }
    })
    
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    

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
          <Form.Item label="单元名称" hasFeedback>
            {getFieldDecorator('unitName', {
              rules: [
                {
                  required: true,
                  message: '填写单元名称!',
                }
              ],
            })(
              <div>
                <InputNumber min={1} style={{width:"70%"}} /><span>单元</span>
              </div>
            )}
          </Form.Item>
          {/* <Form.Item label="单元编号" hasFeedback>
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: '填写单元编号!',
                }
              ],
            })(<Input min={1} style={{width:"70%"}} />)}
          </Form.Item> */}
          <Form.Item label="展示编号" hasFeedback>
            {getFieldDecorator('showCode', {
              rules: [
                {
                  required: true,
                  message: '填写展示编号!',
                }
              ],
            })(<Input min={1} style={{width:"70%"}} />)}
          </Form.Item>
          <Form.Item label="层数" hasFeedback>
            {getFieldDecorator('unitLevel', {
              rules: [
                {
                  required: true,
                  message: '填写单元名称!',
                }
              ],
            })(
              <div>
                <InputNumber min={1} style={{width:"70%"}} /><span>层</span>
              </div>
            )}
          </Form.Item>
          <Form.Item label="每层房间数" hasFeedback>
            {getFieldDecorator('heHouseCount', {
              rules: [
                {
                  required: true,
                  message: '填写每层房间数!',
                }
              ],
            })(
              <div>
                <InputNumber min={1} style={{width:"70%"}} /><span>层</span>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addUtil, getUtilList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)( Form.create()(AddUtil) ) )