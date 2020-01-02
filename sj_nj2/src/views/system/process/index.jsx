import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Switch, Form, Input, Select} from "antd";
import JCard from "@/components/JCard"
import {getProcess, changeProcessStatus} from "@/actions/systemAction"
import {processColumns} from "../columns"
import {flowType} from "./data"

const {Option} = Select


class Process extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current:1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getProcess(this.state.params)
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
      render(){
        return (
          <div>
            <Button size="small" type="link" >编辑</Button>
            <Button size="small" type="link" >删除</Button>
          </div>
        )
      }
    }])
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, process} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Link to="/system/process/add"><Button type="primary"><Icon type="plus" />新建流程</Button></Link>}>
          <div className="fixedend mgb10">
            <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
              <Form.Item label="流程类型">
                {getFieldDecorator('flowType')(
                  <Select style={{width: 120}}>
                    {flowType.map(item=>(
                      <Option key={item.value} value={item.value}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('status')(
                  <Select style={{width: 100}}>
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
              </Form.Item>
            </Form>
          </div>
          <Table size="small" columns={this.getCol()} dataSource={process?utils.addIndex(process.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getProcess, changeProcessStatus}, dispatch)
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