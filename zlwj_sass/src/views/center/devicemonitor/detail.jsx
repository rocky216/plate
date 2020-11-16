import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, DatePicker} from "antd";
import {detailDeviceLogStatis} from "@/actions/centerAction"
import moment from "moment"
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import {options} from "./data" 


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

class DetailDevicesMonitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment().format("YYYY-MM-DD"),
      data: "",
      option: ""
    }
  }
  

  componentDidMount(){
    this.getDetail(this.state.date)
  }

  getDetail(date) {
    
    this.props.actions.detailDeviceLogStatis({
      iotId: this.props.detail.iotId,
      date: date+" 23:59:59"
    }, res=>{
      this.handleData(res);
      this.setState({data: res})
    })
  }

  handleData(arr){
    let xAxis = [], yAxis = []
    _.each(arr, item=>{
      xAxis.push(item.buildTime.substring(11))
      yAxis.push(item.logType=="offLine"?-1:1)
      
    })
    options.xAxis.data = xAxis;
    options.series[0].data = yAxis;
    this.setState({option: options})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, visible, onCancel, detail} = this.props
    const {data, option } = this.state
    
    return (
      <Modal
        width={1000}
        destroyOnClose
        title={detail.deviceName+detail.deviceVerName}
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        footer={false}
      >
        
        <>
        <div className="flexend">
          <DatePicker onChange={ async (v)=>{
            await this.setState({data: ""})
            this.getDetail( moment(v).format("YYYY-MM-DD") )
          }} />
        </div>
        {data?
          <ReactEchartsCore echarts={echarts} option={option}/>:null}
        </>
        
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({detailDeviceLogStatis}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(DetailDevicesMonitor))