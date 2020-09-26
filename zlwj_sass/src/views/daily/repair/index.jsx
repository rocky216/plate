import React from "react"
import {connect} from "react-redux"
import {Switch, Route, Redirect} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Button, Card, Table, Tabs, Form, Select, Input} from "antd";
import JCard from "@/components/JCard"
import {getDeilyRepair, getRepairType} from "@/actions/dailyAction"
import {dailyRepairColmuns} from "../colmuns"
import DailyRepairDetail from "./detail"
import AddDailyRepair from "./add"

const {TabPane} = Tabs
const {Option} = Select

let params = {
  current: 1,
  type: "allocated",
  repairName: "",
  repairTypeId: "",
}

class DailyRepair extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: "allocated",
      tabs: [
        {title: "待分配", key: "allocated"},
        {title: "处理中", key: "processing"},
        {title: "已完结", key: "finished"},
      ],
      visible: false,
      detail: "",
      addVisible: false
    }
  }
  componentDidMount(){
    this.props.actions.getDeilyRepair(params)
    this.props.actions.getRepairType({}, res=>this.setState({repairType: res}))
  }
  componentWillUnmount(){
    params.type = "allocated"
    params.current = "1"
    params.repairName = ""
    params.repairTypeId = ""
  }
  
  getCol(){
    let _this = this;
    const {activeKey } = this.state;
    return dailyRepairColmuns.concat([
      {
        title: activeKey=="allocated"?"创建信息":activeKey=="processing"?"分配信息":"完结信息",
        dataIndex: activeKey=="allocated"?"submitInfo":activeKey=="processing"?"allocatedInfo":"finishedInfo",
      },
      {
        title: "操作",
        render(item) {
          return (
            <div>
              <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})} >查看</Button>
            </div>
          );
        }
      }
    ])
  }

  handleSearch(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      params.repairName = values.repairName
      params.repairTypeId = values.repairTypeId
      this.props.actions.getDeilyRepair(params)
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, dailyRepair, repairType} = this.props
    const {tabs, activeKey, detail, visible, addVisible} = this.state
    
    return (
      <JCard spinning={spinning} >
        <AddDailyRepair visible={addVisible} onCancel={()=>this.setState({addVisible: false})} params={params} />
        {visible?
        <DailyRepairDetail visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}
        
        <Card size="small">
          <Tabs onChange={(key)=>{
            params.type = key
            params.current = 1
            this.setState({activeKey: key})
            this.props.actions.getDeilyRepair(params)
          }}
          activeKey={activeKey}
          tabBarExtraContent={(
            <Button icon="plus" type="primary" onClick={()=>this.setState({addVisible: true})} >创建报修单</Button>
            // <Button icon="line-chart" type="primary" >统计</Button>
          )}
          >
            {tabs.map(item=>(
              <TabPane tab={item.title} key={item.key} />
            ))}
          </Tabs>
          <Form className="flexend mgb10"  layout="inline" >
            <Form.Item label="报修标题" >
              {getFieldDecorator('repairName')(<Input/>)}
            </Form.Item>
            <Form.Item label="报修类型" >
              {getFieldDecorator('repairTypeId', {
                initialValue: ""
              })(
                <Select style={{width: 150}}>
                  <Option value="">全部</Option>
                  {repairType?repairType.map(item=>(
                    <Option key={item.id} value={item.id}>{item.dictLabel}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button icon="search" type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
            </Form.Item>
          </Form>
          <Table columns={this.getCol()} dataSource={dailyRepair?utils.addIndex(dailyRepair.list):[]} 
          pagination={utils.Pagination(dailyRepair, page=>{
            params.current = page
            this.props.actions.getDeilyRepair(params)
          })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeilyRepair, getRepairType}, dispatch)
  }
}

function mapStateProps(state){
  return {
    repairType: state.daily.repairType,
    dailyRepair: state.daily.dailyRepair,
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(DailyRepair) )