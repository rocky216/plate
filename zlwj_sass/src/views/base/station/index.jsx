import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Button, Table, Form, Input, Select, Popconfirm} from "antd";
import {getStationList, deleteStation} from "@/actions/baseAction"
import JCard from "@/components/JCard"
import {stationColmuns} from "../colmuns"
import AddStation from "./add"
import EditStation from "./edit"

const {Option} = Select

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

class Station extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      params: {
        current: 1,
        name:'',
        status: ''
      }
    }
  }

  componentDidMount(){
    this.getTableList(this.state.params)
  }

  getTableList(params){
    this.props.actions.getStationList({
      ...params
    }, res=>{

    })
  }
  handlenDelete(item){
    this.props.actions.deleteStation({
      id: item.id
    }, res=>{
      this.getTableList(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this
    return stationColmuns.concat([{
      title: "操作",
      width: 200,
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >修改</Button>
            <Popconfirm 
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button type="link">删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }])
  }
  handlenSubmit(e){
    e.preventDefault();
    const {params} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        params.current = 1
        params.name = values.name
        params.status = values.status
        console.log(params)
        this.setState({params: params})
        this.getTableList(params)
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, station} = this.props
    const {addVisible,editVisible , params, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增岗位</Button>} size="small">
          <AddStation visible={addVisible} onCancel={()=>this.setState({addVisible: false, detail: ""})} />
          <EditStation visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail: ""})} />
          <div className="flexend">
            <Form layout="inline" onSubmit={this.handlenSubmit.bind(this)} className="mgb10" >
              <Form.Item >
                {getFieldDecorator("name")(
                  <Input
                    placeholder="岗位名称"
                  />,
                )}
              </Form.Item>
              <Form.Item >
                {getFieldDecorator("status", {
                  initialValue: " "
                })(
                  <Select style={{width: 100}}>
                    <Option value=" ">请选择</Option>
                    <Option value="0">启用</Option>
                    <Option value="1">警用</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" >搜索</Button>
              </Form.Item>
            </Form>
          </div>
          <Table 
            size="small"
            columns={this.getCol()} 
            pagination={utils.Pagination(station, page=>{
              params.current = page
              this.setState({params: params})
              this.getTableList(params)
            })}
            dataSource={station?utils.addIndex(station.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getStationList, deleteStation}, dispatch)
  }
}

function mapStateProps(state){
  return {
    station: state.base.station,
    spinning: state.base.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Station) )