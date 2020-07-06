import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment"
import {propertyfeeUpdateHouse, loadAssetsInfo, propertyfeeUpdateAssets, propertyfeeUpdateOther} from "@/actions/otherAction"

const {Option } = Select 
const {TextArea } = Input;

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

class Updatehouse extends React.Component {

  getRequestMethod(){
    const {assetsType} = this.props.detail
    switch(assetsType){
      case "house":
        return "propertyfeeUpdateHouse"
      case "parkingSpace":
        return "propertyfeeUpdateAssets"
      default :
        return "propertyfeeUpdateOther"
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions[this.getRequestMethod()]({
          ...values,
          id: this.props.detail.assestId,
          deliversTime: values.deliversTime?moment(values.deliversTime).format("YYYY-MM-DD"):""
        }, res=>{
          this.props.onCancel();
          this.props.actions.loadAssetsInfo({
            assetsId: this.props.detail.assestId, 
            assetsType:this.props.detail.assetsType});
          this.props.utils.OpenNotification("success")
        })
      }
      
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, visible, onCancel, detail, baseInfo} = this.props;
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
        <Form {...formItemLayout}>
        {detail.assetsType==="parkingSpace"?
          <Form.Item label="编号">
            {getFieldDecorator("assetsCode", {
              initialValue: detail.assetsCode,
              rules: [{ required: true, message: '编号' }],
            })(
              <Input disabled/>
            )}
          </Form.Item>:
          <Form.Item label="编号">
            {getFieldDecorator("assetsName", {
              initialValue: detail.assetsName,
              rules: [{ required: true, message: '编号' }],
            })(
              <Input disabled/>
            )}
          </Form.Item>
          }
          <Form.Item label="建筑面积">
            {getFieldDecorator("houseArea", {
              initialValue: detail.houseArea,
              rules: [{ required: true, message: '建筑面积' }],
            })(
              <Input/>
            )}
          </Form.Item>
          {detail.assetsType==="parkingSpace"?
            <Form.Item label="停车位类型">
              {getFieldDecorator("parkingTypeId", {
                initialValue: detail.parkingTypeId,
                rules: [{ required: true, message: '停车位类型' }],
              })(
                <Select>
                  {baseInfo?baseInfo.sysDict.car_parking_space.type_id.map(item=>(
                    <Option key={item.id} value={item.id}>{item.dictLabel}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            :
            <>
              <Form.Item label="室内面积">
                {getFieldDecorator("indoorArea", {
                  initialValue: detail.indoorArea,
                  rules: [{ required: true, message: '室内面积' }],
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="公摊面积">
                {getFieldDecorator("poolArea", {
                  initialValue: detail.poolArea,
                  rules: [{ required: true, message: '公摊面积' }],
                })(
                  <Input/>
                )}
              </Form.Item>
            </>}
          <Form.Item label="交房时间">
            {getFieldDecorator("deliversTime",{
              initialValue: detail.deliversTime?moment(detail.deliversTime):null,
              rules: [{ required: true, message: '交房时间' }],
            })(
              <DatePicker disabled={detail.payFristTime && detail.payLastTime?true:false} style={{width: "100%"}}/>
            )}
          </Form.Item>
          <Form.Item label="已缴物业费区间">
            {getFieldDecorator("payFristTime", {
              initialValue: detail.payFristTime && detail.payLastTime?`${detail.payFristTime.substring(0,10)}到${detail.payLastTime.substring(0,10)}`:"暂无"
            })(
              <Input disabled/>
            )}
          </Form.Item>
          <Form.Item label="跟新说明">
            {getFieldDecorator("remark", {
              rules: [{ required: true, message: '跟新说明' }],
            })(
              <TextArea />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({propertyfeeUpdateHouse, loadAssetsInfo, propertyfeeUpdateAssets, propertyfeeUpdateOther}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Updatehouse) )