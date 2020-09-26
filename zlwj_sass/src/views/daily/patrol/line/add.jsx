import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Transfer, Select} from "antd";
import {getPpPatrolLine, addPpPatrolLine, getPpPatrolPoint} from "@/actions/dailyAction"

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

class AddPatrolLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetKeys: []
    }
  }
  
  componentDidMount(){
    this.props.actions.getPpPatrolPoint({pageSize: 1000})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addPpPatrolLine({
          ...values,
          ids: this.state.targetKeys.join()
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getPpPatrolLine({current: 1})
        })
      }
    })
  }

  hanldeChange(targetKeys){
    var newarr = _.difference(targetKeys, this.state.targetKeys);
    if(newarr.length){
      var newTargetKeys = this.state.targetKeys.concat(newarr)
      this.setState({targetKeys: newTargetKeys})
    }else{
      this.setState({targetKeys: targetKeys})
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, patrolPoint} = this.props
    const {targetKeys} = this.state
    
    return (
      <Modal
        destroyOnClose
        width={650}
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="路线名称" hasFeedback>
            {getFieldDecorator('lineName', {
              rules: [
                {
                  required: true,
                  message: '路线名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="路线说明" hasFeedback>
            {getFieldDecorator('lineInfo', {
              rules: [
                {
                  required: true,
                  message: '路线说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="状态" hasFeedback>
            {getFieldDecorator('status', {
              initialValue: "1",
              rules: [
                {
                  required: true,
                  message: '状态!',
                }
              ],
            })(
              <Select>
                <Option value="1">禁用</Option>
                <Option value="0">启用</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{sm: {span: 19, offset: 5}}}>
            <Transfer
              dataSource={patrolPoint?utils.addIndex(patrolPoint.list, "id"):[]}
              targetKeys={targetKeys}
              render={item=>item.name}
              onChange={this.hanldeChange.bind(this)}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPpPatrolLine, addPpPatrolLine, getPpPatrolPoint}, dispatch)
  }
}

function mapStateProps(state){
  return {
    patrolPoint: state.daily.patrolPoint,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddPatrolLine))