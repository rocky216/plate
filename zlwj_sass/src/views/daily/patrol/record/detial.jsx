import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Table} from "antd";
import {detailPpPatrolRecord, compelCompleted, getPpPatrolRecord} from "@/actions/dailyAction"
import {patrolRecordDetailColmuns, } from "../../colmuns"
import { values } from "lodash";

const {TextArea} = Input

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

class DetailPatrolRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pratrolLines: []
    }
  }
  

  componentDidMount(){
    this.props.actions.detailPpPatrolRecord({patrolRecordId: this.props.detail.id}, res=>{
      this.setState({pratrolLines: res})
    })
  }

  handlenSubmit(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        this.props.actions.compelCompleted({
          recordId:  this.props.detail.id,
          endInfo: values.endInfo
        }, res=>{
          this.props.onCancel()
          this.props.utils.OpenNotification("success")
          this.props.actions.getPpPatrolRecord({current: 1})
        })
      }
      
    })
    
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel} = this.props
    const {pratrolLines} = this.state
    
    return (
      <Modal
        title="巡更记录详情"
        destroyOnClose
        okText="确定"
        cancelText="取消"
        width={800}
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel} 
        footer={false}
      >
        <Table columns={patrolRecordDetailColmuns} size="small" dataSource={utils.addIndex(pratrolLines)} pagination={false} />
        {pratrolLines.length && pratrolLines[0]["recordStatus"]==0?
        <Form className="mgt10">
          <Form.Item label="强制完结说明" >
            {getFieldDecorator('endInfo', {
              rules: [
                {
                  required: true,
                  message: '强制完结说明!',
                }
              ],
            })(<TextArea />)}
          </Form.Item>
          <Form.Item>
            <Button icon="save" type="danger" onClick={this.handlenSubmit.bind(this)} >强制完结</Button>
          </Form.Item>
        </Form>:null}
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({detailPpPatrolRecord, compelCompleted, getPpPatrolRecord}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(DetailPatrolRecord))