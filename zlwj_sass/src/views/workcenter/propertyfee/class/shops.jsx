import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Form, Typography} from "antd";

const {Text} = Typography;

class ClassShops extends React.Component {
  render(){
    const {utils, data} = this.props

    return (
      <Form layout="inline">
        <Form.Item label="名称">
          <Text mark>{data.assetsName}</Text>
        </Form.Item>
        <Form.Item label="编号">
          <Text mark>{data.assetsCode}</Text>
        </Form.Item>
        <Form.Item label="楼层">
          <Text mark>{data.level}</Text>
        </Form.Item>
        <Form.Item>
          <Text mark>{data.elevatorHouse=="0"?"楼梯房":"电梯房"}</Text>
        </Form.Item>
        <Form.Item label="建筑面积">
          <Text mark>{data.houseArea}m&sup2;</Text>
        </Form.Item>
        <Form.Item label="室内面积">
          <Text mark>{data.indoorArea}m&sup2;</Text>
        </Form.Item>
        <Form.Item label="公摊面积">
          <Text mark >{data.poolArea}m&sup2;</Text>
        </Form.Item>
        <Form.Item >
          <Text mark >{data.packingStatus=="0"?"未装修":data.packingStatus=="1"?"装修中":"已装修"}</Text>
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

export default connect(mapStateProps, mapDispatchProps)(ClassShops)