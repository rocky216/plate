import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, DatePicker, Select, Button} from "antd";
import moment from "moment"
import {checkUpdateOwner, loadAssetsInfo, goUpdateOwner} from "@/actions/otherAction"

const {TextArea } = Input;
const {Option} = Select;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

class Updateowner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ""
    }
  }
  

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const { type, assestId, owners} = this.props.detail
        this.props.actions.checkUpdateOwner({
          ...values,
          assetsId: assestId,
          assetsType: type,
          id: owners?owners.id:""
        }, res=>{
          
          this.setState({data: res})
        })
      }
      
    })
  }

  handleUpdateOwner(item){
    const { type, assestId, owners} = this.props.detail;
    this.props.form.validateFieldsAndScroll((err, values)=>{ 
      this.props.actions.goUpdateOwner({
        ...values,
        assetsType: type,
        assetsId: assestId,
        btnType: item.btnType,
        id: owners?owners.id:""
      }, async ()=>{
        await this.setState({data: ""})
        this.props.onCancel();
        this.props.utils.OpenNotification("success")
        this.props.actions.loadAssetsInfo({
            assetsId: assestId, 
            assetsType:type});
      })
    })
    
  }
  

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, visible, onCancel, detail } = this.props;
    const {data } = this.state

    console.log(detail)
    return (
      <div>
        <Modal 
          visible={data!==""?true:false}
          onCancel={()=>this.setState({data: ""})}
          footer={data?data.btn.map((item, index)=>(
          <Button type="primary" ghost key={index} onClick={this.handleUpdateOwner.bind(this, item)} >{item.btnName}</Button>
          )):null}
        >
          {data?data.info.map((item, index)=>(
            <p key={index}>{item}</p>
          )):null}
        </Modal>
      
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout}>
          <Form.Item label="姓名"> 
            {getFieldDecorator("name", {
              initialValue: detail.owners?detail.owners.name:"",
              rules: [{ required: true, message: '姓名' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator("phone", {
              initialValue: detail.owners?detail.owners.phone:"",
              rules: [{ required: true, message: '电话' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator("sex", {
              initialValue: detail.owners?detail.owners.sex:"",
            })(
              <Select>
                <Option value={0}>其他</Option>
                <Option value={1}>男</Option>
                <Option value={2}>女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="身份证号码">
            {getFieldDecorator("idCard", {
              initialValue: detail.owners?detail.owners.idCard:"",
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="微信">
            {getFieldDecorator("weixin", {
              initialValue: detail.owners?detail.owners.weixin:"",
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="qq">
            {getFieldDecorator("qq", {
              initialValue: detail.owners?detail.owners.qq:"",
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="电子邮箱">
            {getFieldDecorator("email", {
              initialValue: detail.owners?detail.owners.email:"",
            })(
              <Input/>
            )}
          </Form.Item>
        </Form>
      </Modal>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({checkUpdateOwner, loadAssetsInfo, goUpdateOwner}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Updateowner) )