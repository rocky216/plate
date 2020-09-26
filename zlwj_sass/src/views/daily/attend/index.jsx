import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Button, Card, Table, DatePicker, Form} from "antd";
import JCard from "@/components/JCard"
import {getUserListClock} from "@/actions/dailyAction"
import {dailyAttendColmuns} from "../colmuns"
import moment from "moment"
import DailyAttendExport from "./export"

let params = {
  selectDate: moment().format("YYYY-MM-DD")
}

class DailyAttend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  

  componentDidMount(){
    this.props.actions.getUserListClock(params)
  }

  handlenSearch(){
    
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        params.selectDate=values.selectDate?moment(values.selectDate).format("YYYY-MM-DD"):null
        this.props.actions.getUserListClock(params)
      }
      
    })
  }

  getCol(){
    return dailyAttendColmuns.concat([{
      title: "操作",
      render(item) {
        return (
          <div>
            <Link to={`/daily/attend/${item.id}/detail`}>
              <Button type="link">查看</Button>
            </Link>
          </div>
        );
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, clocks} = this.props
    const {visible} = this.state

    return (
      <JCard spinning={spinning}>
        <DailyAttendExport visible={visible} onCancel={()=>this.setState({visible: false})} />
        <Card 
          size="small"
          title={(
            <Button icon="export" type="danger" ghost onClick={()=>this.setState({visible: true})} >导出</Button>
          )}
          extra={(
            <Form layout="inline">
              <Form.Item label="考勤时间" >
                {getFieldDecorator('selectDate', {
                  initialValue: moment(params.selectDate),
                  rules: [
                    {
                      required: true,
                      message: '考勤时间!',
                    }
                  ],
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item>
                <Button icon="search" type="primary" onClick={this.handlenSearch.bind(this)} >搜索</Button>
              </Form.Item>
            </Form>
          )}
        >
          <Table columns={this.getCol()} dataSource={clocks?utils.addIndex(clocks):[]} bordered pagination={false}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getUserListClock}, dispatch)
  }
}

function mapStateProps(state){
  return {
    clocks: state.daily.clocks,
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(DailyAttend) )