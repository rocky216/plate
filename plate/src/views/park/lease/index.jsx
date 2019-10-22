import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Table, Card
} from "antd"
import JCard from "@/components/JCard"
import {leaseList} from "@/actions/parkAction"
import {leaseListColumns} from "../columns"
import {addIndex} from "@/utils"

class Lease extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pagination: {
        current: 1,
        total: ''
      }
    }
  }

  componentWillMount(){
    this.getLeaseList(this.state.pagination.current)
  }

  getLeaseList(page){
    this.props.actions.leaseList({
      nowPage: page
    })
  }

  render(){
    const {leaseList, spinning} = this.props
    const {pagination} = this.state
    leaseList?pagination.total = leaseList.pages.sumRow:null
    pagination.onChange = (page)=>{
      pagination.current = page
      this.getLeaseList(page)
    }

    return (
      <JCard spinning={spinning}>
        <Card>
          <Table 
            columns={leaseListColumns} 
            dataSource={leaseList?addIndex(leaseList.plateCarLeases):[]} 
            pagination={pagination}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({leaseList}, dispatch) 
  }
}

function mapStateProps(state){
  return {
    leaseList: state.park.leaseList,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Lease)