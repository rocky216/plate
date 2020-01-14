import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card} from "antd";
import ReactEcharts from 'echarts-for-react';
import {getHomeSchedu} from "@/actions/appAction"
import moment from "moment"
import "./index.less"


class SchedcChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      alltime: [],
      yaxios: []
    }
  }
  componentDidMount(){
    this.props.actions.getHomeSchedu({}, res=>{
      
      this.setState({alltime: res})
    })
  }

  week(index){
    switch(parseInt(index)){
      case 1:
      return "星期一"
      case 2:
      return "星期二"
      case 3:
      return "星期三"
      case 4:
      return "星期四"
      case 5:
      return "星期五"
      case 6:
      return "星期六"
      case 7:
      return "星期日"
    }
  }


  render(){
    const {utils} = this.props
    const {alltime} = this.state
    

    return (
      <Card size="small" title="车间周排产计划">
        <div className="homeChart">
          {alltime.map((item,index)=>{
            return (
              <div key={index} className="item">
                <div className="title">
                  <p>{this.week(index+1)}</p>
                  <p>{item.time.substring(0,10)}</p>
                </div>
                {item.bPlan && item.bPlan.productionHour?
                <div className="bPlan">
                  <div>
                    <p>上班{item.bPlan?`(${item.bPlan.productionHour}H)`:""}</p>
                    <p>{item.bPlan?item.bPlan.productionStartTime.substring(0,10):""}-{item.bPlan?item.bPlan.productionEndTime.substring(0,10):""}</p>
                  </div>
                  <div>
                    <p>午餐{item.bPlan?`(${item.bPlan.cutOneHour}H)`:""}</p>
                    <p>{item.bPlan?item.bPlan.cutOneStartTime.substring(0,10):""}-{item.bPlan?item.bPlan.cutOneEndTime.substring(0,10):""}</p>
                  </div>
                </div>:<div className="nbPlan">&nbsp;</div>}
                {item.wPlan&&item.wPlan.productionHour?
                <div className="wPlan">
                  <div>
                    <p>上班{item.wPlan?`(${item.wPlan.productionHour}H)`:""}</p>
                    <p>{item.wPlan?item.wPlan.productionStartTime.substring(0,10):""}-{item.wPlan?item.wPlan.productionEndTime.substring(0,10):""}</p>
                  </div>
                  <div>
                    <p>晚餐{item.wPlan?`(${item.wPlan.cutTwoHour}H)`:""}</p>
                    <p>{item.wPlan?item.wPlan.cutTwoStartTime.substring(0,10):""}-{item.wPlan?item.wPlan.cutTwoEndTime.substring(0,10):""}</p>
                  </div>
                </div>
                :<div className="nwPlan">&nbsp;</div>}
              </div>
            )
          })}
        </div>
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHomeSchedu}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SchedcChart)