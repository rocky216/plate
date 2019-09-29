import React from "react"
import {withRouter} from "react-router-dom"
import {
  Row,
  Col,
  Select
} from "antd"
import citydata from "@/assets/data/citys"

const {Option } = Select

class SelectCity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      citys: citydata,
      cityList: [],
      areaList: [],
      provinceId: '',
      cityId: '',
      areaId: ''
    }
  }
  componentDidMount(){
    this.getDefaultVal(this.props.defaultVal)
  }


  getDefaultVal(defaultVal){
    
    if(defaultVal && defaultVal.length>0){
      let city = _.filter(citydata, o=>o.code==defaultVal[0])[0]
      let area = _.filter(city.cityList, o=>o.code==defaultVal[1])[0]
      this.setState({
        provinceId: defaultVal[0].toString(),
        cityId: defaultVal[1].toString(),
        areaId: defaultVal[2].toString(),
        cityList: city.cityList,
        areaList: area.areaList
      })
    }
    
  }

  handlenProvince(value){
    let data = _.filter(citydata, o=>o.code==value)[0]
    this.setState({cityList: data.cityList,provinceId: value, areaList: [],cityId: '', areaId: ''})
    this.props.onChange(value, '', '')
  }

  handlenCity(value){
    const {cityList, provinceId} = this.state
    let data = _.filter(cityList, o=>o.code==value)[0]
    this.setState({areaList: data.areaList, cityId: value, areaId: ''})
    this.props.onChange(provinceId, value, '')
  }

  handlenArea(value){
    const {provinceId, cityId} = this.state
    this.setState({areaId: value})
    this.props.onChange(provinceId, cityId, value)
  }


  render(){
    const {citys, cityList, areaList, provinceId, cityId, areaId} = this.state
    
    return (
      <div>
        <Row gutter={10}>
          <Col span={8}>
            <Select onChange={this.handlenProvince.bind(this)} value={provinceId}>
              {citys.map(item=>(
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Select onChange={this.handlenCity.bind(this)} value={cityId}>
              {cityList.map(item=>(
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Select value={areaId} onChange={this.handlenArea.bind(this)}>
              {areaList.map(item=>(
                <Option key={item.code} value={item.code}>{item.name}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SelectCity