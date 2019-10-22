import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card,
  Form,
  Button,
  Upload,
  Icon,
  Row,
  Col,
  Input,
  InputNumber
} from "antd"
import {getParkingList, addParking} from "@/actions/parkAction"
import {OpenNotification} from "@/utils"

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class addPlate extends React.Component {
  constructor(props){
    super(props)
    this.state={
      fileList: []
    }
  }

  handlenSubmit(e){
    e.preventDefault();
    const {fileList} = this.state
    
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(!fileList.length){
          OpenNotification("error", "请上传行驶证！")
          return
        }
        const formData = new FormData();
        let hosueInfo = localStorage.getItem("houseInfo")
        formData.append('file', fileList[0]);
        formData.append("parkingLot", values.parkingLot)
        formData.append("mobile", values.mobile)
        formData.append('itemId',  JSON.parse(hosueInfo)["id"] );
        this.props.actions.addParking(formData, res=>{
          OpenNotification("success")
          this.props.actions.getParkingList()
          this.props.history.push("/park/plate")
        })
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {fileList} = this.state

    const props = {
      beforeUpload: file => {
        console.log(file)
        this.setState(state => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <Card
        size="small"
        title="添加车牌"
      >
        <Row>
          <Col span={12}>
            <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)}>
              <Form.Item label="车位编号">
                {getFieldDecorator('parkingLot', {
                  rules: [
                    {
                      required: true,
                      message: '请填写车位编号！',
                    }
                  ]
                })(
                  <Input  />
                )}
              </Form.Item>
              <Form.Item label="联系人">
                {getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                      message: '请填写联系人！',
                    }
                  ]
                })(
                  <InputNumber style={{width:"100%"}} />
                )}
              </Form.Item>
              <Form.Item label="行驶证图片">
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 上传图片
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{span: 10,offset: 6}}>
                <Button type="primary" htmlType="submit" className="mgr10">
                  <Icon type="save" /> 保存
                </Button>
                <Button>
                  <Link to="/park/plate"><Icon type="close" /> 取消</Link>
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getParkingList, addParking}, dispatch)
  }
}

function mapStateProps(state){
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(addPlate))