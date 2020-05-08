import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import { Card, Button, Icon, Table, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getParkList, deleteParkData} from "@/actions/projectAction"
import {parkColmuns} from "../colmuns"


class ParkList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1,
        pageSize:1
      }
    }
  }


  componentDidMount(){
    this.props.actions.getParkList(this.state.params)
  }


  handlenDelete(item){
    this.props.actions.deleteParkData({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.initial({})
    })
  }

  getCol(){
    let _this = this
    return parkColmuns.concat([{
      title: "操作",
      render(item){
        return <div>
          <Link to={`/project/park/${item.id}/edit`}>
            <Button type="link">编辑</Button>
          </Link>
          <Link to={`/project/park/${item.id}/parklot`}>
            <Button  type="link" >编辑车位</Button>
          </Link>
          <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
              <Button  type="link" >删除</Button>
            </Popconfirm>
          
        </div>
      }
    }])
  }

  render(){
    const {utils, spinning, park} = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title={<Link to="/project/park/add"><Button type="primary"><Icon type="plus" />新增停车场</Button></Link>}>
          <Table columns={this.getCol()} dataSource={park?utils.addIndex(park.list):[]} 
            pagination={utils.Pagination(park, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getParkList(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getParkList, deleteParkData}, dispatch)
  }
}

function mapStateProps(state){
  return {
    park: state.project.park,
    spinning: state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkList)