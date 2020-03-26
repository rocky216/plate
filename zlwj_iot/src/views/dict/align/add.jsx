import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, Cascader} from "antd";
import {getQueues, getDeviceDictTree, addQueues} from "@/actions/dictAction"
import {getCompany} from "@/actions/companyAction"

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

class AddAlign extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deviceTree: []
    }
  }

  componentDidMount(){
    this.props.actions.getDeviceDictTree({}, res=>{
      this.handlenData(res)
    })
    this.props.actions.getCompany({})
  }

  handlenData(res){
    let arr = _.cloneDeep(res)
    function getData(arr){
      _.each(arr, item=>{
        if(_.findIndex(res, o=>o.id==item.parentId)>-1){
          
          item.children=null
        }
        if(item.children && item.children.length){
          getData(item.children)
        }
      })
    }
    getData(arr)
    this.setState({deviceTree: arr})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {deviceTypeId} =  values
        this.props.actions.addQueues({
          ...values,
          deviceTypeId: deviceTypeId && deviceTypeId.length?deviceTypeId[0]:"",
          deviceBrandId: deviceTypeId && deviceTypeId.length?deviceTypeId[1]:"",
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getQueues({})
        })
      }
    })
  }
  

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, dictdevice, company} = this.props
    const {deviceTree} = this.state
    
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
          <Form.Item label="公司" hasFeedback>
            {getFieldDecorator('companyId', {
              rules: [
                {
                  required: true,
                  message: '选择公司!',
                }
              ],
            })(
              <Select>
                {company?company.map(item=>(
                  <Option key={item.id} value={item.id}>{item.companyName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="设备类型" hasFeedback>
            {getFieldDecorator('deviceTypeId', {
              rules: [
                {
                  required: true,
                  message: '选择设备类型!',
                }
              ],
            })(
              <Cascader fieldNames={{label: "name", value:"id"}} options={deviceTree}  />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getQueues, getDeviceDictTree, getCompany, addQueues}, dispatch)
  }
}

function mapStateProps(state){
  return {
    company: state.company.company,
    dictdevice: state.dict.dictdevice,
    utils: state.app.utils,
    spinning: state.dict.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddAlign))