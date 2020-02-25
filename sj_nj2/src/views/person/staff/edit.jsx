import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Row, Col, Select, Form, Input, TreeSelect, DatePicker, Upload, InputNumber, Cascader} from "antd";
import {getEmployeeDict, getSelectDeptNotSmall, getSelectDeptList, getSelectRole, editEmployee, getStaffDetail} from "@/actions/personAction"
import JCard from "@/components/JCard"
import {staffInfoList} from "./data"
import moment from "moment"
import "./index.less"
import Teach from "./teach"

const { Option } = Select;
const {TreeNode } = TreeSelect
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

class EditStaff extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teach: "",
      visible: false,
      employeeDict: "", 
      deptNotsmall: "",
      deptList: "",
      workspace: "",
      classSpace: "",
      roles: "",
      imgUrl: "",
      colSpan: 8,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getStaffDetail({id: this.props.match.params.id}, detail=>{
      this.setState({detail, teach: {id:detail.directorId, name: detail.directorName}})
      
    })
    this.props.actions.getEmployeeDict({}, res=>this.setState({employeeDict: res}))
    this.props.actions.getSelectDeptNotSmall({}, res2=>{})
    this.props.actions.getSelectRole({}, res3=>{this.setState({ roles: res3})})
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handlenSelect(index, {props}){
    if(props.dataRef.deptType=="4"){
      this.props.actions.getSelectDeptList({
        deptTypes: "5,6",
        parentId: props.dataRef.id
      }, res=>{
        this.setState({deptList: res})
      })
    }else {
      this.setState({deptList: null})
    }
  }

  handlenUpload(info){
    if (info.file.status === 'done') {
      this.setState({imgUrl: info.file.response.data})
    }
  }

  selectTeach(item){
    this.setState({teach: item})
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      console.log(this.state.teach.id, "asasassa")
      // return
      if (!err) {
        
        const {entryTime, regularTime, birthday, startSchool,graduateTime, roleKeys, units} = values
        this.props.actions.editEmployee({
          ...values,
          id: this.props.match.params.id,
          entryTime: entryTime?moment(entryTime).format("YYYY-MM-DD"):null,
          regularTime: regularTime?moment(regularTime).format("YYYY-MM-DD"):null,
          birthday: birthday?moment(birthday).format("YYYY-MM-DD"):null,
          startSchool: startSchool?moment(startSchool).format("YYYY-MM-DD"):null,
          graduateTime: graduateTime?moment(graduateTime).format("YYYY-MM-DD"):null,
          photoaddr: this.state.imgUrl,
          roleKeys: roleKeys?roleKeys.join():"",
          directorId: this.state.teach?this.state.teach.id:"",
          unitId: units?units[0]:"",
          workScoreId: units?units[1]:"",
          classId: units?units[2]:"",
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/person/staff")
        })
      }
    });
  }

  handlenData(arr){
    let arrData = function(arr){
      if(arr && arr.length){
        _.each(arr, item=>{
          item.children = item.nextDept && item.nextDept.length?item.nextDept:null
          item.value = item.id
          item.key = item.id
          item.label = item.deptName
          if(item.nextDept && item.nextDept.length){
            arrData(item.nextDept)
          }
        })
      }
    } 
    arrData(arr)
    return arr
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, deptNotsmall} = this.props
    const {imgUrl, visible, teach, colSpan,employeeDict, deptList, roles, detail} = this.state
    

    return (
      <JCard spinning={spinning} >
        <Teach visible={visible} onCancel={()=>this.setState({visible: false})} onSelect={this.selectTeach.bind(this)} />
        <Card size="small" title={"基本信息"} extra={(
          <div>
            <Button type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
            <Link to="/person/staff" className="mgl10"><Button><Icon type="rollback" />返回</Button></Link>
          </div>
        )} >
          <Form {...formItemLayout}>
            <Row>
              <Col span={18}>
                <Row>
                  <Col span={colSpan} >
                    <Form.Item label="姓名">
                      {getFieldDecorator("name", {
                        initialValue: detail.name,
                        rules: [{required: true, message: '姓名不能为空！'}]
                      })(
                        <Input/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="入职日期">
                      {getFieldDecorator("entryTime",{
                        initialValue: detail.entryTime?moment(detail.entryTime):null,
                      })(<DatePicker/>)}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="人员类别">
                      {getFieldDecorator("personTypeId", { 
                        initialValue: detail.personTypeId,
                      })(
                        <Select>
                          {employeeDict && employeeDict.personTypeList && employeeDict.personTypeList.length?employeeDict.personTypeList.map(item=>(
                            <Option key={item.id} value={item.id}>{item.dictName}</Option>
                          )):null}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="性别">
                      {getFieldDecorator("sex", {
                        initialValue: detail.sex,
                        rules: [{required: true, message: '性别不能为空！'}],
                      })(
                        <Select>
                          <Option value="1">男</Option>
                          <Option value="0">女</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="转正日期">
                      {getFieldDecorator("regularTime", {
                        initialValue: detail.regularTime?moment(detail.regularTime):null,
                      })(
                        <DatePicker/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="岗级">
                      {getFieldDecorator("levelId", {
                        initialValue: detail.levelId,
                        rules: [{required: true, message: '岗级不能为空！'}],
                      })(
                        <Select>
                          {employeeDict && employeeDict.levelList && employeeDict.levelList.length?employeeDict.levelList.map(item=>(
                            <Option key={item.id} value={item.id}>{item.dictName}</Option>
                          )):null}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="状态">
                      {getFieldDecorator("activity",{
                        initialValue: detail.activity,
                        rules: [{required: true, message: '状态不能为空！'}],
                      })(
                        <Select>
                          <Option value="0">待报到</Option>
                          <Option value="1">试用期</Option>
                          <Option value="2">在职</Option>
                          <Option value="3">主动离职</Option>
                          <Option value="4">被动离职</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="试用期限">
                      {getFieldDecorator("probation", {
                        initialValue: detail.probation,
                      })(
                        <InputNumber min={0} style={{width: "100%"}} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="身份证号码">
                      {getFieldDecorator("card", {
                        initialValue: detail.card,
                        rules: [{required: true, message: '身份证号码不能为空！'}],
                      })(
                        <Input/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="职位">
                      {getFieldDecorator("positionId", {
                        initialValue: detail.positionId,
                        rules: [{required: true, message: '身份证号码不能为空！'}],
                      })(
                        <Select>
                          {employeeDict && employeeDict.positionList && employeeDict.positionList.length?employeeDict.positionList.map(item=>(
                            <Option key={item.id} value={item.id}>{item.dictName}</Option>
                          )):null}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="出生日期">
                      {getFieldDecorator("birthday", {
                        initialValue: detail.birthday?moment(detail.birthday):null,
                      })(
                        <DatePicker/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="电话">
                      {getFieldDecorator("phone", {
                        initialValue: detail.phone,
                        rules: [{required: true, message: '电话不能为空！'}],
                      })(
                        <InputNumber style={{width: "100%"}}/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="民族">
                      {getFieldDecorator("nation", {
                        initialValue: detail.nation,
                      })(
                        <Input/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="入职前工作年限">
                      {getFieldDecorator("workyear", {
                        initialValue: detail.workyear,
                      })(
                        <InputNumber min={0} style={{width: "100%"}}/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="QQ">
                      {getFieldDecorator("qq", {
                        initialValue: detail.qq,
                      })(
                        <InputNumber style={{width: "100%"}}/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="婚姻">
                      {getFieldDecorator("matrimonial", {
                        initialValue: detail.matrimonial,
                      })(
                        <Select>
                          <Option value="0">已婚</Option>
                          <Option value="1">未婚</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="入职前行业年限">
                      {getFieldDecorator("industryWorkyear", {
                        initialValue: detail.industryWorkyear,
                      })(
                        <InputNumber min={0} style={{width: "100%"}} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="微信">
                      {getFieldDecorator("wechat", {
                        initialValue: detail.wechat,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="国籍">
                      {getFieldDecorator("nationality", {
                        initialValue: detail.nationality,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="带教">
                      {getFieldDecorator("directorId")(
                        <div className="teach_wrap">
                          <Input  value={teach?teach.name:""} />
                          <Icon className="pulsIcon" type="user-add" onClick={()=>this.setState({visible: true})} />
                        </div>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="邮箱">
                      {getFieldDecorator("email", {
                        initialValue: detail.email,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="职称">
                      {getFieldDecorator("jobtitle", {
                        initialValue: detail.jobtitle,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="来源渠道">
                      {getFieldDecorator("sourceId", {
                        initialValue: detail.sourceId,
                      })(
                        <Select>
                          {employeeDict && employeeDict.sourceList && employeeDict.sourceList.length?employeeDict.sourceList.map(item=>(
                            <Option key={item.id} value={item.id}>{item.dictName}</Option>
                          )):null}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="紧急联系人">
                      {getFieldDecorator("emergency", {
                        initialValue: detail.emergency,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="部门/车间">
                      {getFieldDecorator("mDeptId",{
                        initialValue: detail.mDeptId,
                        rules: [{required: true, message: '选择部门/车间！'}]
                      })(
                        deptNotsmall?<TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll 
                          onSelect={this.handlenSelect.bind(this)}>
                          {this.createNode(deptNotsmall)}
                        </TreeSelect>:<span></span>
                      )}
                    </Form.Item>
                  </Col>
                  {deptList && deptList.length?
                  <Col span={colSpan} >
                    <Form.Item label="单元/工段/班组">
                      {getFieldDecorator("units",{
                        initialValue: deptList && deptList.length?[detail.unitId,detail.workScoreId,detail.classId]:[],
                        rules: [{required: true, message: '单元/工段/班组！'}]
                      })(
                        deptList && deptList.length?
                        <Cascader  options={this.handlenData(deptList)}  />:<span></span>
                      )}
                    </Form.Item>
                  </Col>:null}
                  <Col span={colSpan} >
                    <Form.Item label="紧急联系方式">
                      {getFieldDecorator("emergencyTel", {
                        initialValue: detail.emergencyTel,
                      })(
                        <InputNumber min={0} style={{width: "100%"}} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="衣服尺寸">
                      {getFieldDecorator("clothSize", {
                        initialValue: detail.clothSize,
                      })(
                        <InputNumber min={0} style={{width: "100%"}} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="附属部门">
                      {getFieldDecorator("bDeptId", {
                        initialValue: detail.bDeptId,
                      })(
                        deptNotsmall?<TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll >
                          {this.createNode(deptNotsmall?deptNotsmall:[])}
                        </TreeSelect>:<span></span>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="成本中心">
                      {getFieldDecorator("intoCenterId", {
                        initialValue: detail.intoCenterId,
                      })(
                        <Select>
                          {employeeDict&&employeeDict.intoCenterList && employeeDict.intoCenterList.length?employeeDict.intoCenterList.map(item=>(
                            <Option key={item.id} value={item.id}>{item.dictName}</Option>
                          )):null}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="鞋码">
                      {getFieldDecorator("shoeSize", {
                        initialValue: detail.shoeSize,
                      })(
                        <InputNumber min={0} style={{width: "100%"}} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="备注">
                      {getFieldDecorator("remark", {
                        initialValue: detail.remark,
                      })(
                        <TextArea rows={1}/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="工号">
                      {getFieldDecorator("jobNumber", {
                        initialValue: detail.jobNumber,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="住宿情况">
                      {getFieldDecorator("stayCase", {
                        initialValue: detail.stayCase,
                      })(
                        <Select style={{width: "100%"}}>
                          <Option value="0">住宿舍</Option>
                          <Option value="1">不住宿舍</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="宿舍信息">
                      {getFieldDecorator("stayinfo", {
                        initialValue: detail.stayinfo,
                      })(
                        <TextArea/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="角色">
                      {getFieldDecorator("roleKeys", {
                        initialValue: detail.roleKeys?detail.roleKeys.split(","):[],
                      })(
                        <Select mode="multiple">
                          {roles && roles.length?roles.map(item=>(
                            <Option key={item.id} >{item.roleName}</Option>
                          )):null}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={colSpan} >
                    <Form.Item label="现居住地">
                      {getFieldDecorator("address", {
                        initialValue: detail.address,
                      })(
                        <TextArea/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <div style={{textAlign: "center", widtt: "80px", margin: "20px auto"}}>
                  <Upload
                    showUploadList={false}
                    name="file"
                    action="/api/pc/employee/uploadEmployeeHead/"
                    data={{token: utils.getCookie("token")}}
                    onChange={this.handlenUpload.bind(this)}
                  >
                    {imgUrl?<img  src={IMGURL+imgUrl} style={{width: "100px", height: "100px", borderRadius:"50%" }} />
                    :<i className="icon iconfont icon-yuangong" style={{fontSize: "100px"}} />}
                  </Upload>
                </div>
                <Form.Item label="毕业学校">
                  {getFieldDecorator("finishSchool", {
                    initialValue: detail.finishSchool,
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="学历">
                  {getFieldDecorator("education", {
                    initialValue: detail.education,
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="专业">
                  {getFieldDecorator("profession", {
                    initialValue: detail.profession
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="入学时间"> 
                  {getFieldDecorator("startSchool", {
                    initialValue: detail.startSchool?moment(detail.startSchool):"",
                  })(
                    <DatePicker/>
                  )}
                </Form.Item>
                <Form.Item label="毕业时间">
                  {getFieldDecorator("graduateTime", {
                    initialValue: detail.graduateTime?moment(detail.graduateTime):"",
                  })(
                    <DatePicker/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            
          </Form>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getEmployeeDict, getSelectDeptNotSmall, getSelectDeptList, getSelectRole,getStaffDetail, editEmployee}, dispatch)
  }
}

function mapStateProps(state){
  return {
    deptNotsmall: state.person.deptNotsmall,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditStaff) ) 