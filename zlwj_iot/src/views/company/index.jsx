import React from "react"
import {connect} from "react-redux"
import {Link } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table} from "antd";
import {getCompany} from "@/actions/companyAction"
import JCard from "@/components/JCard"
import AddCompany from "./add"
import EditCompany from "./edit"
import {companyColumns} from "./columns"


class CompanyDevice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  componentDidMount(){
    this.props.actions.getCompany({})
  }

  getCol(){
    let _this = this
    return companyColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
            <Link to={`/company/${item.id}/device`}>
              <Button type="link" >设备管理</Button>
            </Link>
            <Link to={`/company/${item.id}/callbackurl`}>
              <Button type="link" >回调url</Button>
            </Link>
            
          </div>
        )
      }
    }])
  }
  
  render(){
    const {utils, spinning, company} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddCompany visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {detail?<EditCompany visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus"/>新增公司</Button>}>
          <Table columns={this.getCol()} dataSource={company?utils.addIndex(company):[]} pagination={false} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompany}, dispatch)
  }
}

function mapStateProps(state){
  return {
    company: state.company.company,
    spinning: state.company.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyDevice)