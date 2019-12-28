import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Tabs, Badge, Form, Input, DatePicker, Select} from "antd";
import JCard from "@/components/JCard"
import {getOtherfee} from "@/actions/otherAction"
import "./index.less"
import {otherfeeColmuns} from "../colmuns"

const {TabPane} = Tabs
const {RangePicker} = DatePicker
const {Option} = Select

class Otherfee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabs: [
        {
          title: "全部订单",
          value: "allCount",
          key: "0"
        },
        {
          title: "待审核订单",
          value: "waitCount",
          key: "1"
        },
        {
          title: "正常订单",
          value: "rightCount",
          key: "2"
        },
        {
          title: "异常订单",
          value: "abnormalCount",
          key: "3"
        },
        {
          title: "关闭订单",
          value: "closeCount",
          key: "4"
        },
      ],
      params: {
        current: 1,
        orderType: 0,
        orderStatus: "",
        selectStartBuildTime: "",
        selectEndBuildTime: "",
        orderNo: ""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getOtherfee(this.state.params)
  }

  handlenTab(key){
    const {params} = this.state
    params.current = 1
    params.orderStatus = key
    this.setState({params})
    this.props.actions.getOtherfee(params)
  }

  getCol(){
    return otherfeeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/workcenter/otherfee/${item.id}/detail/2`}><Button type="link">打印</Button></Link>
            <Link to={`/workcenter/otherfee/${item.id}/detail/1`}><Button type="link">查看</Button></Link>
          </div>
        )
      }
    }])
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        const {params} = this.state
        params.selectStartBuildTime = values.time && values.time.length?
          moment(values.time[0]).format("YYYY-MM-DD"):""
        params.selectEndBuildTime =values.time && values.time.length?
              moment(values.time[1]).format("YYYY-MM-DD"):""
        params.orderNo = values.orderNo
        this.setState({params})
        
        this.props.actions.getOtherfee(params)
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, otherfee} = this.props
    const {tabs} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title="其他缴费订单" extra={<Link to="/workcenter/otherfee/add"><Button type="primary"><Icon type="plus" />新增其他订单</Button></Link>}>
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
                <Badge count={otherfee?otherfee[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
              } />
            ))}
          </Tabs>
          
          <Table columns={this.getCol()} dataSource={otherfee?utils.addIndex(otherfee.pages.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOtherfee}, dispatch)
  }
}

function mapStateProps(state){
  return {
    otherfee: state.other.otherfee,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Otherfee) )