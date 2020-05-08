import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Tabs, Table, Badge, Form, Input, Button, Icon, Select, DatePicker } from "antd";
import JCard from "@/components/JCard"
import {getOtherCostsOrderListAuth, getAllProject} from "@/actions/manageAction"
import {allOrderColumns} from "../columns"
import moment from "moment"

const {TabPane} = Tabs
const {Option} = Select
const {RangePicker } = DatePicker

class OtherOrder extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabs: [
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
          title: "异常订单",
          value: "abnormalCount",
          key: "abnormal"
        },
        {
          title: "关闭订单",
          value: "closeCount",
          key: "close"
        },
        {
          title: "全部订单",
          value: "allCount",
          key: "all"
        },
      ],
      params: {
        current: 1,
        heId: "",
        orderType: "",
        orderNo: "",
        startTime: "",
        endTime: "",
        orderStatus: "wait"
      }
    }
  }

  componentDidMount(){
    this.props.actions.getOtherCostsOrderListAuth(this.state.params)
    this.props.actions.getAllProject({pageSize:1000})
  }

  handlenTab(key){
    console.log(arguments)
    const {params} = this.state
    params.current = 1
    params.orderStatus = key
    this.setState({params})
    this.props.actions.getOtherCostsOrderListAuth(params)
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {params} = this.state
      console.log('Received values of form: ', values);
      params.heId = values.heId
      params.orderType = values.orderType
      params.orderNo = values.orderNo
      params.startTime = values.time && values.time.length?moment(values.time[0]).format("YYYY-MM-DD"):""
      params.endTime = values.time && values.time.length?moment(values.time[1]).format("YYYY-MM-DD"):""
      this.setState({params})
      this.props.actions.getOtherCostsOrderListAuth(params)
    });
  }
  
  getCol(){
    return allOrderColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            {item.orderStatus=="1"?
            <Link to={`/manage/otherorder/${item.id}/detail/1`}><Button size="small" type="danger"><Icon type="exception" />审核异常</Button></Link>
            :<Link to={`/manage/otherorder/${item.id}/detail/2`}><Button size="small" type="primary" className="mgl10"><Icon type="eye" />查看</Button></Link>}
          </div>
        )
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const { spinning, utils, otherOrder, allproject} = this.props
    const {tabs, params} = this.state
    console.log(otherOrder, "otherOrder")
    return (
      <JCard spinning={spinning}>
        <Card>
          <div className="flexend mgb10">
            <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
              <Form.Item label="项目">
                {getFieldDecorator('heId')(
                  <Select style={{width: 120}}>
                    <Option value="" >全部</Option>
                    {allproject?allproject.list.map(item=>(
                      <Option key={item.id} value={item.id} >{item.name}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="类型" >
                {getFieldDecorator('orderType')(
                  <Select style={{width: 120}}>
                    <Option value="" >全部</Option>
                    <Option value="0" >住宅</Option>
                    <Option value="1" >商铺</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="订单号" >
                {getFieldDecorator('orderNo')(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="查询时间" >
                {getFieldDecorator('time')(
                  <RangePicker/>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
              </Form.Item>
            </Form>
          </div>

          <Tabs
            onChange={this.handlenTab.bind(this)}
          >
            {tabs.map(item=>(
              <TabPane key={item.key} tab={
                <Badge count={otherOrder?otherOrder[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
              } />
            ))}
          </Tabs>
          <Table columns={this.getCol()}  dataSource={otherOrder?utils.addIndex(otherOrder.pages.list):[]}
          pagination={otherOrder?utils.Pagination(otherOrder.pages, page=>{
            params.current = page
            this.setState({params})
            this.props.actions.getOtherCostsOrderListAuth(params)
          }):false} /> 
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOtherCostsOrderListAuth, getAllProject}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allproject: state.manage.allproject,
    otherOrder: state.manage.otherOrder,
    spinning: state.manage.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(OtherOrder) )