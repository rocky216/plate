import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {TreeSelect, Tree, Icon, Select} from "antd";
import {getHeHousing} from "@/actions/projectAction"
import {getMeunLevel } from "@/actions/baseAction"

const { TreeNode } = Tree;
const {Option} = Select

class SelectRoom extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      treeData: '',
      ownerType: "0"
    }

  }

  componentDidMount(){
    this.props.actions.getMeunLevel({pageSize: 100}, res=>{
      
      let data = this.handlenData(res)
      this.setState({treeData: data})
    })
  }

  handlenData(arr){
    if(!_.isArray(arr)) return []
    _.each(arr, (item, attr)=>{
      if(item.buildList){
        item.children = item["buildList"]
        item.selectable=false
        this.handlenData(item.buildList)
      }
      if(item.heUnits && item.showCode){
        item.children = item["heUnits"]
        item.name = item.showCode+"栋"
        item.selectable=false
        this.handlenData(item.heUnits)
      }
      if(item.heFloors && item.showCode){
        item.name = item.showCode+"单元"
        item.selectable=false
      }
      if(item.showBouseCode){
        item.name = item.showBouseCode+"号"
        item.isLeaf = true
      }
    })
    return arr
  }

  onLoadData(data){
    return new Promise((resolve, reject)=>{
      if (data.props.children) {
        resolve();
        return;
      }
      this.props.actions.getHeHousing({
        heId: data.props.dataRef.heId,
        buildingId: data.props.dataRef.buildingId,
        unitId: data.props.dataRef.id,
      }, res=>{
        let newData = this.handlenData(res)
        
        data.props.dataRef.children = newData
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      })

    })
  }

  handlenSelect(val, node){
    
    let obj = _.assign({},node.node["props"]["dataRef"], {
        ownerType: this.state.ownerType, 
        houseId: node.node["props"]["dataRef"]["id"]
      })
    if(this.props.onSelect)this.props.onSelect(obj)
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} selectable={item.selectable} title={item.name} isLeaf={item.isLeaf} dataRef={item} >
        {item.children && item.children.length? this.createNode(item.children):null}
      </TreeNode>
    ))
  }

  render(){
    const {onSelect} = this.props
    const {treeData, ownerType} = this.state
    
    return (
      <div>
        <div>
          <label>选择业主类型：</label>
        <Select value={ownerType} style={{width: 200}} onChange={val=>this.setState({ownerType:val})} >
          <Option value="0">业主</Option>
          <Option value="1">家庭成员</Option>
          <Option value="2">租客</Option>
         
        </Select>
        </div>
        <Tree
        showLine 
        loadData={this.onLoadData.bind(this)}
        onSelect={this.handlenSelect.bind(this)}
      >
        {this.createNode(treeData?treeData:[])}
      </Tree>
      </div>
      
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getMeunLevel,getHeHousing,}, dispatch)
  }
}

function mapStateProps(state){
  return {
    projectitem: state.project.projectitem,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SelectRoom)