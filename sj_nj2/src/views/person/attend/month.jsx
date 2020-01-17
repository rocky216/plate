import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table} from "antd";
import {loadMAttendanceInit} from "@/actions/personAction"
import {monthAttend} from "../columns"
import "./index.less"



class MonthAttend extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      columnsCol: [],
      monthData: []
    }
  }

  componentDidMount(){
    this.props.actions.loadMAttendanceInit({}, res=>{
      this.handlenColumns(res)
      // this.setState({data: res})
    })
  }

  handlenColumns(data){
    let res = _.cloneDeep(data)
    let count = res[0]["sumTimeM"]
    let col = []
    for(let i=1;i<=count;i++){
      col.push({
        title: String((i>9?i:'0'+i)),
        children: [
          {
            title: "计划性出勤时长",
            dataIndex: "a"+(i>9?i:'0'+i),
            key: Math.random()+i,
            render(item){
              return item.attenH
            }
          },
          {
            title: "出勤异常",
            dataIndex: "a"+(i>9?i:'0'+i),
            key: Math.random()+i,
            render(item){
              return item.leaveH
            }
          },
          {
            title: "非计划出勤时长",
            dataIndex: "a"+(i>9?i:'0'+i),
            key: Math.random()+i,
            render(item){
              return item.workH
            }
          },
        ]
      })
    }
    _.each(res, item=>{
      for(let i=1;i<=count;i++){
        let index = _.findIndex(item.attenDList, o=>o.attenTimeD==i)
        if(index==-1){
          item.attenDList.push({
            attenH: "-",
            attenTime: "",
            attenTimeD: i,
            attenType: "-",
            leaveCheck: "-",
            leaveH: "-",
            leaveType: "-",
            workCheck: "-",
            workH: "-",
          })
          
        }
      }
    })
    _.each(res, item=>{
      _.each(item.attenDList, elem=>{
        item[String("a"+(elem.attenTimeD>9?elem.attenTimeD:'0'+elem.attenTimeD))] = elem
      })
    })
    let newCol = monthAttend.concat(col)
    console.log(newCol)
    
    this.setState({columnsCol:newCol, monthData: res})
  }

  render(){
    const {utils} = this.props
    const {monthData, columnsCol} = this.state
    
    return (
      <div className="monthAttend">
        <Card bordered={false}>
          <Table size="small" bordered columns={columnsCol} dataSource={utils.addIndex(monthData)} scroll={{ x: 8000, }} />
        </Card>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadMAttendanceInit}, dispatch)
  }
}

function mapStateProps(state){
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(MonthAttend)