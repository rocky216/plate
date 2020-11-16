import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Tabs, Row, Col, Table, Alert, Button, Form, Select} from "antd";
import JCard from "@/components/JCard"
import {getDeviceLogMonitor, getDeviceLogStatis} from "@/actions/centerAction"
import {pileLogColmuns, accessLogColmuns, carLogColmuns} from "../colmuns"
import DetailDevicesMonitor from "./detail" 

const {TabPane} = Tabs
const {Option} = Select;

let params = {
  online: "",
  type: "pile",
  current: 1,
}

class DeviceMonitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {title: "智联充电桩", key: "pile"},
        {title: "门禁控制器", key: "access"},
        {title: "车辆识别一体机", key: "car"},
      ],
      activeKey:"pile",
      classes: [
        {title: "在线设备", key: "iotOnLine"},
        {title: "离线设备", key: "iotOffline"},
        {title: "24小时掉线次数", key: "offCount"},
      ],
      statis:"",
      visible: false,
      detail: ""
    }
  }
  
  componentDidMount(){
    this.props.actions.getDeviceLogMonitor(params)
    // this.getStatis(params)
  }

  getStatis(params){
    this.props.actions.getDeviceLogStatis({type: params.type}, res=>{
      this.setState({statis: res})
    })
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        params.current=1
        params.online=values.online
        this.props.actions.getDeviceLogMonitor(params)
      }
    });
  }

  render(){
    let _this = this;
    const {getFieldDecorator, setFieldsValue} = this.props.form;
    const {utils, spinning, pileLog, accessLog, carLog} = this.props
    const {tabs, activeKey, classes, statis, visible, detail} = this.state
    
    return (
      <JCard spinning={spinning}>
        {visible?
        <DetailDevicesMonitor visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}

        <Card size="small">
          <Tabs 
            onChange={(key)=>{
              this.setState({activeKey: key})
              setFieldsValue({"online": ""})
              params.current = 1
              params.online = ""
              params.type= key
              this.props.actions.getDeviceLogMonitor(params)
              
            }}
            tabBarExtraContent={(
              <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                <Form.Item label="在线状态">
                  {getFieldDecorator('online', {
                    initialValue: ""
                  })(
                    <Select style={{width: 150}}>
                      <Option value="">全部</Option>
                      <Option value="1">在线</Option>
                      <Option value="0">离线</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button icon="search" type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
              </Form>
            )}
          >
            {tabs.map(item=>(
              <TabPane tab={item.title} key={item.key} />
            ))}
          </Tabs>
          {activeKey=="pile"?(
            <>
              {classes.map(item=>(
                <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{pileLog?pileLog[item.key]:""}</span></Button>
              ))}
              <Button type="link">空闲中的端口<span className="mgl10" style={{color: "red"}}>{pileLog?pileLog["portOffLine"]:""}</span></Button>
              <Button type="link">使用中端口数<span className="mgl10" style={{color: "red"}}>{pileLog?pileLog["portOnLine"]:""}</span></Button>
              <Table columns={pileLogColmuns.concat([{
                title: "操作",
                render(item) {
                  return (
                     <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})}>查看详情</Button>
                  );
                }
              }])} dataSource={pileLog?utils.addIndex(pileLog.data.list):[]} 
              pagination={pileLog?utils.Pagination(pileLog.data, page=>{
                params.current = page
                this.props.actions.getDeviceLogMonitor(params)
              }):false}/>
            </>
          )
          :null}
          {activeKey=="access"?
          <>
            {classes.map(item=>(
              <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{accessLog?accessLog[item.key]:""}</span></Button>
            ))}
            <Table columns={accessLogColmuns.concat([{
              title: "操作",
              render(item) {
                return (
                   <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})} >查看详情</Button>
                );
              }
            }])} dataSource={accessLog?utils.addIndex(accessLog.data.list):[]} 
            pagination={accessLog?utils.Pagination(accessLog.data, page=>{
              params.current = page
              this.props.actions.getDeviceLogMonitor(params)
            }):false}/>
          </>
          :null}
          {activeKey=="car"?
          <>
            {classes.map(item=>(
              <Button key={item.key} type="link">{item.title}<span className="mgl10" style={{color: "red"}}>{carLog?carLog[item.key]:""}</span></Button>
            ))}
            <Table columns={carLogColmuns.concat([{
              title: "下载收款二维码",
              render(item) {
                return (
                  <>
                  <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})} >查看</Button>
                  {item.deviceAttrInOut=="out"?
                  <a href={`${BASEURL}/api/pc/deviceLog/createImg?token=${_this.props.utils.getCookie("token")}&iotId=${item.iotId}`}>
                    <Button type="link">下载二维码</Button>
                  </a>:null}
                  </>
                );
              }
            }])} dataSource={carLog?utils.addIndex(carLog.data.list):[]} 
            pagination={carLog?utils.Pagination(carLog.data, page=>{
              params.current = page
              this.props.actions.getDeviceLogMonitor(params)
            }):false}/>
          </>:null}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeviceLogMonitor, getDeviceLogStatis}, dispatch)
  }
}

function mapStateProps(state){
  return {
    pileLog: state.center.pileLog,
    carLog: state.center.carLog,
    accessLog: state.center.accessLog,
    spinning: state.center.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(DeviceMonitor) )