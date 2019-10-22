import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Card, Table
} from "antd"
import JCard from "@/components/JCard"
import {passList} from "@/actions/parkAction"
import {passListColumns} from "../columns"
import {addIndex} from "@/utils"


class PassList extends React.Component {
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
    this.getPassList(this.state.pagination.current)
  }

  getPassList(page){
    this.props.actions.passList({
      nowPage: page
    })
  }
  render(){
    const {pass, spinning} = this.props
    const {pagination} = this.state

    pass && pass.pages ? pagination.total = pass.pages.sumRow:null

    pagination.onChange = (page)=>{
      pagination.current = page
      this.getPassList(page)
    }

    return (
      <JCard spinning={spinning}>
        <Card>
          <Table columns={passListColumns} 
            dataSource={pass && pass.plateRecords.length?addIndex(pass.plateRecords):[]} 
            pagination={pagination}/> 
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({passList }, dispatch)
  }
}

function mapStateProps(state){
  return {
    pass: state.park.passList,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(PassList)