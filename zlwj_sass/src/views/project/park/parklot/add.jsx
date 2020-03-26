import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, InputNumber, Switch} from "antd";
import {addParkLot, getParkLot, getParkingSpace} from "@/actions/projectAction"

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

class AddParkLot extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      areaCodeList: []
    }
  }

  componentDidMount(){
    this.setState({areaCodeList: this.generateBig_1()})
  }
  loadParkFloorArea(params){
    this.props.actions.getParkingSpace({
      carparkId: this.props.match.params.id,
      ...params
    })
  }
  generateBig_1(){
    var str = [];
    for(var i=65;i<91;i++){
        str.push({
          id: String.fromCharCode(i),
          name: String.fromCharCode(i)+"区"
        });
    }
    for(var i=1;i<10;i++){
      str.push({
        id: String(i),
        name: i+"区"
      })
    }
    return str;
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.addParkLot({
          ...values,
          carparkId: this.props.match.params.id,
          status: values.status?"0":"1"
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getParkLot({
            id: this.props.match.params.id
          }, res=>{
            this.loadParkFloorArea({floorAreaId: res[0]["id"]})
          })
        })
      }
    })
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, visible, onCancel} = this.props
    const {areaCodeList} = this.state
    
    return (
      <Modal
        destroyOnClose
        title="新增楼层区域"
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="楼层数" hasFeedback>
            {getFieldDecorator('floorLevel', {
              rules: [
                {
                  required: true,
                  message: '填写楼层数!',
                }
              ],
            })(<InputNumber style={{width:"100%"}} />)}
          </Form.Item>
          <Form.Item label="楼层展示名" hasFeedback>
            {getFieldDecorator('floorName', {
              rules: [
                {
                  required: true,
                  message: '填写楼层展示名!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="区域编号" hasFeedback>
            {getFieldDecorator('areaCode')(
              <Select>
                {areaCodeList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {getFieldValue("areaCode")?
          <Form.Item label="楼层区域名称" hasFeedback>
            {getFieldDecorator('areaName', {
              rules: [
                {
                  required: true,
                  message: '填写楼层区域名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>:null}
          <Form.Item label="是否启用" >
            {getFieldDecorator('status', {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addParkLot, getParkLot, getParkingSpace}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddParkLot)) )