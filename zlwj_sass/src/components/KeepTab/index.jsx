import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Tabs} from "antd";
import {removeTab } from "@/actions/appAction"
import "./index.less"

const { TabPane } = Tabs;

class KeepTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey:''
    }
  }
  componentDidMount(){
    this.setState({
      activeKey: this.props.location.pathname
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      activeKey: nextProps.location.pathname
    })
  }


  onEdit(link, action){
    if(action==="remove"){
      
      this.props.actions.removeTab(this.props, link)
    }
  }
  handlenChange(key){
    const {keeptabs } = this.props
    let obj = _.filter(keeptabs, o=>o.link==key)[0]
    this.props.history.push(obj["link"])
    
  }

  render(){
    const {keeptabs } = this.props
    const {activeKey} = this.state
    
    return (
      <div className="keeptab">
        <Tabs
          hideAdd
          type="editable-card"
          activeKey={activeKey}
          onChange={this.handlenChange.bind(this)}
          onEdit={this.onEdit.bind(this)}
          
        >
          {keeptabs.map((item, index)=>( 
            <TabPane tab={item.title} key={item.link} deaRef={item} />
          ))}
          
        </Tabs>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({ removeTab }, dispatch)
  }
}

function mapStateProps(state){
  return {
    keeptabs: state.app.keeptabs
  }
}

export default withRouter(connect(mapStateProps, mapDispatchProps)(KeepTab))