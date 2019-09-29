import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Modal,
  Tree
} from "antd"
import {getSysItemList, accountItemLink, getAccountList} from "@/actions/projectAction"
import {OpenNotification} from "@/utils"
import _default from "antd/lib/version"

const { TreeNode } = Tree;

class Itemass extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      keys: [],
      defaultKeys: ["22"]
    }
  }

  componentWillMount(){
    this.props.actions.getSysItemList()
  }
  handlenSelect(value){
    this.setState({keys: value})
  }

  handlenOk(){
    this.props.actions.accountItemLink({
      accountId: this.props.detail.id,
      itemId: this.state.keys.join()
    }, res=>{
      OpenNotification("success")
      this.props.onCancel()
      this.props.actions.getAccountList()
    })
  }

  getDefaultKeys(detail){
    let arr = []
    if(detail){
      _.each(detail.sysItemList, item=>(
        arr.push(item.id.toString())
      ))
    }
    return arr
  }

  render(){
    const {assVisible, detail, onCancel, sysItemList} = this.props
    
    return (
      <Modal
        destroyOnClose
        title="项目关联"
        visible={assVisible}
        onCancel={onCancel}
        onOk={this.handlenOk.bind(this)}
      >
        <Tree
          checkable
          defaultCheckedKeys={this.getDefaultKeys(detail)}
          onCheck={this.handlenSelect.bind(this)}
        >
          {sysItemList && sysItemList.length?sysItemList.map(item=>(
            <TreeNode title={item.housingEstateName} key={item.id} />
          )):null}
        </Tree>
      </Modal>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSysItemList, accountItemLink, getAccountList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    sysItemList: state.project.sysItemList
  }
}

export default connect(mapStateProps, mapDispatchProps)(Itemass)