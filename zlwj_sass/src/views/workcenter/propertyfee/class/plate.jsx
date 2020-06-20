import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Typography, Tag} from "antd";

const {Text} = Typography;

class ClassPlate extends React.Component {
  render(){
    const {utils, data} = this.props

    return (
      <Form layout="inline">
        <Form.Item label="编号">
          <Text mark>{data.assetsCode}</Text>
        </Form.Item>
        <Form.Item label="楼层区域">
          <Text mark>{data.level}</Text>
        </Form.Item>
        <Form.Item label="车位类型">
          <Text mark>{data.parkingType}</Text>
        </Form.Item>
        <Form.Item label="关联车牌">
          {data.carNoList.length?data.carNoList.map((item, index)=>(
            <Tag mark key={index}>{item}</Tag>
          )):"暂无"}
        </Form.Item>
        <Form.Item label="建筑面积">
          <Text mark>{data.houseArea}m&sup2;</Text>
        </Form.Item>
        <Form.Item label="交房时间">
          <Text mark >{data.deliversTime?data.deliversTime.substring(0,10):""}</Text>
        </Form.Item>
        <Form.Item label="已缴纳物业费区间">
          <Text mark>{data.payFristTime && data.payLastTime?`${data.payFristTime.substring(0,10)}到${data.payLastTime.substring(0,10)}`:"暂无"}</Text>
        </Form.Item>
        {this.props.children}
      </Form>
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
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ClassPlate)