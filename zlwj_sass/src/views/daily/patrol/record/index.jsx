import React from "react"
import {connect} from "react-redux"
import {Switch, Route} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Button, Card, Table, Select, DatePicker, Form} from "antd";
import {getPpPatrolRecord} from "@/actions/dailyAction"
import {patrolRecordColmuns} from "../../colmuns"
import moment from "moment"
import DetailPatrolRecord  from "./detial"

const {Option} = Select
const {RangePicker} = DatePicker


let params = {
  current: 1,
  startTime:"",
  endTime:"",
  recordStatus: "",
}

class DailyPatrolRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      detail: ""
    }
  }
  
  componentDidMount(){
    this.props.actions.getPpPatrolRecord(params)
  }

  getCol(){
    let _this = this
    return patrolRecordColmuns.concat([{
      title: "操作",
      render(item) {
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({visible: true, detail: item})}>查看</Button>
          </div>
        );
      }
    }])
  }

  handlenSearch(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      const {time, recordStatus} = values
      params.startTime = time && time.length?moment(time[0]).format("YYYY-MM-DD"):""
      params.endTime = time && time.length?moment(time[1]).format("YYYY-MM-DD"):""
      params.recordStatus = recordStatus
      this.props.actions.getPpPatrolRecord(params)
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, patrolRecord} = this.props
    const {visible, detail} = this.state
    
    return (
      <div>
        {visible?<DetailPatrolRecord visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail: ""})} />:null}

        <Card size="small" bordered={false}
          extra={(
            <Form layout="inline">
              <Form.Item label="巡更时间" >
                {getFieldDecorator('time')(<RangePicker/>)}
              </Form.Item>
              <Form.Item label="状态" >
                {getFieldDecorator('recordStatus', {
                  initialValue: ""
                })(
                  <Select style={{width: 120}}>
                    <Option value="">全部</Option>
                    <Option value="0">巡更中</Option>
                    <Option value="1">巡更完成</Option>
                    <Option value="2">强制完成</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                <Button icon="search" type="primary" onClick={this.handlenSearch.bind(this)} >搜索</Button>
              </Form.Item>
            </Form>
          )}
        >
          <Table columns={this.getCol()} dataSource={patrolRecord?utils.addIndex(patrolRecord.list):[]} 
          pagination={utils.Pagination(patrolRecord, page=>{
            params.current = page
            this.props.actions.getPpPatrolRecord(params)
          })}/>
        </Card>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPpPatrolRecord}, dispatch)
  }
}

function mapStateProps(state){
  return {
    patrolRecord: state.daily.patrolRecord,
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(DailyPatrolRecord) )