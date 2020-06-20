import React from "react"
import {connect} from "react-redux"
import {withRouter, Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge, Button, Icon, Select, Form, DatePicker, Input} from "antd";
import SelectHouse from "@/components/SelectHouse"
import SelectOwner from "@/components/SelectOwner"
import SelectAllType from "@/components/SelectAllType"
import JCard from "@/components/JCard"
import "./index.less"
import {propertyfeeColmuns} from "../colmuns"
import {getPropertyOrderPage} from "@/actions/otherAction"
import AddPropertyfee from "./add"
import moment from "moment"
import PropertyRelation from "./relation"

const {TabPane} = Tabs
const {Option} = Select
const {RangePicker} = DatePicker

class PropertyFee extends React.Component {
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
      houseType: "1",
      houseId: "",
      addVisible: false,
      houseItem: "",
      params: {
        current:1,
        selectStartBuildTime: "",
        selectEndBuildTime: "",
        orderType: "",
        linkTypeId: "",
        linkId:""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getPropertyOrderPage(this.state.params)
  }


  getCol(){
    return propertyfeeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/workcenter/propertyfee/${item.id}/detail/2`}>
              <Button type="link">打印</Button>
            </Link>
            <Link to={`/workcenter/propertyfee/${item.id}/detail/1`}>
              <Button type="link">查看</Button>
            </Link>
          </div>
        )
      }
    }])
  }

  async handlenSelectShop(data){
    await this.setState({houseItem: ""})
    const {params} = this.state
    params.orderType = data.type
    params.linkTypeId = data.linkTypeId?data.linkTypeId:""
    params.linkId = data.id
    params.selectStartBuildTime = ""
    params.selectEndBuildTime = ""
    params.orderNo = ""
    this.setState({houseId: data.linkTypeId?data.id:"", houseItem: data.linkTypeId?data:"", params})
    this.props.actions.getPropertyOrderPage(params)
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
        
        this.props.actions.getPropertyOrderPage(params)
    })
  }
  handlenTab(key){
    const {params} = this.state
    params.current = 1
    params.orderStatusStr = key
    this.setState({params})
    this.props.actions.getPropertyOrderPage(params)
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {spinning, utils, propertyfee} = this.props
    const {houseType, houseId, addVisible, houseItem, tabs, params} = this.state
    
    return (
      <JCard spinning={spinning}> 
        <div className="propertyfee">
          <div className="select_house">
            <Card title="选择房间" size="small" bodyStyle={{padding:0}}>
              <SelectAllType showLine onSelect={this.handlenSelectShop.bind(this)}  />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            {houseItem?<PropertyRelation houseItem={houseItem} />:null}
            
            <Card title={houseItem?houseItem.name:null} extra={houseId?<Button type="primary" 
            onClick={()=>this.setState({addVisible:true})}>
                <Icon type="plus" />新增物业费订单</Button>:null} >
                  {houseItem && addVisible?<AddPropertyfee visible={addVisible} 
                              showName={houseItem?houseItem.showCodeAll:null}
                              houseType={houseType} houseItem={houseItem} onCancel={()=>this.setState({addVisible: false})} />:null}
              <div className="flexend mgb10">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                <Form.Item label="订单号" >
                    {getFieldDecorator('orderNo')(
                      <Input  />,
                    )}
                  </Form.Item>
                  <Form.Item label="创建时间">
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
                    <Badge count={propertyfee?propertyfee[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
                  } />
                ))}
              </Tabs>
              <Table columns={this.getCol()} 
                dataSource={propertyfee?utils.addIndex(propertyfee.page.list):[]}
                pagination={propertyfee?utils.Pagination(propertyfee.page, page=>{
                  params.current = page
                  this.setState({params})
                  this.props.actions.getPropertyOrderPage(params)
                }):false}
              />
            </Card>
          </div>
        </div>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPropertyOrderPage}, dispatch)
  }
}

function mapStateProps(state){
  return {
    propertyfee: state.other.propertyfeepage,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(PropertyFee) )