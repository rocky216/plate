import React from "react"
import {connect} from "react-redux"
import {bindActionCreators } from "redux"
import {Link} from "react-router-dom"
import {
  Button,
  Carousel 
} from "antd"
import "./index.less"
import JCard from "@/components/JCard"

class Home extends React.Component {
  render(){
    return (
        <JCard >
          <div className="homePage">
            <Carousel autoplay>
              <div >1</div>
              <div >2</div> 
              <div >3</div>
            </Carousel>
          </div>
        </JCard>
      
    )
  }
}

function mapStateProps(state){
  return {

  }
}

export default connect(mapStateProps)(Home) 