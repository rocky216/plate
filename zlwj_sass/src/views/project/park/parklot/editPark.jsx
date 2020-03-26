import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, InputNumber, Switch, DatePicker} from "antd";
import {editParkingSpace, getParkLot, getParkingSpace} from "@/actions/projectAction"
import SearchHouse from "@/components/SearchHouse"
import SearchPlate from "@/components/SearchPlate"
import moment from "moment"

const {Option} = Select
const {RangePicker} = DatePicker

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

class EditParkBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      areaCodeList: [],
      detail: ""
    }
  }

  componentDidMount(){
    this.setState({areaCodeList: this.generateBig_1()})
    this.setState({detail: _.filter(this.props.parklot, o=>o.id==this.props.id)[0]})
  }
  loadParkFloorArea(params){
    this.props.actions.getParkingSpace({
      carparkId: this.props.match.params.id,
      ...params
    })
  }
  generateBig_1(){
    var str = [];
    for(var i=65;i<91;i++){
        str.push({
          id: String.fromCharCode(i),
          name: String.fromCharCode(i)+"区"
        });
    }
    for(var i=1;i<10;i++){
      str.push({
        id: String(i),
        name: i+"区"
      })
    }
    return str;
  }

  getcarIds(arr){
    let newArr = []
    _.each(arr, item=>{
      newArr.push(item.id)
    })
    return newArr.join()
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      console.log(values)
      
      const {time, ownersId, carIdStr, deliversTime} = values
      let newValues = _.omit(values,"time")
      if(!err){
        this.props.actions.editParkingSpace({
          ...newValues,
          id: this.props.parkDetial.id,
          floorAreaId: this.props.id,
          payFristTime: time && time.length? moment(time[0]).format("YYYY-MM-DD"):"",
          payLastTime: time && time.length? moment(time[1]).format("YYYY-MM-DD"):"",
          ownersId: ownersId?ownersId.ownersId:"",
          carIdStr: carIdStr && carIdStr.length?this.getcarIds(carIdStr):"",
          deliversTime: deliversTime?moment(deliversTime).format("YYYY-MM-DD"):""
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.loadParkFloorArea({floorAreaId: this.props.id})
        })
      }
    })
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, visible, onCancel, baseInfo, parkDetial} = this.props
    const {areaCodeList, detail} = this.state
    
    return (
      <Modal
        destroyOnClose
        title="新增车位"
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handlenSubmit.bind(this)}
      >
        <Form {...formItemLayout} >
          <Form.Item label="车位名称" hasFeedback>
            {getFieldDecorator('parkingSpaceName', {
              initialValue: parkDetial.parkingSpaceName,
            })(<Input />)}
          </Form.Item>
          <Form.Item label="车位编号" hasFeedback>
            {getFieldDecorator('parkingSpaceCode', {
              initialValue: parkDetial.parkingSpaceCode,
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label="交付时间" hasFeedback>
            {getFieldDecorator('deliversTime', {
              initialValue: parkDetial.deliversTime?moment(parkDetial.deliversTime):null,
            })(<DatePicker/>)}
          </Form.Item>
          <Form.Item label="物业费已缴时间" hasFeedback>
            {getFieldDecorator('time', {
              initialValue: parkDetial.payFristTime?[moment(parkDetial.payFristTime),
                          moment(parkDetial.payLastTime)]:null,
            })(
              <RangePicker style={{width: "100%"}} />
            )}
          </Form.Item>
          <Form.Item label="车位类型" hasFeedback>
            {getFieldDecorator('typeId', {
              initialValue: parkDetial.typeId,
              rules: [
                {
                  required: true,
                  message: '车位类型!',
                }
              ],
            })(
              <Select>
                {baseInfo?baseInfo.sysDict.car_parking_space.type_id.map(item=>(
                  <Option key={item.id} value={item.id}>{item.dictLabel}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="建筑面积" >
            {getFieldDecorator('buildingArea', {
              initialValue: parkDetial.buildingArea,
            })(
              <InputNumber style={{width: "100%"}} />
            )}
          </Form.Item>
          <Form.Item label="楼层展示名" >
            {getFieldDecorator('floorAreaName',{
              initialValue: detail.floorAreaName,
            })(
              <Input disabled />
            )}
          </Form.Item>
          <Form.Item label="选择业主" >
            {getFieldDecorator('ownersId', {
              initialValue: parkDetial.ownerName?{ownersPhone: parkDetial.ownerPhone, 
                ownersName: parkDetial.ownerName, ownersId: parkDetial.ownersId}:""
            })(
              <SearchHouse detail={detail} />
            )}
          </Form.Item>
          <Form.Item label="关联车牌" >
            {getFieldDecorator('carIdStr',{
              initialValue: parkDetial.carParkingList?parkDetial.carParkingList:[],
            })(
              <SearchPlate detail={detail}  />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editParkingSpace, getParkLot, getParkingSpace}, dispatch)
  }
}

function mapStateProps(state){
  return {
    parklot: state.project.parklot,
    baseInfo: state.app.baseInfo,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(EditParkBox)) )