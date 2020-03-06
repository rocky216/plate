import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button} from "antd";
import {getCompany } from "@/actions/systemAction"
import JCard from "@/components/JCard"
import {companyColmuns} from "../colmuns"


class Company extends React.Component {
  componentDidMount(){
    this.props.actions.getCompany({})
  }

  getCol(){
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
              
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, company} = this.props

    return (
      <JCard spinning={spinning}>
        <Card>
          <Table columns={this.getCol()} 
            dataSource={company?utils.addIndex(company):[]}/>
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
    company: state.system.company,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Company)