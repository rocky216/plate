import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Form, Input, Select, DatePicker, Icon, Button, Table, Typography} from "antd";
import {getDeptDetail, getSupDeptDetail, addOrgan, getTreeDept, getJobLevel} from "@/actions/systemAction"
import {gradeColumns} from "../columns"

const {Option} = Select
const { Text } = Typography;

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

class AddOrgan extends React.Component {
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
    this.props.actions.getJobLevel({}, res=>{
      this.setState({staffingList: res})
    })
    this.props.actions.getSupDeptDetail({id: this.props.parent.id}, res=>{
      this.setState({dept: res})
    })
  }

  handlenCount(rows, value){
    const {staffingList} = this.state
    let index = _.findIndex(staffingList, o=>rows.id==o.id)
    staffingList[index]["postCount"] = value?value:0
    
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

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.addOrgan({
          ...values,
          parentId: this.props.parent.id,
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
    const {utils, detail, parent} = this.props
    const {dept, staffingList, postCount, nextPostCountSum} = this.state
    console.log(parent, "parent")
    return (
      <Row gutter={30}>
        <Col span={12}>
          <Form  {...formItemLayout} >
          <Form.Item label="上级机构">
            {getFieldDecorator('deptNameinfo', {
              initialValue: parent.deptName,
              rules: [{ required: true, message: '上级机构!' }],
            })(
              <Input disabled/>
            )}
          </Form.Item>
          <Form.Item label="上级机构类型">
            {getFieldDecorator('deptTypeName', {
              initialValue: parent.deptTypeName,
              rules: [{ required: true, message: '上级机构类型!' }],
            })(
              <Input disabled />
            )}
          </Form.Item>
          <Form.Item label="机构类型">
            {getFieldDecorator('deptType', {
              
              rules: [{ required: true, message: '请输入机构类型！' }],
            })(
              <Select >
                {dept?dept.newDeptMap.map(item=>(
                  <Option key={item.deptTypeCode} value={item.deptTypeCode}>{item.deptTypeName}</Option>
                )):null}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="机构名称">
            {getFieldDecorator('deptName', {
              
              rules: [{ required: true, message: '请输入机构名称！' }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="机构负责人">
            {getFieldDecorator('leaderName', {
              
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone', {
              
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="成立日期">
            {getFieldDecorator('roleName', {
              
            })(
              <DatePicker/>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ sm: {span: 100, offset: 3} }}>
            <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
          </Form.Item>
        </Form>
        </Col>
        <Col span={12}>
          <Table bordered size="small" columns={gradeColumns(this)} dataSource={staffingList?utils.addIndex(staffingList):[]} 
          pagination={false} />
          <div className="fixedend mgt10">
          <Text>合计编制人数: {postCount}</Text>
          </div>
        </Col>
      </Row>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDeptDetail, getSupDeptDetail, addOrgan, getTreeDept, getJobLevel}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddOrgan) )