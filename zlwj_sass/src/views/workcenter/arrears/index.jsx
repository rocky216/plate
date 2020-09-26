import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Form, Input, Select, DatePicker, Button, Table, Alert, Tooltip,} from "antd";
import JCard from "@/components/JCard"
import {initArrears, initArrearsBelow, arrearsNopayment} from "@/actions/otherAction"
import moment from "moment";
import {arrearsColumns} from "../colmuns"

const {Option} = Select;

let params = {
  id: "",
  type: "",
  propertyEndTime: null,
  buildingId: "",
  templateId: "",
}

class WorkcenterArrears extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templates:[],
      building:[],
    }
  }
  
  async componentDidMount(){
    
    try{
      let data = await this.props.actions.initArrears({})
      if(data && data.length){
        params.type = data[0]["id"]
        this.loadBelow(data[0]["id"])
      }
    }catch(e){}
  }

  loadBelow(id){
    const {arrearsType} = this.props
      this.props.actions.initArrearsBelow({
        id,
        type: _.filter(arrearsType, o=>o.id == id)[0]["type"]
      }, res=>{
        const {templates, building} = res
        this.setState({templates, building})
      })
    
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {arrearsType} = this.props
        params.propertyEndTime = moment(values.propertyEndTime).format("YYYY-MM-DD")
        params.id = values.id
        params.buildingId = values.buildingId
        params.templateId = values.templateId
        this.props.actions.arrearsNopayment({
          ...values,
          type: _.filter(arrearsType, o=>o.id == values.id)[0]["type"],
          propertyEndTime: moment(values.propertyEndTime).format("YYYY-MM-DD")
        })
      }
    });
  }

  getCol(){
    return arrearsColumns.concat([{
      title: `截止${params.propertyEndTime}日物业费欠缴情况`,
      colSpan: 2,
      dataIndex: 'sumMonth',
    },{
      title: '',
      colSpan: 0,
      dataIndex: "noPayment",
    },])
  }
  getParams(){
    const {utils, arrearsType} = this.props
    return `?token=${utils.getCookie("token")}&id=${params.id}&type=${_.filter(arrearsType, o=>o.id == params.id)[0]["type"]}&propertyEndTime=${params.propertyEndTime}&buildingId=${params.id==-1?params.buildingId:0}&templateId=${params.templateId}`
  }

  render(){
    let _this = this;
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {utils, spinning, arrearsType, arrears} = this.props
    const {templates, building} = this.state
    const {templateId} = params

    return (
      <JCard spinning={spinning}>
        <Card title={templateId && arrears ?(
          <a href={`/api/pc/arrears/exportArrears${this.getParams()}`}>
            <Button icon="export" type="danger" ghost >导出数据</Button>
            <span className="mgl10" style={{color:"red", fontSize: 12}}>ps: 请点击搜索之后点击导出数据！</span>
            {/* <Tooltip title="请点击搜索之后点击导出数据！">
              <Button icon="export" type="danger" ghost >导出台账</Button>
            </Tooltip> */}
          </a>
        ):null}>
          <Form className="mgb10" layout="inline" onSubmit={this.handleSearch.bind(this)}>
            <Form.Item label="统计类型">
              {getFieldDecorator("id",{
                initialValue: params.type,
                rules: [{ required: true, message: '统计类型!' }],
                getValueFromEvent: (val)=>{
                  _this.setState({building: [], templates: []})
                  _this.loadBelow(val)
                  params.buildingId = ""
                  params.templateId = ""
                  return val
                }
              })(
                <Select style={{width: 120}}>
                  {arrearsType?arrearsType.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            {building.length?
            <Form.Item label="楼栋">
              {getFieldDecorator("buildingId",{
                initialValue: params.buildingId,
                rules: [{ required: true, message: '楼栋!' }],
              })(
                <Select style={{width: 120}}>
                  {building.map(item=>(
                    <Option key={item.id} value={item.id}>{item.showCode}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>:null}
            {templates.length?
            <Form.Item label="物业费模板">
              {getFieldDecorator("templateId",{
                initialValue: params.templateId,
                rules: [{ required: true, message: '物业费模板!' }],
              })(
                <Select style={{width: 180}}>
                  {templates.map(item=>(
                    <Option key={item.id} value={item.id}>{item.templateName}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>:null}
            <Form.Item label="物业费已缴截止时间">
              {getFieldDecorator("propertyEndTime",{
                initialValue: params.propertyEndTime?moment(params.propertyEndTime):null,
                rules: [{ required: true, message: '物业费已缴截止时间!' }],
              })(
                <DatePicker/>
              )}
            </Form.Item>
            <Form.Item>
              <Button icon="search" type="primary" htmlType="submit" >搜索</Button>
            </Form.Item>
          </Form>
          {arrears?(
            <>
            <Alert className="mgb10" message={(
              <div >
                <span className="mgr10">参与统计资产:{arrears.count}</span>
                <span className="mgr10">欠缴资产:{arrears.noPaymentCount}</span>
                <span className="mgr10">欠缴率:{arrears.arrearsRate}</span>
                <span className="mgr10">预计欠缴总额:{arrears.countMoney}</span>
              </div>
            )}/>
            <Table columns={this.getCol()} dataSource={arrears?utils.addIndex(arrears.data):[]} bordered  />
            </>
          )
          :null}

        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({initArrears, initArrearsBelow, arrearsNopayment}, dispatch)
  }
}

function mapStateProps(state){
  return {
    arrears: state.other.arrears,
    arrearsType: state.other.arrearsType,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(WorkcenterArrears) )