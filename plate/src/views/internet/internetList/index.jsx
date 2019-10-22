import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Table, Button, Select, Modal, Form, Input
} from "antd"
import JCard from "@/components/JCard"
import {getInternetList, getInfoByIccid, getInternetInit, setDistribute} from "@/actions/internetAction"
import {internetListColumns, } from "../columns"
import {addIndex, OpenNotification} from "@/utils"
import ChartLine from "./chartLine"

const {Option} = Select
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

class InternetList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      detail: {}
    }
  }

  componentWillMount(){
    this.props.actions.getInternetList({}) 
  }

  expandedRowInfo(record){
    return <ChartLine data={record.info} />
  }

  handlenExpand(expanded, record){
    console.log(record, "record")
    if (expanded && !record.info) {
      const {internet} = this.props
      let _index = _.findIndex(internet.simbossIccids, o=>o.id==record.id)
      
      this.props.actions.getInfoByIccid({
        iccid: record.iccid,
        _index
      })
    }
    
  }

  getInitData(){
    this.props.actions.getInternetInit({}, res=>{
      this.props.actions.getInternetList({})
      OpenNotification("success", "初始化数据成功！") 
    })
  }
  handlenSubmit(item, val){
    console.log(arguments, 88)
    const {detail} = this.state
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.setDistribute({
          cid: detail.id,
          ...values
        }, res=>{
          OpenNotification("success")
          this.props.actions.getInternetList({}) 
          this.setState({visible: false})
        })
      }
    });
    
  }

  getCol(){
    let _this = this
    return internetListColumns.concat([{
      title: "操作",
      render(item){
        return (
          <Button type="link" onClick={()=>_this.setState({detail: item, visible: true})} >编辑</Button>
        )
      }
    }])
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {spinning, internet, mySysItemList} = this.props
    const {visible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <div>
          <Modal
            title="编辑"
            visible={visible}
            onCancel={()=>this.setState({visible: false})}
            onOk={this.handlenSubmit.bind(this)}
          >
            <Form {...formItemLayout }>
              <Form.Item label="项目">
                {getFieldDecorator('itemId', {
                  initialValue: detail?String(detail.itemId):'',
                  rules: [{ required: true, message: '请选择小区'}]
                })(
                  <Select  style={{width: 130}}>
                    <Option value="0">无</Option>
                    {mySysItemList && mySysItemList.length?mySysItemList.map(elem=>(
                      <Option key={elem.id} value={elem.id.toString()}>{elem.housingEstateName}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="备注">
                {getFieldDecorator('remark', {
                  initialValue: detail.remark,
                  rules: [{ required: true, message: '请填写备注！'}]
                })(<Input />)}
              </Form.Item>
            </Form>
          </Modal>
          <Card title={<Button type="primary" onClick={this.getInitData.bind(this)} >物联卡初始化</Button>}>
            <Table 
              columns={this.getCol()} 
              expandRowByClick={false}
              onExpand={this.handlenExpand.bind(this)}
              expandedRowRender={this.expandedRowInfo.bind(this)}
              dataSource={internet?addIndex(internet.simbossIccids):[]} />
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getInternetList, getInfoByIccid, getInternetInit, setDistribute}, dispatch)
  }
}

function mapStateProps(state){
  return {
    internet: state.internet.internetList,
    mySysItemList: state.app.mySysItemList,
    spinning: state.internet.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(InternetList) )