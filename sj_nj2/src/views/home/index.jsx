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
      postsDetail: ""
    }
  }

  componentDidMount(){
    this.props.actions.getWorkBenchQuitList({}) 
  }

  absenceColumnsCol(){
    let _this = this
    return absenceColumns.concat([{
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

  render(){
    const {utils, spinning, workStaff} = this.props
    const {tabs, key, quitVisible, quitDetail, postsVisible, postsDetail} = this.state

    return (
      <JCard spinning={spinning}>
        {quitVisible?<QuitAppro visible={quitVisible} detail={quitDetail} onCancel={()=>this.setState({quitVisible: false, quitDetail:""})} />:null}
        {postsVisible?<PostsAppro visible={postsVisible} detail={postsDetail} onCancel={()=>this.setState({postsVisible: false, postsDetail:""})} />:null}
        <Row>
          <Col span={8}></Col>
          <Col span={16}>
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
                <Badge count={workStaff?workStaff[item.value]:0} offset={[10,0]} showZero>{item.title}</Badge>
              } />
            ))}
          </Tabs>
          {key=="absenceCount"?<Table size="small" columns={this.absenceColumnsCol()} dataSource={workStaff?utils.addIndex(workStaff.absenceList):[]}
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