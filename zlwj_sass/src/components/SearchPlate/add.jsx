import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, Table, Icon} from "antd";
import {getSearchPlate} from "@/actions/appAction"
import {searchPlateColumns} from "./columns"
import JCard from "@/components/JCard"

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

class AddSearchPlate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plates: []
    }
  }

  componentDidMount(){
    
  }

  searchOwers(key){
    this.props.actions.getSearchPlate({
      licensePlate: key,
      heId: this.props.detail.heId
    }, res=>{
      this.setState({plates: res})
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      this.searchOwers(values.licensePlate)
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, visible, onCancel, onChange} = this.props
    const {plates} = this.state
    
    return (
      <Modal
        destroyOnClose
        title="选择车牌"
        okText="确定"
        cancelText="取消"
        confirmLoading={spinning}
        visible={visible}
        onCancel={onCancel}
        footer={false}
        bodyStyle={{paddingTop: 5}}
      >
        <JCard spinning={spinning}>
          <div className="mgb10">
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)} >
              <Form.Item>
                {getFieldDecorator('licensePlate')(
                  <Input/>,
                )}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary"><Icon type="search" />搜索</Button>
              </Form.Item>
            </Form>
          </div>
          <Table size="small" columns={searchPlateColumns} 
          dataSource={utils.addIndex(plates)} pagination={false} 
          onRow={record=>{
            return {
              onClick: ()=>{
                onChange(record)
                onCancel()
              }
            }
          }}/>
        </JCard>
        
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSearchPlate }, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddSearchPlate)) )