import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Table, Card, Button, Popconfirm} from "antd"
import {getCompanys, addCompany, editCompany, deleteCompany} from "@/actions/powerAction"
import {IProps} from "@/interface/app"
import {companyColumns} from "../columns/index"
import JCard from "@/components/JCard"
import { PlusOutlined } from '@ant-design/icons';
import AddCompany from "./add"
import Confirm from "@/components/Confirm"

interface Props extends IProps {
  companys?:any
}

interface State {
  visible: boolean;
  detail: any | boolean;
}


class PowerCompanyPage extends React.Component<Props, State> {
  state:State = {
    visible: false,
    detail: false
  }
  componentDidMount(){
    this.props.actions.getCompanys()
  }

  submitCompany(values:any){
    console.log(values)
    
    this.props.actions[values.id?"editCompany":"addCompany"](values, (res:any)=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompanys()
      this.setState({visible:false, detail: false})
      
    })
  }

  handleDelete(item:any){
    this.props.actions.deleteCompany({
      id: item.id
    }, ()=>{
      this.props.utils.OpenNotification("success");
      this.props.actions.getCompanys()
    })
  }

  getCol():any[]{
    let _this = this;
    return [...companyColumns, {
      title: "操作",
      render(item:any) {
        return (
          <div>
            <Button  type="link" onClick={()=>_this.setState({visible:true, detail: item})}>编辑</Button>
            <Popconfirm
              title="是否删除？"
            >
              <Confirm onConfirm={_this.handleDelete.bind(_this, item)} />
            </Popconfirm>
          </div>
        );
      }
    }]
  }

  render() {
    const {companys, utils, spinning} = this.props;
    const {visible, detail} = this.state
    
    return (
      <JCard spinning={spinning}>
        <AddCompany visible={visible} 
          detail={detail} onCreate={this.submitCompany.bind(this)} 
          onCancel={()=>this.setState({visible: false, detail: false})} />

        <Card size="small" title={<Button onClick={()=>this.setState({visible: true})} type="primary" icon={<PlusOutlined />}>新增公司</Button>}>
          <Table size="middle" columns={this.getCol()} dataSource={companys?utils.addIndex(companys.list):[]} />
        </Card>
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanys, addCompany, editCompany, deleteCompany}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    spinning: state.power.spinning,
    companys: state.power.companys,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerCompanyPage)