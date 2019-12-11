import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Form, Input, Select, Switch, Table, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {chargeColmuns} from "../colmuns"
import AddDetail from "./addDetial"
import {getHeHousingEstate} from "@/actions/projectAction"

const {Option} = Select
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};


class AddPropertyTem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      detailArr: [{
        areaConditionType: "0",
        detailsName: "金庐名居收费模板",
        fee: 1,
        feeTime: "1",
        feeType: "1",
        houseType: "1",
        floorStart: 1,
        floorEnd:6,
        notFixPercentage: "0"
      }]
    }
  }

  componentDidMount(){
    this.props.actions.getHeHousingEstate({pageSize: 1000})
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      _.assign(values, 
        {detailArr: this.state.detailArr, 
         status: values.status?"1":"0"})
      console.log(values)
    })
  }

  onSubmit(values){
    this.state.detailArr.push(values)
    this.setState({detailArr: this.state.detailArr, addVisible: false})
  }
  handlenDelete(){
    
  }
  getCol(){
    let _this = this
    return chargeColmuns.concat([{
      title: "操作",
      render(item){
        return <Popconfirm
          placement="topRight" 
          title="是否删除？"
          okText="是"
          cancelText="否"
          onConfirm={_this.handlenDelete.bind(_this, item)}>
            <Button type="link">删除</Button>
          </Popconfirm>
         
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, projectitem} = this.props
    const {addVisible, detailArr} = this.state
    console.log(detailArr, "detailArr")
    return (
      <JCard spinning={spinning}>
        <Card title="添加物业费模板" extra={
          <div>
            <Button type="primary" className="mgr10" onClick={this.handlenSubmit.bind(this)} ><Icon type="save"/>保存</Button>
            <Link to="/finance/propertytem"><Button><Icon type="rollback" />返回</Button></Link>
          </div>} >
          <AddDetail visible={addVisible} onCancel={()=>this.setState({addVisible: false})} 
                    onSubmit={this.onSubmit.bind(this)} />
          <Form {...formItemLayout}  >
            <Form.Item label="模板名称" hasFeedback>
              {getFieldDecorator('themeName', {
                rules: [
                  {
                    required: true,
                    message: '填写主题名称!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="所属项目" hasFeedback>
              {getFieldDecorator('heId', {
                rules: [
                  {
                    required: true,
                    message: '填写主题名称!',
                  }
                ],
              })(
                <Select>
                  {projectitem && projectitem.list?projectitem.list.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="状态" >
              {getFieldDecorator('status', {
                initialValue: true,
                valuePropName: 'checked'
              })(
                <Switch/>
              )}
            </Form.Item>
            <Form.Item label="收费详情" >
              <div className="flexend mgb10">
                <Button ghost type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus"/>添加详情</Button>
              </div>
              <Table size="small" columns={this.getCol()} dataSource={utils.addIndex(detailArr)} pagination={false}/>
            </Form.Item>
            <Form.Item label="备注" >
              {getFieldDecorator('remark', {
              })(
                <TextArea  autoSize={{minRows: 3}}/>
              )}
            </Form.Item>
          </Form>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHeHousingEstate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    spinning: state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddPropertyTem) )