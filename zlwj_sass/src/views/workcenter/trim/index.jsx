import React from "react"
import {connect} from "react-redux"
import {Link } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge, Button, Form, Input, DatePicker} from "antd";
import JCard from "@/components/JCard"
import SelectAllType from "@/components/SelectAllType"
import "../propertyfee/index.less"
import {propertyPlanPage} from "@/actions/otherAction"
import {trimColumns} from "../colmuns"
import AddTrim from "./add"
import EditTrim from "./edit"
import moment from "moment";

const {TabPane } = Tabs
const {RangePicker} = DatePicker;

let params = {
  current:1,
  planStatusStr: "allCount",
  planType:"",
  linkId:"",
  linkTypeId:"",
  planNo:"",
  selectStartBuildTime:null,
  selectEndBuildTime:null
}

class PropertyfeeTrm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {title: "全部计划", key: "allCount"},
        {title: "进行中计划", key: "proceed"},
        {title: "已完成计划", key: "complete"},
      ],
      houseItem: "",
      visible: false,
      editVisible: false,
      detail: ""
    }
  }
  

  componentDidMount(){
    this.props.actions.propertyPlanPage(params)
  }

  async handlenSelectShop(item){
    console.log(item)
    params.planType = item.type;
    params.linkId = item.id;
    params.linkTypeId = item.linkTypeId;
    await this.setState({houseItem: item.linkTypeId?item:""})
    
    this.props.actions.propertyPlanPage(params)
  }
  handleChange(val){
    params.planStatusStr = val
    this.props.actions.propertyPlanPage(params)
  }

  getCol(){
    let _this = this;
    return trimColumns.concat([
      {
        title: "操作",
        render(item) {
          return (
             <div>
               <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
               <Link to={`/workcenter/trim/${item.id}/detail/details`}>
                <Button type="link">详情</Button>
               </Link>
             </div>
          );
        }
      }
    ])
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        params.planNo = values.planNo;
        params.selectStartBuildTime = values.time && values.time.length?moment(values.time[0]).format("YYYY-MM-DD"):null
        params.selectEndBuildTime = values.time && values.time.length?moment(values.time[1]).format("YYYY-MM-DD"):null
        this.props.actions.propertyPlanPage(params)
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, trim} = this.props
    const {tabs, houseItem, visible, editVisible, detail} = this.state
    
    return (
      <JCard spinning={spinning}>
        {visible?
        <AddTrim
          visible={visible}
          houseItem={houseItem}
          params={params}
          onCancel={()=>this.setState({visible:false, })}
        />:null}

      {editVisible?
      <EditTrim
        visible={editVisible}
        houseItem={houseItem}
        detail={detail}
        params={params}
        onCancel={()=>this.setState({editVisible:false, detail: ""})}
      />:null}

        <div className="propertyfee">
          <div className="select_house">
            <Card title="选择房间" size="small" bodyStyle={{padding:0}}>
              <SelectAllType showLine isNotLoadPark onSelect={this.handlenSelectShop.bind(this)}  />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card
              title={houseItem?houseItem.name:null}
              extra={houseItem?<Button onClick={()=>this.setState({visible:true})} type="primary" icon="plus">新增装修计划</Button>:null}
            >
              <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                <Form.Item label="计划编号">
                  {getFieldDecorator('planNo', {
                    initialValue: params.planNo
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="装修时间" >
                  {getFieldDecorator('time', {
                    initialValue: params.selectStartBuildTime?[moment(params.selectStartBuildTime),moment(params.selectEndBuildTime)]:null
                  })(
                    <RangePicker/>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button icon="search" type="primary" htmlType="submit" >搜索</Button>
                </Form.Item>
              </Form>

              {trim?<Tabs
                onChange={this.handleChange.bind(this)}
              >
                {tabs.map(item=>(
                  <TabPane tab={(
                    <Badge count={trim[item.key]} showZero>{item.title}</Badge>
                  )} key={item.key} />
                ))}
              </Tabs>:null}
              <Table columns={this.getCol()} dataSource={trim?utils.addIndex(trim.page.list):[]} 
                pagination={trim?utils.Pagination(trim.page, page=>{
                  params.current = page
                  this.props.actions.propertyPlanPage(params)
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
    actions: bindActionCreators({propertyPlanPage }, dispatch)
  }
}

function mapStateProps(state){
  return {
    trim: state.other.trim,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(PropertyfeeTrm))