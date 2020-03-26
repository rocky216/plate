import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Button, Input, Select, Table, Icon} from "antd";
import {getOwnersListByNameOrPhone} from "@/actions/appAction"
import {houseColumns} from "./colmuns"
import JCard from "@/components/JCard"

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

class AddSearchHouse extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      owners: []
    }
  }

  componentDidMount(){
    
  }

  searchOwers(key){
    this.props.actions.getOwnersListByNameOrPhone({
      key: key,
      heId: this.props.detail?this.props.detail.heId:"",
      onlyHe: this.props.onlyHe?"yes":""
    }, res=>{
      this.setState({owners: res})
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      this.searchOwers(values.key)
    });
  }

  render(){
    const {getFieldDecorator, getFieldValue} = this.props.form
    const {utils, spinning, visible, onCancel, onChange} = this.props
    const {owners} = this.state
    
    return (
      <Modal
        destroyOnClose
        title="选择业主"
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
                {getFieldDecorator('key')(
                  <Input/>,
                )}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary"><Icon type="search" />搜索</Button>
              </Form.Item>
            </Form>
          </div>
          <Table  
          size="small"
          columns={houseColumns} 
          dataSource={utils.addIndex(owners)} pagination={false} 
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
    actions: bindActionCreators({getOwnersListByNameOrPhone }, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Form.create()(AddSearchHouse)) )