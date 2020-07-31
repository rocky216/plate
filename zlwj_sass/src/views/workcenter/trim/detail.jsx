import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Table, Popconfirm, Input, DatePicker, Select, Upload, Form} from "antd";
import JCard from "@/components/JCard"
import {getPlanInfo, selectUserList, deleteAttaCheck, getAccount, accomplishPlan, settleDeposit, 
  DepositCountPrint, uploadPlanSingle} from "@/actions/otherAction"
import "./index.less"
import {inspectionColumns, depositColumns, deductColumns} from "../colmuns"
import AddInspect from "./inspect/add"
import EditInspect from "./inspect/edit"
import AddDeposit from "./deposit/add"
import AddDeduct from "./deduct/add"
import {PrintSettle, DepositSettle} from "./print"
import moment from 'moment';
import ReactToPrint, {PrintContextConsumer} from 'react-to-print';


const {Option} = Select;


class TrimDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: "",
      addInspectVisible: false,
      editInspectVisible: false,
      inspectDetail: "",
      addDepositVisible: false,
      addDeductVisible: false,
      planEndTime: "",
      accountId:"",
      depositKey: [1]
    }
  }
  
  componentDidMount(){
    this.props.actions.selectUserList({})
    this.props.actions.getAccount({})
    this.initial()
  }
  initial(){
    this.props.actions.getPlanInfo({
      planId: this.props.match.params.id,
      type: this.props.match.params.type
    }, res=> this.setState({detail: res}))
  }
  handlenDeleteInspect(item){
    this.props.actions.deleteAttaCheck({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.initial();
    })
  }

  getColInspect(){
    let _this = this;
    return inspectionColumns.concat([{
      title: "操作",
      render(item) {
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({editInspectVisible: true, inspectDetail: item})}>编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDeleteInspect.bind(_this, item)}>
                <Button type="link" size="small" >删除</Button>
              </Popconfirm>
          </div>
        );
      }
    }])
  }
  getColDeposit(){
    let _this = this
    return depositColumns.concat([{
      title:"操作",
      render(item){
        return (
          <div>
            <ReactToPrint
              content={() => _this['componentRefDeposit'+item.id]}
              onAfterPrint={_this.handlenPrintOrder.bind(_this, item)}
            >
              <PrintContextConsumer>
                {({ handlePrint })=>{
                  return <Button type="link" onClick={async ()=>{
                    await _this.setState({depositKey: [item.key]})
                    return handlePrint()
                  }} >打印</Button>
                }}
              </PrintContextConsumer>
            </ReactToPrint>
            
          </div>
        )
      }
    }])
  }

  handlAccomplishPlan(){
    if(!this.state.planEndTime){
      this.props.utils.OpenNotification("error", "请选择时间！")
      return;
    }
    this.props.actions.accomplishPlan({
      planId: this.props.match.params.id,
      planEndTime: moment(this.state.planEndTime).format("YYYY-MM-DD")
    },res=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  handleSettleDeposit(){
    this.props.actions.settleDeposit({
      planId: this.props.match.params.id,
      accountId: this.state.accountId
    },res=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  handlenPrintOrder(item){
    console.log(arguments,111)
    this.props.actions.DepositCountPrint({
      id: item.id
    })
  }

  handleUpload(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.uploadPlanSingle({
          planId: this.props.match.params.id,
          attaUrls: this.props.utils.submitFiles(values.attaUrls)
        }, res=>{
          this.props.utils.OpenNotification("success")
        })
      }
    });
  }

  getImgs(arr){
    if(!_.isArray(arr)) return [];
    let newArr=[];
    _.each(arr, item=>{
      newArr.push({
        url: item.dowloadHttpUrl,
        uid: item.id,
        name: item.buildTime
      })
    })
    return newArr;
  }

  render(){
    const {getFieldDecorator } = this.props.form;
    const {utils, spinning, match, accounts, commonFiles} = this.props
    const {detail, addInspectVisible, addDepositVisible, editInspectVisible, 
      inspectDetail, addDeductVisible, planEndTime, depositKey} = this.state
    

    return (
      <JCard spinning={spinning}>
        <AddInspect visible={addInspectVisible}  onCancel={()=>this.setState({addInspectVisible: false})} 
          callback={this.initial.bind(this)}
        />
        {editInspectVisible?
        <EditInspect
          visible={editInspectVisible}
          detail={inspectDetail}
          onCancel={()=>this.setState({editInspectVisible: false, inspectDetail: ""})}
          callback={this.initial.bind(this)}
        />:null}

        <AddDeposit visible={addDepositVisible} info={detail} onCancel={()=>this.setState({addDepositVisible: false})} 
          callback={this.initial.bind(this)}
        />

        <AddDeduct visible={addDeductVisible} onCancel={()=>this.setState({addDeductVisible: false})} 
          callback={this.initial.bind(this)}
        />
        {detail?
        <Card size="small" 
          title={detail  && detail.fixPlan.depositStatus=="out"?(
            <ReactToPrint
              trigger={() => <Button icon="printer" type="primary">打印结算单</Button>}
              content={() => this.componentRef}
              // onAfterPrint={this.handlenPrintOrder.bind(this)}
            />
          ):null}
          extra={(
          <Link to="/workcenter/trim">
            <Button icon="rollback">返回</Button>
          </Link>
        )}>
          {detail?(
            <div ref={el=>this.componentRef = el}  >
              <PrintSettle  detail={detail}/>
            </div>
          ):null}
        </Card>:null}
        {match.params.type=="print"?null:
        <Card
          className="mgt10"
          size="small"
          title="巡查记录"
          extra={(
            <div>
              {detail  && detail.fixPlan.fixStatus=="done"?null:
              <Button size="small" type="primary" ghost icon="plus" onClick={()=>this.setState({addInspectVisible: true})} >添加</Button>}
            </div>
          )}
        >
          <Table size="small" columns={this.getColInspect()} dataSource={detail?utils.addIndex(detail.fixPlanCheck):[]} pagination={false} />
        </Card>}
        <Card
          className="mgt10"
          size="small"
          title="合计押金"
          extra={(
            <div>
              <span className="mgr10">合计押金：{detail && detail.fixPlan.sumDepositMoney?detail.fixPlan.sumDepositMoney:0}</span>
              {detail  && detail.fixPlan.fixStatus=="done"?null:
              <Button size="small" icon="plus" type="primary" ghost onClick={()=>this.setState({addDepositVisible: true})} >添加</Button>}
            </div>
          )}
        >
          {detail?
          <Table size="small" 
            columns={this.getColDeposit()} 
            dataSource={detail?utils.addIndex(detail.deposit):[]} 
            pagination={false} 
            expandedRowKeys={depositKey}
            expandedRowRender={record=>(
              <div ref={el=>this['componentRefDeposit'+record.id] = el} >
                <DepositSettle detail={detail} item={record} />
              </div>
            )}
            onExpand={(expanded, record)=>this.setState({depositKey: [record.key]})}
          />:null}
        </Card>
        <Card
          className="mgt10"
          size="small"
          title="违规装修扣费记录"
          extra={(
            <div>
              <span className="mgr10">合计扣费：{detail && detail.fixPlan.sumTearMoney?detail.fixPlan.sumTearMoney:0}</span>
              {detail  && detail.fixPlan.fixStatus=="done"?null:
              <Button size="small" icon="plus" type="primary" ghost onClick={()=>this.setState({addDeductVisible: true})} >添加</Button>}
            </div>
          )}
        >
          <Table size="small" columns={deductColumns} dataSource={detail?utils.addIndex(detail.tear):[]} 
            pagination={false}  />
        </Card>
        <Card className="mgt10" size="small">
        {detail && detail.fixPlan.fixStatus=="progressing"?
          (
            <div>
              <DatePicker className="mgr10" value={planEndTime?planEndTime:null} onChange={(val)=>this.setState({planEndTime:val})}/>
              <Button type="danger" ghost onClick={this.handlAccomplishPlan.bind(this)}>完成装修计划</Button>
            </div>
          ):null}
          {detail && detail.fixPlan.fixStatus=="done"?
          (
            <div>
              <Select className="mgr10" style={{width: 150}} value={this.state.accountId} 
                onChange={(accountId)=>this.setState({accountId})} >
                {accounts?accounts.map(item=>(
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                )):null}
                
              </Select>
              <Button type="primary" ghost onClick={this.handleSettleDeposit.bind(this)}
                disabled={detail  && detail.fixPlan.depositStatus=="out"}
              >结算装修计划押金</Button>
            </div>
          ):null}
        </Card>
        {detail  && detail.fixPlan.depositStatus=="out"?
        <Card size="small" title="上传附件">
          <Form layout="inline" onSubmit={this.handleUpload.bind(this)}>
            <Form.Item>
            {getFieldDecorator('attaUrls', {
              initialValue: this.getImgs(detail?detail.depositAttachment:[]),
              valuePropName: 'fileList',
              getValueFromEvent: utils.normFileMulti,
              rules: [{ required: true, message: '上传附件!' }],
            })(
              <Upload
                  action={`${commonFiles?commonFiles.resourceServerAddress:""}/file/uploadFile`} 
                  name="file"
                  data={{fileType:"photo", fileSize: 1024*10}}
                >
                  <Button icon="upload">上传附件</Button>
              </Upload>
            )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="save" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </Card>:null}
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({uploadPlanSingle, DepositCountPrint, getPlanInfo, selectUserList, deleteAttaCheck, getAccount, accomplishPlan, settleDeposit}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles:state.app.commonFiles,
    accounts: state.other.accounts,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(TrimDetail) )