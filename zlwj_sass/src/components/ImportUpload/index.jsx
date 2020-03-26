import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Upload, Button, Icon, Table} from "antd";


class ImportUpload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tipVisible: false,
      errInfo: []
    }
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
              this.props.actions.getOwnerList(this.state.params)
            })
          }
        });
        
      }
    }
  }

  render(){
    const {utils, download, data, action, visible, onCancel, columns} = this.props
    const {tipVisible, errInfo} = this.state
    console.log(errInfo,"result")
    const uploadProps = {
      name: "file",
      action: action,
      showUploadList: false,
      onChange: this.handlenUpload.bind(this),
      data: data
    }

    return (
      <div>
        <Modal
          title="异常反馈"
          width="80%"
          footer={false}
          visible={tipVisible}
          onCancel={()=>this.setState({tipVisible: false})}
        >
          <Table columns={columns} dataSource={utils.addIndex(errInfo)} pagination={false} />
        </Modal>
        <Modal
          title="批量导入"
          footer={false}
          visible={visible}
          onCancel={onCancel}
        >
          {this.props.children}
          <Upload className="mgl10" {...uploadProps}>
              <Button  type="primary" ><Icon type="import" />批量导入</Button>
          </Upload>
          {download?
          <a href={download.url+'?fileName='+download.fileName} 
              download={download.fileName} ><Button type="link">下载模板</Button></a>:null}
        </Modal>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ImportUpload)