import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Button, Input, Upload, Row, Col, Select, InputNumber, Switch, Icon, DatePicker} from "antd";
import {getSelectHeList} from "@/actions/appAction"
import {addParkData} from "@/actions/projectAction"
import moment from "moment"

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


class AddPark extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      span: 8,
    }
  }

  componentDidMount(){
    this.props.actions.getSelectHeList({})
  }

  normFile(e){
    if (Array.isArray(e)) {
      
      return e;
    }
    if(e && e.fileList){
      _.each(e.fileList, item=>{
        item.url = item.response?item.response.data.url:""
        item.attaId = item.response?item.response.data.attaId:""
      })
    }
    return e && e.fileList;
  }

  getAttaIds(arr){
    if(!_.isArray(arr) || !arr.length) return ""
    console.log(arr, "a")
    let ids = []
    _.each(arr, item=>{
      ids.push(item.attaId)
    })
    return ids.join()
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {createTime, deliversTime, status, attaIds} = values
        this.props.actions.addParkData({
          ...values,
          createTime: createTime?moment(createTime).format("YYYY-MM-DD"):"",
          deliversTime: deliversTime?moment(deliversTime).format("YYYY-MM-DD"):"",
          status: status?"0":"1",
          attaIds: this.getAttaIds(attaIds)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/project/park")
        })
      }
    });
  }

  

  render(){
    const {getFieldDecorator } = this.props.form
    const {utils, commonFiles, allHeList} = this.props
    const {span} = this.state

    return (
      <Card  title="新增停车场" extra={<div>
        <Button type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
        <Link to="/project/park"><Button className="mgl10"><Icon type="rollback" />返回</Button></Link>
      </div>} >
        <Form {...formItemLayout}>
          <Row gutter={10}>
            <Col span={span}>
              <Form.Item label="停车场名称">
                {getFieldDecorator("carparkName", {
                  rules: [{ required: true, message: '请填写停车场名称!' }],
                })(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="停车场编号">
                {getFieldDecorator("carparkCode", {
                  rules: [{ required: true, message: '停车场编号!' }],
                })(
                  <Input/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="关联项目">
                {getFieldDecorator("heId", {
                  rules: [{ required: true, message: '关联项目!' }],
                })(
                  <Select>
                    {allHeList?allHeList.map(item=>(
                      <Option value={item.id} key={item.id}>{item.name}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="停车场类型">
                {getFieldDecorator("carparkType",{
                  rules: [{ required: true, message: '停车场类型!' }],
                })(
                  <Select>
                    <Option value="1">地下停车场</Option>
                    <Option value="2">地面停车场</Option>
                    <Option value="3">高层停车场</Option>
                    <Option value="4">其他停车场</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="停车场层数">
                {getFieldDecorator("carparkLevel", {
                  rules: [{ required: true, message: '停车场层数!' }],
                })(
                  <InputNumber style={{width:"100%"}}/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="停车场面积">
                {getFieldDecorator("buildingArea")(
                  <InputNumber style={{width:"100%"}}/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="经度">
                {getFieldDecorator("longitude")(
                  <InputNumber style={{width:"100%"}}/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="纬度">
                {getFieldDecorator("latitude")(
                  <InputNumber style={{width:"100%"}}/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="停车场建成时间">
                {getFieldDecorator("createTime")(
                  <DatePicker style={{width:"100%"}}/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="停车场交付时间">
                {getFieldDecorator("deliversTime")(
                  <DatePicker style={{width:"100%"}}/>
                )}
              </Form.Item>
            </Col>
            <Col span={span}>
              <Form.Item label="状态">
                {getFieldDecorator("status", {
                  valuePropName: "checked"
                })(
                  <Switch/>
                )}
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="上传图片" labelCol={{sm:{span:3}}}>
                {getFieldDecorator("attaIds", {
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile.bind(this)
                })(
                  <Upload 
                  multiple
                    name="file" 
                    listType="picture-card"
                    // beforeUpload={this.handlenBeforeUpload.bind(this)}
                    action={`${commonFiles?commonFiles.resourceServerAddress:''}common/${this.props.utils.getCookie("token")}`} >            
                    <Icon type="upload" style={{fontSize: 26}} />
                  </Upload>
                )}
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
    actions: bindActionCreators({getSelectHeList, addParkData}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddPark) )