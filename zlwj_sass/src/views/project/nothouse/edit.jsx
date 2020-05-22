import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, InputNumber, Select, DatePicker} from "antd";
import {editNothouse, getHeShops, otherAssetList} from "@/actions/projectAction"
import moment from "moment"
import HeList from "@/components/HeList"
import SearchHouse from "@/components/SearchHouse"

const {Option} = Select
const {RangePicker } = DatePicker

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

class EditNothouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      otherasset:[]
    }
  }
  
  async componentDidMount(){
    let otherasset = await this.props.actions.otherAssetList({})
    otherasset?this.setState({otherasset}):null
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(this.props.params);
      
      if(!err){
        const {time, ownersId, deliversTime} = values
        const newValues = _.omit(values,"time")
        this.props.actions.editNothouse({
          ...newValues,
          id: this.props.detail.id,
          deliversTime: moment(deliversTime).format("YYYY-MM-DD"),
          payFristTime: time && time.length==2?moment(time[0]).format("YYYY-MM-DD"):"",
          payLastTime: time && time.length==2?moment(time[1]).format("YYYY-MM-DD"):"",
          ownersId: ownersId?ownersId.ownersId:""
        }, res=>{
          this.props.actions.getHeShops(this.props.params)
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    const {otherasset} = this.state
    console.log(detail)
    return (
      <Modal
        destroyOnClose
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
        <Form.Item label="非住宅房屋名称" hasFeedback>
            {getFieldDecorator('shopsName', {
              initialValue: detail.shopsName,
              rules: [
                {
                  required: true,
                  message: '非住宅房屋名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="非住宅编号" hasFeedback>
            {getFieldDecorator('shopsCode', {
              initialValue: detail.shopsCode,
              rules: [
                {
                  required: true,
                  message: '非住宅编号!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="小区" hasFeedback>
            {getFieldDecorator('heId', {
              initialValue: detail.heId,
              rules: [
                {
                  required: true,
                  message: '小区!',
                }
              ],
            })(
              <HeList />
            )}
          </Form.Item>
          <Form.Item label="楼层" hasFeedback>
            {getFieldDecorator('floorNum', {
              initialValue: detail.floorNum,
              rules: [
                {
                  required: true,
                  message: '楼层!',
                }
              ],
            })(
              <InputNumber style={{width: "100%"}} />
            )}
          </Form.Item>

          <Form.Item label="非住宅类型" hasFeedback>
            {getFieldDecorator('otherType', {
              initialValue: detail.otherType,
              rules: [
                {
                  required: true,
                  message: '填写建筑面积!',
                }
              ],
            })(
              <Select>
                {otherasset.map(item=>(
                  <Option value={item.id} key={item.id}>{item.dictLabel}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="建筑面积" hasFeedback>
            {getFieldDecorator('houseArea', {
              initialValue: detail.houseArea,
              rules: [
                {
                  required: true,
                  message: '建筑面积!',
                }
              ],
            })(<InputNumber style={{width: "100%"}}/>)}
          </Form.Item>
          <Form.Item label="交房时间" hasFeedback>
            {getFieldDecorator('deliversTime', {
              initialValue: detail.deliversTime?moment(detail.deliversTime):null,
              rules: [
                {
                  required: true,
                  message: '选择交房时间!',
                }
              ],
            })(<DatePicker/>)}
          </Form.Item>
          <Form.Item label="缴费时间" hasFeedback>
            {getFieldDecorator('time', {
              initialValue: detail.heShopsInfo &&  detail.heShopsInfo.payFristTime && detail.heShopsInfo.payLastTime?
                [moment(detail.heShopsInfo.payFristTime),moment(detail.heShopsInfo.payLastTime)]:null,
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item label="选择业主" >
            {getFieldDecorator('ownersId', {
              initialValue: detail.ownersId?{ownersName:detail.ownerName,ownersPhone: detail.ownerPhone, ownersId:detail.ownersId}:"",
            })(<SearchHouse />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editNothouse, getHeShops, otherAssetList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(EditNothouse))