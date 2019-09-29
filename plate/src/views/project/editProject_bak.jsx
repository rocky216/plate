import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link, withRouter} from "react-router-dom"
import {Row, Col, Form, Input, Button, Icon, InputNumber, Card, Modal} from "antd"
import SelectCity from "@/components/SelectCity"
import {addSysItem, getSysItemList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"
import _default from "antd/lib/drawer"

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
      areaId: '',
      detail: {}
    }
  }

  componentWillMount(){
    if(!this.props.sysItemList){
      this.props.actions.getSysItemList({}, res=>{
        this.getDetail(this.props)
      })
    }else {
      this.getDetail(this.props)
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.match.params.id != nextProps.match.params.id){
      this.getDetail(nextProps)
    }
    
  }

  getDetail(nextProps){
    const {sysItemList, match} = nextProps
    if(sysItemList){
      let data = _.filter(sysItemList, o=>o.id==match.params.id)[0]
      this.setState({detail: data})
    }
    
  }

  getCitys(provinceId, cityId, areaId){
    this.setState({provinceId, cityId, areaId})
  }
  

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.actions.addSysItem({
        //   ...values,
        //   provinceId: this.state.provinceId,
        //   cityId: this.state.cityId,
        // }, res=>{
        //   OpenNotification("success")
        //   this.props.actions.getSysItemList()
        //   this.props.history.push("/project/list")
        // })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {sysItemList, params} = this.props
    const {detail} = this.state
    console.log(detail, "detail")
    return (
      <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Col span={6}>
              <Form.Item label="项目编码">
                {getFieldDecorator("code", {
                  initialValue: detail.code,
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
                  initialValue: detail.housingEstateName,
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
                  initialValue: detail.longitude,
                })(
                  <InputNumber style={{width: "100%"}} />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="纬度">
                {getFieldDecorator("latitude", {
                  initialValue: detail.latitude,
                })(
                  <InputNumber style={{width: "100%"}} />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="详细地址">
                {getFieldDecorator("addressDetail", {
                  initialValue: detail.addressDetail,
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
                  <SelectCity defaultVal={detail.area?[detail.province, detail.city,detail.area]:[]} onChange={this.getCitys.bind(this)}/>
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
    sysItemList: state.project.sysItemList
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(Form.create()(AddProject)))