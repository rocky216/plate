import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Tabs, Table, Select, Form, Button, Icon, Input, Cascader} from "antd";
import JCard from "@/components/JCard"
import {getPlateRecord, getPowerOrder} from "@/actions/otherAction"
import {getAllplateRecord, getAllPowerOrder} from "@/actions/systemAction"
import {getCompanyProject} from "@/actions/appAction"
import {powerOrderColumns, plateRecordColumns} from "../colmuns"

const {TabPane} = Tabs
const {Option} = Select

class Record extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: "1",
      carparams: {
        current: 1,
      },
      powerparams: {
        current: 1,
        useType: "",
        orderStatus:""
      },
    }
  }
  componentDidMount(){
    this.initial(this.state.activeKey, this.state.activeKey=="1"?this.state.carparams:this.state.powerparams)
    this.props.actions.getCompanyProject({isLoad:"carpark"})
  }
  initial(type, params){
    if(type==="1"){
      this.props.actions.getAllplateRecord(params)
      this.props.actions.getCompanyProject({isLoad:"carpark"})
    }else if(type==="2"){
      this.props.actions.getAllPowerOrder(params)
      this.props.actions.getCompanyProject({})
    }
  }
  handlenSwitch(key){
    this.setState({activeKey: key})
    this.initial(key,key=="1"?this.state.carparams:this.state.powerparams)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {activeKey, carparams, powerparams} = this.state
        if(activeKey==1){
          const {park} =values
          carparams.license = values.license 
          carparams.inOut = values.inOut 
          carparams.companyId = park && park.length?park[0]:""
          carparams.heId = park && park.length>1?park[1]:""
          carparams.parkId = park && park.length>2?park[2]:""
          this.setState({carparams})
        }else if(activeKey == 2){
          const {project} = values
          powerparams.companyId = project && project.length?project[0]:""
          powerparams.heId = project && project.length>1?project[1]:""
          powerparams.useType = values.useType
          powerparams.orderStatus = values.orderStatus 
          this.setState({powerparams})
        }
        this.initial(activeKey, activeKey==1?carparams:powerparams)
      }
    });
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, allpowerecord, allcardrecord, companyPro } = this.props
    const {activeKey, powerparams, carparams} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Tabs 
            activeKey={activeKey}
            onChange={this.handlenSwitch.bind(this)}
          >
            <TabPane key="1" tab="车辆通行日志" />
            <TabPane key="2" tab="充电订单日志" />
          </Tabs>
          {activeKey=="1"?<div>
            <div className="flexend mgb10">
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
              <Form.Item label="车牌号码" >
                  {getFieldDecorator('license',{
                    initialValue: ""
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="停车场" >
                  {getFieldDecorator('park',{
                    initialValue: ""
                  })(
                    <Cascader options={companyPro?companyPro:[]} style={{width: 300}}
              fieldNames={{ label: 'name', value: 'id' }}/>
                  )}
                </Form.Item>
                <Form.Item label="状态">
                  {getFieldDecorator('inOut', {
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="1">进口</Option>
                      <Option value="2">出口</Option>
                      <Option value="3">异常</Option>
                      <Option value="4">待支付</Option>
                      <Option value="5">已支付</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                </Form.Item>
              </Form>
            </div>
            <Table bordered columns={plateRecordColumns} dataSource={allcardrecord?utils.addIndex(allcardrecord.list):[]}
              pagination={utils.Pagination(allcardrecord, page=>{
                carparams.current = page
                this.setState({carparams})
                this.initial(activeKey, carparams)
              })}/>
            </div>:null}
          {activeKey=="2"?<div>
            <div className="flexend mgb10">
              <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="支付类型" >
                  {getFieldDecorator('useType',{
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="W">微信</Option>
                      <Option value="C">充点卡</Option>
                      <Option value="G">智联万家</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="停车场" >
                  {getFieldDecorator('project',{
                    initialValue: ""
                  })(
                    <Cascader options={companyPro?companyPro:[]} style={{width: 300}}
                      fieldNames={{ label: 'name', value: 'id' }}/>
                  )}
                </Form.Item>
                <Form.Item label="订单状态">
                  {getFieldDecorator('orderStatus', {
                    initialValue: ""
                  })(
                    <Select style={{width: 120}}>
                      <Option value="">全部</Option>
                      <Option value="0">待充电</Option>
                      <Option value="1">充电中</Option>
                      <Option value="2">充电完成</Option>
                      <Option value="3">充电失败</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                </Form.Item>
              </Form>
            </div>
            <Table bordered columns={powerOrderColumns} dataSource={allpowerecord?utils.addIndex(allpowerecord.list):[]} 
            pagination={utils.Pagination(allpowerecord, page=>{
              powerparams.current = page
              this.setState({powerparams})
              this.initial(activeKey, powerparams)
            })}/>
          </div>:null}
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlateRecord, getPowerOrder, getCompanyProject, getAllplateRecord, getAllPowerOrder}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allpowerecord: state.system.allpowerecord,
    allcardrecord: state.system.allcardrecord,
    companyPro: state.app.companyPro,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Record) )