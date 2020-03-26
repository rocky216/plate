import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Row, Col, Button, Icon, Select, DatePicker, Upload} from "antd";
import JCard from "@/components/JCard"
import SearchHouse from "@/components/SearchHouse"
import { Link } from "react-router-dom";
import "./index.less"
import {getPlates, addCarAttaList} from "@/actions/otherAction"
import moment from "moment"

const {TextArea} = Input
const {Option} = Select
const {RangePicker} = DatePicker

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

class AddCar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      relaPlates: [],
      plates: []
    }
  }
  componentDidMount(){
    this.props.actions.getPlates({}, res=>{
      this.setState({plates: res})
    })
  }
  addPlate(){
    const {relaPlates} = this.state
    relaPlates.push({
      carparkId: "",
      time: null,
    })
    this.setState({relaPlates: relaPlates})
  }
  handlenDelete(index){
    const {relaPlates} = this.state
    let arr = relaPlates.splice(index,1)
    this.setState({relaPlates})
  }
  changePlate(index, value){
    const {relaPlates} = this.state
    let isAt = _.findIndex(relaPlates, o=>o.carparkId==value)
    if(isAt>-1){
      this.props.utils.OpenNotification("error", "请选择不同的停车场！")
      return
    };
    relaPlates[index]["carparkId"] = value
    this.setState({relaPlates})
  }
  changeTime(index, value){
    const {relaPlates} = this.state
    relaPlates[index]["time"] = value
    this.setState({relaPlates})
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
  
  handlenCarpark(){
    const {relaPlates} = this.state
    let arr = []
    _.each(relaPlates, item=>{
      arr.push({
        carparkId: item.carparkId,
        startTime: item.time && item.time.length ? moment(item.time[0]).format("YYYY-MM-DD"):"",
        endTime: item.time && item.time.length ? moment(item.time[1]).format("YYYY-MM-DD"):"",
      })
    })
    return JSON.stringify(arr)
  }
  getAttaIds(arr){
    let newArr = []
    _.each(arr,item=>{
      newArr.push(item.attaId)
    })
    return newArr.join()
  }
  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);
        const {attaIds, ownerId} = values
        this.props.actions.addCarAttaList({
          ...values,
          linkCarparkJSON: this.handlenCarpark(),
          ownerId: ownerId?ownerId.ownersId:"",
          attaIds: attaIds?this.getAttaIds(attaIds):""
        },res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/car")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {utils, spinning, commonFiles} = this.props
    const {relaPlates, plates} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title="新增车辆" extra={(
          <div>
            <Button type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
            <Link to="/workcenter/car">
              <Button className="mgl10"><Icon type="rollback" />返回</Button>
            </Link>
            
          </div>
        )} >
          <Form {...formItemLayout}>
            <Form.Item label="车牌号">
              {getFieldDecorator('licensePlate', {
                rules: [
                  {
                    required: true,
                    message: '车牌号!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="业主">
              {getFieldDecorator('ownerId')(<SearchHouse onlyHe />)}
            </Form.Item>
            <Form.Item label="联系人">
              {getFieldDecorator('linkName', {
                rules: [
                  {
                    required: true,
                    message: '联系人!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="联系电话">
              {getFieldDecorator('linkPhone', {
                rules: [
                  {
                    required: true,
                    message: '联系电话!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="关联停车场"  >
              <div className="addcarbox">
                <div className="flexend mgb10">
                  <Button size="small" onClick={this.addPlate.bind(this)}><Icon type="plus" /></Button>
                </div>
                {relaPlates.map((item, index)=>(
                  <div className="plateList mgb10" key={index} >
                    <div className="plateItem">
                      <span style={{width:80, lineHeight:"30px"}}>停车场:</span>
                      <Select value={item.carparkId} onChange={this.changePlate.bind(this, index)}>
                        {plates.map(item=>(
                          <Option key={item.id} value={item.id} >{item.carparkName}</Option>
                        ))}
                      </Select>
                    </div>
                    <div className="plateItem mgl10">
                      <span style={{width:130, lineHeight:"30px"}}>开始结束时间:</span>
                      <RangePicker value={item.time} onChange={this.changeTime.bind(this, index)} />
                    </div>
                    <div className="plateItem mgl10" style={{flex: 1}}>
                      <Button onClick={this.handlenDelete.bind(this, index)} ><Icon type="delete" /></Button>
                    </div>
                  </div>
                ))}
                
              </div>
            </Form.Item>
            <Form.Item label="上传图片"  >
              {getFieldDecorator('attaIds', {
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
            <Form.Item label="备注">
              {getFieldDecorator('remark')(<TextArea />)}
            </Form.Item>
            
          </Form>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlates, addCarAttaList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    spinning:state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddCar) )