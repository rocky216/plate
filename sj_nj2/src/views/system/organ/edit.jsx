import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Form, Input, Select, DatePicker, Icon, Button, Table, Typography, Modal} from "antd";
import {getDeptDetail, getSupDeptDetail, editOrgan, getTreeDept, deleteOrgan} from "@/actions/systemAction"
import {gradeColumns} from "../columns"

const {Option} = Select
const { Text } = Typography;
const { confirm } = Modal;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class EditOrgan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      info: "",
      dept: "",
      staffingList:"",
      nextPostCountSum: 0,
      postCount: 0
    }
  }

  componentDidMount(){ 
    this.props.actions.getDeptDetail({id: this.props.detail.id}, res=>{
      this.setState({info: res, staffingList: res.staffingList})
      this.handlenCount()
    })
    this.props.actions.getSupDeptDetail({id: this.props.detail.parentId}, res=>{
      this.setState({dept: res})
    })
    
  }

  handlenCount(rows, value){
    const {staffingList} = this.state
    console.log(value, "value")
    if(rows && value){
      let index = _.findIndex(staffingList, o=>rows.id==o.id)
      staffingList[index]["postCount"] = value?value:0
    }
    
    let postCount = 0, nextPostCountSum = 0
    _.each(staffingList, item=>{
      postCount += item.postCount?item.postCount:0
      nextPostCountSum += item.nextPostCountSum
    })
    this.setState({staffingList, postCount, nextPostCountSum})
  }

  getJobLevel(){
    const {staffingList} = this.state
    let arr = []
    _.each(staffingList, item=>{
      arr.push(`${item.id}:${item.postCount}`)
    })
    return arr
  }

  handlenDeleteOrgan(){
    let _this = this
    confirm({
      title: '是否删除?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _this.props.actions.deleteOrgan({id: _this.props.detail.id}, res=>{
          _this.props.utils.OpenNotification("success")
          _this.props.initial()
        })
      }
    });
    
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.editOrgan({
          ...values,
          id: this.props.detail.id,
          parentId: this.state.dept?this.state.dept.supDept.id:0,
          staffingKeys: this.getJobLevel().join()
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getTreeDept({})
        })
      }
    });
  }
  

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, detail, onSwitch} = this.props
    const {info, dept, staffingList, postCount, nextPostCountSum} = this.state

    return (
      <Row gutter={30}>
        <Col span={12}>
          <Form  {...formItemLayout} >
        {dept?<Form.Item label="上级机构">
          {getFieldDecorator('deptNameinfo', {
            initialValue: dept?dept.supDept.deptName:"",
            rules: [{ required: true, message: '上级机构!' }],
          })(
            <Input disabled/>
          )}
        </Form.Item>:null}
        {dept?<Form.Item label="上级机构类型">
          {getFieldDecorator('deptTypeName', {
            initialValue: dept?dept.supDept.deptTypeName:"",
            rules: [{ required: true, message: '上级机构类型!' }],
          })(
            <Input disabled />
          )}
        </Form.Item>:null}
        {dept?<Form.Item label="机构类型">
          {getFieldDecorator('deptType', {
            initialValue: info?String(info.deptType):null,
            rules: [{ required: true, message: '请输入机构类型！' }],
          })(
            <Select >
              {dept?dept.newDeptMap.map(item=>(
                <Option key={item.deptTypeCode} value={item.deptTypeCode}>{item.deptTypeName}</Option>
              )):null}
            </Select>
          )}
        </Form.Item>:null}
        <Form.Item label="机构名称">
          {getFieldDecorator('deptName', {
            initialValue: info?info.deptName:"",
            rules: [{ required: true, message: '请输入机构名称！' }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="机构负责人">
          {getFieldDecorator('leaderName', {
            initialValue: info?info.leaderName:"",
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="联系电话">
          {getFieldDecorator('phone', {
            initialValue: info?info.phone:"",
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="成立日期">
          {getFieldDecorator('roleName', {
            initialValue: info && info.buildDate?info.buildDate:null
          })(
            <DatePicker/>
          )}
        </Form.Item>
        {/* <Form.Item label="邮件通知对象">
          <div>
            <label>通知对象一</label>
            <Select>
              <Option value=""></Option>
            </Select>
          </div>
        </Form.Item> */}
        <Form.Item wrapperCol={{ sm: {span: 18, offset: 6} }}>
          <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
          <Button type="primary" ghost className="mgl10" onClick={this.handlenDeleteOrgan.bind(this)} ><Icon type="delete" />删除节点</Button>
        </Form.Item>
      </Form>
        </Col>
        <Col span={12}>
          <Table bordered size="small" columns={gradeColumns(this)} dataSource={staffingList?utils.addIndex(staffingList):[]} 
          pagination={false} />
          <div className="fixedend mgt10">
          <Text>合计编制人数: {postCount}</Text>
          <Text className="mgl10">合计下级节点汇总:{nextPostCountSum}</Text>
          </div>
        </Col>
      </Row>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeptDetail, getSupDeptDetail, editOrgan, getTreeDept, deleteOrgan}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditOrgan) )