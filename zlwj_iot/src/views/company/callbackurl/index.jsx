import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Card, Table, Button, Icon} from "antd";
import {getCompanyCallbackUrl} from "@/actions/companyAction"
import JCard from "@/components/JCard"
import {companyCallbackColumns} from "../columns"
import AddCompanyCallbackUrl from "./add"
import EditCompanyCallbackUrl from "./edit"
import {getArguments} from "@/actions/dictAction"



class CallbackUrl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail:""
    }
  }
  
  
  componentDidMount(){
    this.props.actions.getCompanyCallbackUrl({companyId: this.props.match.params.id})
    this.props.actions.getArguments({})
  }

  getCol(){
    let _this = this
    return companyCallbackColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, callbackurl} = this.props
    const {addVisible, editVisible, detail} = this.state
    return (
      <JCard spinning={spinning}>
        <AddCompanyCallbackUrl visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible?
        <EditCompanyCallbackUrl visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增URL</Button>} >
          <Table columns={this.getCol()} dataSource={callbackurl?utils.addIndex(callbackurl.list):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompanyCallbackUrl, getArguments}, dispatch)
  }
}

function mapStateProps(state){
  return {
    callbackurl: state.company.callbackurl,
    spinning: state.company.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CallbackUrl)