import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Button, Input, Upload, Row, Col, Select, InputNumber, Switch, Icon, DatePicker} from "antd";
import {getSelectHeList, } from "@/actions/appAction"
import {editParkData, getParkData} from "@/actions/projectAction"
import moment from "moment"
import Chargrules from "./chargrules"
import Configrules from "./configrules"
import JCard from "@/components/JCard"

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


class EditPark extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      span: 8,
      detail: "",
      fileList: []
    }
  }

  componentDidMount(){
    this.props.actions.getSelectHeList({})
    this.props.actions.getParkData({
      id: this.props.match.params.id
    }, res=>{
      this.setState({detail: res})
      this.getAttaList(res.attaList)
    })
  }
  getAttaList(arr){
    if(!_.isArray(arr) || !arr.length) return
    let newArr = []
    _.each(arr, (item, index)=>{
      newArr.push({
        url: item.dowloadHttpUrl,
        attaId: item.remark,
        uid: index
      })
    }) 
    this.setState({fileList: newArr})
  }

  normFile(e){
    if (Array.isArray(e)) {
      return e;
    }
    if(e && e.fileList){
      _.each(e.fileList, item=>{
        if(!item.url){
          item.url = item.response?item.response.data.url:""
        item.attaId = item.response?item.response.data.attaId:""
        }
        
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
        this.props.actions.editParkData({
          id: this.props.match.params.id,
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
    const {utils, commonFiles, allHeList, spinning} = this.props
    const {span, detail, fileList} = this.state

    return (
      <JCard spinning={spinning}>
        <Card  title="停车场信息" extra={<div>
          <Button type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
          <Link to="/project/park"><Button className="mgl10"><Icon type="rollback" />返回</Button></Link>
        </div>} >
          <Form {...formItemLayout}>
            <Row gutter={10}>
              <Col span={span}>
                <Form.Item label="停车场名称">
                  {getFieldDecorator("carparkName", {
                    initialValue: detail.carparkName,
                    rules: [{ required: true, message: '请填写停车场名称!' }],
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="停车场编号">
                  {getFieldDecorator("carparkCode", {
                    initialValue: detail.carparkCode,
                    rules: [{ required: true, message: '停车场编号!' }],
                  })(
                    <Input/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="关联项目">
                  {getFieldDecorator("heId", {
                    initialValue: detail.heId,
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
                    initialValue: detail.carparkType,
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
                    initialValue: detail.carparkLevel,
                    rules: [{ required: true, message: '停车场层数!' }],
                  })(
                    <InputNumber style={{width:"100%"}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="停车场面积">
                  {getFieldDecorator("buildingArea", {
                    initialValue: detail.buildingArea,
                  })(
                    <InputNumber style={{width:"100%"}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="经度">
                  {getFieldDecorator("longitude", {
                    initialValue: detail.longitude,
                  })(
                    <InputNumber style={{width:"100%"}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="纬度">
                  {getFieldDecorator("latitude", {
                    initialValue: detail.latitude,
                  })(
                    <InputNumber style={{width:"100%"}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="停车场建成时间">
                  {getFieldDecorator("createTime", {
                    initialValue: detail.createTime?moment(detail.deliversTime):null,
                  })(
                    <DatePicker style={{width:"100%"}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="停车场交付时间">
                  {getFieldDecorator("deliversTime", {
                    initialValue: detail.deliversTime?moment(detail.deliversTime):null,
                  })(
                    <DatePicker style={{width:"100%"}}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={span}>
                <Form.Item label="状态">
                  {getFieldDecorator("status", {
                    initialValue: detail.status=="0"?true:false,
                    valuePropName: "checked"
                  })(
                    <Switch/>
                  )}
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="上传图片" labelCol={{sm:{span:3}}}>
                  {getFieldDecorator("attaIds", {
                    initialValue: fileList,
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
        <Row gutter={10}>
          <Col span={12}>
            <Chargrules/>
          </Col>
          <Col span={12}>
            <Configrules/>
          </Col>
        </Row>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSelectHeList, editParkData, getParkData}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning,
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditPark) )