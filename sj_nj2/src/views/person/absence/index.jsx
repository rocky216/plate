import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, BUtton, Form, Select, TreeSelect, DatePicker, Input, Row, Col,Popconfirm} from "antd";
import {absenceColumns} from "../columns"
import JCard from "@/components/JCard"
import {getAbsence, loadSelectDeptByRole, deleteAbsence} from "@/actions/personAction"
import moment from "moment"

const {Option} = Select
const {TreeNode} = TreeSelect
const {RangePicker } = DatePicker;
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Absence extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList:[],
      params: {
        current: 1,
        absenceEmployeeName:"",
        dateType:"",
        startTime:"",
        endTime:"",
        deptId:"",
        absenceType:""
      }
    }
  }
  componentDidMount(){
    this.props.actions.getAbsence(this.state.params)
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/absence"}, res=>{
      this.setState({deptList: res})
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handlenDelete(item){
    this.props.actions.deleteAbsence({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getAbsence(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return absenceColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            {item.status!="1"?
            <Link to={`/person/absence/${item.id}/edit`}>
              <Button size="small" type="link">修改</Button>
            </Link>:null}
            {item.status=="1"?
            <Link to={`/person/absence/${item.id}/detail`}>
              <Button size="small" type="link">查看</Button>
            </Link>:null}
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button size="small" type="link">删除</Button>
              </Popconfirm>
          </div>
        )
      }
    }])
  }

  handlenSectionType(val){
    const {params} = this.state
    params.dateType = val
    this.setState({params})
  }


  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {params} = this.state
        const {absenceEmployeeName, absenceStatus, time, absenceType, deptId} = values
        params.absenceStatus = absenceStatus
        params.absenceEmployeeName = absenceEmployeeName
        params.absenceType = absenceType
        params.deptId = deptId
        params.startTime = time && time.length?moment(tiem[0]).format("YYYY-MM-DD"):""
        params.endTime = time && time.length?moment(tiem[1]).format("YYYY-MM-DD"):""
        console.log('Received values of form: ', values);
        this.props.actions.getAbsence(params)
        this.setState({params})
      }
    });
  }
  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      current: 1,
      absenceEmployeeName:"",
      dateType:"",
      startTime:"",
      endTime:"",
      deptId:"",
      absenceType:""
    }
    this.setState({params: obj})
    this.props.actions.getAbsence({current: 1})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, absence} = this.props
    const {deptList, params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/person/absence/add"><Button type="primary"><Icon type="plus" />新增缺勤</Button></Link>}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col span={4}>
                <Form.Item label="缺勤人">
                  {getFieldDecorator('absenceEmployeeName')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="状态">
                  {getFieldDecorator('absenceStatus')(
                    <Select>
                      <Option value="">全部</Option>
                      <Option value="1">草稿</Option>
                      <Option value="2">作废</Option>
                      <Option value="3">审核中</Option>
                      <Option value="4">审批完成</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item labelCol={{sm: {span:5}}} label="组织机构">
                  {getFieldDecorator('deptId')(
                    deptList && deptList.length?
                    <TreeSelect treeDefaultExpandAll>
                      {this.createNode(deptList)}
                    </TreeSelect>:<span></span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={(
                  <Select style={{width: "80%"}} value={params.dateType} onChange={this.handlenSectionType.bind(this)} >
                    <Option value="">全部</Option>
                    <Option value="1">创建日期</Option>
                    <Option value="2">缺勤日期</Option>
                  </Select>
                )}>
                  {getFieldDecorator('time')(<RangePicker />)}
                </Form.Item>
              </Col>
              
              <Col span={4}>
                <Form.Item label="缺勤类型">
                  {getFieldDecorator('absenceType')(
                    <Select>
                      <Option value="">全部</Option>
                      <Option value="1">请假</Option>
                      <Option value="2">旷工</Option>
                      <Option value="3">迟到</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              
              <Col span={8}>
                <Form.Item >
                  <Button type="primary" className="mgl10" htmlType="submit"><Icon type="search" />搜索</Button>
                  <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>


          
          <Table  size="small" columns={this.getCol()} dataSource={absence?utils.addIndex(absence.list):[]} 
            pagination={utils.Pagination(absence, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getAbsence(params)
            })}/>
        </Card>
      </JCard>
      
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAbsence, loadSelectDeptByRole, deleteAbsence}, dispatch)
  }
}

function mapStateProps(state){
  return {
    absence: state.person.absence,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Absence) )