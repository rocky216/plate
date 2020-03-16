import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Form, Input, DatePicker, TreeSelect, Row, Col, Button, Icon} from "antd";
import {loadMAttendanceInit, loadSelectDeptByRole} from "@/actions/personAction"
import {monthAttend} from "../columns"
import "./index.less"
import moment from "moment"

const {TreeNode} = TreeSelect
const {MonthPicker} = DatePicker

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

class MonthAttend extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      columnsCol: [],
      monthData: [],
      deptList: "",
      params: {
        mDate:"",
        name:"",
        jobNumber:"",
        deptType:"",
        deptId:"",
      }
    }
  }

  componentDidMount(){
    this.props.actions.loadSelectDeptByRole({loadType: 0, roleUrl: "/api/pc/absence"}, res=>{
      this.setState({deptList: res})
    })
    this.initial({})
  }
  initial(params){
    this.props.actions.loadMAttendanceInit(params, res=>{
      this.handlenColumns(res)
      // this.setState({data: res})
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }

  handlenColumns(data){
    if(!data || !data.length) {
      this.setState({columnsCol:[], monthData: res})
      return
    }
    let res = _.cloneDeep(data)
    let count = res[0]["sumTimeM"]
    let col = []
    for(let i=1;i<=count;i++){
      col.push({
        title: String((i>9?i:'0'+i)),
        children: [
          {
            title: "计划性出勤时长",
            dataIndex: "a"+(i>9?i:'0'+i),
            key: Math.random()+i,
            render(item){
              return item.attenH
            }
          },
          {
            title: "出勤异常",
            dataIndex: "a"+(i>9?i:'0'+i),
            key: Math.random()+i,
            render(item){
              return item.leaveType? item.leaveType:"-"
            }
          },
          {
            title: "非计划出勤时长",
            dataIndex: "a"+(i>9?i:'0'+i),
            key: Math.random()+i,
            render(item){
              return item.workH
            }
          },
        ]
      })
    }
    _.each(res, item=>{
      for(let i=1;i<=count;i++){
        let index = _.findIndex(item.attenDList, o=>o.attenTimeD==i)
        if(index==-1){
          item.attenDList.push({
            attenH: "-",
            attenTime: "",
            attenTimeD: i,
            attenType: "-",
            leaveCheck: "-",
            leaveH: "-",
            leaveType: "-",
            workCheck: "-",
            workH: "-",
          })
          
        }
      }
    })
    _.each(res, item=>{
      _.each(item.attenDList, elem=>{
        item[String("a"+(elem.attenTimeD>9?elem.attenTimeD:'0'+elem.attenTimeD))] = elem
      })
    })
    let newCol = monthAttend.concat(col)
    console.log(newCol, "newCol")
    
    this.setState({columnsCol:newCol, monthData: res})
  }
  handlenDeptType(key,arr, {triggerNode}){
    const {params} = this.state
    params.deptType = triggerNode.props.dataRef.deptType
    this.setState({params})
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      const {params, } = this.state
      const {name, jobNumber, mDate, deptId} = values
      params.name = name
      params.jobNumber = jobNumber
      params.deptId = deptId
      params.mDate = mDate?moment(mDate).format("YYYY-MM"):""
      this.setState({params})
      this.initial(params)
    })
  }

  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      mDate:"",
      name:"",
      jobNumber:"",
      deptType:"",
      deptId:"",
    }
    this.initial(obj)
    this.setState({params:obj})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils} = this.props
    const {monthData, columnsCol, deptList} = this.state
    
    return (
      <div className="monthAttend">
        <Card bordered={false}>
          <div className="fixedend mgb10">
            <Form  layout="inline" onSubmit={this.handleSubmit.bind(this)}>
              <Form.Item label="姓名">
                {getFieldDecorator('name')(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item label="工号">
                {getFieldDecorator('jobNumber')(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item  label="组织机构">
                {getFieldDecorator('deptId', {
                  initialValue: ""
                })(
                  deptList && deptList.length?
                  <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll 
                    style={{width: 150}}
                    onChange={this.handlenDeptType.bind(this)}  >
                    {this.createNode(deptList)}
                  </TreeSelect>:<span></span>
                )}
              </Form.Item>
              <Form.Item label="考勤月份">
                {getFieldDecorator('mDate')(
                  <MonthPicker/>
                )}
              </Form.Item>
              <Form.Item >
                <Button type="primary" className="mgl10" htmlType="submit"><Icon type="search" />搜索</Button>
                <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
              </Form.Item>
            </Form>
          </div>
          <Table size="small" bordered columns={columnsCol} dataSource={utils.addIndex(monthData)} scroll={{ x: 8000, }} />
        </Card>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadMAttendanceInit, loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(MonthAttend) )