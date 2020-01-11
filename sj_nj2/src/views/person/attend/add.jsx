import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table} from "antd";
import {getAttendanceInit} from "@/actions/personAction"
import {addAttendColumns} from "../columns"
import JCard from "@/components/JCard"

class AddAttend extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        
      },
      initList: []
    }
  }

  componentDidMount(){
    this.props.actions.getAttendanceInit(this.state.params, res=>{
      this.setState({initList:res})
    })
  }
  shiftChange(index,{target}){
    const {initList} = this.state
    initList[index]["shift"] = target.value
    this.setState({initList})
  }
  planChange(index,value){
    const {initList} = this.state
    if(initList[index]["shift"]=="0"){
      initList[index]["bbTrueHour"]=value
    }else if(initList[index]["shift"]=="1"){
      initList[index]["wbTrueHour"]=value
    }
    this.setState({initList})
  }
  nPlanChange(){
    
  }
  render(){
    const {utils, spinning} = this.props
    const {initList} = this.state

    return (
      <JCard spinning={spinning}> 
        <Card size="small">
          <Table bordered size="small" columns={addAttendColumns(this)} dataSource={utils.addIndex(initList)} 
          pagination={false}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAttendanceInit}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AddAttend)