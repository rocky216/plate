import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Select, Radio, Button, Icon, Row, Col, Typography } from "antd";
import JCard from "@/components/JCard"
import SelectHouse from "@/components/SelectHouse"
import {getSignAndTemplate, sendCustom} from "@/actions/otherAction"

const {Option} = Select
const {TextArea} = Input
const {Text} = Typography

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class SendMes extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: "1",
      checkedKeys: [],
      signs: [],
      preview: "",
      tips: "",
      phones: ""
    }
  }

  componentDidMount(){
    this.props.actions.getSignAndTemplate({}, res=>{
      this.setState({signs: res.sign})
    })
  }


  handlenPreview(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {signs} = this.state
        console.log('Received values of form: ', values);
        let sign = _.filter(signs, o=>o.signId==values.signId)[0]["signName"]
        let text = `【${sign}】 ${values.content}`
        let tips = `提示：总字数为：${text.length} 收取${Math.ceil(text.length/67)}条短信费用`
        this.setState({preview: text, tips})
      }
    });
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {type, phones,checkedKeys} = this.state
        console.log('Received values of form: ', values);
        this.props.actions.sendCustom({
          ...values,
          type,
          str: type=="1"?phones:checkedKeys.join()
        }, res=>{
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning} = this.props
    const {type, checkedKeys, signs, preview, tips, phones} = this.state

    return (
      <JCard spinning={spinning}>
        
        <Card title="短信发送"  extra={<div> 
          <Button type="primary" className="mgr10" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
          <Button onClick={this.handlenPreview.bind(this)} type="primary" ghost ><Icon type="eye" />预览</Button>
        </div>}>
          <Row>
            <Col span={16}>
              <Form {...formItemLayout} >
              <Form.Item label="签名" hasFeedback>
                {getFieldDecorator('signId', {
                  rules: [
                    {
                      required: true,
                      message: '选择签名!',
                    }
                  ],
                })(
                  <Select>
                    {signs.map(item=>(
                      <Option key={item.signId} value={item.signId}>{item.signName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="发送内容" hasFeedback>
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: '填写发送内容!',
                    }
                  ],
                })(<TextArea autoSize={{minRows: 3}} />)}
              </Form.Item>
              <Form.Item label="手机号" >
                <Radio.Group value={type} buttonStyle="solid" onChange={({target})=>this.setState({type:target.value})} >
                  <Radio.Button value="1">输入号码</Radio.Button>
                  <Radio.Button value="2">选择房间</Radio.Button>
                </Radio.Group>
                {type=="1"?<TextArea value={phones} onChange={({target})=>this.setState({phones:target.value})} autoSize={{minRows: 3}} placeholder="请输入手机号，多个手机号用“,”隔开" />:null}
                {type=="2"?<SelectHouse NoInput checkedKeys={checkedKeys} checkable 
                  onCheck={(keys)=>this.setState({checkedKeys: keys})} />:null}
                
              </Form.Item>
              </Form>
            </Col>
            <Col span={6}>
              <Card title="预览">
                <Text>{preview}</Text>
                <br/>
                <Text type="danger" classsName="mgt10">{tips}</Text>
              </Card>
            </Col>
          </Row>

        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSignAndTemplate, sendCustom}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(SendMes) )