import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Card, Tabs, List, Typography, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {oneCardLog} from "@/actions/otherAction"

const { TabPane } = Tabs;

class SolutionLog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: ""
    }
  }
  componentDidMount(){
    this.props.actions.oneCardLog({id: this.props.match.params.id, logType: ""}, res=>{
      this.setState({activeKey: res[0]["key"]})
    })
  }
  handlenTab(v){
    this.setState({activeKey: v})
    this.props.actions.oneCardLog({id: this.props.match.params.id, logType: v})
  }

  render(){
    const {utils, spinning, solutionlog} = this.props
    const {activeKey} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" 
          title="一卡通日志"
          extra={<Link to="/workcenter/solution"><Button><Icon type="rollback" />返回</Button></Link>} >
          <Tabs
            activeKey={activeKey}
            onChange={this.handlenTab.bind(this)}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            >
            {solutionlog?solutionlog.map(item=>(
              <TabPane key={item.key} tab={item.name}/>
            )):""}
          </Tabs>
          <List
            size="small"
            dataSource={solutionlog?_.filter(solutionlog, o=> o.isSelect)[0]["dataList"]:[]}
            renderItem={item=>(
              <List.Item
                key={item.id}
                extra={item.buildTime}
              >
                <Typography.Text mark>{item.remark}</Typography.Text> 
              </List.Item>
            )}
          >
          </List>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({oneCardLog}, dispatch)
  }
}

function mapStateProps(state){
  return {
    solutionlog: state.other.solutionlog,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SolutionLog)