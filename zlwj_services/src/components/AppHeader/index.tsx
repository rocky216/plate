import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Layout, Dropdown, Button, Menu} from "antd"
import {IProps} from "@/interface/app"
import {getAllCompany } from "@/actions/appAction"

const { Header } = Layout;

interface Props extends IProps {
  allcompany:any;
}

class AppHeader extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getAllCompany()
  }

  render() {
    const {utils, spinning, allcompany} = this.props;

    const menu = (
      <Menu>
        {allcompany?allcompany.map((item:any)=>(
          <Menu.Item >{item.companyName}</Menu.Item>
        )):null}
      </Menu>
    );

    return (
      <Header>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>bottomLeft</Button>
          </Dropdown>
        </div>
      </Header>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getAllCompany }, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    allcompany: state.app.allcompany,
    spinning: state.power.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)