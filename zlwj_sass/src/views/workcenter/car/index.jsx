import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getCarList, deleteCarAttaList} from "@/actions/otherAction"
import {carColumns} from "../colmuns"
import CarSearch from "./CarSearch"
import _default from "antd/lib/date-picker";

let params = {
  current: 1,
  linkName:"",
  carparkId:"",
  licensePlate:"",
  status:""
}

class CarList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  componentDidMount(){
    this.props.actions.getCarList(params)
  }

  handlenDelete(item){
    this.props.actions.deleteCarAttaList({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCarList({})
    })
  }
  getCol(){
    let _this = this
    return carColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/workcenter/car/${item.id}/edit`}>
              <Button type="link">编辑</Button>
            </Link>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  handlenSearch(values){
    if(values==null){
      params = {
        current: 1,
        linkName:"",
        carparkId:"",
        licensePlate:"",
        status:""
      }
      this.props.actions.getCarList(params)
      return 
    }
    this.props.actions.getCarList(_.assign(params,values))
  }

  render(){
    const {utils, spinning, car} = this.props

    return (
      <JCard spinning={spinning}>
        <Card title={(
          <Link to="/workcenter/car/add">
            <Button type="primary"><Icon type="plus" />新增车牌</Button>
          </Link>
        )}>
          <div className="flexend mgb10">
            <CarSearch params={params} handlenSearch={this.handlenSearch.bind(this)} />
          </div>
          <Table columns={this.getCol()} dataSource={car?utils.addIndex(car.list):[]} 
            pagination={utils.Pagination(car, page=>{
              params.current = page
              this.props.actions.getCarList(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCarList, deleteCarAttaList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    car: state.other.car,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CarList)