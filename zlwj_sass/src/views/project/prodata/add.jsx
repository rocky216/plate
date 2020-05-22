import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, InputNumber, Select} from "antd";
import {addBuild, getBuildList} from "@/actions/projectAction"
import {getHeList} from "@/actions/baseAction"

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

  componentDidMount(){
    this.props.actions.getHeList({})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addBuild({
          ...values,
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
    const {spinning, visible, onCancel, heList} = this.props
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
          <Form.Item label="楼宇名称" >
            {getFieldDecorator('buildingName', {
              rules: [
                {
                  required: true,
                  message: '楼宇名称!',
                }
              ],
            })(
              <div>
                <InputNumber min={0} /><span>栋</span>
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
          <Form.Item label="所属项目" hasFeedback>
            {getFieldDecorator('heId', {
              rules: [
                {
                  required: true,
                  message: '选择所属项目!',
                }
              ],
            })(
              <Select >
                {heList && heList.length?heList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="楼层数" hasFeedback>
            {getFieldDecorator('buildingLevel', {
              rules: [
                {
                  required: true,
                  message: '填写楼层数!',
                }
              ],
            })(
              <div>
                <InputNumber min={1} /><span>层</span>
              </div>
            )}
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
                <Option value="0">无电梯</Option>
                <Option value="1">有电梯</Option>
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
    actions: bindActionCreators({addBuild, getBuildList, getHeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    heList: state.base.heList,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddProdata) )