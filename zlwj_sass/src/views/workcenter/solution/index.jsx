import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Card, Table, Button, Icon, Form, Input, Select} from "antd";
import JCard from "@/components/JCard"
import {getOneCardSystem} from "@/actions/otherAction"
import {onecardColumns} from "../colmuns"
import AddSolution from "./add"
import EditSolution from "./edit"
import Recharge from "./recharge"

const {Option } = Select

let params = {
  current: 1,
  cardType: "",
  status: "",
  selectCardNumber: "",
  selectType: ""
}

class Solution extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      rechargeVisible: false,
      reDetail: "",
      // params: {
      //   current: 1,
      // }
    }
  }

  componentDidMount(){
    this.props.actions.getOneCardSystem(params)
  }

  getCol(){
    let _this = this
    return onecardColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
            <Link to={`/workcenter/solution/${item.id}/log`}>
              <Button type="link">一卡通日志</Button>
            </Link>
            
            <Button type="link" onClick={()=>_this.setState({rechargeVisible: true, reDetail: item})}>充值</Button>
          </div>
        )
      }
    }])
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {addVisible} = values
        _.assign(params, values)
        this.props.actions.getOneCardSystem(params)
      }
    });
  }

  render(){
    const {getFieldDecorator } = this.props.form
    const {utils, spinning, onecard} = this.props
    const {addVisible, editVisible, detail, rechargeVisible, reDetail} = this.state

    return (
      <JCard spinning={spinning}>
        {rechargeVisible && reDetail?
        <Recharge visible={rechargeVisible} detail={reDetail} onCancel={()=>this.setState({rechargeVisible: false, reDetail:""})} />:null}
        <AddSolution visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible && detail?
        <EditSolution visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />添加一卡通</Button>} >
        <div className="flexend mgb10">
          <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item label="卡类型" >
            {getFieldDecorator('cardType', {
              initialValue: params.cardType
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="0">普通卡</Option>
                <Option value="1">工作卡</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              initialValue: params.status
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="0">正常</Option>
                <Option value="1">作废</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="卡号" >
            {getFieldDecorator('selectCardNumber', {
              initialValue: params.selectCardNumber
            })(
              <Input/>,
            )}
          </Form.Item>
          <Form.Item label="卡型号" >
            {getFieldDecorator('selectType', {
              initialValue: params.selectType
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="ic">IC卡</Option>
                <Option value="id">ID卡</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" ><Icon type="search" />搜索</Button>
        </Form.Item>
        </Form>
        </div>
          <Table columns={this.getCol()} dataSource={onecard?utils.addIndex(onecard.list):[]} 
          pagination={utils.Pagination(onecard, page=>{
            params.current = page
            
            this.props.actions.getOneCardSystem(params)
          })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOneCardSystem}, dispatch)
  }
}

function mapStateProps(state){
  return {
    onecard: state.other.onecard,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Solution) )