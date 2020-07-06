import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Modal, Upload, Button, Icon, Table} from "antd";
import JCard from "@/components/JCard"


class ImportUpload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tipVisible: false,
      errInfo: [],
      spinning: false
    }
  }

  handlenUpload(info){
    const {file} = info
    this.setState({spinning: true})
    if(file.status === "done"){
      if(file.response.code==1 && !file.response.data){
        this.props.utils.OpenNotification("error", file.response.msg)
        return 
      }
      const {check, result, excelKey} = file.response.data
      this.setState({spinning: false})
      if(!check){
        this.setState({tipVisible: true, errInfo: result})
      }else{
        this.setState({exportVisible: false})
        Modal.confirm({
          title: '数据监测成功，是否导入？',
          okText: '确认',
          cancelText: '取消',
          onOk: ()=>{
            this.props.insertExcel({
              token: this.props.utils.getCookie("token"),
              excelKey
            }, res=>{
              this.props.utils.OpenNotification("success")
              this.props.callback()
            })
          }
        });
        
      }
    }
  }

  render(){
    const {utils, download, data, action, visible, onCancel, columns, check} = this.props
    const {tipVisible, errInfo, spinning} = this.state
    console.log(errInfo,"result")
    const uploadProps = {
      name: "file",
      action: action,
      showUploadList: false,
      onChange: this.handlenUpload.bind(this),
      data: data
    }
    console.log(check)
    return (
      <div >
        <Modal
          title="异常反馈"
          width="80%"
          footer={false}
          visible={tipVisible}
          onCancel={()=>this.setState({tipVisible: false})}
        >
          {columns?<Table columns={columns} dataSource={utils.addIndex(errInfo)} pagination={false} />:null}
          
        </Modal>
        <Modal
          title="批量导入"
          footer={false}
          visible={visible}
          onCancel={onCancel}
        >
          <JCard spinning={spinning}>
            {this.props.children}
            <Upload className="mgl10" {...uploadProps} disabled={check} >
                <Button  type="primary" disabled={check} ><Icon type="import"  />批量导入</Button>
            </Upload>
            {download?
            <a href={download.url+'?fileName='+download.fileName} 
                download={download.fileName} ><Button type="link">下载模板</Button></a>:null}
          </JCard>
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