import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Tabs } from "antd";
import JCard from "@/components/JCard"
import {getUtilList} from "@/actions/projectAction"

const { TabPane } = Tabs;

class UnitList extends React.Component {

  componentDidMount(){
    this.props.actions.getUtilList({
      heId: this.props.match.params.heId,
      buildId: this.props.match.params.id,
    })
  }

  handlenDelete(item){
    console.log(arguments)
  }

  render(){
    const {spinning, utilList} = this.props
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title="测试小区8-1栋" extra={<Button type="primary" ghost 
              onClick={()=>this.props.history.goBack()}><Icon type="rollback" />返回</Button>} >
        
        
        {utilList && utilList.length?
        <Tabs
            hideAdd
            type="editable-card"
            onEdit={this.handlenDelete.bind(this)}
            tabBarExtraContent={<Button type="primary"><Icon type="plus" /> 新增单元</Button>}
          >
            {utilList.map(item=>(
              <TabPane key={item.id} tab={item.unitName}  />
            ))}
          </Tabs>:null}
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getUtilList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utilList: state.project.utilList,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(UnitList)