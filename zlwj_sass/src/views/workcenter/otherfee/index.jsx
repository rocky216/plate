import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Tabs, Badge, Form, Input, DatePicker, Select} from "antd";
import JCard from "@/components/JCard"
import SelectAllType from "@/components/SelectAllType"
import {getOtherCostsOrderLists} from "@/actions/otherAction"
import "./index.less"
import "../propertyfee/index.less"
import {otherfeeColmuns} from "../colmuns"
import AddOtherFee from "./add"

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
      houseItem: "",
      params: {
        current: 1,
        orderType: "",
        orderStatusStr: "",
        selectStartBuildTime: "",
        selectEndBuildTime: "",
        orderNo: "",
        linkTypeId: "",
        linkId: ""
      },
      addVisible: false
    } 
  }

  componentDidMount(){
    this.props.actions.getOtherCostsOrderLists(this.state.params)
  }

  handlenTab(key){
    const {params} = this.state
    params.current = 1
    params.orderStatusStr = key
    this.setState({params})
    this.props.actions.getOtherCostsOrderLists(params)
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
        console.log(values, "values")
        params.selectStartBuildTime = values.time && values.time.length?
          moment(values.time[0]).format("YYYY-MM-DD"):""
        params.selectEndBuildTime =values.time && values.time.length?
              moment(values.time[1]).format("YYYY-MM-DD"):""
        params.orderNo = values.orderNo
        params.orderType = values.orderType
        this.setState({params})
        
        this.props.actions.getOtherCostsOrderLists(params)
    })
  }

  handlenSelectShop(data){
    const {params} = this.state
    const {linkTypeId, isLeaf, id, type} = data

    params.linkTypeId = linkTypeId?linkTypeId:""
    params.linkId = id
    params.orderType = type
    this.setState({params, houseItem: data})
    this.props.actions.getOtherCostsOrderLists(params)
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, otherfeeorder} = this.props
    const {tabs, houseItem, params, addVisible} = this.state
    
    return (
      <JCard spinning={spinning}>
        {addVisible?
          <AddOtherFee visible={addVisible} detail={houseItem}  onCancel={()=>this.setState({addVisible: false})} />:null}
        <div style={{display: "flex"}}>
          <div className="select_house">
            <Card title="选择房间" size="small" bodyStyle={{padding:0}}>
              <SelectAllType isLoadCoOperative onSelect={this.handlenSelectShop.bind(this)}  />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card title={(
              <div>{houseItem.name}</div>
            )} extra={houseItem.linkTypeId || houseItem.type=="tempCoOperativeMenu"?<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增其他订单</Button>:null}>
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
                      <Badge count={otherfeeorder?otherfeeorder[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
                    } />
                  ))}
                </Tabs>
                
                <Table columns={this.getCol()} dataSource={otherfeeorder?utils.addIndex(otherfeeorder.page.list):[]} />
              </Card>
          </div>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOtherCostsOrderLists}, dispatch)
  }
}

function mapStateProps(state){
  return {
    otherfeeorder: state.other.otherfeeorder,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Otherfee) )