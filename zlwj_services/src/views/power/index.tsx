import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Table } from "antd"
import {getCompanys} from "@/actions/powerAction"
import {IProps} from "@/interface/app"
import {companyColumns} from "./columns/index"
import JCard from "@/components/JCard"

interface Props extends IProps {
  companys?:any
}

class PowerPage extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getCompanys()
  }

  render() {
    const {companys, utils, spinning} = this.props;
    
    return (
      <JCard spinning={spinning}>
        <Table columns={companyColumns} dataSource={companys?utils.addIndex(companys.list):[]} />
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanys }, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    spinning: state.power.spinning,
    companys: state.power.companys,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerPage)