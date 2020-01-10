import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Form, Row, Col, Input, DatePicker, TreeSelect, Select, Popconfirm, Upload, Modal} from "antd";
import JCard from "@/components/JCard"
import {getStaff, loadSelectDeptByRole, getEmployeeDict, deleteStaff} from "@/actions/personAction"
import {staffColumns} from "../columns"
import AddQuit from "./quit"
import AddPosts from "./posts"
import moment from "moment"

const {RangePicker } = DatePicker;
const {TreeNode} = TreeSelect 
const {Option} = Select

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

class Staff extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quitVisible: false,
      quitDetail: "",
      postsVisible: false,
      postsDetail: "",
      deptList: [],
      exportUrl: "",
      params: {
        current: 1,
        name: "",
        jobNumber: "",
        sex: "",
        activity: "",
        selectStartEntryTime: "",
        selectEndEntryTime: "",
        selectDeptType: "",
        selectDeptId: "",
        levelId: "",
        intoCenterId: "",
        personTypeId: ""
      }
    }
  }

  componentDidMount(){
    this.export()
    this.props.actions.getEmployeeDict({},res=>{

    })
    this.props.actions.getStaff(this.state.params)
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/employee"}, res=>{
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
    this.props.actions.deleteStaff({id: item.id}, res=>{
      this.props.actions.getStaff(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }

  export(){
    const {utils} = this.props
    const {params} = this.state
    let str = ""
    _.each(params,(item, key)=>{
      str+=`&${key}=${item==undefined?"":item}`
    })
    let token = utils.getCookie("token")
    this.setState({exportUrl: `${IMGURL}/api/pc/employee/exportEmployee/?token=${token}${str}`})
  }

  getCol(){
    let _this = this
    return staffColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/person/staff/${item.id}/edit`}>
              <Button size="small" type="link" >编辑</Button>
            </Link>
            <Button size="small" type="link" onClick={()=>_this.setState({quitVisible: true, quitDetail: item})} >离职</Button>
            <Button size="small" type="link" onClick={()=>_this.setState({postsVisible: true, postsDetail: item})} >调岗</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button size="small" type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  deptTypeChange(key,name,{triggerNode}){
    let o = triggerNode.props.dataRef.deptType
    console.log(o,"00")
    const {params} = this.state
    params.selectDeptType = o
    this.setState({params})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {params} = this.state
        const {name, jobNumber, sex, activity, time, levelId, intoCenterId, personTypeId, selectDeptId} = values
        params.name = name
        params.jobNumber = jobNumber
        params.sex = sex
        params.activity = activity
        params.levelId = levelId
        params.intoCenterId = intoCenterId
        params.personTypeId = personTypeId
        params.selectDeptId = selectDeptId
        params.selectStartEntryTime = time && time.length? moment(time[0]).format("YYYY-MM-DD"):""
        params.selectEndEntryTime = time && time.length? moment(time[1]).format("YYYY-MM-DD"):""
        this.setState({params})
        console.log('Received values of form: ', values);
        this.props.actions.getStaff({
          ...params
        })
        this.export()
      }
    });
  }

  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      current: 1,
      name: "",
      jobNumber: "",
      sex: "",
      activity: "",
      selectStartEntryTime: "",
      selectEndEntryTime: "",
      selectDeptType: "",
      selectDeptId: "",
      levelId: "",
      intoCenterId: "",
      personTypeId: ""
    }
    this.setState({params: obj})
    this.props.actions.getStaff({current: 1})
    this.export()
  }
  handlenImport(info){
    const { status, response } = info.file;
    console.log(info)
    if (status === 'done') {
      if(response.code=="1"){
        this.props.utils.OpenNotification("success")
      }else{
        this.props.utils.OpenNotification("error", response.msg)
        Modal.info({
          title:response.msg,
          content: (
            <div>
              {response.data && response.data.length?response.data.map((item, index)=>(
                <p key={index} style={{color: item.type=="info"?"#1890ff":"red"}}>{item.info}</p>
              )):null}
            </div>
          )
        })
      }
    } 
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, staff, employeedict} = this.props
    const {quitVisible, quitDetail, deptList, params, postsVisible, postsDetail, exportUrl} = this.state
    
    return (
      <JCard spinning={spinning}>
        {quitDetail?<AddQuit visible={quitVisible} detail={quitDetail} onCancel={()=>this.setState({quitVisible: false, quitDetail:""})} />:null}
        {postsVisible?<AddPosts  visible={postsVisible} detail={postsDetail} onCancel={()=>this.setState({postsVisible: false, postsDetail:""})}/>:null}
        <Card size="small" title={(
          <div>
            <Link to="/person/staff/add"><Button type="primary"><Icon type="plus" />新增员工</Button></Link>
          </div>
        )} extra={(
          <div>
            <Upload 
              showUploadList={false}
              action={`/api/pc/employee/importEmployee/`}
              data={{token: utils.getCookie("token")}}
              onChange={this.handlenImport.bind(this)}
            >
              <Button type="primary" ghost className="mgr10"><Icon type="import" />导入员工</Button>
            </Upload>
            <a href={exportUrl}>
              <Button type="danger" ghost className="mgr10"><Icon type="export" />导出员工</Button>
            </a>
            <a href={`${IMGURL}/file/importEmployeeModel.xlsx`}>
              <Button type="link"  className="mgr10">下载模板</Button>
            </a>
            <Button type="primary"  className="mgr10"><Icon type="setting" />设置通知参数</Button>
          </div>
        )}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col span={4}>
                <Form.Item label="姓名">
                  {getFieldDecorator('name')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="性别">
                  {getFieldDecorator('sex')(
                    <Select style={{width: "100%"}}>
                      <Option value="">全部</Option>
                      <Option value="1">男</Option>
                      <Option value="0">女</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="入职日期">
                  {getFieldDecorator('time')(<RangePicker />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="成本中心">
                  {getFieldDecorator('intoCenterId')(
                    <Select>
                      <Option value="">全部</Option>
                      {employeedict && employeedict.intoCenterList?employeedict.intoCenterList.map(item=>(
                        <Option key={item.id} value={item.id}>{item.dictName}</Option>
                      )):null}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="岗级">
                  {getFieldDecorator('levelId')(
                    <Select>
                      <Option value="">全部</Option>
                      {employeedict && employeedict.levelList?employeedict.levelList.map(item=>(
                        <Option key={item.id} value={item.id}>{item.dictName}</Option>
                      )):null}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="工号">
                  {getFieldDecorator('jobNumber')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="状态">
                  {getFieldDecorator('activity')(
                    <Select>
                      <Option value="">全部</Option>
                      <Option value="0">待报到</Option>
                      <Option value="1">试用期</Option>
                      <Option value="2">在职</Option>
                      <Option value="3">主动离职</Option>
                      <Option value="4">被动离职</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="组织机构">
                  {getFieldDecorator('selectDeptId')(
                    deptList && deptList.length?
                    <TreeSelect treeDefaultExpandAll onChange={this.deptTypeChange.bind(this)}>
                      {this.createNode(deptList)}
                    </TreeSelect>:<span></span>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="人员类别">
                  {getFieldDecorator('personTypeId')(
                    <Select>
                      <Option value="">全部</Option>
                      {employeedict && employeedict.personTypeList?employeedict.personTypeList.map(item=>(
                        <Option key={item.id} value={item.id}>{item.dictName}</Option>
                      )):null}
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
          
          
          <Table size="small" bordered 
            columns={this.getCol()} 
            pagination={utils.Pagination(staff, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getStaff(params)
            })}
            dataSource={staff?utils.addIndex(staff.list):[]} 
            />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaff, loadSelectDeptByRole, getEmployeeDict, deleteStaff}, dispatch)
  }
}

function mapStateProps(state){
  return {
    employeedict: state.person.employeedict,
    staff: state.person.staff,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Staff) )