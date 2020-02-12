import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Button, Popconfirm, Form, TreeSelect, DatePicker, Icon} from "antd";
import JCard from "@/components/JCard"
import {getSchedu, deleteSchedu, loadSelectDeptByRole} from "@/actions/personAction"
import {scheduColumns} from "../columns"
import EditSchedu from "./edit"
import Analy from "./analy"
import "./index.less"
import moment from "moment"
import AuthButton from "@/components/AuthButton"

const { TabPane } = Tabs;
const {TreeNode} = TreeSelect 
const {RangePicker } = DatePicker;

class Schedu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      type: "1",
      visible: false,
      detail: "",
      deptList:[],
      params: {
        current: 1,
        selectStartTime: "",
        selectEndTime: "",
        deptId: ""
      }
    }
  }

  componentDidMount(){
    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/plan"}, res=>{
      this.setState({deptList: res})
    })
    this.props.actions.getSchedu(this.state.params)
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  handlenDelete(item){
    this.props.actions.deleteSchedu({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSchedu(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return scheduColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <AuthButton auth="2-04-02" onClick={()=>_this.setState({visible: true, detail: item})} size="small" type="link">修改</AuthButton>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <AuthButton auth="2-04-03" size="small" type="link">删除</AuthButton>
              </Popconfirm>
          </div>
        )
      }
    }])
  }

  handlenSearch(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {params} = this.state
        params.deptId = values.deptId
        params.selectStartTime =  values.time && values.time.length?moment(values.time[0]).format("YYYY-MM-DD"):""
        params.selectEndTime =  values.time && values.time.length?moment(values.time[1]).format("YYYY-MM-DD"):""
        this.setState({params})
        this.props.actions.getSchedu(params)
      }
    });
  }

  handlenReset(){
    const {params} = this.state
    params.deptId = ""
    params.selectStartTime = ""
    params.selectEndTime = ""
    this.setState({params})
    this.props.form.resetFields()
    this.props.actions.getSchedu({current:1})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, schedu} = this.props
    const {type, visible, detail, deptList, params} = this.state
    
    return (
      <JCard  spinning={spinning}>
        {visible?<EditSchedu visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}
        
        <Card size="small">
          <Tabs activeKey={type} 
            onChange={(key)=>this.setState({type: key})}
          size="small">
            <TabPane key="1" tab="排产计划">
              <div className="mgb10 scheduSearch">
                <Link to="/person/schedu/add">
                  <AuthButton auth="2-04-01" type="primary"><Icon type="plus" />批量排产</AuthButton>
                </Link>
                <Form layout="inline">
                  <Form.Item label="车间/部门">
                    {getFieldDecorator('deptId')(
                      deptList && deptList.length?
                      <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll style={{width: 120}}>
                        {this.createNode(deptList)}
                      </TreeSelect>:<span></span>
                    )}
                  </Form.Item>
                  <Form.Item label="排产日期">
                    {getFieldDecorator('time')(
                      <RangePicker  />
                    )}
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" onClick={this.handlenSearch.bind(this)}><Icon type="search" />搜索</Button>
                    <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
                  </Form.Item>
                </Form>
              </div>
              <Table size="small" bordered columns={this.getCol()} dataSource={schedu?utils.addIndex(schedu.list):[]}
              pagination={utils.Pagination(schedu, page=>{
                params.current = page
                this.setState({params})
                this.props.actions.getSchedu(params)
              })} />
            </TabPane>
            <TabPane key="2" tab="排产分析">
              <Analy/>
            </TabPane>
          </Tabs>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSchedu, deleteSchedu, loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    schedu: state.person.schedu,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Schedu) )