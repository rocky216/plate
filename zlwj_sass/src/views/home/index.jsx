import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Card, Row, Col} from "antd";
import JCard from "@/components/JCard"
import Chart from "./chart"
import "./index.less"



class Home extends React.Component {

 componentDidMount(){
 }



  render(){
    const {spinning} = this.props

    return (
      <div className="homePage">
        <JCard spinning={spinning}>
          <Row gutter={10}>
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
          </Row>
          <Row gutter={10} className="mgt10">
            <Col span={12}>
              <Card>
                <Chart/>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Chart/>
              </Card>
            </Col>
          </Row>
        </JCard>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Home)