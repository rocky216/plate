import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Upload, Modal, Select, Form, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {ownersListPage, insertExcelUsers, deleteOwners} from "@/actions/projectAction"
import {getHeList} from "@/actions/baseAction"
import {errInfoColmun, ownerColmuns} from "../colmuns"
import UploadBar from "@/components/UploadBar"
import SearchBox from "@/components/SearchBox" 

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
    }
  }

  componentDidMount(){
    this.props.actions.ownersListPage(params)
    this.props.actions.getHeList({})
  }

  handlenSearch(values){
    console.log(values)
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
      console.log(info, "asas")
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
    const {spinning, utils, newowners, heList, commonFiles} = this.props
    const {tipVisible, errInfo, exportVisible, exportHeId} = this.state
    
    return (
      <JCard spinning={spinning}>
       <Card title={<div style={{display: "flex"}}>
          <Button type="primary" ghost className="mgr10" 
          onClick={()=>this.setState({exportVisible: true})}  ><Icon type="import" />批量导入</Button>
          <Link to="/project/owner/add">
            <Button type="primary" ><Icon type="plus" />新增</Button>
          </Link>
          
       </div>}>
         
        <Modal
          title="异常反馈"
          width="80%"
          footer={false}
          visible={tipVisible}
          onCancel={()=>this.setState({tipVisible: false})}
        >
          <Table columns={errInfoColmun} dataSource={utils.addIndex(errInfo)} pagination={false} />
        </Modal>
        <Modal
            title="批量导入"
            footer={false}
            visible={exportVisible}
            onCancel={()=>this.setState({exportVisible: false, exportHeId: ''})}
          >
            <Select value={exportHeId} style={{width: 150}} 
              onChange={(val)=>this.setState({exportHeId: val})} placeholder="选择小区" >
              <Option value="">选择小区</Option>
              {heList && heList.length? heList.map(item=>(
                <Option key={item.id} value={item.id}>{item.name}</Option>
              )):null}
            </Select>
            <UploadBar
              name="file" 
              data={{heId:exportHeId}}
              showUploadList={false} 
              action='/api/pc/heOwners/excelImport'
              onChange={this.handlenUpload.bind(this)}
              className="mgl10"
            >
                <Button  disabled={exportHeId?false:true} type="primary" ><Icon type="import" />批量导入</Button>
            </UploadBar>
            <a href={commonFiles?commonFiles.ownersImportMode.url+'?fileName='+commonFiles.ownersImportMode.fileName:''} 
                download={commonFiles?commonFiles.ownersImportMode.fileName:''} ><Button type="link">下载模板</Button></a>
          </Modal>
          
        <div className="flexend mgb10">
          <SearchBox handlenSearch={this.handlenSearch.bind(this)}/>
        </div>
        
         <Table columns={this.getCol()} dataSource={newowners?utils.addIndex(newowners.list):[]} 
          pagination={utils.Pagination(newowners, page=>{
            params.current = page
            this.props.actions.getOwnerList(params)
          })} />
       </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({ownersListPage, insertExcelUsers, getHeList, deleteOwners}, dispatch)
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