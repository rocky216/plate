import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Card, Calendar, Row, Col, Tag, Typography, Badge, Button} from "antd";
import JCard from "@/components/JCard"
import {getUserListClockDetail} from "@/actions/dailyAction"
import moment from "moment"

const {Text} = Typography

class AttendDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        userId: this.props.match.params.id,
        startDate: (moment().startOf("month")).format("YYYY-MM-DD"),
        endDate: (moment().endOf("month")).format("YYYY-MM-DD"),
      },
      data: []
    }
  }
  
  componentDidMount(){
    this.initial();
  }
  initial(){
    this.props.actions.getUserListClockDetail(this.state.params, res=>this.setState({data: res}))
  }

  render(){
    const {utils, spinning } = this.props
    const {data, params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card size="small" extra={(
          <Link to="/daily/attend">
            <Button icon="rollback">返回</Button>
          </Link>
        )}>
          <Calendar 
          mode="month"
          onPanelChange={(d)=>{
            params.startDate = (moment(d).startOf("month")).format("YYYY-MM-DD")
            params.endDate = (moment(d).endOf("month")).format("YYYY-MM-DD")
            this.initial();
          }}
          dateCellRender={(value)=>{
            let d = moment(value).format("YYYY-MM-DD")
            let index = _.findIndex(data, o=>o[d]?true:false)
            let arr = data[index] && data[index][d].length>0?data[index][d]:[]
            
            return (
              <div>
                {arr.map(elem=>(
                  <Row key={elem.id} style={{fontSize: 12, lineHeight:"24px"}}>
                    <Col span={1}>
                    <Badge status={elem.clockStatus=="3"?"success":elem.clockStatus=="0"?"warning":"error"} ></Badge>
                    </Col>
                    <Col span={7}>
                      
                    {clockStatus(elem.clockStatus) && !elem.startClockTime?clockStatus(elem.clockStatus):elem.startClockTime.substring(11)}
                  </Col>
                    <Col span={7}>
                    {clockStatus(elem.clockStatus) && !elem.endClockTime?clockStatus(elem.clockStatus):elem.endClockTime.substring(11)}
                  </Col>
                  <Col span={9}>
                    {clockStatus(elem.clockStatus)?null:<Text disabled>{elem.sumStr}</Text>}  
                  </Col>
                  </Row>
                ))}
              </div>
            )
          }} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getUserListClockDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.daily.spinning,
    utils: state.app.utils
  }
}

function clockStatus(clockStatus){
  switch(clockStatus){
    case "0":
      return <Text mark>等待打卡</Text>
    case "1":
      return <Text type="danger">缺卡</Text>
    case "2":
      return <Text type="danger">缺卡</Text>
    case "3":
      return ""
  }
}

export default connect(mapStateProps, mapDispatchProps)(AttendDetail)