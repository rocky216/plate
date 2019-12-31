import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Tabs, Badge, Form, Input, DatePicker, Select} from "antd";
import JCard from "@/components/JCard"
import {getOtherExpendList} from "@/actions/otherAction"
import "./index.less" 
import {expendfeeColmuns} from "../colmuns"

const {TabPane} = Tabs
const {RangePicker} = DatePicker
const {Option} = Select

class Expendfee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabs: [
        {
          title: "全部订单",
          value: "allCount",
          key: "all"
        },
        {
          title: "待审核订单",
          value: "waitCount",
          key: "wait"
        },
        {
          title: "正常订单",
          value: "rightCount",
          key: "right"
        },
        {
          title: "驳回订单",
          value: "abnormalCount",
          key: "abnormal"
        },
      ],
      params: {
        current: 1,
        orderType: "",
        orderStatus: "",
        selectStartBuildTime: "",
        selectEndBuildTime: "",
        orderNo: ""
      }
    } 
  }

  componentDidMount(){
    this.props.actions.getOtherExpendList(this.state.params)
  }

  handlenTab(key){
    const {params} = this.state
    params.current = 1
    params.orderStatus = key
    this.setState({params})
    this.props.actions.getOtherExpendList(params)
  }

  getCol(){
    return expendfeeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/workcenter/expend/${item.id}/detail`}><Button type="link">查看</Button></Link>
          </div>
        )
      }
    }])
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        const {params} = this.state
        console.log(values, "values")
        params.selectStartBuildTime = values.time && values.time.length?
          moment(values.time[0]).format("YYYY-MM-DD"):""
        params.selectEndBuildTime =values.time && values.time.length?
              moment(values.time[1]).format("YYYY-MM-DD"):""
        params.orderNo = values.orderNo
        params.orderType = values.orderType
        this.setState({params})
        
        this.props.actions.getOtherExpendList(params)
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, otherExpend} = this.props
    const {tabs} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title="其他缴费订单" extra={<Link to="/workcenter/expend/add"><Button type="primary"><Icon type="plus" />新增其他支出订单</Button></Link>}>
        <div className="flexend mgb10">
          <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
            <Form.Item label="类型" >
              {getFieldDecorator('orderType')(
                <Select style={{width: 100}}>
                  <Option value="" >全部</Option>
                  <Option value="0" >住宅</Option>
                  <Option value="1" >商铺</Option>
                  <Option value="3" >合作商</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="订单号" >
              {getFieldDecorator('orderNo')(
                <Input  />,
              )}
            </Form.Item>
            <Form.Item label="创建时间" >
              {getFieldDecorator('time',{
                rules: [{type: 'array'}]
              })(
                <RangePicker />,
              )} 
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" ><Icon type="search" />搜索</Button>
            </Form.Item>
          </Form>
        </div>
          
          <Tabs
            onChange={this.handlenTab.bind(this)}
          >
            {tabs.map(item=>(
              <TabPane key={item.key} tab={
                <Badge count={otherExpend?otherExpend[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
              } />
            ))}
          </Tabs>
          
          <Table columns={this.getCol()} dataSource={otherExpend?utils.addIndex(otherExpend.pages.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOtherExpendList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    otherExpend: state.other.otherExpend,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Expendfee) )