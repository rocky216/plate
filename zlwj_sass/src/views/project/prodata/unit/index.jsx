import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router-dom"
import {Card, Button, Icon, Tabs, Typography, Modal, Divider, Row, Col, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getUtilList, getBaseNameAndCode, deleteUnit, deleteFloor, deleteRoom, linkageAll} from "@/actions/projectAction"
import AddUtil from "./add"
import EditFloor from "./floorEdit"


const { TabPane } = Tabs;
const {Text} = Typography

class UnitList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editFloorVisible: false,
      floorDetail: '',
      title:""
    }
  }

  componentDidMount(){
    this.props.actions.getUtilList({
      heId: this.props.match.params.heId,
      buildingId: this.props.match.params.id,
    })
    this.props.actions.getBaseNameAndCode({
      heId: this.props.match.params.heId,
      buildId: this.props.match.params.id,
    },res=>{
      let title = `${res.heName}-${res.buildName}栋`
      this.setState({title})
    })
  }

  handlenDelete(unitId){
    const {heId, id} = this.props.match.params
    Modal.confirm({
      title: '是否删除该单元？',
      content: "删除前请确认该单元中的楼层和房间是否已删除，否则不予删除。",
      okText: '确认',
      cancelText: '取消',
      onOk: ()=>{
        this.props.actions.deleteUnit({
          id: unitId,
          heId: heId,
          buildingId: id,
        }, res=>{
          this.props.actions.getUtilList({
            heId: heId,
            buildingId: id,
          })
          this.props.utils.OpenNotification("success")
        })
      }
    })
  }

  floorInfo(elem){
    return (
      <div style={{display: "flex"}}>
        <Text type="warning" className="mgr10 ">{`第${elem.sysLevel}层`}</Text>
        <Text type="secondary" className="mgr10" >楼层展示编号：{elem.showFloorCode}</Text>
        <Text type="secondary" >实际楼层数：{elem.trueLevel}</Text>
      </div>
    )
  }

  handlenDeleteFloor(elem){
    this.props.actions.deleteFloor({
      id: elem.id
    }, res=>{
      this.props.actions.getUtilList({
        heId: this.props.match.params.heId,
        buildingId: this.props.match.params.id,
      })
      this.props.utils.OpenNotification("success")
    })
  }

  handlenDeleteRoom(e){
    console.log(e)
    this.props.actions.deleteRoom({
      id: e.id
    }, res=>{
      this.props.actions.getUtilList({
        heId: this.props.match.params.heId,
        buildingId: this.props.match.params.id,
      })
      this.props.utils.OpenNotification("success")
    })
  }

  // 级联
  handlenCascade(item, key){
    
    Modal.confirm({
      title: '是否运行级联操作？',
      content: '加载级联操作可能会比较慢，请耐心等待。',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        this.props.actions.linkageAll({
          hId: item.id,
          houseCode: item.houseCode,
          type: key
        }, res=>{
          this.props.actions.getUtilList({
            heId: this.props.match.params.heId,
            buildingId: this.props.match.params.id,
          })
          this.props.utils.OpenNotification("success")
        })
      }
    });
  }

  rooms(elem){
    return (
      <Row gutter={10}>
        {elem.heHouses && elem.heHouses.length?elem.heHouses.map(e=>(
          <Col key={e.id} span={6} className="mgb10">
            <Card size="small" title={<Text>{e.houseCode}号房间</Text>} 
                  extra={<div><Button size="small" type="link" ><Icon type="edit" /></Button>
                  <Popconfirm
                    placement="topRight" 
                    title="是否删除？"
                    okText="是"
                    cancelText="否"
                    onConfirm={this.handlenDeleteRoom.bind(this, e)}>
                      <Button size="small" type="link"><Icon type="delete" /></Button>
                    </Popconfirm>
                  </div>} >
              <Text code className="mgr10 inlineBlock">展示编号：{e.showBouseCode}</Text>
              <Text code className="mgr10 inlineBlock">是否电梯：{e.elevatorHouse=="1"?"有":"无"}</Text>
              <Text code className="mgr10 inlineBlock"  >建筑面积：{e.houseArea}m<sup>2</sup>
                <Icon onClick={this.handlenCascade.bind(this, e, "houseArea")} className="mgl10" type="retweet" 
                  style={{color:"#f5222d", fontSize: 14, cursor: "pointer"}} /></Text>
              <Text code className="mgr10 inlineBlock">室内面积：{e.indoorArea}m<sup>2</sup>
              <Icon className="mgl10" type="retweet" style={{color:"#f5222d", fontSize: 14, cursor: "pointer"}} /></Text>
                <Text code className="mgr10 inlineBlock">公摊面积：{e.poolArea}m<sup>2</sup>
                <Icon className="mgl10" type="retweet" style={{color:"#f5222d", fontSize: 14, cursor: "pointer"}} /></Text>
              <Text code className="mgr10 inlineBlock">交房时间：{e.deliversTime?e.deliversTime:"无"}</Text>
              <Divider dashed orientation="left" 
                      style={{margin: "10px 0", fontSize: 12}} >
                        <Text mark>其他信息</Text>
                      </Divider>
              {e.heHouseInfo?
                <div>
                  <Text code className="mgr10 inlineBlock">开始缴费时间：{e.heHouseInfo.payFristTime}</Text>
                  <Text code className="mgr10 inlineBlock">最近缴费时间：{e.heHouseInfo.payLastTime}</Text>
                  <Text code className="mgr10 inlineBlock">
                    是否装修：{e.heHouseInfo.packingStatus==0?"未装修":e.heHouseInfo.packingStatus=="1"?"装修中":"已装修"}
                  </Text>
                  {e.heHouseInfo.packingStatus==0?null:
                    <div>
                      <Text code className="mgr10 inlineBlock">装修开始时间：{e.heHouseInfo.packingStartTime}</Text>
                      <Text code className="mgr10 inlineBlock">装修结束时间：{e.heHouseInfo.packingEndTime}</Text>
                      <Text code className="mgr10 inlineBlock">装修说明：{e.heHouseInfo.packingInfo}</Text>
                    </div>}
                  
                </div>:"暂无"}
              
            </Card>
          </Col>
        )):null}
      </Row>
    )
  }

  render(){
    const {spinning, utilList} = this.props
    const {addVisible, title, editFloorVisible, floorDetail} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Text type="danger">{title}</Text>} extra={<Button type="primary" ghost 
              onClick={()=>this.props.history.goBack()}><Icon type="rollback" />返回</Button>} >
        <AddUtil visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        <EditFloor visible={editFloorVisible} detail={floorDetail} onCancel={()=>this.setState({editFloorVisible: false, floorDetail:''})} />


        <div className="mgb10">
          <Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" /> 新增单元</Button>
        </div>
        {utilList && utilList.length?
        <Tabs
            hideAdd
            type="editable-card"
            onEdit={this.handlenDelete.bind(this)}
          >
            {utilList.map(item=>(
              <TabPane key={item.id} tab={item.unitName} >
                {item.heFloors && item.heFloors.length?item.heFloors.map(elem=>(
                  <Card 
                    title={this.floorInfo(elem)} 
                    className="mgb10" key={elem.id} 
                    size="small"
                    extra={<div>
                            <Button size="small" type="link" onClick={()=>this.setState({editFloorVisible: true, floorDetail: elem})} >编辑</Button>
                            <Popconfirm
                              placement="topRight" 
                              title="是否删除？"
                              okText="是"
                              cancelText="否"
                              onConfirm={this.handlenDeleteFloor.bind(this, elem)}>
                                <Button size="small" type="link">删除</Button>
                              </Popconfirm>
                            </div>}>
                    {this.rooms(elem)}
                  </Card>
                )):null}
              </TabPane>
            ))}
          </Tabs>:null}
          
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getUtilList, getBaseNameAndCode, deleteUnit, deleteFloor, deleteRoom, linkageAll}, dispatch)
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