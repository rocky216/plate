import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Upload, Modal} from "antd";
import JCard from "@/components/JCard"
import {getOwnerList, insertExcelUsers} from "@/actions/projectAction"
import {errInfoColmun, ownerColmuns} from "../colmuns"
import UploadBar from "@/components/UploadBar"


class Owner extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tipVisible: false,
      errInfo: [],
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getOwnerList(this.state.params)
  }

  handlenUpload(info){
    const {file} = info
    if(file.status === "done"){
      console.log(info, "asas")
      const {check, result, excelKey} = file.response.data
      if(!check){
        this.setState({tipVisible: true, errInfo: result})
      }else{
        Modal.confirm({
          title: '数据监测成功，是否导入？',
          okText: '确认',
          cancelText: '取消',
          onOk: ()=>{
            console.log(excelKey, "Asas")
            this.props.actions.insertExcelUsers({
              token: this.props.utils.getCookie("token"),
              excelKey
            }, res=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getOwnerList(this.state.params)
            })
          }
        });
        
      }
    }
  }

  getCol(){
    return ownerColmuns.concat([{
      title: "操作",
      render(){
        return (
          <div>
            <Button size="small" type="link" >编辑</Button>
            <Button size="small" type="link" >删除</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, owner} = this.props
    const {tipVisible, errInfo} = this.state

    return (
      <JCard spinning={spinning}>
       <Card size="small" title={<div style={{display: "flex"}}>
         <Modal
          title="异常反馈"
          width="80%"
          footer={false}
          visible={tipVisible}
          onCancel={()=>this.setState({tipVisible: false})}
         >
           <Table size="small" columns={errInfoColmun} dataSource={errInfo} pagination={false} />
         </Modal>
         <UploadBar
          name="file" 
          showUploadList={false} 
          action='/api/pc/heOwners/excelImport'
          onChange={this.handlenUpload.bind(this)}
          className="mgr10"
         >
            <Button type="primary" ghost  ><Icon type="import" />批量导入</Button>
          </UploadBar>
          <Button type="primary" ><Icon type="plus" />新增</Button>
          
       </div>}>
         <Table size="small" columns={this.getCol()} dataSource={owner?utils.addIndex(owner.list):[]} />
       </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getOwnerList, insertExcelUsers}, dispatch)
  }
}

function mapStateProps(state){
  return {
    owner: state.project.owner,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Owner)