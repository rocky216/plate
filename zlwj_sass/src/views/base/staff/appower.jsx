import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Button, Card} from "antd";
import {getTreeAppMenuList, updateUserAppMenu} from "@/actions/baseAction"
import RoleMenu from "@/components/RoleMenu"


class StaffAppPower extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keys: [],
      bakKey: []
    }
  }
  

  componentDidMount(){
    this.props.actions.getTreeAppMenuList({id: this.props.match.params.id})
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.appMenu && !this.state.keys.length){
      this.setState({keys: this.getKeys( nextProps.appMenu )})
    }
  }

  getKeys(arr){
    if(!_.isArray(arr)) return []
    _.each(arr, item=>{
      if(item.select && !item.isParent){
        this.state.bakKey.push(item.key.toString())
      }
      
      if(item.nextMenuList && item.nextMenuList.length){
        this.getKeys(item.nextMenuList)
      }
    })
    return this.state.bakKey
  }

  onCheck(keys){
    console.log(arguments);
    this.setState({keys})
  }

  handleSubmit(){
    this.props.actions.updateUserAppMenu({
      id: this.props.match.params.id,
      menuKeys: this.state.keys.join()
    }, res=>{
      this.props.utils.OpenNotification("success")
    })
  }

  render(){
    const {utils, appMenu} = this.props
    const {keys} = this.state
    console.log(keys)
    return (
      <Card title="APP权限信息" extra={(
        <Button type="primary" icon="save" onClick={this.handleSubmit.bind(this)}>保存</Button>
      )}>
          <RoleMenu data={appMenu?appMenu:[]} keys={keys} onCheck={this.onCheck.bind(this)} />
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getTreeAppMenuList, updateUserAppMenu}, dispatch)
  }
}

function mapStateProps(state){
  return {
    appMenu: state.base.appMenu,
    utils: state.app.utils
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(StaffAppPower) )