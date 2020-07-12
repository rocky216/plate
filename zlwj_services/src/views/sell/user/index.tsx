import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Table, Card, Button } from "antd"
import {IProps} from "@/interface/app"
import JCard from "@/components/JCard"
import {usersColumns } from "../columns"
import {getSellUsers, deleteSellUsers} from "@/actions/sellAction"
import DeletePop from "@/components/DeletePop"
import {PlusOutlined} from "@ant-design/icons"
import AddSellUser from "./add"


interface Props extends IProps {
  users:any;
}


let params = {
  current: 1
}


class SellUser extends React.Component<Props> {

  state = {
    visible: false,
    detail: ""
  }

  componentDidMount(){
    this.props.actions.getSellUsers(params)
  }

  handeDelete(item:any){
    this.props.actions.deleteSellUsers({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSellUsers(params)
    })
  }

  getCol(){
    let _this = this;
    return [...usersColumns, {
      title: "操作",
      render(item:any) {
        
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({visible:true, detail:item})}>编辑</Button>
            <DeletePop confirm={_this.handeDelete.bind(_this, item)}>
              <Button size="small" type="link" >删除</Button>
            </DeletePop>
            
          </div>
        );
      }
    }]
  }

  render() {
    const {utils, spinning, users} = this.props;
    const {visible, detail} = this.state;

    return (
      <JCard spinning={spinning}>
        <AddSellUser visible={visible} detail={detail} params={params} 
          onCancel={()=>this.setState({visible: false, detail:""})} />

        <Card size="small" title={(
          <Button type="primary" icon={<PlusOutlined/>} 
            onClick={()=>this.setState({visible:true})} >新增用户</Button>
        )} >
          <Table size="middle" columns={this.getCol()} dataSource={users?utils.addIndex(users.list):[]} 
            pagination={utils.Pagination(users, (page:number)=>{
              params.current = page;
              this.props.actions.getSellUsers(params)
            })} />
        </Card>
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getSellUsers, deleteSellUsers}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    users: state.sell.users,
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellUser)