import React from "react"
import {Link, Switch, Route} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Button,Icon, Table, Popconfirm,Modal, Form,InputNumber,Input
} from "antd"
import JCard from "@/components/JCard"
import AddPlate from "./add"
import {getParkingList, delParking, updateParking} from "@/actions/parkAction"
import {plateColumns} from "../columns"
import {addIndex} from "@/utils"
import {OpenNotification} from "@/utils"
import AuthButton from "@/components/AuthButton"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Plate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nowPage: 1,
      visible: false,
      detail: '',
      pagination: {
        current: 1,
        pageSize: 10,
        total: ''
      }
    }
  }

  componentWillMount(){
    this.getParkingList(this.state.pagination)
  }

  getParkingList(pagination){
    this.props.actions.getParkingList({nowPage: pagination.current})
  }

  
  getCol(){
    let _this = this
    return plateColumns(this).concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({visible: true,detail: item})} >编辑</Button>
            <Popconfirm placement="topLeft" title="是否删除？" onConfirm={_this.confirm.bind(_this, item)} >
              <Button type="link"  >删除</Button> 
            </Popconfirm>
            
          </div>
        )
      }
    }])
  }
  handlenSubmit(e){
    e.preventDefault();
    console.log(this.state.detail, 99)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.updateParking({
          pid: this.state.detail.id,
          ...values
        },res=>{
          OpenNotification("success")
          this.getParkingList(this.state.pagination)
          this.setState({visible: false})
        })
      }
    });
  }

  confirm(item){
    this.props.actions.delParking({
      pid: item.id
    }, res=>{
      OpenNotification("success")
      this.getParkingList(this.state.pagination)
    })
  }

  handleTableChange({current}){
    const {pagination} = this.state
    pagination.current=current
    this.setState({pagination})
    this.getParkingList(pagination)
  }


  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, palteList } = this.props
    const {pagination, visible, detail} = this.state
    console.log(detail, 888)
    if(palteList){
      pagination.total = palteList.pages.sumRow
    }
    return (
      <JCard spinning={spinning}>
        <div>
          <Modal 
            destroyOnClose
            title="修改车位编号"
            visible={visible}
            onCancel={()=>this.setState({visible: false})}
            onOk={this.handlenSubmit.bind(this)}
            >
              <Form {...formItemLayout}>
                <Form.Item label="姓名">
                {getFieldDecorator('username', {
                  initialValue: detail?detail.username:'',
                })(
                  <Input disabled/>,
                )}
                </Form.Item>
                <Form.Item label="车牌号">
                {getFieldDecorator('license', {
                  initialValue: detail?detail.license:'',
                })(
                  <Input disabled />,
                )}
                </Form.Item>
                <Form.Item label="车位编号">
                {getFieldDecorator('parkingLot', {
                  initialValue: detail?detail.parkingLot:'',
                  rules: [{ required: true, message: '车位编号不能为空!' }],
                })(
                  <InputNumber/>,
                )}
                </Form.Item>
                <Form.Item label="联系人">
                {getFieldDecorator('mobile', {
                  initialValue: detail?detail.mobile:'',
                  rules: [{ required: true, message: '车位编号不能为空!' }],
                })(
                  <InputNumber style={{width: "100%"}} />,
                )}
                </Form.Item>
              </Form>
          </Modal>
          <div className="mgb10">
            <Switch>
              <Route path="/park/plate/add" component={AddPlate} />
            </Switch>
          </div>
          <Card 
            size="small"
            title={<AuthButton type="primary" auth="20201"><Link to="/park/plate/add"><Icon type="plus" />添加车牌</Link></AuthButton>}
          >
            <Table 
              columns={this.getCol()} 
              dataSource={palteList?addIndex(palteList.plateCarParkingList):[]} 
              onChange={this.handleTableChange.bind(this)}
              pagination={pagination}
              />
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getParkingList, delParking, updateParking}, dispatch)
  }
}

function mapStateProps(state){
  return {
    palteList: state.park.palteList,
    pagination: state.app.pagination,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Plate))