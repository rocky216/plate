import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Icon, Button, Form, Input, Select, Radio, Modal, Tag, Table} from "antd";
import JCard from "@/components/JCard"
import SelectHouse from "@/components/SelectHouse"
import SelectShopL from "@/components/SelectShopL" 
import SelectOperative from "@/components/SelectOperative" 
import {getAccount, addOtherExpend} from "@/actions/otherAction"
import {otherDetailColumns} from "../colmuns"

const {Option} = Select

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
      dataDetail: []
    }
  }

  componentDidMount(){
    this.props.actions.getAccount({}, res=>{
      this.setState({accountList: res})
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
    console.log(item, "asasasas")
    if(!item.ownerId){
      this.props.utils.OpenNotification("error","该房间无业主，不能被选中，请完善信息！")
      return
    }
    this.setState({hosue: item, addHouseVisible: false})
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
        console.log('Received values of form: ', values);
        let objectId="", ownersId=""
        if(values.orderType=="0"){
          objectId = hosue.id
          ownersId = hosue.ownerId
        }else if(values.orderType=="1"){
          objectId = shop.id
          ownersId = shop.owners.id
        }else if(values.orderType=="3"){
          objectId = operative.id
          ownersId = ""
        }
        values
        this.props.actions.addOtherExpend({
          ...values,
          objectId,
          ownersId,
          orderDescJSON: JSON.stringify(dataDetail)
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/workcenter/expend")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, utils} = this.props
    const {addHouseVisible, hosue,shop,operative, addShopVisible, addOperativeVisible, accountList, dataDetail} = this.state
    console.log(hosue, "hosue")

    return (
      <JCard spinning={spinning}>
        <Card title="新增其他缴费订单" extra={(
          <div>
            <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
            <Link to="/workcenter/expend" className="mgl10"><Button><Icon type="rollback" />返回</Button></Link>
          </div>
        )}>
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
                  {accountList.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="订单类型" >
              {getFieldDecorator('orderType', {
                initialValue: "0",
                rules: [
                  {
                    required: true,
                    message: '选择订单类型!',
                  }
                ],
              })(
                <Radio.Group>
                  <Radio.Button value="0">住宅其他费用</Radio.Button>
                  <Radio.Button value="1">商铺其他费用</Radio.Button>
                  <Radio.Button value="3">合作商</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            {getFieldValue("orderType")=="0"?
              <Form.Item label="选择业主">
                <div style={{display: "flex"}}>
                  <div className="selectRoom">
                    {hosue?<Tag>{hosue.showCodeAll}{hosue.owners?hosue.owners.name:""}</Tag>:null}
                  </div>
                  <i onClick={()=>this.setState({addHouseVisible: true})} className="icon iconfont icon-fangjian"/>
                </div>
              </Form.Item>:null}
            {getFieldValue("orderType")=="1"?
              <Form.Item label="选择商铺">
                <div style={{display: "flex"}}>
                  <div className="selectRoom">
                    {shop?<Tag>{shop.shopsName} {shop.owners?shop.owners.name:""}</Tag>:null}
                  </div>
                  <i onClick={()=>this.setState({addShopVisible: true})} className="icon iconfont icon-fangjian"/>
                </div>
              </Form.Item>:null}
              {getFieldValue("orderType")=="3"?
              <Form.Item label="选择合作商">
                <div style={{display: "flex"}}>
                  <div className="selectRoom">
                    {operative?<Tag>{operative.name}</Tag>:null}
                  </div>
                  <i onClick={()=>this.setState({addOperativeVisible: true})} className="icon iconfont icon-fangjian"/>
                </div>
              </Form.Item>:null}

              <Form.Item label="订单详情" >
                <div className="flexend mgb10"><Button onClick={this.handlenPushDetail.bind(this)} type="primary" ghost><Icon type="plus" />新增缴费项</Button></div>
                <Table size="small" columns={otherDetailColumns(this)} dataSource={utils.addIndex(dataDetail)} />
              </Form.Item>
          </Form>
          <Modal
            onText="确定"
            cancelText="取消"
            onCancel={()=>this.setState({addHouseVisible: false})}
            footer={null}
            visible={addHouseVisible}>
            <SelectHouse NoInput onSelect={this.handlenSelectHouse.bind(this)} />
          </Modal>
          <Modal
            onText="确定"
            cancelText="取消"
            onCancel={()=>this.setState({addShopVisible: false})}
            footer={null}
            visible={addShopVisible}>
            <SelectShopL onSelect={this.handlenSelectShop.bind(this)} />
          </Modal>
          <Modal
            onText="确定"
            cancelText="取消"
            onCancel={()=>this.setState({addOperativeVisible: false})}
            footer={null}
            visible={addOperativeVisible}>
            <SelectOperative onSelect={this.handlenSelectOperative.bind(this)} />
          </Modal>

        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAccount, addOtherExpend}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddOtherfee) )