import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Row, Col, Select, Form, Input, TreeSelect, DatePicker, Upload} from "antd";
import {getEmployeeDict, getSelectDeptNotSmall, getSelectDeptList, getSelectRole, editEmployee, getStaffDetail} from "@/actions/personAction"
import JCard from "@/components/JCard"
import {staffInfoList} from "./data"
import moment from "moment"
import "./index.less"
import Teach from "./teach"
import StaffAccount from "./account"

const { Option } = Select;
const {TreeNode } = TreeSelect

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
      accountVisible: false,
      infoList: [],
      employeeDict: "", 
      deptNotsmall: "",
      deptList: "",
      workspace: "",
      classSpace: "",
      roles: "",
      imgUrl: "",
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getStaffDetail({id: this.props.match.params.id}, detail=>{
      this.setState({detail, imgUrl:detail.photoaddr, 
        teach: {id:detail.directorId, name: detail.directorName}})
      this.props.actions.getEmployeeDict({}, res1=>{
        this.props.actions.getSelectDeptNotSmall({}, res2=>{
          this.props.actions.getSelectRole({}, res3=>{

            if(detail.mDeptType=="4"){
              this.props.actions.getSelectDeptList({
                loadType:"0",
                parentId: detail.mDeptId
              }, res4=>{
                this.setState({infoList: 
                  staffInfoList(this, {detail, employeeDict: res1, deptNotsmall: res2, roles: res3, deptList: res4}), 
                  employeeDict: res1, deptNotsmall: res2, roles: res3, deptList: res4})
              })
            }else{
              this.setState({infoList: 
                staffInfoList(this, {detail, employeeDict: res1, deptNotsmall: res2, roles: res3, deptList: null}), 
                employeeDict: res1, deptNotsmall: res2, roles: res3, deptList: null})
            }
            
            
          })
        })
      })
    })
    
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  

  handlenSelect(index, {props}){
    const {detail, employeeDict, deptNotsmall,roles} = this.state
    if(props.dataRef.deptType=="4"){
      this.props.actions.getSelectDeptList({
        deptTypes: "5,6",
        parentId: props.dataRef.id
      }, res=>{
        this.setState({infoList: staffInfoList(this, {detail,employeeDict, deptNotsmall,roles, deptList: res}), deptList: res})
      })
    }else {
      console.log("asas")
      this.setState({infoList: staffInfoList(this, {detail,employeeDict, deptNotsmall,roles, deptList: null}), deptList: null})
    }
  }

 
  handlenTeam(id, {props}){
    const {detail,employeeDict, deptNotsmall, deptList, workspace, roles} = this.state
    if(props.dataRef.deptType=="7"){
      this.props.actions.getSelectDeptList({
        deptTypes: "8",
        parentId: props.dataRef.id
      }, res=>{
        this.setState({infoList: staffInfoList(this, {detail,employeeDict, deptNotsmall,roles, deptList, workspace, classSpace: res}), classSpace: res})
      })
    }else{
      this.setState({infoList: staffInfoList(this, {detail,employeeDict, deptNotsmall,roles, deptList, workspace, classSpace: null}), classSpace: null})
    }
  }

  handlenUpload(info){
    if (info.file.status === 'done') {
      this.setState({imgUrl: info.file.response.data})
    }
  }

  selectTeach(item){
    const {detail,employeeDict, deptNotsmall, deptList, workspace, roles, classSpace} = this.state
    this.setState({teach: item})
    setTimeout(()=>{
      this.setState({infoList: staffInfoList(this, {detail, employeeDict, deptNotsmall,roles, deptList, workspace, classSpace}) })
    },100)
    
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

  

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, employeedict, deptNotsmall} = this.props
    const {infoList, imgUrl, visible, teach, accountVisible, detail} = this.state

    return (
      <JCard spinning={spinning} >
        {detail && accountVisible?<StaffAccount visible={accountVisible} detail={detail} onCancel={()=>this.setState({accountVisible: false})} />:null}
        
        <Teach visible={visible} onCancel={()=>this.setState({visible: false})} onSelect={this.selectTeach.bind(this)} />
        <Card size="small" title={(
          <div><span>基本信息</span>
            <Button type="primary" onClick={()=>this.setState({accountVisible: true})} ghost style={{marginLeft: 20}}>平台账号</Button>
          </div>
        )} extra={(
          <div>
            <Button type="primary" onClick={this.handlenSubmit.bind(this)} ><Icon type="save" />保存</Button>
            <Link to="/person/staff" className="mgl10"><Button><Icon type="rollback" />返回</Button></Link>
          </div>
        )} >
          <Form {...formItemLayout}>
            <Row>
              <Col span={18}>
                <Row>
                  {infoList.map((item, index)=>(
                    item.hide?null
                    :<Col span={8} key={index}>
                      <Form.Item label={item.title}>
                        {getFieldDecorator(item.value, {
                          initialValue: item.initialValue?item.initialValue:null,
                          rules: item.rules?item.rules:null
                        })(item.type)}
                      </Form.Item>
                    </Col>
                  ))}
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
    actions: bindActionCreators({getEmployeeDict, getSelectDeptNotSmall, getSelectDeptList, getSelectRole, editEmployee, getStaffDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    deptNotsmall: state.person.deptNotsmall,
    employeedict: state.person.employeedict,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(EditStaff) ) 