import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Row, Col,Form, TreeSelect, Input, Select, Button, Icon, Table, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {loadSelectDeptByRole, getProcessList, addAbsenceOperation, getAbsenceDetail} from "@/actions/personAction"
import {addabsenceColumns} from "../columns"
import AddDetail from "./addDetail"
import EditDetail from "./editDetail"

const {TreeNode} = TreeSelect
const {Option} = Select
const {TextArea} = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class DetailAbsence extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList:[],
      addVisible: false,
      editVisible: "",
      detail: "",
      processList: [],
      detailList: [],
      info:""
    }
  }

  componentDidMount(){
    this.props.actions.getAbsenceDetail({id: this.props.match.params.id}, res=>{
      let arr = []
      if(res.detailSet && res.detailSet.length){
        _.each(res.detailSet, item=>{
          arr.push({
            employeeId: item.employeeId,
            name: item.name,
            allDeptNameStr: item.allDeptNameStr,
            absenceEndTime: item.absenceEndTime,
            absenceStartTime: item.absenceStartTime,
            absenceTimeLength: item.absenceTimeLength,
            leaveType: item.leaveType,
            absenceTime: item.absenceTime,
            absenceCause: item.absenceCause,
          })
        })
      }
      this.setState({info: res, detailList:arr})
      this.handlenChange(res.deptId)
    })

    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/absence"}, res=>{
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
  handlenChange(id){
    this.props.actions.getProcessList({flowOrganId: id,flowType:2},res=>{
      this.setState({processList: res})
    })
  }


  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, spinning} = this.props
    const {deptList, addVisible, processList, detailList, editVisible, detail, info} = this.state
    console.log(detailList)
    
    return (
      <JCard spinning={spinning}>
       
        <Card size="small" title="新增缺勤单" extra={(
          <Link to="/person/absence">
            <Button ><Icon type="rollback" />返回</Button>
          </Link>
        )}>
          <Form {...formItemLayout}> 
            <Col span={8}>
              <Form.Item label="车间">
                {getFieldDecorator("deptId",{
                  initialValue: info.deptId,
                  rules: [{required: true,message: '选择车间!',}],
                })(
                  deptList && deptList.length?
                  <TreeSelect disabled treeDefaultExpandAll>
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="缺勤类型">
                {getFieldDecorator("absenceType", {
                  initialValue: info.absenceType,
                  rules: [{required: true,message: '选择车间!',}],
                })(
                  <Select disabled>
                    <Option value="1">请假</Option>
                    <Option value="2">旷工</Option>
                    <Option value="3">迟到</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="审批流程">
                {getFieldDecorator("flowId", {
                  initialValue: info.flowTemplateId,
                  rules: [{required: true,message: '审批流程!',}],
                })(
                  <Select disabled>
                    {processList.map(item=>(
                      <Option key={item.id} value={item.id} >{item.flowName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="标题">
                {getFieldDecorator("absenceTitle", {
                  initialValue: info.absenceTitle,
                  rules: [{required: true,message: '标题!',}],
                })(
                  <Input disabled/>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="备注">
                {getFieldDecorator("remark",{
                  initialValue: info.remark,
                })(
                  <TextArea autoSize={{minRows: 3}} disabled/>
                )}
              </Form.Item>
            </Col>
          </Form>
        </Card>
        <Card size="small"  title="缺勤明细记录" type="primary"  >
          <Table size="small" columns={addabsenceColumns} dataSource={ utils.addIndex(detailList) } pagination={false} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadSelectDeptByRole, getProcessList, addAbsenceOperation, getAbsenceDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(DetailAbsence) )