import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Icon, Button, Form, Input, Select, Radio, Modal, Tag, Table, InputNumber} from "antd";
import JCard from "@/components/JCard"
import SelectHouse from "@/components/SelectHouse"
import SelectShopL from "@/components/SelectShopL" 
import SelectOperative from "@/components/SelectOperative" 
import {getBaseOtherCostsOrder, addBaseOtherCostsOrder, getOtherCostsOrderLists} from "@/actions/otherAction"
import {otherDetailColumns} from "../colmuns"

const {Option} = Select
const {TextArea } = Input

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
      dataDetail: [],
      initdata: {}
    }
  }

  componentDidMount(){
    this.props.actions.getBaseOtherCostsOrder({
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

  handlenSelectHouse(item){
    if(!item.ownerId){
      this.props.utils.OpenNotification("error","该房间无业主，不能被选中，请完善信息！")
      return
    }
    this.setState({hosue: item, addHouseVisible: false})
  }

  handlenSelectShop(item){
    if(!item.owners){
      this.props.utils.OpenNotification("error","该商铺无业主，不能被选中，请完善信息！")
      return
    }
    this.setState({shop: item, addShopVisible: false})
  }

  handlenSelectOperative(item){
    console.log(item)
    
    this.setState({operative: item, addOperativeVisible: false})
  }
  
  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {detail} = this.props
        const {hosue,shop,operative, dataDetail} = this.state
        
        
        this.props.actions.addBaseOtherCostsOrder({
          ...values,
          linkId: detail.id,
          linkType: this.state.initdata.linkType,
          orderDescJSON: JSON.stringify(dataDetail)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.onCancel()
          this.props.actions.getOtherCostsOrderLists({
            linkTypeId: detail.linkTypeId,
            linkId: detail.id,
            orderType: detail.type,
          })
        })
      }
    });
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, utils, visible, onCancel, detail} = this.props
    const {addHouseVisible, hosue,shop,operative, addShopVisible, addOperativeVisible, initdata, dataDetail} = this.state
    

    return (
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
              <InputNumber style={{width: "100%"}} disabled={detail.type=="tempCoOperativeMenu"?false:true} />
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
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBaseOtherCostsOrder, addBaseOtherCostsOrder, getOtherCostsOrderLists}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddOtherfee) )