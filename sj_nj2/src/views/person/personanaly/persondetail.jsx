import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux" 
import {Modal, Table} from "antd";
import {quitAnalysisDetailCj, quitAnalysisDetailFl, quitAnalysisDetailGj, quitAnalysisDetailGNd} from "@/actions/personAction"
import {personDetailColumns} from "./columns"
import JCard from "@/components/JCard"

class Persondetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: "",
    }
  }

  componentDidMount(){
    this.initial()
  }
  initial(){
    const {params, detail} = this.props
    if(params.type=="quitAvg1"){
      this.props.actions.quitAnalysisDetailCj({
        ...params,
        deptId:detail.id
      }, res=>{
        this.setState({data: res})
      })
    }else if(params.type=="itemAvg2"){
      this.props.actions.quitAnalysisDetailFl({
        ...params,
        personTypeId:detail.id
      }, res=>{
        this.setState({data: res})
      })
    }else if(params.type=="gradeAvg3"){
      this.props.actions.quitAnalysisDetailGj({
        ...params,
        levelId:detail.id
      }, res=>{
        this.setState({data: res})
      })
    }else if(params.type=="yearAvg4"){
      this.props.actions.quitAnalysisDetailGNd({
        ...params,
        month:detail.id
      }, res=>{
        this.setState({data: res})
      })
    }
    
  }
  

  render(){
    const {utils, visible, spinning, onCancel} = this.props
    const {data} = this.state

    return (
      <Modal
        destroyOnClose
        title="查看离职人员详情"
        width="80%"
        okText="确定"
        cancelText="取消"
        visible={visible}
        onCancel={onCancel}
        footer={false}
      >
        <JCard spinning={spinning}>
          <Table size="small" columns={personDetailColumns} dataSource={data?utils.addIndex(data):[]} pagination={false} />
        </JCard>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({quitAnalysisDetailCj, quitAnalysisDetailFl, quitAnalysisDetailGj, quitAnalysisDetailGNd}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Persondetail)