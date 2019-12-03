import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Upload, Modal, Select, Form, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {getOwnerList, insertExcelUsers, deleteOwner} from "@/actions/projectAction"
import {getHeList} from "@/actions/baseAction"
import {errInfoColmun, ownerColmuns} from "../colmuns"
import UploadBar from "@/components/UploadBar"

const {Option} = Select

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
    this.props.actions.getOwnerList(this.state.params)
    this.props.actions.getHeList({})
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
              this.props.actions.getOwnerList(this.state.params)
            })
          }
        });
        
      }
    }
  }

  handlenDelete(item){
    this.props.actions.deleteOwner({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getOwnerList(this.state.params)
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
              <Button size="small" type="link" >编辑</Button>
            </Link>
            <Popconfirm 
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button size="small" type="link">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, owner, heList, commonFiles} = this.props
    const {tipVisible, errInfo, exportVisible, exportHeId} = this.state
    
    return (
      <JCard spinning={spinning}>
       <Card size="small" title={<div style={{display: "flex"}}>
          <Button type="primary" ghost className="mgr10" onClick={()=>this.setState({exportVisible: true})}  ><Icon type="import" />批量导入</Button>
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
          <Table size="small" columns={errInfoColmun} dataSource={utils.addIndex(errInfo)} pagination={false} />
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
          
        <div className="mgb10">
          
        </div>
        
         <Table size="small" columns={this.getCol()} dataSource={owner?utils.addIndex(owner.list):[]} />
       </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOwnerList, insertExcelUsers, getHeList, deleteOwner}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    heList: state.base.heList,
    owner: state.project.owner,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(Owner))