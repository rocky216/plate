import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Select, DatePicker} from "antd";
import {addShop, getShopList} from "@/actions/projectAction"
import moment from "moment"

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

class AddShop extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addShop({
          ...values,
          deliversTime: moment(values.deliversTime).format("YYYY-MM-DD")
        }, res=>{
          this.props.actions.getShopList({current: 1})
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, projectitem} = this.props
    
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
          <Form.Item label="商铺名称" hasFeedback>
            {getFieldDecorator('shopsName', {
              rules: [
                {
                  required: true,
                  message: '填写商铺名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="商铺编号" hasFeedback>
            {getFieldDecorator('shopsCode', {
              rules: [
                {
                  required: true,
                  message: '填写商铺编号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="选择项目" hasFeedback>
            {getFieldDecorator('heId', {
              rules: [
                {
                  required: true,
                  message: '选择项目!',
                }
              ],
            })(
              <Select>
                {projectitem && projectitem.list?projectitem.list.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="建筑面积" hasFeedback>
            {getFieldDecorator('houseArea', {
              rules: [
                {
                  required: true,
                  message: '填写建筑面积!',
                }
              ],
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="室内面积" hasFeedback>
            {getFieldDecorator('indoorArea', {
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="公摊面积" hasFeedback>
            {getFieldDecorator('poolArea', {
            })(<InputNumber min={0} style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="楼层数" hasFeedback>
            {getFieldDecorator('floorNum', {
            })(<InputNumber style={{width: "100%"}} />)}
          </Form.Item>
          <Form.Item label="是否有电梯" hasFeedback>
            {getFieldDecorator('elevatorHouse', {
            })(
              <Select>
                <Option value="1">有</Option>
                <Option value="0">无</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="交房时间" hasFeedback>
            {getFieldDecorator('deliversTime', {
              rules: [
                {
                  required: true,
                  message: '选择交房时间!',
                }
              ],
            })(<DatePicker/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addShop, getShopList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddShop))