import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Row, Col, Form, TreeSelect, Button, Icon} from "antd";
import {employeeSourceDistribute, loadSelectDeptByRole } from "@/actions/personAction"
import {option } from "./data"
import ReactEcharts from 'echarts-for-react';

const {TreeNode} = TreeSelect

class PersonSource extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deptList:[],
      columns: [],
      data: "",
      allOption: "",
      workerOption: "",
      staffOption: "",
      params: {
        deptId: ""
      }
    }
  }
  componentDidMount(){
    this.initial({})
    this.props.actions.loadSelectDeptByRole({loadType: 1, roleUrl: "/api/pc/hResourceAnalysis"}, res=>{
      this.setState({deptList: res})
    })
  }
  initial(params){
    this.props.actions.employeeSourceDistribute(params, res=>{
      this.setState({columns: this.handlenCol(res), data:res, 
        allOption: this.handlenOption(res, "all"),
        workerOption: this.handlenOption(res, "worker"),
        staffOption: this.handlenOption(res, "staff"),})
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  handlenCol(res){
    let arr = [{
      title: "分类",
      dataIndex:"type",
      render(item){
        switch(item){
          case "staff":
            return "职员"
          case "worker":
            return "工人"
          case "all":
            return "合计"
        }
      }
    }]
    if(_.isArray(res) || res.length){
      _.each(res[0], (item, attr)=>{
        if(attr!=="type"){
          arr.push({
            title:attr,
            dataIndex: attr
          })
        }
        
      })
    }
    return arr
  }
  handlenOption(res,type){
    let newArr = []
    if(_.isArray(res) || res.length){
      let arr = _.filter(res, o=>o.type==type)[0]
      _.each(arr, (item, attr)=>{
        if(attr!=="type"){
          newArr.push({
            name: attr,
            value: item
          })
        }
      })
      let opt = _.cloneDeep(option)
      opt.title.text=type=="all"?"人员来源分布图":type=="staff"?"职员来源分布图":"工人来源分布图"
      opt.series[0]['data'] = newArr
      console.log(opt, "opt")
      return opt
    }
    return ""
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {params} = this.state
      params.deptId = values.deptId
      this.setState({params})
      this.initial(params)
    })
  }
  handlenReset(){
    this.props.form.resetFields()
    this.setState({params:{deptId:""}})
    this.initial({})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils} = this.props
    const {columns, data, allOption, workerOption, staffOption, deptList} = this.state
    return (
      <div>
        <Form layout="inline" className="fixedend mgb10" onSubmit={this.handleSearch.bind(this)}>
          <Form.Item  label="统计车间/部门">
            {getFieldDecorator('deptId')(
              deptList && deptList.length?
              <TreeSelect dropdownClassName="dropdownStyle" treeDefaultExpandAll style={{width: 150}}>
                {this.createNode(deptList)}
              </TreeSelect>:<span></span>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
            <Button className="mgl10" onClick={this.handlenReset.bind(this)}><Icon type="retweet" />重置</Button>
          </Form.Item>
        </Form>
        <Table size="small" columns={columns} dataSource={data?utils.addIndex(data):[]} pagination={false} />
        <Row className="mgt10">
          <Col span={8}>
            {allOption?<ReactEcharts option={allOption} />:null}
          </Col>
          <Col span={8}>
            {staffOption?<ReactEcharts option={staffOption} />:null}
          </Col>
          <Col span={8}>
            {workerOption?<ReactEcharts option={workerOption} />:null}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({employeeSourceDistribute, loadSelectDeptByRole}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(PersonSource) )