import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Row, Col, Select, Form, Input, TreeSelect, DatePicker, Upload} from "antd";
import {getEmployeeDict, getSelectDeptNotSmall, getSelectDeptList, getSelectRole, addEmployee} from "@/actions/personAction"
import JCard from "@/components/JCard"
import {staffInfoList} from "./data"
import moment from "moment"
import "./index.less"
import Teach from "./teach"

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

class AddStaff extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      teach: "",
      visible: false,
      infoList: [],
      employeeDict: "", 
      deptNotsmall: "",
      deptList: "",
      workspace: "",
      classSpace: "",
      roles: "",
      imgUrl: ""
    }
  }

  componentDidMount(){
    this.props.actions.getEmployeeDict({}, res1=>{
      this.props.actions.getSelectDeptNotSmall({}, res2=>{
        this.props.actions.getSelectRole({}, res3=>{
          this.setState({infoList: 
            staffInfoList(this, {employeeDict: res1, deptNotsmall: res2, roles: res3}), 
            employeeDict: res1, deptNotsmall: res2, roles: res3})
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
    console.log(props.dataRef)
    const {employeeDict, deptNotsmall,roles} = this.state
    if(props.dataRef.deptType=="4"){
      this.props.actions.getSelectDeptList({
        deptTypes: "5,6",
        parentId: props.dataRef.id
      }, res=>{
        this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList: res}), deptList: res})
      })
    }else {
      this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList: null}), deptList: null})
    }
  }

  handlenUnit(id, {props}){
    const {employeeDict, deptNotsmall, deptList, roles} = this.state
    if(props.dataRef.deptType=="6"){
      this.props.actions.getSelectDeptList({
        deptTypes: "7",
        parentId: props.dataRef.id
      }, res=>{
        this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList, workspace: res}), workspace: res})
      })
    }else{
      this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList, workspace: null}), workspace: null})
    }
    
  }
  handlenTeam(id, {props}){
    const {employeeDict, deptNotsmall, deptList, workspace, roles} = this.state
    if(props.dataRef.deptType=="7"){
      this.props.actions.getSelectDeptList({
        deptTypes: "8",
        parentId: props.dataRef.id
      }, res=>{
        this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList, workspace, classSpace: res}), classSpace: res})
      })
    }else{
      this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList, workspace, classSpace: null}), classSpace: null})
    }
  }

  handlenUpload(info){
    if (info.file.status === 'done') {
      console.log(info, "info1")
      // Get this url from response in real world.
      this.setState({imgUrl: info.file.response.data})
    }
  }

  selectTeach(item){
    const {employeeDict, deptNotsmall, deptList, workspace, roles, classSpace} = this.state
    this.setState({teach: item})
    setTimeout(()=>{
      this.setState({infoList: staffInfoList(this, {employeeDict, deptNotsmall,roles, deptList, workspace, classSpace}) })
    },100)
    
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      
      if (!err) {
        
        const {entryTime, regularTime, birthday, startSchool,graduateTime, roleKeys, units} = values
        this.props.actions.addEmployee({
          ...values,
          entryTime: entryTime?moment(entryTime).format("YYYY-MM-DD"):null,
          regularTime: regularTime?moment(regularTime).format("YYYY-MM-DD"):null,
          birthday: birthday?moment(birthday).format("YYYY-MM-DD"):null,
          startSchool: startSchool?moment(startSchool).format("YYYY-MM-DD"):null,
          graduateTime: graduateTime?moment(graduateTime).format("YYYY-MM-DD"):null,
          photoaddr: this.state.imgUrl,
          roleKeys: roleKeys?roleKeys.join():"",
          directorId: this.state.teach.id,
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
    const {infoList, imgUrl, visible, teach} = this.state
    

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
                  {infoList.map((item, index)=>(
                    item.hide?null
                    :<Col span={8} key={index}>
                      <Form.Item label={item.title}>
                        {getFieldDecorator(item.value, {
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
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="学历">
                  {getFieldDecorator("education", {
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="专业">
                  {getFieldDecorator("profession", {
                  })(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item label="入学时间"> 
                  {getFieldDecorator("startSchool", {
                  })(
                    <DatePicker/>
                  )}
                </Form.Item>
                <Form.Item label="毕业时间">
                  {getFieldDecorator("graduateTime", {
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
    actions: bindActionCreators({getEmployeeDict, getSelectDeptNotSmall, getSelectDeptList, getSelectRole, addEmployee}, dispatch)
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

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddStaff) ) 