import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Row, Col
} from "antd"
import JCard from "@/components/JCard"
import {getContrastInItem, getInfoByItemId} from "@/actions/internetAction"
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip';

import moment from "moment"


class Statis extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      options: {
        legend:{
          show: true,
        },

        tooltip: {
          show: true,
        },
        
        xAxis: {
          type: 'category',
        },
        yAxis: {
            type: 'value',
            name: "单位(M)"
        },
        series: [
          // {
          //     data: [],
          //     type: 'line',
          //     lineStyle: {
          //       color: "#1890ff"
          //     },
          //     itemStyle:{
          //       color: "#1890ff"
          //     }
          // }
      ]
      },
      totals: '',
      quarters: []
    }
  }

  componentWillMount(){
    this.getTotalData()
    this.getInfoByItemIdInfo()
  }
  color16(){ 
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    return color;
  }
  getDays15(days){
    let d = new Date(), arr=[]
    for(let i=0;i<days;i++){
      let str = d.getTime()- 24*60*60*1000*(i+1)

      arr.push( String(moment(str).format("YYYY-MM-DD")) )
    }
    return arr.reverse()
    
  }
  getTotalData(){
    const {options} = this.state
    this.props.actions.getContrastInItem({}, res=>{
      let option = _.cloneDeep(options)
      let colors = ["#cc0033", "#1890ff", "#7e0023", "#660099",  "#ff9933", "#ffde33", "#009966"]
      option.xAxis.data = this.getDays15(15)
      _.each(res, (item, index)=>{
        let color = this.color16()
        option.series.push({
          name: item.item.housingEstateName,
          data: [],
          type: 'line',
          lineStyle: {
            color: colors[index]
          },
          itemStyle:{
            color: colors[index]
          }
        })

        _.each(this.getDays15(15), e=>{
          let _index = _.findIndex(item.data, o=>{
            return o.date.substring(0,10)==e
          })
          if(_index==-1){
            option.series[index]["data"].push({
              name: e,
              value: 0
            })
          }else{
            option.series[index]["data"].push({
              name: e,
              value: (item.data[_index]["usage"]/1024).toFixed(2)
            })
          }
        })
        
      })
      this.setState({totals: option})
      
    })
  }

  getInfoByItemIdInfo(){
    this.props.actions.getInfoByItemId({}, res=>{
      console.log(res, "asas")
      const {options} = this.state
      let colors = ["#cc0033", "#1890ff", "#7e0023", "#660099",  "#ff9933", "#ffde33", "#009966"]
      _.each(res, (item, index)=>{
        let option = _.cloneDeep(options)
        option.xAxis.data = this.getDays15(7)
        let i = -1
        _.each(item.data, (elem, key)=>{
          let data = []
          i++
          _.each(this.getDays15(7), e=>{
            let _index = _.findIndex(elem, o=>o.date.substring(0,10) == e)
            if(_index>-1){
              data.push({
                name: e,
                value: elem[_index]["usage"]
              })
            }else {
              data.push({
                name: e,
                value: 0
              })
            }
          })
          option.series.push({
            name: key,
            data: data,
            type: 'line',
            lineStyle: {
              color: colors[i]
            },
            itemStyle:{
              color: colors[i]
            }
          })
        })
        item.options = option
      })
      this.setState({quarters: res})
      console.log(res, "res")
    })
  }

  render(){
    const {spinning} = this.props
    const {totals, quarters} = this.state
    
    return (
      <JCard spinning={spinning}>
        <div>
          <Card title="小区流量统计">
            {totals?<ReactEchartsCore
              echarts={echarts}
              option={totals}
            />:null}
          </Card>
          <Card>
            <Row>
              {quarters.map((item, index)=>(
                <Col span={12} 
                  key={index} >
                  <ReactEchartsCore
                    echarts={echarts}
                    option={item.options}
                  />
                </Col>
              ))}
            </Row>
          </Card>
          
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getContrastInItem, getInfoByItemId}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.internet.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Statis)