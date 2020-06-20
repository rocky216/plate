import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Icon, Button, Form, Input, Select, Radio, Modal, Tag, Table, Upload, InputNumber} from "antd";
import JCard from "@/components/JCard"
import SelectHouse from "@/components/SelectHouse"
import SelectShopL from "@/components/SelectShopL" 
import SelectOperative from "@/components/SelectOperative" 
import {getBaseOtherExpendOrder, addBaseOtherExpendOrder, getBaseOtherExpendOrderDetail} from "@/actions/otherAction"
import {otherDetailColumns} from "../colmuns"

const {Option} = Select
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


class AddOtherfee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addHouseVisible: false,
      hosue: "",
      addShopVisible: false,
      shop: "",
      addOperativeVisible: false,
      operative: "",
      accountList: [],
      dataDetail: [],
      initdata: {},
      previewImage: ""
    }
  }

  componentDidMount(){
    this.props.actions.getBaseOtherExpendOrderDetail({
      orderType: this.props.detail.type,
      linkId: this.props.detail.id,
    }, res=>{
      this.setState({initdata: res})
    })
  }

  handlenPushDetail(){
    this.state.dataDetail.push({
      feeName: "",
      feeMoney: 0,
      remark: "",
    })
    this.setState({dataDetail: this.state.dataDetail})
  }

  changeFeeName(index, attr, value){ 
    const {dataDetail} = this.state 
    
    if(attr=="feeName"){
      dataDetail[index][attr] = value.target.value
    }
    if(attr=="feeMoney"){
      dataDetail[index][attr] = value
    }
    if(attr=="remark"){
      dataDetail[index][attr] = value.target.value
    }
    this.setState({dataDetail})
  }

  deleteDetail(index){
    const {dataDetail} = this.state
    let aa = dataDetail.splice(index,1)
    console.log(index, aa)
    this.setState({dataDetail})
  }

  handlenSelectShop(item){
    
    if(!item.owners){
      this.props.utils.OpenNotification("error","该房间无业主，不能被选中，请完善信息！")
      return
    }
    console.log(item)
    this.setState({shop: item, addShopVisible: false})
  }

  handlenSelectOperative(item){
    console.log(item)
    
    this.setState({operative: item, addOperativeVisible: false})
  }
  
  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        const {hosue,shop,operative, dataDetail} = this.state
        const {detail} = this.props
        
        
        this.props.actions.addBaseOtherExpendOrder({
          ...values,
          linkType: this.state.initdata.linkType,
          linkId: this.props.detail.id,
          attaUrls: this.props.utils.submitFiles(values.attaUrls),
          orderDescJSON: JSON.stringify(dataDetail)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getBaseOtherExpendOrder({
            linkTypeId: detail.linkTypeId,
            linkId: detail.id,
            orderType: detail.type,
          })
        })
      }
    });
  }

  handlePreview(file ){
    this.setState({previewImage: file.url})
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, utils, visible, onCancel, detail, commonFiles} = this.props
    const {addHouseVisible, hosue,shop,operative, addShopVisible, addOperativeVisible, initdata, dataDetail, previewImage } = this.state
    console.log(initdata, "hosue")

    return (
      <div>
        <Modal
          visible={previewImage?true:false}
          onCancel={()=>this.setState({previewImage: ""})}
          footer={false}
        >
          <img  style={{ width: '100%' }} src={previewImage} />
        </Modal>
      
        <Modal
        destroyOnClose
        width={800}
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="订单标题" hasFeedback>
            {getFieldDecorator('orderTitle', {
              rules: [
                {
                  required: true,
                  message: '填写项目名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="资金账户" hasFeedback>
            {getFieldDecorator('accountId', {
              rules: [
                {
                  required: true,
                  message: '选择资金账户!',
                }
              ],
            })(
              <Select style={{width: "100%"}}>
                {initdata.accountList?initdata.accountList.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>

        {detail.type=="tempCoOperativeMenu"?null:
          <Form.Item label="编号" >
            {getFieldDecorator('linkCode', {
              initialValue: initdata.linkCode
            })(
              <Input disabled={true} />
            )}
          </Form.Item>}
          <Form.Item label="姓名" >
            {getFieldDecorator('linkName', {
              initialValue: initdata.linkName
            })(
              <Input disabled={detail.type=="tempCoOperativeMenu"?false:true} />
            )}
          </Form.Item>
          <Form.Item label="电话" >
            {getFieldDecorator('linkPhone', {
              initialValue: initdata.linkPhone
            })(
              <InputNumber disabled={detail.type=="tempCoOperativeMenu"?false:true} style={{width: "100%"}} />
            )}
          </Form.Item>
          <Form.Item label="附件" >
            {getFieldDecorator('attaUrls', {
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
              rules: [
                {
                  required: true,
                  message: '附件!', 
                }
              ],
            })(
              <Upload 
                onPreview={this.handlePreview.bind(this)}
                listType="picture-card"
                accept=".jpg,.png,.jpeg"
                action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`}
                name="file"
                data={{fileType:"photo", fileSize: 1024*10}}>
                <Icon type="upload" style={{fontSize:20}} />
              </Upload>
            )}
          </Form.Item>
          
          <Form.Item label="备注" >
            {getFieldDecorator('remark')(
              <TextArea  />
            )}
          </Form.Item>

          <Form.Item label="订单详情" >
            <div className="flexend mgb10"><Button onClick={this.handlenPushDetail.bind(this)} type="primary" ghost><Icon type="plus" />新增缴费项</Button></div>
            <Table size="small" columns={otherDetailColumns(this)} dataSource={utils.addIndex(dataDetail)} />
          </Form.Item>
        </Form>
      </Modal>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBaseOtherExpendOrder, addBaseOtherExpendOrder, getBaseOtherExpendOrderDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddOtherfee) )