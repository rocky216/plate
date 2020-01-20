import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Row, Col, Form, Input, Select, DatePicker, Icon, Button, Table, Typography, Modal, Divider} from "antd";
import {getDeptDetail, getSupDeptDetail, editOrgan, getTreeDept, deleteOrgan} from "@/actions/systemAction"
import {gradeColumns} from "../columns"
import AuthButton from "@/components/AuthButton"
import Teach from "@/views/person/staff/teach"
import moment from "moment"

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
      postCount: 0,
      teachVisible: false,
      index: 0,
      teach: []
    }
  }

  componentDidMount(){ 
    this.props.actions.getDeptDetail({id: this.props.detail.id}, res=>{
      this.hanlenTeach(res)
      this.setState({info: res, staffingList: res.staffingList})
      this.handlenCount()
      console.log(res, "res")
    })
    this.props.actions.getSupDeptDetail({id: this.props.detail.parentId}, res=>{
      this.setState({dept: res})
    })
    
  }
  hanlenTeach(res){
    let arr = res.noticeConfigList?res.noticeConfigList:[]
    let newArr = []
    _.each(arr, item=>{
      newArr.push({
        name: item.objectName,
        id: item.noticeObjectId
      })
    })
    this.setState({teach:newArr})
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

  handlenNoticeKeys(){
    const {teach, info} = this.state
    if(!info.deptType || info.deptType=="5"||info.deptType=="6"||info.deptType=="7"||info.deptType=="8"){
      return []
    }
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
        console.log('Received values of form: ', values);
        this.props.actions.editOrgan({
          ...values,
          id: this.props.detail.id,
          parentId: this.state.dept?this.state.dept.supDept.id:0,
          staffingKeys: this.getJobLevel().join(),
          noticeKeys: this.handlenNoticeKeys().join(),
          buildDate: values.buildDate?moment(values.buildDate).format("YYYY-MM-DD"):""
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getTreeDept({})
        })
      }
    });
  }
  onSelect(item){
    const {index, teach} = this.state
    teach[index-1]={
      id: item.id,
      name: item.name,
    }
    this.setState({teach})
  }
  

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, detail, onSwitch} = this.props
    const {info, dept, staffingList, postCount, nextPostCountSum, teachVisible, teach} = this.state
    
    return (
      <div>
        {teachVisible?<Teach visible={teachVisible}  deptId={info.id} onCancel={()=>this.setState({teachVisible: false})} 
          onSelect={this.onSelect.bind(this)} />:null}
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
            {getFieldDecorator('buildDate', {
              initialValue: info && info.buildDate?moment(info.buildDate):null
            })(
              <DatePicker/>
            )}
          </Form.Item>
          {!info.deptType || info.deptType=="5"||info.deptType=="6"||info.deptType=="7"||info.deptType=="8"?null:
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
          <Form.Item wrapperCol={{ sm: {span: 18, offset: 6} }}>
            <AuthButton auth="3-01-02" type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</AuthButton>
            <AuthButton auth="3-01-03" type="primary" ghost className="mgl10" onClick={this.handlenDeleteOrgan.bind(this)} ><Icon type="delete" />删除节点</AuthButton>
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
      </div>
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