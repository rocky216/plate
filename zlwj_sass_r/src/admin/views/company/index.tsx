import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCompanys} from "@admin/actions/companyAction"
import {IProps} from "@public/common/interface"



class CompanyPage extends React.Component<IProps> {
  componentDidMount(){
    this.props.actions.getCompanys({})
  }

  render() {
    return (
      <div>
        CompanyPage
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({ getCompanys }, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage)