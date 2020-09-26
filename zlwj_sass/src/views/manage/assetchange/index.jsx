import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Table, Form, DatePicker, Button} from "antd";
import JCard from "@/components/JCard"
import HeList from "@/components/HeList"
import {heAssetsUpdateLog} from "@/actions/manageAction"
import {assetsLogColumns} from "../columns"
import moment from "moment"

const {RangePicker} = DatePicker;

let params = {
  current:1,
  itemId: "",
  startTime: null,
  endTime: null,
}

class Assetchange extends React.Component {

  componentDidMount(){
    this.props.actions.heAssetsUpdateLog(params)
  }

  handleSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        params.itemId = values.itemId
        params.startTime = values.time && values.time.length?moment(values.time[0]).format("YYYY-MM-DD"):null
        params.endTime = values.time && values.time.length?moment(values.time[1]).format("YYYY-MM-DD"):null
        this.props.actions.heAssetsUpdateLog(params)
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, assetlog} = this.props

    return (
      <JCard spinning={spinning}>
        <Card>
        <Form className="flexend mgb10" layout="inline" onSubmit={this.handleSearch.bind(this)}>
          <Form.Item label="项目" >
            {getFieldDecorator('itemId', {
              initialValue: params.itemId
            })(
              <HeList style={{width: 150}}/>
            )}
          </Form.Item>
          <Form.Item label="变更时间" >
            {getFieldDecorator('time', {
              initialValue: params.startTime?[moment(params.startTime),moment(params.endTime)]:null
            })(
              <RangePicker/>
            )}
          </Form.Item>
          <Form.Item>
            <Button icon="search" type="primary" htmlType="submit" >搜索</Button>
          </Form.Item>
        </Form>

          <Table columns={assetsLogColumns} dataSource={assetlog?utils.addIndex(assetlog.list):[]} 
          pagination={utils.Pagination(assetlog, page=>{
            params.current = page
            this.props.actions.heAssetsUpdateLog(params)
          })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({heAssetsUpdateLog}, dispatch)
  }
}

function mapStateProps(state){
  return {
    assetlog: state.manage.assetlog,
    spinning: state.manage.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Assetchange))