import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router-dom"
import {Card, Button, Icon, Tabs, Typography, Modal, Divider, Row, Col} from "antd";
import JCard from "@/components/JCard"
import {getUtilList, getBaseNameAndCode, deleteUnit, deleteFloor} from "@/actions/projectAction"
import AddUtil from "./add"


const { TabPane } = Tabs;
const {Text} = Typography

class UnitList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
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

  rooms(elem){
    return (
      <Row gutter={10}>
        {elem.heHouses && elem.heHouses.length?elem.heHouses.map(e=>(
          <Col key={e.id} span={6} className="mgb10">
            <Card size="small" title={<Text>{e.houseCode}号房间</Text>} >
              <Text code className="mgr10 inlineBlock">展示编号：{e.showBouseCode}</Text>
              <Text code className="mgr10 inlineBlock">是否电梯：{e.elevatorHouse=="1"?"有":"无"}</Text>
              <Text code className="mgr10 inlineBlock">建筑面积：{e.houseArea}m<sup>2</sup></Text>
              <Text code className="mgr10 inlineBlock">室内面积：{e.indoorArea}m<sup>2</sup></Text>
              <Text code className="mgr10 inlineBlock">公摊面积：{e.poolArea}m<sup>2</sup></Text>
              <Text code className="mgr10 inlineBlock">交房时间：{e.deliversTime?e.deliversTime:"无"}</Text>
            </Card>
          </Col>
        )):null}
      </Row>
    )
  }

  render(){
    const {spinning, utilList} = this.props
    const {addVisible, title} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<Text type="danger">{title}</Text>} extra={<Button type="primary" ghost 
              onClick={()=>this.props.history.goBack()}><Icon type="rollback" />返回</Button>} >
        <AddUtil visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        
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
                {/* <div className="flexend mgb10">
                  <Button type="primary" ghost ><Icon type="plus"/>新增楼层</Button>
                </div> */}
                {item.heFloors && item.heFloors.length?item.heFloors.map(elem=>(
                  <Card 
                    title={this.floorInfo(elem)} 
                    className="mgb10" key={elem.id} 
                    size="small"
                    extra={<div>
                            <Button size="small" type="link">编辑</Button>
                            <Button size="small" type="link">删除</Button></div>}>
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
    actions: bindActionCreators({getUtilList, getBaseNameAndCode, deleteUnit, deleteFloor}, dispatch)
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