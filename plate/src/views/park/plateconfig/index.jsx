import React from "react"
import {Switch, Route, Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card,Button,Icon,Table, Popconfirm
} from "antd"
import JCard from "@/components/JCard"
import AddPlateConfig from "./add"
import {getPlateConfigList, delPlateConfig} from "@/actions/parkAction"
import {plateConfColumns} from "../columns"
import {addIndex, OpenNotification} from "@/utils"
import EditPlateConfig from "./edit"


class PlateConfig extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail:'',
      editVisible: false
    }
  }

  componentWillMount(){
    this.props.actions.getPlateConfigList({})
  }

  handlenDel(item){
    this.props.actions.delPlateConfig({
      cid: item.id
    }, res=>{
      OpenNotification("success")
      this.props.actions.getPlateConfigList({})
    })
  }

  getCol(){
    let _this = this
    return plateConfColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button size="small" type="link" onClick={()=>_this.setState({editVisible:true, detail: item})}>编辑</Button>
            <Popconfirm title="是否删除?" onConfirm={_this.handlenDel.bind(_this, item)}>
              <Button size="small" type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, plateConfList} = this.props
    const {editVisible, detail} = this.state

    return (
      <JCard spinning={spinning} >
        <div>
          <EditPlateConfig editVisible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false})} />
          <div className="mgb10">
            <Switch>
              <Route path="/park/plateconfig/add" component={AddPlateConfig} />
            </Switch>
          </div>
          <Card
            size="small"
            title={<Button type="primary"><Link to="/park/plateconfig/add"><Icon type="plus" />添加车牌识别配置</Link></Button>}
          >
            <Table columns={this.getCol()} dataSource={plateConfList?addIndex(plateConfList):[]} />
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPlateConfigList, delPlateConfig}, dispatch)
  }
}

function mapStateProps(state){
  return {
    plateConfList: state.park.plateConfList,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(PlateConfig)