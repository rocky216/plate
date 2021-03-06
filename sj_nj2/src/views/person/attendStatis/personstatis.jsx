import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Table, Button, Icon} from "antd";
import {personnelAttendanceStatistics} from "@/actions/personAction"
import {personstatisColumns} from "../columns"
import Searchbox from "./searchbox"
import moment from "moment"


class Personstatis extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params:{
        deptId:"",
        startTime:"",
        endTime:""
      },
      outParams: {
        deptId:"",
        startTime:"",
        endTime:""
      }
    }
  }
  componentDidMount(){
    this.initial(this.state.params)
  }

  initial(params){
    this.props.actions.personnelAttendanceStatistics(params)
  }

  handleSearch(values){
    if(values==null){
      this.initial(this.state.params)
      this.setState({outParams: _.cloneDeep(this.state.params)})
      return
    }
    this.initial(values)
    this.setState({outParams: values})
  }

  render(){
    const {utils, personstatis} = this.props
    const {outParams} = this.state

    return (
      <div>
        <div className="fixedend mgb10">
          <Searchbox handleSearch={this.handleSearch.bind(this)} roleUrl="/api/pc/hAttendanceAnalysis" />
        </div>
        <Table size="small" bordered columns={personstatisColumns} 
          dataSource={personstatis?utils.addIndex(personstatis.listData):[]} pagination={false} />
        <div className="mgt10">
          <a href={`${IMGURL}/api/pc/hAttendanceAnalysis/personnelAttendanceStatisticsExport/?token=${utils.getCookie("token")}&deptId=${outParams.deptId}&endTime=${outParams.endTime}&startTime=${outParams.startTime}`}>
            <Button auth="2-01-07" type="danger" ghost className="mgr10"><Icon type="export" />导出</Button>
          </a>
        </div>
      </div>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({personnelAttendanceStatistics}, dispatch)
  }
}

function mapStateProps(state){
  return {
    personstatis: state.person.personstatis,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Personstatis)