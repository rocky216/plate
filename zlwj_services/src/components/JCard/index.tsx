import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Spin} from "antd"
import {IProps} from "@/interface/app"
import {LoadingOutlined} from "@ant-design/icons"


class JCard extends React.Component<IProps> {

  render() {
    const {spinning} = this.props;
    return (
      <Spin spinning={spinning} indicator={<LoadingOutlined />} size="large" tip="正在加载...">
        {this.props.children}
      </Spin>
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
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JCard)