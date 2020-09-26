import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Form, Input, DatePicker, Button, Popconfirm} from "antd";
import "../propertyfee/index.less"
import SelectAllType from "@/components/SelectAllType"
import {getCheckRecord, deleteCheckRecord, selectUserList} from "@/actions/otherAction"
import {inspectRecordColumns} from "../colmuns"
import JCard from "@/components/JCard"
import moment from "moment"
import AddInspectrecord from "./add"

const {RangePicker} = DatePicker;

let params = {
  current: 1,
  checkType: "",
  linkTypeId: "",
  linkId: "",
  selectStartBuildTime:null,
  selectEndBuildTime: null,
}

class Inspectrecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      houseItem: "",
      visible: false
    }
  }
  

  componentDidMount(){
    this.props.actions.selectUserList({})
    this.props.actions.getCheckRecord(params)
  }

  async handlenSelectShop (item){
    params.checkType = item.type
    params.linkTypeId = item.linkTypeId
    params.linkId = item.id
    await this.setState({houseItem: item.linkTypeId?item:""})
    this.props.actions.getCheckRecord(params)

    if(item.linkTypeId != null){
      this.setState({houseItem: item})
    }
    console.log(item)
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        params.selectStartBuildTime = values.time && values.time.length?moment(values.time[0]).format("YYYY-MM-DD"):null
        params.selectEndBuildTime = values.time && values.time.length?moment(values.time[1]).format("YYYY-MM-DD"):null
        this.props.actions.getCheckRecord(params)
      }
    });
  }

  handlenDelete(item){
    this.props.actions.deleteCheckRecord({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success");
      this.props.actions.getCheckRecord(params)
    })
  }

  getCol(){
    let _this = this;
    return inspectRecordColumns.concat([{
      title: "操作",
      render(item) {
        return (
          <div>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link">删除</Button>
              </Popconfirm>
          </div>
        );
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, inspects} = this.props
    const {houseItem, visible} = this.state

    return (
      <JCard spinning={spinning}> 
      <AddInspectrecord visible={visible} params={params} houseItem={houseItem} onCancel={()=>this.setState({visible: false})} />
        <div className="propertyfee">
          <div className="select_house">
            <Card title="选择房间" size="small" bodyStyle={{padding:0}}>
              <SelectAllType showLine onSelect={this.handlenSelectShop.bind(this)}  />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card
              title={houseItem?<Button icon="plus" type="primary" onClick={()=>this.setState({visible: true})} >新增巡查</Button>:null}
            >
              <Form className="flexend mgb10" layout="inline" onSubmit={this.handleSearch.bind(this)}>
                <Form.Item label="巡查时间" >
                  {getFieldDecorator('time', {
                    initialValue: params.selectStartBuildTime?[moment(params.selectStartBuildTime),moment(params.selectEndBuildTime)]:null
                  })(
                    <RangePicker/>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button icon="search" type="primary" htmlType="submit" >搜索</Button>
                </Form.Item>
              </Form>

              <Table columns={this.getCol()} dataSource={inspects?utils.addIndex(inspects.list):[]} 
              pagination={utils.Pagination(inspects, page=>{
                params.current = page
                this.props.actions.getCheckRecord(params)
              })}/>
            </Card>
          </div>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCheckRecord, deleteCheckRecord, selectUserList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    inspects: state.other.inspects,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Inspectrecord) )