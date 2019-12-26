import React from "react"
import {connect} from "react-redux"
import {withRouter, Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge, Button, Icon, Select, Form, DatePicker, Input} from "antd";
import SelectHouse from "@/components/SelectHouse"
import JCard from "@/components/JCard"
import "./index.less"
import {propertyfeeColmuns} from "../colmuns"
import {getPropertyfee} from "@/actions/otherAction"
import AddPropertyfee from "./add"
import moment from "moment"

const {TabPane} = Tabs
const {Option} = Select
const {RangePicker} = DatePicker

class PropertyFee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      houseType: "1",
      houseId: "",
      addVisible: false,
      houseItem: "",
      params: {
        current:1,
        houseId: "",
        selectStartBuildTime: "",
        selectEndBuildTime: ""
      }
    }
  }

  componentDidMount(){
    this.props.actions.getPropertyfee(this.state.params)
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

  handlenSelectShop(data){
    this.state.params.houseId = data.id
    this.state.params.selectStartBuildTime = ""
    this.state.params.selectEndBuildTime = ""
    this.state.params.orderNo = ""
    this.setState({houseId: data.id, houseItem: data, params: this.state.params})
    this.props.actions.getPropertyfee(this.state.params)
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
        
        this.props.actions.getPropertyfee(params)
    })
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {spinning, utils, propertyfee} = this.props
    const {houseType, houseId, addVisible, houseItem} = this.state
    
    return (
      <JCard spinning={spinning}>
        <div className="propertyfee">
          <div className="select_house">
            <Card title="选择房间" size="small">
              <SelectHouse showLine onSelect={this.handlenSelectShop.bind(this)} />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card title={houseItem?houseItem.showCodeAll:null} extra={houseId?<Button type="primary" onClick={()=>this.setState({addVisible:true})}>
                <Icon type="plus" />新增物业费订单</Button>:null} >
                  {houseId && addVisible?<AddPropertyfee visible={addVisible} 
                              showName={houseItem?houseItem.showCodeAll:null}
                              houseType={houseType} houseId={houseId} onCancel={()=>this.setState({addVisible: false})} />:null}
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

              <Tabs>
                <TabPane tab={<Badge count={propertyfee?propertyfee.allCount:0} offset={[10,0]} showZero>全部订单</Badge>} key="allCount" /> 
                <TabPane tab={<Badge count={propertyfee?propertyfee.waitCount:0} offset={[10,0]} showZero>待审核订单</Badge>} key="waitCount" />
                <TabPane tab={<Badge count={propertyfee?propertyfee.rightCount:0} offset={[10,0]} showZero>正常订单</Badge>} key="rightCount" />
                <TabPane tab={<Badge count={propertyfee?propertyfee.abnormalCount:0} offset={[10,0]} showZero>异常订单</Badge>} key="abnormalCount" />
                <TabPane tab={<Badge count={propertyfee?propertyfee.closeCount:0} offset={[10,0]} showZero>关闭订单</Badge>} key="closeCount" />
              </Tabs>
              <Table columns={this.getCol()} 
                dataSource={propertyfee?utils.addIndex(propertyfee.page.list):[]}
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
    actions: bindActionCreators({getPropertyfee}, dispatch)
  }
}

function mapStateProps(state){
  return {
    propertyfee: state.other.propertyfee,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(PropertyFee) )