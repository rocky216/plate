import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Input, Table, Button, Icon, Select,} from "antd";
import {editOwners, getOwners} from "@/actions/projectAction"
import "./index.less"
import JCard from "@/components/JCard"
import Relation from "./relation"
import {relationColumns} from "../colmuns"
import EndLink from "./endlink"


const {Option} = Select
const {TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
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

class EditOwner extends React.Component {
  constructor(props){
    super(props)
    this.state={
      endVisible: false,
      endDetail: "",
      visible: false,
      type:"",
      types: [{title: "住宅", key: "house"}, {title: "非住宅", key: "other"}, {title: "停车位", key: "carpark"}]
    }
  }

  componentDidMount(){
    this.props.actions.getOwners({id: this.props.match.params.id})
  }

  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.editOwners({
          id: this.props.match.params.id,
          ...values,
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/project/owner")
        })
      }
    });
  }

  getCol(){
    let _this = this;
    return relationColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            {item.isPast=="0"?<Button type="link" 
              onClick={()=>_this.setState({endVisible:true, endDetail: item})}>结束关联</Button>:<Button disabled type="link" >无操作</Button>}
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, detail} = this.props
    const { types, visible, type, endVisible, endDetail} = this.state
    

    return (
      <JCard spinning={spinning}>
        {visible?<Relation visible={visible} type={type} onCancel={()=>this.setState({visible: false})} />:null}
        {endVisible? <EndLink visible={endVisible} detail={endDetail} onCancel={()=>this.setState({endVisible: false, endDetail: ""})} />:null}
        <Card title="新增业主" extra={
          <div>
            <Button type="primary"  onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />提交</Button>
            <Button className="mgl10"><Link to="/project/owner"><Icon type="rollback" />返回</Link></Button>
          </div>
        } >
          
        
        <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)} >
          <Form.Item label="业主姓名" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: detail.name,
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
              initialValue: detail.phone,
              rules: [
                {
                  required: true,
                  message: '手机号!',
                }
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="身份证" hasFeedback>
            {getFieldDecorator('idCard',{
              initialValue: detail.idCard,
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="微信" hasFeedback>
            {getFieldDecorator('weixin', {
              initialValue: detail.weixin,
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="邮箱" hasFeedback>
            {getFieldDecorator('email', {
              initialValue: detail.email,
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="性别" hasFeedback>
            {getFieldDecorator('sex',{
              initialValue: detail.sex?detail.sex.toString():""
            })(
              <Select>
                <Option value="0">无</Option>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="备注" hasFeedback>
            {getFieldDecorator('remark',{
              initialValue: detail.remark
            })(<TextArea/>)}
          </Form.Item>
          
        </Form>
      </Card>
        <Card title="添加关联信息" extra={(
          <div>
            {types.map(item=><Button className="mgl10" 
              onClick={()=>this.setState({type: item.key, visible: true})}
              key={item.key} type="primary" ghost>
              <Icon type="plus" />{item.title}</Button>)}
          </div>
        )} >
          <Table columns={this.getCol()} dataSource={detail?utils.addIndex(detail.assetsList):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editOwners, getOwners}, dispatch)
  }
}

function mapStateProps(state){
  return {
    detail: state.project.ownerdetail || {},
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditOwner) )