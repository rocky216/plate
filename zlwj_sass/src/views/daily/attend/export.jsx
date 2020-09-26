import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, DatePicker} from "antd";
import {getPpPatrolPoint, addPpPatrolPoint} from "@/actions/dailyAction"
import moment from "moment";

const {RangePicker} = DatePicker

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class DailyAttendExport extends React.Component {

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        const {utils} = this.props
        let startDate =  moment(values.time[0]).format("YYYY-MM-DD")
        let endDate =  moment(values.time[1]).format("YYYY-MM-DD")
        console.log(moment(endDate).diff(startDate, 'day'))
        if(moment(endDate).diff(startDate, 'day')>30){
          this.props.utils.OpenNotification("error", "导出天数不能大于31天")
          return
        }
        window.location.href = `/api/pc/heClockRecord/export?token=${utils.getCookie("token")}&startDate=${startDate}&endDate=${endDate}`
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel} = this.props
    
    return (
      <Modal
        destroyOnClose
        width={600}
        okText="导出"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        footer={false}
      >
        <Form layout="inline" >
          <Form.Item label="考勤时间" hasFeedback>
            {getFieldDecorator('time', {
              rules: [
                {
                  required: true,
                  message: '考勤时间!',
                }
              ],
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item >
            <Button icon="export" type="primary" onClick={this.handlenSubmit.bind(this)}>导出</Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPpPatrolPoint, addPpPatrolPoint}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(DailyAttendExport))