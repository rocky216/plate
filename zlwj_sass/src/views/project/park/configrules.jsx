import React from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Form, Input, Button, Icon, Select} from "antd";
import {updateAndAddPlateConfig, parkPlateConfig} from "@/actions/projectAction"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Configrules extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail:""
    }
  }

  componentDidMount(){
    this.props.actions.parkPlateConfig({parkId: this.props.match.params.id}, res=>{
      this.setState({detail: res})
    })
    this.props.form.setFieldsValue({workModel: "2"})
  }

  

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.updateAndAddPlateConfig({
          ...values,
          parkId: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
        })
      }
    });
  }

  render(){
    const { getFieldDecorator, getFieldValue, setFieldsValue} = this.props.form;
    const {utils } = this.props
    const {detail} = this.state
    
    return (
      <Card title="收费规则" extra={(
        <div>
          <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
        </div>
      )} >
        <Form {...formItemLayout}>
          <Form.Item label="运行模式">
            {getFieldDecorator("workModel", {
              initialValue: detail.workModel,
              rules: [{ required: true, message: '运行模式!' }],
              onChange(value){
                setFieldsValue({feeModel: ""})
              }
            })(
              <Select>
                <Option value="1">封闭模式</Option>
                <Option value="2">开放模式</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="收费模式">
            {getFieldDecorator("feeModel", {
              initialValue: detail.feeModel,
              rules: [{ required: true, message: '停车场名称!' }],
            })(
              <Select>
                <Option value="1">不收费</Option>
                {getFieldValue("workModel")=="2"?
                <Option value="2">外来车辆收费</Option>:null}
                <Option value="3">全部收费</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="车位满是否通行">
            {getFieldDecorator("lotFull", {
              initialValue: detail.lotFull,
              rules: [{ required: true, message: '车位满是否通行!' }],
            })(
              <Select>
                <Option value="1">禁止通行</Option>
                <Option value="2">可通行</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({updateAndAddPlateConfig, parkPlateConfig}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)( Form.create()(Configrules) ) )