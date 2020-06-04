import React from "react"
import {connect} from "react-redux"
import {withRouter } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Modal, Form, Select, DatePicker} from "antd";
import RelaSelect from "@/components/RelaSelect"
import {getSelectHeList} from "@/actions/appAction"
import {addOwnersLink, getOwners} from "@/actions/projectAction"
import moment from "moment"

const {Option } = Select;

class Relation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heId: "",
      obj: ""
    }
  }

  componentDidMount(){
    this.props.actions.getSelectHeList({}, res=>{
      this.setState({heId: res &&res.length?res[0]["id"]: ""})
    })
  }

  handleChange(key){
    this.setState({heId: "", obj: ""})
    setTimeout(()=>{
      this.setState({heId: key})
    }, 50)
    
    return key;
  }
  


  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(!this.state.obj) {
          this.props.utils.OpenNotification("error", "请选择关联信息！")
          return;
        }
        const {ownersId, linkTypeId, type, id} = this.state.obj
        
        this.props.actions.addOwnersLink({
          ...values,
          ownerId: ownersId,
          linkId: id,
          assetType: type,
          startTime: moment( values.startTime ).format("YYYY-MM-DD")
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getOwners({id: this.props.match.params.id})
          this.props.onCancel()
        })

      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form;
    const {utils, spinning, visible, params, onCancel, type, allHeList} = this.props
    const {heId } = this.state
    

    return (
      <Modal
          visible={visible}
          confirmLoading={spinning}
          width={700}
          onCancel={onCancel}
          onOk={this.handleSubmit.bind(this)}
        >
          <Form layout="inline">
            <Form.Item label="项目">
              {getFieldDecorator("heId", {
                initialValue: heId,
                getValueFromEvent: this.handleChange.bind(this)
              })(
                <Select style={{width: 120}}   >
                  {allHeList && allHeList.length?allHeList.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="类型">
              {getFieldDecorator("linkType", {
                initialValue: "0"
              })(
                <Select style={{width: 120}} >
                  <Option value="0">业主</Option>
                  {type=="house"?<Option value="1">家庭成员</Option>:null}
                  {type=="house" || type=="shops"?<Option value="2">租客</Option>:null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="关联时间">
              {getFieldDecorator("startTime", {
                  initialValue: moment()
                })(
                  <DatePicker/>
                )}
              
            </Form.Item>
          </Form>
          <div style={{maxHeight: 700, overflowY: "scroll"}}>
            {heId?<RelaSelect params={{type, heId}} onSelect={(item)=>this.setState({obj: item})} />:null}
            
          </div>
          
        </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSelectHeList, addOwnersLink, getOwners}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)( Form.create()(Relation) ))