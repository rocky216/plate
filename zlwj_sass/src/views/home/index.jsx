import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Card, Row, Col, Empty, Modal, List} from "antd";
import JCard from "@/components/JCard"
import Chart from "./chart"
import "./index.less"
import {getHomeloadHeNoticeInfo, getHomeloadHeBaseInfo, getHomeloadHeRepairInfo, getHomeloadHeOrderInfo, getHomeloadHePassInfo, getHomeloadHeDeviceInfo} from "@/actions/appAction"


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      detail: "",
      spinning: true
    }
  }

 async componentDidMount(){
  try {
    this.props.actions.getHomeloadHeBaseInfo({})
    this.props.actions.getHomeloadHeRepairInfo({})
    this.props.actions.getHomeloadHePassInfo({})
    this.props.actions.getHomeloadHeDeviceInfo({})
    this.props.actions.getHomeloadHeNoticeInfo({})
    await this.props.actions.getHomeloadHeOrderInfo({})
    this.setState({spinning: false})
  } catch (error) {
    this.setState({spinning: false})
  }
 }




  render(){
    const {homebase, homeRepairbase, homeHeOrderbase, homeHePassbase, homeHeDevicebase, homeHeNoticebase} = this.props
    const {visible, detail, spinning} = this.state
    return (
      <div className="homePage">
        <JCard spinning={spinning}>
          <Row gutter={10}>
            {homebase?homebase.map((item, index)=>(
              <Col key={index} span={Math.floor(24/homebase.length)}>
                <Card style={{background: item.color}}>
                  <div className="basecard"  >{item.title}
                    <span className="number" style={{color:"#e20624"}}>{item.number}</span>
                  {item.unit}</div>
                </Card>
              </Col>
            )):null}
          </Row>
          <Row gutter={10} className="mgt10">
            <Col span={12}>
              <Card size="small" title="公告">
                <div style={{height: 140}}>
                  {homeHeNoticebase && homeHeNoticebase.length ?homeHeNoticebase.map((item, index)=>(
                    index<6?<div className="noticeList" key={index}>
                      <Button size="small" type="link" key={item.id}
                        onClick={()=>this.setState({visible:true, detail: item})}
                      >{item.title}</Button>
                      <span>{item.buildTime?item.buildTime.substring(0,10):""}</span>
                    </div>:null
                  )):<Empty />}
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" title="报修单">
                <div style={{height: 140}}>
                  {homeRepairbase?homeRepairbase.map((item, index)=>(
                    <div className="basecard" key={index}>{item.title}
                      <span className="number">{item.number}</span>
                    {item.unit}</div>
                  )):null}
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" title="今日通行">
                <div style={{height: 140}}>
                  {homeHePassbase?homeHePassbase.map((item, index)=>(
                    <div className="basecard" key={index}>{item.title}
                      <span className="number">{item.number}</span>
                    {item.unit}</div>
                  )):null}
                </div>
              </Card>
            </Col>
          </Row>
          <Card size="small" className="mgt10" title="月订单">
            <div style={{display: "flex"}}>
              <div style={{width: "20%", marginTop: 20}}>
                {homeHeOrderbase && homeHeOrderbase.otherOrder ?homeHeOrderbase.otherOrder.map((item, index)=>(
                  <div className="basecard" key={index}>{item.title}
                    <span className="number">{item.number}</span>
                  {item.unit}</div>
                )):null}
              </div>
              <div style={{width:"80%"}}>
                {homeHeOrderbase && homeHeOrderbase.otherOrder?<Chart data={homeHeOrderbase} />:null}
              </div>
            </div>
          </Card>
          <Row gutter={10} className="mgt10">
            {homeHeDevicebase?homeHeDevicebase.map((item, index)=>(
              <Col key={index} span={Math.floor(24/homeHeDevicebase.length)}>
                <Card size="small" title={item.title}>
                  {item.listData.map((elem, i)=>(
                    <div className="basecard" key={i} >{elem.title}
                      <span className="number">{elem.number}</span>
                    {elem.unit}</div>
                  ))}
                </Card>
              </Col>
            )):null}
          </Row>
          
          <Modal
            title={detail.title}
            width={800}
            visible={visible}
            footer={false}
            onCancel={()=>this.setState({visible: false})}
          >
            <div dangerouslySetInnerHTML={{__html:detail.content}}></div>
          </Modal>
          {/* <Row gutter={10}>
            <Col span={6}>
              <div className="listStitac" style={{background: "rgb(109, 186, 240)"}}>
                <p>200</p>
                <p>员工总数</p>
              </div>
            </Col>
            <Col span={6}>
              <div className="listStitac" style={{background: "rgb(93, 235, 221)"}}>
                <p>1200</p>
                <p>业主总数</p></div>
            </Col>
            <Col span={6}>
              <div className="listStitac" style={{background: "rgb(250, 183, 224)"}}>
                <p>1100</p>
                <p>本月已缴纳物业费人数</p>
              </div>
            </Col>
            <Col span={6}>
              <div className="listStitac" style={{background: "rgb(109, 186, 240)"}} >
                <p>100</p>
                <p>本月未缴纳物业费人数</p>
              </div>
            </Col>
          </Row> */}

        </JCard>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHomeloadHeNoticeInfo, getHomeloadHeBaseInfo, getHomeloadHeRepairInfo, getHomeloadHeOrderInfo, getHomeloadHeDeviceInfo, getHomeloadHePassInfo}, dispatch)
  }
}

function mapStateProps(state){
  return {
    homeHeNoticebase: state.app.homeHeNoticebase,
    homeHeDevicebase: state.app.homeHeDevicebase,
    homeHePassbase: state.app.homeHePassbase,
    homeHeOrderbase: state.app.homeHeOrderbase,
    homeRepairbase: state.app.homeRepairbase,
    homebase: state.app.homebase,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Home)