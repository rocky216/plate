import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Form, Input, Select, DatePicker, Icon, Button, Table, Typography, Divider} from "antd";
import {getDeptDetail, getSupDeptDetail, addOrgan, getTreeDept, getJobLevel} from "@/actions/systemAction"
import {gradeColumns} from "../columns"
import AuthButton from "@/components/AuthButton"
import moment from "moment"
import Teach from "@/views/person/staff/teach"

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

let timer = null

class AddOrgan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      info: "",
      dept: "",
      staffingList:"",
      nextPostCountSum: 0,
      postCount: 0,
      teach:[],
      teachVisible: false,
      index: 0,
      leader:{}
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

  handlenNoticeKeys(){
    const {teach} = this.state
    let arr=[]
    _.each(teach, item=>{
      if(item.id){
        arr.push(item.id)
      }
    })
    return arr
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {leader} = this.state
        timer && clearTimeout(timer)
        timer = setTimeout(()=>{
          this.props.actions.addOrgan({
            ...values,
            parentId: this.props.parent.id,
            buildDate: values.buildDate?moment(values.buildDate).format("YYYY-MM-DD"):"",
            staffingKeys: this.getJobLevel().join(),
            noticeKeys: this.handlenNoticeKeys().join(),
            leaderId: leader.id?leader.id:"",
            leaderName: leader.name?leader.name:""
          }, res=>{
            this.props.utils.OpenNotification("success")
            this.props.actions.getTreeDept({})
          })
        }, 500)
        
      }
    });
  }
  onSelect(item){
    const {index, teach} = this.state
    if(typeof index === "number"){
      teach[index-1]={
        id: item.id,
        name: item.name,
      }
      this.setState({teach})
    }else{
      this.setState({leader: {name:item.name, id: item.id,}})
    }
    
  }
  

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, detail, parent} = this.props
    const {dept, staffingList, postCount, nextPostCountSum, teach, teachVisible, leader} = this.state
    
    return (
      <div>
        {teachVisible?<Teach visible={teachVisible} deptId={dept.id}  onCancel={()=>this.setState({teachVisible: false})} 
          onSelect={this.onSelect.bind(this)} />:null}
      
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
              <div className="teach_wrap">
                <Input value={leader.id?leader.name:""} />
                <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({teachVisible: true, index:"leader"})} />
              </div>
            </Form.Item>
            <Form.Item label="联系电话">
              {getFieldDecorator('phone', {
                
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label="成立日期">
              {getFieldDecorator('buildDate', {
                
              })(
                <DatePicker/>
              )}
            </Form.Item>
            {!getFieldValue("deptType") || getFieldValue("deptType")=="5"||getFieldValue("deptType")=="6"||getFieldValue("deptType")=="7"||getFieldValue("deptType")=="8"?null:
            <div>
              <div>
                <Divider  orientation="left"><span style={{fontSize: 14}}>邮件通知对象</span></Divider>
              </div>
              <Form.Item label="通知对象一">
                <div className="teach_wrap">
                  <Input value={teach[0] && teach[0]["id"]?teach[0]["name"]:""} />
                  <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({teachVisible: true, index:1})} />
                </div>
              </Form.Item>
              <Form.Item label="通知对象二">
                <div className="teach_wrap">
                  <Input value={teach[1] && teach[1]["id"]?teach[1]["name"]:""} />
                  <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({teachVisible: true, index:2})} />
                </div>
              </Form.Item>
              <Form.Item label="通知对象三">
                <div className="teach_wrap">
                  <Input value={teach[2] && teach[2]["id"]?teach[2]["name"]:""} />
                  <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({teachVisible: true, index:3})} />
                </div>
              </Form.Item>
            </div>}
            <Form.Item wrapperCol={{ sm: {span: 100, offset: 3} }}>
              <AuthButton auth="3-01-01" type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</AuthButton>
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
      </div>
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