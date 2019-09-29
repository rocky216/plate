import React from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal,
  Row, Col, Form, Input, Button, Icon, InputNumber,
} from "antd"
import SelectCity from "@/components/SelectCity"
import {OpenNotification} from "@/utils"
import {EditSysItem, getSysItemList} from "@/actions/projectAction"

const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class EidtProject extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      provinceId:'',
      cityId: '',
      areaId: ''
    }
  }
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){
    const {provinceId, cityId, areaId} = this.state
    if(!provinceId && !cityId && !areaId){
      this.setState({
        provinceId: nextProps.dataInfo.province,
        cityId: nextProps.dataInfo.city,
        areaId: nextProps.dataInfo.area,
      })
    }
   
  }
  getCitys(provinceId, cityId, areaId){
    console.log(provinceId, cityId, areaId)
    this.setState({provinceId, cityId, areaId})
  }

  handleSubmit(e){
    const {provinceId, cityId, areaId} = this.state
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values, "values")
        if(!provinceId || !cityId || !areaId){
          OpenNotification("error", "选择城市不能为空")
          return
        }
        this.props.actions.EditSysItem({
          ...values,
          province: provinceId,
          city: cityId,
          area: areaId,
          sid: this.props.dataInfo.id
        }, res=>{
          OpenNotification("success")
          this.props.actions.getSysItemList()
          this.props.onCancel()
        })
      }
    });
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {visible, onCancel, dataInfo} = this.props
    const {areaId} = this.state

    return (
      <Modal 
        destroyOnClose={true}
        title="编辑"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit.bind(this)}
      >
        
        <Form {...formItemLayout}>
          <Form.Item label="项目编码">
          {getFieldDecorator("code", {
            initialValue: dataInfo?dataInfo.code:'',
            rules: [{
              required: true,
              message: '项目编码不能为空！',
            }]
          })(
            <Input disabled/>
          )}
          </Form.Item>
          <Form.Item label="项目名称">
          {getFieldDecorator("housingEstateName", {
            initialValue: dataInfo?dataInfo.housingEstateName:'',
            rules: [{
              required: true,
              message: '项目名称不能为空！',
            }]
          })(
            <Input/>
          )}
          </Form.Item>
          <Form.Item label="经度">
          {getFieldDecorator("longitude", {
            initialValue: dataInfo?dataInfo.longitude:'',
          })(
            <Input/>
          )}
          </Form.Item>
          <Form.Item label="纬度">
          {getFieldDecorator("latitude", {
            initialValue: dataInfo?dataInfo.longitude:'',
          })(
            <Input/>
          )}
          </Form.Item>
          <Form.Item label="选择地区" >
            {getFieldDecorator("areaId")(
              <SelectCity defaultVal={dataInfo.area?[dataInfo.province, dataInfo.city,dataInfo.area]:[]} onChange={this.getCitys.bind(this)}/>
            )}
          </Form.Item>
          <Form.Item label="详细地址">
          {getFieldDecorator("addressDetail", {
            initialValue: dataInfo?dataInfo.addressDetail:'',
            rules: [{
              required: true,
              message: '详细地址不能为空！',
            }]
          })(
            <TextArea/>
          )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({EditSysItem, getSysItemList}, dispatch)
  }
}

function mapStateProps(){
  return {

  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Form.create()(EidtProject)))

