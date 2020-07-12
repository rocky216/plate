import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Card, Button, Table } from "antd"
import {IProps} from "@/interface/app"
import {getCompanys, deleteSellCompany} from "@/actions/sellAction"
import JCard from "@/components/JCard"
import {PlusOutlined} from "@ant-design/icons"
import {companyColumns} from "../columns"
import AddSellCompany from "./add"
import DeletePop from '@/components/DeletePop'

interface State {
  visible: boolean;
  type: string;
  detail: any;
}

interface Props extends  IProps{
  companys:any;
}

class SellCompany extends React.Component<Props, State> {

  state:State = {
    visible: false,
    type: "",
    detail: "",
  }

  componentDidMount(){
    this.props.actions.getCompanys({})
  }

  handleDelete(item:any){
    this.props.actions.deleteSellCompany({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompanys({})
    })
  }

  getCol(){
    let _this = this
    return [...companyColumns, {
      title: "操作",
      render(item:any) {
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({visible: true, detail: item})}>新增</Button>
            <Button size="small" type="link" onClick={()=>_this.setState({visible: true, detail: item, type: "edit"})}>编辑</Button>
            <DeletePop confirm={_this.handleDelete.bind(_this, item)}>
              <Button size="small" type="link">删除</Button>
            </DeletePop>
          </div>
        );
      }
    }]
  }

  render() {
    const {utils, spinning, companys} = this.props;
    const {visible, type, detail} = this.state;
    
    return (
      <JCard spinning={spinning}>
        <AddSellCompany visible={visible} 
          detail={detail}
          onCancel={()=>this.setState({visible: false, detail: "", type: ""})} 
          type={type}/>

        <Card size="small" title={(
          <Button type="primary" 
            icon={<PlusOutlined/>} 
            onClick={()=>this.setState({visible: true})} >新增公司</Button>
        )} >
          {companys?
          <Table size="middle" 
            bordered
            columns={this.getCol()} 
            defaultExpandAllRows
            dataSource={companys?utils.addIndex(companys, true):[]} pagination={false} />:null}
        </Card>
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanys, deleteSellCompany}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    companys: state.sell.companys,
    spinning: state.sell.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellCompany)