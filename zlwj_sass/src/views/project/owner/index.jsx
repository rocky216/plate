import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Upload, Modal, Select, Form, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {ownersListPage, insertExcelUsers, deleteOwners, ownerExcelImport} from "@/actions/projectAction"
import {getHeList} from "@/actions/baseAction"
import {errInfoColmun, ownerColmuns} from "../colmuns"
import UploadBar from "@/components/UploadBar"
import SearchBox from "@/components/SearchBox" 
import ImportUpload from "@/components/ImportUpload"  
import HeList from "@/components/HeList"

const {Option} = Select

let params = { 
  current:1
}

class Owner extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tipVisible: false,
      exportVisible: false,
      errInfo: [],
      exportHeId: '',
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.ownersListPage(this.state.params)
    this.props.actions.getHeList({})
  }

  handlenSearch(values){
    if(values===null){
      this.props.actions.ownersListPage({})
      params = {
        current:1
      }
      return
    }
    params= {
      ...values,
      current:1
    }
    this.props.actions.ownersListPage(values)
  }

  handlenUpload(info){
    const {file} = info
    if(file.status === "done" && file.response.data){
      
      const {check, result, excelKey} = file.response.data
      
      if(!check){
        this.setState({tipVisible: true, errInfo: result})
      }else{
        this.setState({exportVisible: false})
        Modal.confirm({
          title: '数据监测成功，是否导入？',
          okText: '确认',
          cancelText: '取消',
          onOk: ()=>{
            this.props.actions.insertExcelUsers({
              token: this.props.utils.getCookie("token"),
              heId: this.state.exportHeId,
              excelKey
            }, res=>{
              this.setState({exportHeId: ''})
              this.props.utils.OpenNotification("success")
              this.props.actions.ownersListPage(this.state.params)
            })
          }
        });
        
      }
    }
  }

  handlenDelete(item){
    this.props.actions.deleteOwners({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.ownersListPage(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return ownerColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/project/owner/${item.id}/edit`} >
              <Button type="link" >编辑</Button>
            </Link>
            <Popconfirm 
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    let _this = this;
    const {spinning, utils, newowners, heList, commonFiles} = this.props
    const {tipVisible, errInfo, exportVisible, exportHeId} = this.state
    const {params } = this.state
    
    const uploadProps = {
      visible: exportVisible,
      download: commonFiles?commonFiles.ownersImportMode:"",
      columns: errInfoColmun,
      name: "file",
      action: "/api/pc/baseHeOwners/excelImportCheck",
      insertExcel: this.props.actions.ownerExcelImport,
      callback(){
        _this.props.actions.ownersListPage(_this.state.params);
        _this.setState({exportVisible: false})
      },
      onCancel(){
        _this.setState({exportVisible: false})
      },
      data: {
        token: utils.getCookie("token"),
        heId: exportHeId
      },
    }

    return (
      <JCard spinning={spinning}>
        {exportVisible?<ImportUpload {...uploadProps} check={exportHeId?false:true} >
          <HeList style={{width: 120}} value={exportHeId} onChange={(val)=>this.setState({exportHeId:val})} />
        </ImportUpload>:null}

       <Card title={<div style={{display: "flex"}}>
          <Button type="danger"  ghost className="mgr10" 
          onClick={()=>this.setState({exportVisible: true})}  ><Icon type="import" />批量导入</Button>
          <Link to="/project/owner/add">
            <Button type="primary" ><Icon type="plus" />新增</Button>
          </Link>
          
       </div>}>
          
        <div className="flexend mgb10">
          <SearchBox handlenSearch={this.handlenSearch.bind(this)}/>
        </div>
        
         <Table columns={this.getCol()} dataSource={newowners?utils.addIndex(newowners.list):[]} 
          pagination={utils.Pagination(newowners, page=>{
            params.current = page
            this.setState({params})
            this.props.actions.ownersListPage(params)
          })} />
       </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({ownersListPage, insertExcelUsers, getHeList, deleteOwners, ownerExcelImport}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    heList: state.base.heList,
    newowners: state.project.newowners,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Owner))