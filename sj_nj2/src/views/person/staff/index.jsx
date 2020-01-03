import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Form, Row, Col, Input, DatePicker, TreeSelect} from "antd";
import JCard from "@/components/JCard"
import {getStaff, loadSelectDeptByRole} from "@/actions/personAction"
import {staffColumns} from "../columns"
import AddQuit from "./quit"

const {RangePicker } = DatePicker;
const {TreeNode} = TreeSelect 

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
      deptList: []
    }
  }

  componentDidMount(){
    this.props.actions.getStaff({current: 1})
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
            <Button size="small" type="link" >调岗</Button>
            <Button size="small" type="link" >删除</Button>
          </div>
        )
      }
    }])
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, staff} = this.props
    const {quitVisible, quitDetail, deptList} = this.state

    return (
      <JCard spinning={spinning}>
        {quitDetail?<AddQuit visible={quitVisible} detail={quitDetail} onCancel={()=>this.setState({quitVisible: false, quitDetail:""})} />:null}
        
        <Card size="small" title={<Link to="/person/staff/add"><Button type="primary"><Icon type="plus" />新增员工</Button></Link>}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col span={4}>
                <Form.Item label="姓名">
                  {getFieldDecorator('name')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="性别">
                  {getFieldDecorator('sex')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="入职日期">
                  {getFieldDecorator('time')(<RangePicker />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="成本中心">
                  {getFieldDecorator('intoCenterId')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="岗级">
                  {getFieldDecorator('levelId')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="工号">
                  {getFieldDecorator('jobNumber')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="状态">
                  {getFieldDecorator('activity')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="组织机构">
                  {getFieldDecorator('selectDeptType')(
                    <TreeSelect>
                      {this.createNode(deptList)}
                    </TreeSelect>
                  )}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="人员类别">
                  {getFieldDecorator('personTypeId')(<Input />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item >
                  <Button type="primary" className="mgl10" htmlType="submit"><Icon type="search" />搜索</Button>
                  <Button className="mgl10"><Icon type="retweet" />重置</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          
          
          <Table size="small" bordered 
            columns={this.getCol()} 
            dataSource={staff?utils.addIndex(staff.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStaff, loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    staff: state.person.staff,
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Staff) )