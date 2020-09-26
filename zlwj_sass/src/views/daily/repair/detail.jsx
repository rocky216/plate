import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Table, Typography, Tag, Select, Upload} from "antd";
import {getDeilyRepair, detailDeilyRepair, detailDeilyRepairBranch, detailDeilyRepairDistribution, detailDeilyRepairFinished} from "@/actions/dailyAction"

const {TextArea} = Input
const {Text} = Typography
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

class DailyRepairDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      branchs: []
    }
  }
  

  componentDidMount(){
    this.props.actions.detailDeilyRepair({id: this.props.detail.id}, res=>{
      this.setState({info: res})
    })
    this.props.actions.detailDeilyRepairBranch({}, res=>{
      this.setState({branchs: res})
    })
  }

  handlenDistribution(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      const {branchs, info} = this.state
      if(!err){
        this.props.actions.detailDeilyRepairDistribution({
          id:  this.props.detail.id,
          ...values,
          endUserName: _.filter(branchs, o=>o.id==values.endUserId)[0]["name"]
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getDeilyRepair({current: 1, type: "allocated"})
        })
      }
      
    })
    
  }

  handlenFinished(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      const {branchs, info} = this.state
      if(!err){
        this.props.actions.detailDeilyRepairFinished({
          id:  this.props.detail.id,
          endInfo: values.endInfo,
          imgUrls: this.props.utils.submitFiles(values.imgUrls),
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getDeilyRepair({current: 1, type: "processing"})
        })
      }
      
    })
    
  }


  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, commonFiles } = this.props
    const {info, branchs} = this.state
    console.log(branchs)
    return (
      <Modal
        title={info.repairName||null}
        destroyOnClose
        okText="确定"
        cancelText="取消"
        width={800}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel} 
        footer={false}
      >
        <div>
          <Tag>{info.repairTypeName}</Tag>
          <Tag>{info.submitTypeStr}</Tag>
          <Tag>{info.buildTime}</Tag>
        </div>
        <Text>{info.repairInfo || null}</Text>
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {info.submitEnclosures?info.submitEnclosures.map((item, index)=>(
            <img key={index} src={item} width={200} className="mgr10" />
          )):null}
        </div>
        {info.processingState=="0"?
        <Form className="mgt10">
          <Form.Item label="分配说明" >
            {getFieldDecorator('processingInfo', {
              rules: [
                {
                  required: true,
                  message: '分配说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="分配至" >
            {getFieldDecorator('endUserId', {
              rules: [
                {
                  required: true,
                  message: '分配人员!',
                }
              ],
            })(
              <Select>
                {branchs.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button icon="save" type="primary" onClick={this.handlenDistribution.bind(this)} >分配工单</Button>
          </Form.Item>
        </Form>:null}
        {info.processingState=="1"?
        <Form className="mgt10">
          <Form.Item label="描述" >
            <TextArea disabled value={info.processingInfo} />
          </Form.Item>
          <Form.Item label="受理人" >
            <Input disabled  value={info.endUserName} />
          </Form.Item>
          <Form.Item label="完结说明" >
            {getFieldDecorator('endInfo', {
              rules: [
                {
                  required: true,
                  message: '完结说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="上传图片">
            {getFieldDecorator('imgUrls', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
              rules: [
                {
                  required: true,
                  message: '上传图片!',
                }
              ],
            })(
              <Upload
                  action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                  name="file"
                  data={{fileType:"photo", fileSize: 1024*10}}
                >
                  <Button icon="upload"></Button>
              </Upload>
            )}
          </Form.Item>
          {info.isAcceptance=="1"?
          <Form.Item>
            <Button icon="save" type="primary" onClick={this.handlenFinished.bind(this)} >完结工单</Button>
          </Form.Item>: null}
        </Form>:null}
        {info.processingState=="2"?
          <Form className="mgt10">
            <Form.Item label="描述" >
              <TextArea disabled value={info.processingInfo} />
            </Form.Item>
            <Form.Item label="受理人" >
              <Input disabled  value={info.endUserName} />
            </Form.Item>
            <Form.Item label="完结说明" >
              <TextArea disabled value={info.endInfo} />
            </Form.Item>
            <Form.Item label="图片">
              <div style={{display: "flex", flexWrap: "wrap"}}>
                {info.endEnclosures?info.endEnclosures.map(item=>(
                  <img src={item} width={200} height={200} className="mgr10" />
                )):null}
              </div>
            </Form.Item>
          </Form>:null}
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeilyRepair, detailDeilyRepair, detailDeilyRepairBranch, 
      detailDeilyRepairDistribution, detailDeilyRepairFinished}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(DailyRepairDetail))