import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import {getCompanyDevice} from "@/actions/companyAction"
import JCard from "@/components/JCard"
import AddDevice from "./add"
import EditDevice from "./edit"
import {companyDeviceColumns} from "../columns"


class Device extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      params: {
        current: 1,
        companyId: props.match.params.id
      }
    }
  }

  componentDidMount(){
    this.props.actions.getCompanyDevice(this.state.params)
  }

  getCol(){
    let _this = this
    return companyDeviceColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
          </div>
        )
      }
    }])
  }
  
  render(){
    const {utils, spinning, deviceList} = this.props
    const {addVisible, editVisible, detail, params} = this.state

    return (
      <JCard spinning={spinning}>
        <AddDevice visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {detail?<EditDevice visible={editVisible} detail={detail} 
          onCancel={()=>this.setState({editVisible: false,detail: ""})} />:null}
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus"/>新增设备</Button>}>
          <Table columns={this.getCol()} dataSource={deviceList?utils.addIndex(deviceList.list):[]} 
            pagination={utils.Pagination(deviceList, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getCompanyDevice(params)
            })}  />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompanyDevice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    deviceList: state.company.deviceList,
    spinning: state.company.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Device)