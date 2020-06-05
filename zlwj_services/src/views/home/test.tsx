import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {} from "antd"
import {IProps} from "@/interface/app"

class Test extends React.Component<IProps> {

  render() {
    const {utils, spinning} = this.props;

    return (
      <>
        power1
      </>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    spinning: state.power.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)