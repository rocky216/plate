import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon} from "antd";
import {getCompany, getPartnerCompanyListPage, setAssignedParent, getPartnerCompanyList, upgradeOrDowngradeCompany} from "@/actions/systemAction"
import JCard from "@/components/JCard"
import {companyColmuns, partnerCompanyColmuns} from "../colmuns"
import EditParent from "./editparent"
import AddCompany from "./addCompany"


class Company extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      parentVisible: false,
      parentDetail: "",
      addCompanyVisible: false,
    }
  }

  componentDidMount(){
    this.props.actions.getCompany({})
    this.props.actions.getPartnerCompanyListPage({})
  }

  upgradeCompany(item){
    this.props.actions.upgradeOrDowngradeCompany({
      companyId:item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompany({})
      this.props.actions.getPartnerCompanyListPage({})
    })
  }

  getCol(){
    let _this = this
    return companyColmuns.concat([
    {
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/system/company/${item.id}/he`}>
              <Button type="link">项目列表</Button>
            </Link>
            <Link to={`/system/company/${item.id}/config`}>
              <Button type="link">项目配置</Button>
            </Link> 
            <Button type="link" onClick={()=>_this.setState({parentVisible: true, parentDetail: item})} >分配上级公司</Button>
            <Button type="link" onClick={_this.upgradeCompany.bind(_this, item)}>升级公司等级</Button>
          </div>
        )
      }
    }])
  }

  handlenSetParent(item){
    this.props.actions.setAssignedParent({
      id: item.id
    })
  }

  getCols(){
    let _this = this
    return partnerCompanyColmuns.concat([
      {
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({parentVisible: true, parentDetail: item})} >分配上级公司</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, company, partnerCompany} = this.props
    const {parentVisible, parentDetail, addCompanyVisible} = this.state
    
    return (
      <JCard spinning={spinning}>
        <AddCompany visible={addCompanyVisible} onCancel={()=>this.setState({addCompanyVisible: false})} />
        {parentVisible?
        <EditParent visible={parentVisible} detail={parentDetail} 
          onCancel={()=>this.setState({parentVisible: false, parentDetail: ""})} />:null}

        <Card title="待分配公司" title={<Button type="primary" onClick={()=>this.setState({addCompanyVisible: true})}><Icon type="plus" />新增公司</Button>} >
          <Table columns={this.getCol()} 
            dataSource={company?utils.addIndex(company.list):[]}/>
        </Card>
        <Card className="mgt10" title="战略合作公司">
          {partnerCompany?partnerCompany.list.map(item=>(
            <Card title={item.name} key={item.id} size="small" bordered={false} extra={(
              <div>
                <Link to={`/system/company/${item.id}/he`}>
                  <Button type="link">项目列表</Button>
                </Link>
                <Link to={`/system/company/${item.id}/config`}>
                  <Button type="link">项目配置</Button>
                </Link> 
                <Button type="link" onClick={this.upgradeCompany.bind(this, item)}>降低公司等级</Button>
              </div>
            )} >
              <Table size="small" columns={this.getCols()} 
                dataSource={utils.addIndex(item.companyList)}/>
            </Card>
          )):null}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCompany, getPartnerCompanyListPage, setAssignedParent, getPartnerCompanyList, upgradeOrDowngradeCompany}, dispatch)
  }
}

function mapStateProps(state){
  return {
    partnerCompany: state.system.partnerCompany,
    company: state.system.company,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Company)