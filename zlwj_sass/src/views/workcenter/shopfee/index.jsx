import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Row, Col, Card, Button, Icon, Tabs, Badge, Table, Form, DatePicker, Input } from "antd";
import JCard from "@/components/JCard"
import SelectShopL from "@/components/SelectShopL"
import {getShopOrder} from "@/actions/otherAction"
import AddShopfee from "./add"
import {shopPropertyfeeColmuns } from "../colmuns"
import moment from "moment"

const {TabPane} = Tabs
const {RangePicker} = DatePicker

class Shopfee extends React.Component {
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
          title: "异常订单",
          value: "abnormalCount",
          key: "abnormal"
        },
        {
          title: "关闭订单",
          value: "closeCount",
          key: "close"
        },
      ],
      shopId: "",
      shopItem: "",
      params: {
        current: 1,
        shopsId: "",
        selectStartBuildTime: "",
        selectEndBuildTime: "",
        orderNo: ""
      },
      addVisible: false
    }
  }

  componentDidMount(){
    this.props.actions.getShopOrder(this.state.params)
  }

  getCol(){
    return shopPropertyfeeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/workcenter/shopfee/${item.id}/detail/2`}>
              <Button type="link" >打印</Button>
            </Link>
            <Link to={`/workcenter/shopfee/${item.id}/detail/1`}>
              <Button type="link" >查看</Button>
            </Link>
          </div>
        )
      }
    }])
  }

  handlenSelectShop(data){
    this.state.params.shopsId = data.id
    this.state.params.selectStartBuildTime = ""
    this.state.params.selectEndBuildTime = ""
    this.state.params.orderNo = ""
    this.setState({shopId: data.id, shopItem: data, params: this.state.params})
    this.props.actions.getShopOrder(this.state.params)
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
        
      this.props.actions.getShopOrder(params)
    })
  }
  handlenTab(key){
    const {params} = this.state
    params.current = 1
    params.orderStatusStr = key
    this.setState({params})
    this.props.actions.getShopOrder(params)
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {spinning, utils, shoporder} = this.props
    const {shopItem, addVisible, tabs, params} = this.state
    
    return (
      <JCard spinning={spinning} >
        <div className="propertyfee">
          <div className="select_house">
            <Card size="small" title="选择商铺">
              <SelectShopL onSelect={this.handlenSelectShop.bind(this)} />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card title={shopItem?shopItem.shopsName:null} 
                  extra={shopItem?<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus"/>新增物业费</Button>:null}>
              {shopItem && addVisible?<AddShopfee visible={addVisible} shopItem={shopItem} 
              onCancel={()=>this.setState({addVisible: false})} />:null}
              
              <div className="flexend mgb10">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
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
                    <Badge count={shoporder?shoporder[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
                  } />
                ))}
              </Tabs>
              <Table columns={this.getCol()} dataSource={shoporder?utils.addIndex(shoporder.page.list):[]} 
                pagination={shoporder?utils.Pagination(shoporder.page, page=>{
                  params.current = page
                  this.setState({params})
                  this.props.actions.getShopOrder(params)
                }):false}/>
            </Card>
          </div>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getShopOrder}, dispatch)
  }
}

function mapStateProps(state){
  return {
    shoporder: state.other.shoporder,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Shopfee) )