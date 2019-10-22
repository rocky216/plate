import React from "react"
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import {Link} from "react-router-dom"
import {
  Button,
  Carousel,
  Card,
  Row,
  Col,
  Typography
} from "antd"
import "./index.less"
import JCard from "@/components/JCard"

const { Title } = Typography;

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      option: {
        title: {
          text: "通行记录统计"
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
      }
    
    }
  }
  render(){
    return (
        <JCard >
          <Card className="homePage">
            
          </Card>
        </JCard>
      
    )
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps)(Home) 