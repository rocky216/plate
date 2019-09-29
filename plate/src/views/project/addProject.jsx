import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link, withRouter} from "react-router-dom"
import {Row, Col, Form, Input, Button, Icon, InputNumber, Card} from "antd"
import SelectCity from "@/components/SelectCity"
import {addSysItem, getSysItemList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"

const {TextArea } = Input

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

const formItemLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddProject extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      provinceId: '',
      cityId: '',
      areaId: ''
    }
  }

  getCitys(provinceId, cityId, areaId){
    console.log(provinceId, cityId, areaId)
    this.setState({provinceId, cityId, areaId})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.actions.addSysItem({
          ...values,
          province: this.state.provinceId,
          city: this.state.cityId,
          area: this.state.areaId
        }, res=>{
          OpenNotification("success")
          this.props.actions.getSysItemList()
          this.props.history.push("/project/list")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {areaId} = this.state

    return (
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col span={6}>
              <Form.Item label="项目编码">
                {getFieldDecorator("code", {
                  rules: [{
                    required: true,
                    message: '项目编码不能为空！',
                  }]
                })(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="项目名称">
                {getFieldDecorator("housingEstateName", {
                  rules: [{
                    required: true,
                    message: '项目名称不能为空！',
                  }]
                })(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="经度">
                {getFieldDecorator("longitude", {
                  initialValue: 0
                })(
                  <InputNumber style={{width: "100%"}} />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="纬度">
                {getFieldDecorator("latitude", {
                  initialValue: 0
                })(
                  <InputNumber style={{width: "100%"}} />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="详细地址">
                {getFieldDecorator("addressDetail", {
                  rules: [{
                    required: true,
                    message: '详细地址不能为空！',
                  }]
                })(
                  <TextArea/>
                )}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="选择地区" {...formItemLayouts}>
                {getFieldDecorator("areaId", {
                  rules: [{
                    required: true,
                    message: '选择地区不能为空！',
                  }]
                })(
                  <SelectCity onChange={this.getCitys.bind(this)}/>
                )}
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Form.Item wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 24, offset: 0 },
                }} >
                <Button 
                  htmlType="submit"
                  type="primary" 
                  className="mgr10">
                  <Icon type="save" />保存
                </Button>
                <Button>
                  <Link to="/project/list"><Icon type="close" />取消</Link>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addSysItem, getSysItemList}, dispatch)
  }
}

function mapStateProps(state){
  return {

  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Form.create()(AddProject)))