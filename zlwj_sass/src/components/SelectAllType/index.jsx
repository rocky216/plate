import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tree, Input} from "antd";
import {getAssetMenu, getHouseAssetRedis, getOtherAssetRedis, getCarparkAssetRedis, selectHeAssetListByKey, getCoOperativeRedis} from "@/actions/otherAction"
import "./index.less"

const {TreeNode} = Tree

class SelectAllType extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: [],
      searchData: "",
      height: document.body.clientHeight
    }
  }

  componentDidMount(){
    this.props.actions.getAssetMenu({isLoadCoOperative: this.props.isLoadCoOperative?"yes":""}, res=>{
      let newTreeData = this.handlenTopData(res)
      this.setState({treeData: newTreeData})
    })
  }
  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} selectable={item.selectable} title={item.name} isLeaf={item.isLeaf} dataRef={item} >
        {item.children && item.children.length? this.createNode(item.children):null}
      </TreeNode>
    ))
  }

  handlenTopData(arr){
    if(!_.isArray(arr)) return []
    _.each(arr, item=>{
      if(item.type=="tempCoOperativeMenu" ){
        item.isLeaf = true
      }
    })
    return arr
  }

  handlenData(arr){
    if(!_.isArray(arr)) return []

    _.each(arr, (item, attr)=>{
      if(item.type=="house" || item.type=="shops" || item.type=="parkingSpace" || item.type=="coOperative"  ){
        item.selectable=true
        item.isLeaf = true
      }else{
        item.selectable=false
        item.isLeaf = false
      }
      if(item.children && item.children.length){
        this.handlenData(item.children)
      }
    })

    return arr
  }

  onLoadData(data){
    const {type, id} = data.props.dataRef
    
    return new Promise((resolve, reject)=>{
      if (data.props.children) {
        resolve();
        return;
      }

      if(type=="houseMenu"){
        this.props.actions.getHouseAssetRedis({}, res=>{
          let newData = this.handlenData(res)
          data.props.dataRef.children = newData
          this.setState({
            treeData: [...this.state.treeData],
          });
          resolve();
        })
      }else if(type=="otherMenu") {
        this.props.actions.getOtherAssetRedis({otherTypeId: id}, res=>{
          let newData = this.handlenData(res)
          data.props.dataRef.children = newData
          this.setState({
            treeData: [...this.state.treeData],
          });
          resolve();
        })
      }else if(type=="carparkMenu") {
        this.props.actions.getCarparkAssetRedis({carparkId: id}, res=>{
          let newData = this.handlenData(res)
          data.props.dataRef.children = newData
          
          this.setState({
            treeData: [...this.state.treeData],
          });
          resolve();
        })
      }else if(type=="coOperativeMenu") {
        this.props.actions.getCoOperativeRedis({}, res=>{
          let newData = this.handlenData(res)
          data.props.dataRef.children = newData
          
          this.setState({
            treeData: [...this.state.treeData],
          });
          resolve();
        })
      }
      

    })
    
  }

  handlenSelect(key, {node}){
    if(this.props.onSelect) this.props.onSelect(node.props.dataRef)
  }

  handlenSearch({keyCode, target}){
    
    if(keyCode===13){
      console.log(target.value)
      this.props.actions.selectHeAssetListByKey({key: target.value, isLoadCoOperative:this.props.isLoadCoOperative?"yes":""}, res=>{
        if(res && res.length){
          let newData = this.handlenData(res)
          this.setState({searchData: newData})
        }else{
          this.props.utils.OpenNotification("warning","未找到相关选项")
        }
      })
    }
  }

  handlenClear({target}){
    if(!target.value){
      this.setState({searchData: ""})
    }
  }

  render(){
    const {utils } = this.props
    const {treeData, searchData}= this.state
    
    return (
      <div className="selectalltype" style={{height: this.state.height}}>
        <div style={{margin:"10px 10px 0"}}>
          <Input size="small" placeholder="输入回车查询" allowClear 
            onKeyDown={this.handlenSearch.bind(this)} 
            onChange={this.handlenClear.bind(this)}
          />
        </div>
        {searchData?
        <Tree 
          showLine 
          loadData={this.onLoadData.bind(this)}
          onSelect={this.handlenSelect.bind(this)}
          >
          {this.createNode(searchData)}
        </Tree>:
        <Tree 
          showLine 
          loadData={this.onLoadData.bind(this)}
          onSelect={this.handlenSelect.bind(this)}
          >
          {this.createNode(treeData)}
        </Tree>}
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getAssetMenu, getHouseAssetRedis, getOtherAssetRedis, 
      getCarparkAssetRedis, selectHeAssetListByKey, getCoOperativeRedis}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectAllType)