import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Tabs, Row, Col, Form, Input, Select, TreeSelect, Button, Icon, Table} from "antd";
import JCard from "@/components/JCard"
import {loadSelectDeptByRole, getEmployeeCensus} from "@/actions/personAction"
import ReactEcharts from 'echarts-for-react';
import {workshopColumns, optAgv1, optAgv2} from "./columns"
import PersonSource from "./personSource"
import PersonQuit from "./personQuit"

const { TabPane } = Tabs;
const {Option} = Select
const {TreeNode} = TreeSelect 

class Personanaly extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList: [],
      optAgv: "",
      optAgv2:"",
      visible: true,
      tabKey: "1",
      params: {
        type: "avg1",
        isStaff: "1",
        deptId: "",
      }
    }
  }
  componentDidMount(){
    this.props.actions.getEmployeeCensus(this.state.params, res=>{
      this.handlenData(res)
      this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/hResourceAnalysis"}, res=>{
        this.setState({deptList: res})
      })
    })
  }
  initail(){
    
  }
  handlenData(res){
    if(!res)return
    let xaxis = [], dataLine = [], dataBar1=[],dataBar2=[],dataBar3=[]
    _.each(res, item=>{
      xaxis.push(item.ks)
      dataLine.push(item.rate*100)
      dataBar1.push(item.shiJi)
      dataBar2.push(item.bianZhi)
      dataBar3.push(item.pianCha)
    })
    optAgv1.xAxis.data = xaxis
    optAgv1.series[0].data = dataLine

    optAgv2.xAxis.data = xaxis
    optAgv2.series[0].data = dataBar1
    optAgv2.series[1].data = dataBar2
    optAgv2.series[2].data = dataBar3
    this.setState({optAgv: optAgv1, optAgv2: optAgv2})
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      const {params} = this.state
      const {type, isStaff, deptId} = values
      params.type = type
      params.isStaff = isStaff
      params.deptId = deptId
      this.setState({visible: false, optAgv: "",optAgv2:""})
      this.props.actions.getEmployeeCensus(params, res=>{
        this.setState({visible: true})
        this.handlenData(res)
      })
    });
  }
  handlenReset(){
    this.props.form.resetFields()
  }
  getCol(){
    return workshopColumns("车间/部门").concat([{
      title: "详情",
      render(item){
        return (
          <Link to={`/person/personanaly/${item.deptId}/detail`}>
            <Button size="small" type="link">查看</Button>
          </Link>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, spinning, employal} = this.props
    const {deptList, params, optAgv, optAgv2, visible, tabKey} = this.state
    
    return (
      <JCard spinning={spinning} >
        <Card size="small">
          <Tabs activeKey={tabKey} onChange={key=>this.setState({tabKey:key})}>
            <TabPane key="1" tab={`人员编制&在岗统计`} />
            <TabPane key="2" tab="人员来源分布" />
            <TabPane key="3" tab="离职人员统计表" />
          </Tabs>
          {tabKey=="1"?
          <div >
            <Form className="fixedend" layout="inline" onSubmit={this.handleSearch.bind(this)}>
              <Form.Item label="分析维度" >
                {getFieldDecorator('type', {
                  initialValue: "avg1"
                })(
                  <Select style={{width: 150}}>
                    <Option value="avg1">按车间统计分析</Option>
                    <Option value="avg2">按科室统计分析</Option>
                    <Option value="avg3">按岗级统计分析</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="统计对象" >
                {getFieldDecorator('isStaff', {
                  initialValue: "1"
                })(
                  <Select style={{width: 120}}>
                    <Option value="1">全部</Option>
                    <Option value="2">职员</Option>
                    <Option value="3">工人</Option>
                  </Select>
                )}
              </Form.Item>
              {getFieldValue("type") == "avg1"?null:
              <Form.Item  label="组织机构">
                {getFieldDecorator('deptId')( 
                  deptList && deptList.length?
                  <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll style={{width: 150}}>
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>}
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
              </Form.Item>
            </Form>
          
            <Row className="mgt10" gutter={20}>
            <Col span={10} className="mgt10">
              {params.type=="avg1"?<Table size="small" columns={this.getCol()} dataSource={employal?utils.addIndex(employal):[]} pagination={false} />:null}
              {params.type=="avg2"?<Table size="small" columns={workshopColumns("科室")} dataSource={employal?utils.addIndex(employal):[]} pagination={false} />:null}
              {params.type=="avg3"?<Table size="small" columns={workshopColumns("岗级")} dataSource={employal?utils.addIndex(employal):[]} pagination={false} />:null}
            </Col>
            <Col span={14}>
              <Card size="small" title={`到岗率`}>
                {visible && optAgv?<ReactEcharts option={optAgv} lazyUpdate={true} />:null}  
              </Card>
              <Card size="small" title={`在岗&编制&偏差`}>
                {visible && optAgv2?<ReactEcharts option={optAgv2} lazyUpdate={true} />:null}
              </Card>
            </Col>
          </Row>
          </div>:null}
          {tabKey=="2"?<PersonSource/>:null}
          {tabKey=="3"?<PersonQuit/>:null}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectDeptByRole, getEmployeeCensus}, dispatch)
  }
}

function mapStateProps(state){
  return {
    employal: state.person.employal,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Personanaly) )