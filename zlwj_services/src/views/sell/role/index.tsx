import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import {Link} from "react-router-dom"
import {Card, Button, Table} from "antd"
import {IProps} from "@/interface/app"
import JCard from "@/components/JCard"
import {PlusOutlined} from "@ant-design/icons"
import {getRoles } from "@/actions/sellAction"
import {roleColumns} from "../columns"
import AddSellRole from "./add"

interface Props extends IProps {
  roles:any;
}
interface State {
  visible: boolean;
  detail: any;
}

class SellRole extends React.Component<Props> {

  state: State = {
    visible: false,
    detail: "",
  }

  componentDidMount(){
    this.props.actions.getRoles({})
  }

  getCol(){
    let _this = this;
    return [...roleColumns, {
      title: "操作",
      render(item:any) {
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({visible: true, detail: item})} >编辑</Button>
            <Link to={`/sell/role/${item.id}/auth`}>
              <Button size="small" type="link" >权限</Button>
            </Link>
            
          </div>
        );
      }
    }]
  }

  render() {
    const {utils, spinning, roles} = this.props;
    const {visible, detail} = this.state;

    console.log(roles, "roles")

    return (
      <JCard spinning={spinning}>
        <AddSellRole visible={visible} detail={detail} 
          onCancel={()=>this.setState({visible: false, detail: ""})} />

        <Card size="small" title={(
          <Button type="primary" icon={<PlusOutlined/>} onClick={()=>this.setState({visible: true})}>新增角色</Button>
        )} >
          <Table size="middle" columns={this.getCol()} dataSource={roles?utils.addIndex(roles):[]} pagination={false} />
        </Card>
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getRoles }, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    roles: state.sell.roles,
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellRole)