import React from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getCompanys, addCompany, updateCompanyStatus} from "@admin/actions/companyAction"
import {IProps, IState} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import Seach from "@admin/components/Submit/Search"
import { Button, Input, Form, Select, Table, InputNumber} from "antd";
import RegionElement from "@admin/components/Element/Region"
import {companyColumns} from "./columns"
import AddPage from "@admin/components/Page/AddPage"
import SelectCompany from "@admin/components/Element/SelectCompany"
import UploadElement from "@admin/components/Element/UploadElement"
import { type } from "os";

const {Option} = Select
const { TextArea } = Input;

let params = {
  current: 1,
  name: "",
  province: "",
  city: "",
  area: "",
  status: ""
}

interface Props extends IProps {
  companys: any
}
interface State {
  addVisible:boolean
}

class CompanyPage extends React.Component<Props, State> {
  constructor(props:any) {
    super(props);
    this.state = {
      addVisible: false
    }
  }
  
  componentDidMount(){
    this.props.actions.getCompanys({params})
  }
 

  handleSearch(values:any){

  }

  changeStatus(item:any){
    this.props.actions.updateCompanyStatus({id: item.id}, (res:any)=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompanys({params, obj: res, type: "edit", refresh: true})
    })
  }

  getCol(){
    let _this = this;
    return [...companyColumns, {
      title: "状态",
      dataIndex: "status",
      render(item:number, rows:any){
        return (
          <Select size="small" value={item}
              onChange={_this.changeStatus.bind(_this, rows)}
            >
            <Option value={1}>有效</Option>
            <Option value={0}>无效</Option>
          </Select>
        )
      }
    }]
  }

  submitAdd(values:any){
    console.log(values)
    this.props.actions.addCompany({
      ...values,
      logo: this.props.utils.submitFiles(values.logo),
      companyAddress: values.companyAddress.join()
    })
  }


  render() {
    const {spinning,utils, companys} = this.props
    const {addVisible} = this.state
    const uploadData = {
      resourceType: "0",
      fileType: "photo",
      linkType: "logo",
      fileSize: 10240,
      isFlag: 0
    }

    return (
      <JCard spinning={spinning}>
        <AddPage 
          spinning={spinning}
          title="新增公司"
          data={[
            {label: "公司Logo", name: "logo", type: <UploadElement data={uploadData}  />, },
            {label: "公司名称", name: "name", type: Input, rules: true},
            {label: "公司简称", name: "nickname", type: Input, rules: true},
            {label: "上级公司", name: "parentId", type: <SelectCompany/>},
            {label: "省/市/区", name: "companyAddress", type: <RegionElement />, rules: true},
            {label: "公司地址", name: "addressDetail", type: TextArea, rules: true},
            {label: "经度", name: "longitude", type: InputNumber},
            {label: "纬度", name: "latitude", type: InputNumber},
            {label: "备注", name: "remark", type: TextArea},
          ]}
          visible={addVisible} 
          onCancel={()=>this.setState({addVisible: false})} 
          onOk={this.submitAdd.bind(this)}/>
        <div key="a">
          <Seach
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
            initialValues={params}
            data={[
              {label: "公司名称", name: "name", type: Input},
              {label: "省/市/区", name: "region", type: <RegionElement /> },
              {label:"状态", name: "status", type: Select, selectList: [
                {label: "全部", id: ""},
                {label: "有效", id: 1},
                {label: "无效", id: 0},
              ]}
            ]}
            handleSearch={this.handleSearch.bind(this)}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={companys?utils.addIndex(companys.list, true):[]} 
          pagination={utils.Pagination(companys, (page)=>{
            params.current = page;
            this.props.actions.getCompanys(params)
          })}/>
        </div>
      </JCard>
    );
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({ getCompanys, addCompany, updateCompanyStatus}, dispatch)
  }
}

const mapStateToProps = (state:IState) => {
  return {
    companys: state.company.companys,
    spinning: state.company.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage)