import React from "react"
import {connect} from "react-redux"
import {Link } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge, Button, Form, Input, DatePicker} from "antd";
import JCard from "@/components/JCard"
import {allTrimPlanPage} from "@/actions/manageAction"
import {trimColumns} from "../../workcenter/colmuns"
import moment from "moment";

const {TabPane } = Tabs
const {RangePicker} = DatePicker;

let params = {
  current:1,
  planStatusStr: "allCount",
  planNo:"",
  selectStartBuildTime:null,
  selectEndBuildTime:null
}

class ManageTrim extends React.Component {
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
    }
  }
  

  componentDidMount(){
    this.props.actions.allTrimPlanPage(params)
  }

  handleChange(val){
    params.planStatusStr = val
    this.props.actions.allTrimPlanPage(params)
  }

  getCol(){
    return trimColumns.concat([
      {
        title: "操作",
        render(item) {
          return (
             <div>
               <Link to={`/manage/trim/${item.id}/detail`}>
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
        this.props.actions.allTrimPlanPage(params)
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, alltrim} = this.props
    const {tabs, houseItem, visible} = this.state
    
    return (
      <JCard spinning={spinning}>

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

            {alltrim?<Tabs
              onChange={this.handleChange.bind(this)}
            >
              {tabs.map(item=>(
                <TabPane tab={(
                  <Badge count={alltrim[item.key]} showZero>{item.title}</Badge>
                )} key={item.key} />
              ))}
            </Tabs>:null}
            <Table columns={this.getCol()} dataSource={alltrim?utils.addIndex(alltrim.page.list):[]} 
              pagination={alltrim?utils.Pagination(alltrim.page, page=>{
                params.current = page
                this.props.actions.allTrimPlanPage(params)
              }):false}/>
          </Card>
          
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({allTrimPlanPage }, dispatch)
  }
}

function mapStateProps(state){
  return {
    alltrim: state.manage.alltrim,
    spinning: state.manage.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(ManageTrim))