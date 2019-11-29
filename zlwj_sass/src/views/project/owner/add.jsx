import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Input, InputNumber, Button, Icon, Modal, Tag, Select} from "antd";
import {addOwner} from "@/actions/projectAction"
import SelectRoom from "@/components/SelectRoom"
import "./index.less"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

class AddOwner extends React.Component {
  constructor(props){
    super(props)
    this.state={
      addVisible: false,
      selectRoom: []
    }
  }

  handlenOnSelect(item){
    const {selectRoom} = this.state
    let index = _.findIndex(selectRoom, o=>item.showCodeAll == o.showCodeAll)
    if(index>-1) {
      this.props.utils.OpenNotification("error", "该房间已存在！")
      return
    }
    console.log(item)
    selectRoom.push(item)
    this.setState({selectRoom: selectRoom, addVisible: false})
  }

  handlenClose(item){
    const {selectRoom} = this.state
    console.log(item)
    let arr = _.filter(selectRoom, o=>o.id!=item.id)
    this.setState({selectRoom: arr})
  }

  handlenHouseInfo(arr){
    let newArr = []
    _.each(arr, item=>{
      newArr.push( `${item.heId}-${item.buildingId}-${item.unitId}-${item.id}-${item.ownerType}` )
    })
    return newArr
  }

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let houseInfo = this.handlenHouseInfo(this.state.selectRoom)
        if(houseInfo.length==0){
          this.props.utils.OpenNotification("error", "房间不能为空")
          return
        }
        this.props.actions.addOwner({
          ...values,
          houseInfo: houseInfo.join()
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/project/owner")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {addVisible, selectRoom} = this.state
    
    return (
      <Card size="small" title="新增业主" extra={<Button><Link to="/project/owner"><Icon type="rollback" />返回</Link></Button>} >
        <Modal 
          onText="确定"
          cancelText="取消"
          onCancel={()=>this.setState({addVisible: false})}
          footer={null}
          visible={addVisible}>
          <SelectRoom onSelect={this.handlenOnSelect.bind(this)} />
        </Modal>
        
        <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)} >
          <Form.Item label="业主姓名" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '业主姓名!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="手机号" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '手机号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="房间号" hasFeedback>
            {getFieldDecorator('houseShowCode')(
              <div style={{display: "flex"}}>
                <div className="selectRoom">
                  {selectRoom.map(item=>(
                    <Tag closable  key={item.id} onClose={this.handlenClose.bind(this, item)}>{item.showCodeAll}：
                      <span style={{color: "#f74c4c"}}>{item.ownerType=="0"?"业主":item.ownerType=="1"?"家庭成员":"租客"}</span>
                    </Tag>
                  ))}
                </div>
                <i onClick={()=>this.setState({addVisible: true})} className="icon iconfont icon-fangjian"/>
              </div>
            )}
          </Form.Item>
          <Form.Item label="邮箱" hasFeedback>
            {getFieldDecorator('email')(<Input/>)}
          </Form.Item>
          <Form.Item label="性别" hasFeedback>
            {getFieldDecorator('sex',{
              initialValue: "0"
            })(
              <Select>
                <Option value="0">无</Option>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit"><Icon type="save" />提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({addOwner}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddOwner) )