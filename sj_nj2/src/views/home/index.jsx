import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Tabs, Badge, Table, Button, Row, Col} from "antd";
import JCard from "@/components/JCard"
import {getWorkBenchQuitList} from "@/actions/appAction"
import {quitStaffColumns, postsColumns, absenceColumns} from "../person/columns"
import QuitAppro from "./quitAppro"
import PostsAppro from "./postsAppro"
import SchedcChart from "@/components/SchedcChart"
import {overworkColumns} from "./columns"
import LookFlow from "@/components/LookFlow"
import WeekCheck from "@/components/WeekCheck"

const {TabPane} = Tabs

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      key: "absenceCount",
      tabs: [
        {
          title: "缺勤审批",
          value: "absenceCount",
          key: "absenceCount"
        },
        {
          title: "计划外加班审批",
          value: "overWorkCount",
          key: "overWorkCount"
        },
        {
          title: "离职申请审批",
          value: "quitCount",
          key: "quitCount"
        },
        {
          title: "人员调岗审批",
          value: "transferPositionCount",
          key: "transferPositionCount"
        },
      ],
      quitVisible: false,
      quitDetail: "",
      postsVisible: false,
      postsDetail: "",
      workflowVisible: false, 
      workflowDetail:"",
      absenceflowVisible: false, 
      absenceflowDetail:""
    }
  }

  componentDidMount(){
    this.props.actions.getWorkBenchQuitList({}) 
  }
  handlenLookFlow(item){
    this.setState({absenceflowVisible: true, absenceflowDetail:item})
  }

  absenceColumnsCol(){
    let _this = this
    return absenceColumns(this).concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/person/absence/${item.id}/approval`}>
              <Button  size="small" type="link">审批</Button>
            </Link>
          </div>
        )
      }
    }])
  }
  overworkColumnsCol(){
    let _this = this
    return overworkColumns(this).concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/person/overwork/${item.id}/approval`}>
              <Button  size="small" type="link">审批</Button>
            </Link>
          </div>
        )
      }
    }])
  }

  staffColumnsCol(){
    let _this = this
    return quitStaffColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button onClick={()=>_this.setState({quitVisible: true, quitDetail: item})} size="small" type="link">审批</Button>
          </div>
        )
      }
    }])
  }
  postsColumnsCol(){
    let _this = this
    return postsColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button onClick={()=>_this.setState({postsVisible: true, postsDetail: item})} size="small" type="link">审批</Button>
          </div>
        )
      }
    }])
  }

  handlenOverFlow(item){
    this.setState({workflowVisible: true, workflowDetail:item})
  }

  render(){
    const {utils, spinning, workStaff} = this.props
    const {tabs, key, quitVisible, quitDetail, postsVisible, postsDetail, workflowVisible, workflowDetail, 
          absenceflowVisible, absenceflowDetail} = this.state
    return (
      <JCard spinning={spinning}>
        {workflowVisible?<LookFlow visible={workflowVisible} detail={workflowDetail} 
        onCancel={()=>this.setState({workflowVisible: false, workflowDetail: ""})} />:null}
        {absenceflowVisible?<LookFlow visible={absenceflowVisible} detail={absenceflowDetail} 
        onCancel={()=>this.setState({absenceflowVisible: false, absenceflowDetail: ""})} />:null}
        {quitVisible?<QuitAppro visible={quitVisible} detail={quitDetail} onCancel={()=>this.setState({quitVisible: false, quitDetail:""})} />:null}
        {postsVisible?<PostsAppro visible={postsVisible} detail={postsDetail} onCancel={()=>this.setState({postsVisible: false, postsDetail:""})} />:null}
        <Row>
          <Col span={10}>
            <WeekCheck/>
          </Col>
          <Col span={14}>
            <SchedcChart/>
          </Col>
        </Row>
        <Card size="small">
          <Tabs
            activeKey={key}
            onChange={(key)=>this.setState({key:key})}
          >
            {tabs.map(item=>(
              <TabPane key={item.key} tab={
                <div className="customBadge">
                  {item.title}
                  <span>{workStaff?workStaff[item.value]>99?"99+":workStaff[item.value]:0}</span>
                </div>
              } />
            ))}
          </Tabs> 
          {key=="absenceCount"?<Table size="small" columns={this.absenceColumnsCol()} dataSource={workStaff?utils.addIndex(workStaff.absenceList):[]}
          pagination={false} />:null}
          {key=="overWorkCount"?<Table size="small" columns={this.overworkColumnsCol()} dataSource={workStaff?utils.addIndex(workStaff.overWorkList):[]}
          pagination={false} />:null}

          {key=="quitCount"?<Table size="small" columns={this.staffColumnsCol()} dataSource={workStaff?utils.addIndex(workStaff.quitList):[]}
          pagination={false} />:null}
          
          {key=="transferPositionCount"?<Table size="small" columns={this.postsColumnsCol()} dataSource={workStaff?utils.addIndex(workStaff.transferPositionList):[]}
          pagination={false} />:null}

        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getWorkBenchQuitList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    workStaff: state.app.workStaff,
    spinning: state.app.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Home)