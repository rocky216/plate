import React from "react"
import {connect} from "react-redux"
import {withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Row, Col, Cascader, Select} from "antd";
import {addCompanyDevice, getCompanyDevice} from "@/actions/companyAction"
import {getDeviceDictTree} from "@/actions/dictAction"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddCompany extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deviceTree: [],
      deviceList: [],
      deviceListArr: [
        {label: "设备属性", value: "deviceAttr", code: "ATTR", require: true},
        {label: "固件版本", value: "deviceVer", code: "EDITION",  require: true},
        {label: "设备型号", value: "deviceModel", code: "MODEL",  require: true},
        {label: "备用字段1", value: "reserveOne", code: "RESERVEONE"},
        {label: "备用字段2", value: "reserveTwo", code: "RESERVETWO"},
        {label: "备用字段3", value: "reserveThree", code: "RESERVETHREE"},
        {label: "备用字段4", value: "reserveFour", code: "RESERVEFOUR"},
        {label: "备用字段5", value: "reserveFive", code: "RESERVEFIVE"},
      ]
    }
  }

  componentDidMount(){
    this.props.actions.getDeviceDictTree({}, res=>{
      this.handlenData(res)
    })
  }
  handlenData(res){
    let arr = _.cloneDeep(res)
    function getData(arr){
      _.each(arr, item=>{
        if(_.findIndex(res, o=>o.id==item.parentId)>-1){
          
          item.children=null
        }
        if(item.children && item.children.length){
          getData(item.children)
        }
      })
    }
    getData(arr)
    this.setState({deviceTree: arr})
  }

  handlenChange(values){
    const {dictdevice} = this.props
    const {deviceListArr} = this.state
    
    if(values && values.length==2){
      let deviceList1 = _.filter(dictdevice, o=>o.id==values[0])[0]["children"]
      let deviceList = _.filter(deviceList1, o=>o.id==values[1])[0]["children"]
      console.log(deviceList, "deviceList")
      this.setState({deviceList})
      let obj = {}
      _.each(deviceListArr, item=>{
        obj[item.value] = ""
      })
      this.props.form.setFields(obj)
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {deviceType} = values
        this.props.actions.addCompanyDevice({
          companyId: this.props.match.params.id,
          ...values,
          deviceType: deviceType && deviceType.length?deviceType[0]:"",
          deviceBrand: deviceType && deviceType.length?deviceType[1]:""
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getCompanyDevice({companyId: this.props.match.params.id,})
        })
      }
    })
  }
  

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, } = this.props
    const {deviceTree, deviceListArr, deviceList} = this.state
    
    return (
      <Modal
        destroyOnClose
        title="新增设备"
        okText="确定"
        cancelText="取消"
        width={600}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Row>
            <Col span={12}>
              <Form.Item label="设备名称" hasFeedback>
                {getFieldDecorator('deviceName', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备序列号" hasFeedback>
                {getFieldDecorator('deviceSerial', {
                  rules: [
                    {
                      required: true,
                      message: '填写设备序列号!',
                    }
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备KEY" hasFeedback>
                {getFieldDecorator('deviceKey')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备Secret" hasFeedback>
                {getFieldDecorator('deviceSecret')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备类型/品牌" hasFeedback>
                {getFieldDecorator('deviceType')(
                  <Cascader fieldNames={{label: "name", value:"id"}} options={deviceTree} 
                    onChange={this.handlenChange.bind(this)} />
                )}
              </Form.Item>
            </Col>
            {deviceListArr.map(item=>(
              <Col span={12} key={item.value}>
                <Form.Item label={item.label} hasFeedback>
                  {getFieldDecorator(item.value, {
                    rules: [
                      {
                        required: item.require,
                        message: `填写${item.label}!`,
                      }
                    ],
                  })(
                    <Select>
                      {deviceList && deviceList.length ?_.filter(deviceList, o=>o.code == item.code)[0]["children"].map(elem=>(
                        <Option key={elem.id} value={elem.id}>{elem.name}</Option>
                      )):null}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addCompanyDevice, getCompanyDevice, getDeviceDictTree}, dispatch)
  }
}

function mapStateProps(state){
  return {
    dictdevice: state.dict.dictdevice,
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Form.create()(AddCompany)))