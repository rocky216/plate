import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {
  Table, Button,Card
} from "antd"
import JCard from "@/components/JCard"
import {parkOrderList} from "@/actions/parkAction"
import {parkOrderListColumns} from "../columns"
import {addIndex} from "@/utils"

class OrderList extends React.Component {
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
    this.getOrderList()
  }

  getOrderList(page){
    this.props.actions.parkOrderList({
      nowPage: page,
    })
  }


  render(){
    const {parkOrderList, spinning} = this.props
    const {pagination} = this.state
    
    if(parkOrderList){
      pagination.total = parkOrderList.pages.sumRow
    }
    
    pagination.onChange = (page)=>{
      pagination.current = page
      this.getOrderList(page)
    }
    return (
      <JCard spinning={spinning} >
        <Card>
          <Table 
            columns={parkOrderListColumns} 
            dataSource={parkOrderList && parkOrderList.orderList?addIndex(parkOrderList.orderList):[]} 
            pagination={pagination}
            />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({parkOrderList }, dispatch)
  }
}

function mapStateProps(state){
  return {
    parkOrderList: state.park.parkOrderList,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(OrderList)