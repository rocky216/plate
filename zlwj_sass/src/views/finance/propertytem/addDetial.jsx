import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, InputNumber} from "antd";
import {addHeHousingEstate, getHeHousingEstate} from "@/actions/projectAction"

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

class AddItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      floorStart: '',
      floorEnd:"",
      areaStart: "",
      areaEnd: ""
    }
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      
      if(!err){
        const {templateType, baseInfo} = this.props
        const {floorStart, floorEnd, areaStart, areaEnd} = this.state
        if(templateType!="2" && values.areaConditionType!=="0" ){
          if(!areaStart || !areaEnd){
            this.props.utils.OpenNotification("error", "面积不能为空或为0！")
            return
          }
          if(areaStart>areaEnd){
            this.props.utils.OpenNotification("error", "开始楼层不能大于结束楼层！")
            return
          }
        }

        if(!floorStart || !floorEnd){
          this.props.utils.OpenNotification("error", "房屋楼层不能为空或为0！")
          return
        }
        if(floorStart>floorEnd){
            this.props.utils.OpenNotification("error", "开始楼层不能大于结束楼层！")
            return
        }
        
        if(values.areaConditionType!=="0"){
          _.assign(values, {
            areaStart,
            areaEnd
          })
        }
        let houseTypeStr = _.filter(baseInfo.sysDict.car_parking_space.type_id, o=>o.id==values.houseType)
        _.assign(values, {
          floorStart,
          floorEnd,
          houseTypeStr:houseTypeStr.length?houseTypeStr[0]["dictLabel"]:""
        })
        this.props.onSubmit(values)
      }
    })
  }

  handlenAreaCondition(val){
    this.props.form.setFieldsValue({
      areaConditionType: val,
    });
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {spinning, visible, onCancel, templateType, baseInfo} = this.props
    const {floorStart, floorEnd, areaStart, areaEnd} = this.state
    
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
          <Form.Item label="详情名称" hasFeedback>
            {getFieldDecorator('detailsName', {
              rules: [
                {
                  required: true,
                  message: '填写详情名称!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          {templateType=="2"?
          <Form.Item label="车位类型" hasFeedback>
            {getFieldDecorator('houseType', {
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
          </Form.Item>:null}
          {templateType=="2"?null:
            <>
              <Form.Item label="房屋类型条件" hasFeedback>
                {getFieldDecorator('houseType', {
                  rules: [
                    {
                      required: true,
                      message: '选择房屋类型!',
                    }
                  ],
                })(
                  <Select>
                    <Option value="0">电梯和楼梯房</Option>
                    <Option value="1">电梯房</Option>
                    <Option value="2">楼梯房</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="房屋面积条件" hasFeedback>
                {getFieldDecorator('areaConditionType', {
                  initialValue:"0",
                  rules: [
                    {
                      required: true,
                      message: '选择房屋面积条件!',
                    }
                  ],
                })(
                  <Select onChange={this.handlenAreaCondition.bind(this)}>
                    <Option value="0">无条件</Option>
                    <Option value="1">建筑面积</Option>
                    <Option value="2">室内面积</Option>
                    <Option value="3">公摊面积</Option>
                  </Select>
                )}
              </Form.Item>
              {getFieldValue("areaConditionType") !="0"?
                <Form.Item label="适用面积" hasFeedback>
                  <div>
                    <InputNumber value={areaStart} onChange={val=>this.setState({areaStart: val})} />
                    到<InputNumber value={areaEnd} onChange={val=>this.setState({areaEnd: val})}  />
                  </div>
                </Form.Item>:null}
            </>}
            
          
          <Form.Item label="楼层条件" hasFeedback>
            <div>
              <InputNumber value={floorStart} onChange={val=>this.setState({floorStart: val})} />
              到<InputNumber value={floorEnd} onChange={val=>this.setState({floorEnd: val})}  />
            </div>
          </Form.Item>
          <Form.Item label="收费类型" hasFeedback>
            {getFieldDecorator('feeType', {
              rules: [
                {
                  required: true,
                  message: '选择收费类型!',
                }
              ],
            })(
              <Select>
                <Option value="0">固定金额</Option>
                <Option value="1">建筑面积*金额</Option>
                {templateType=="2"?null:<Option value="2">室内面积*金额</Option>}
                {templateType=="2"?null:<Option value="3">公摊面积*金额</Option>}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="收费金额" hasFeedback>
            {getFieldDecorator('fee', {
              rules: [
                {
                  required: true,
                  message: '填写收费金额!',
                }
              ],
            })(<InputNumber style={{width: "100%"}}/>)}
          </Form.Item>
          <Form.Item label="时间单位" hasFeedback>
            {getFieldDecorator('feeTime', {
              rules: [
                {
                  required: true,
                  message: '选择时间单位!',
                }
              ],
            })(
              <Select>
                <Option value="0">一月</Option>
                <Option value="1">一季度</Option>
                <Option value="2">一年</Option>
              </Select>
            )}
          </Form.Item>
          {templateType=="2"?null:
          <Form.Item label="未装修减免%" hasFeedback>
            {getFieldDecorator('notFixPercentage', {
              initialValue: "0",
              rules: [
                {
                  required: true,
                  message: '填写未装修减免!',
                }
              ],
            })(<InputNumber min={0} style={{width: "100%"}}/>)}
          </Form.Item>}
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addHeHousingEstate, getHeHousingEstate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddItem))