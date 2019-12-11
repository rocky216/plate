import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Breadcrumb, Icon} from "antd";
import "./index.less"


class BreadCrumb extends React.Component {
  render(){
    return (
      <div className="BreadCrumb_wrap">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" />首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(BreadCrumb)