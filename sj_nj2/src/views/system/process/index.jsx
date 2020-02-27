import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Switch, Form, Input, Select, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getProcess, changeProcessStatus, deleteProcess} from "@/actions/systemAction"
import {processColumns} from "../columns"
import {flowType} from "./data"
import AuthButton from "@/components/AuthButton"

const {Option} = Select


class Process extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current:1,
        flowName: "",
        flowType: "",
        status: ""
      }
    }
  }

  componentDidMount(){
    this.initial(this.state.params)
  }
  initial(params){
    this.props.actions.getProcess(params)
  }

  handlenChange(rows){
    this.props.actions.changeProcessStatus({
      id: rows.id,
      status: rows.status=="0"?"1":"0"
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getProcess(this.state.params)
    })
  } 

  handlenDelete(item){
    this.props.actions.deleteProcess({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getProcess(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return processColumns.concat([{
      title: "状态",
      dataIndex: "status",
      render(item, rows){
        return <Switch size="small" onChange={_this.handlenChange.bind(_this,rows)} checked={item=="0"?true:false} />
      }
    },{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/system/process/${item.id}/edit`}>
              <AuthButton auth="3-04-02" size="small" type="link" >修改</AuthButton>
            </Link>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <AuthButton auth="3-04-03" size="small" type="link" >删除</AuthButton>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {params} = this.state
        const {flowName, flowType, status} = values
        params.flowName = flowName
        params.flowType = flowType
        params.status = status
        this.initial(params)
        this.setState({params})
      }
    });
  }
  hanlenReset(){
    this.props.form.resetFields()
    let obj = {
      current:1,
      flowName: "",
      flowType: "",
      status: ""
    }
    this.setState({params:obj})
    this.initial(obj) 
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, process, } = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/system/process/add"><AuthButton auth="3-04-01" type="primary"><Icon type="plus" />新建流程</AuthButton></Link>}>
          <div className="fixedend mgb10">
            <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
              <Form.Item label="流程类型">
                {getFieldDecorator('flowType', {
                  initialValue: this.state.params.flowType
                })(
                  <Select style={{width: 120}}>
                    <Option value="">全部</Option>
                    {flowType.map(item=>(
                      <Option key={item.value} value={item.value}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('status', {
                  initialValue: this.state.params.status
                })(
                  <Select style={{width: 100}}>
                    <Option value="">全部</Option>
                    <Option value="0">生效</Option>
                    <Option value="1">不生效</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="流程名称">
                {getFieldDecorator('flowName')(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                <Button className="mgl10" onClick={this.hanlenReset.bind(this)}><Icon type="rollback" />重置</Button>
              </Form.Item>
            </Form>
          </div>
          <Table size="small" columns={this.getCol()} dataSource={process?utils.addIndex(process.list):[]} 
            pagination={utils.Pagination(process, page=>{
              params.current=page
              this.setState({params})
              this.props.actions.getProcess(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getProcess, changeProcessStatus, deleteProcess}, dispatch)
  }
}

function mapStateProps(state){
  return {
    process: state.system.process,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Process) )