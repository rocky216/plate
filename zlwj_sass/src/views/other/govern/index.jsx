import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import {getGovern, deleteGovern} from "@/actions/otherAction"
import JCard from "@/components/JCard"
import {governColmuns} from "../colmuns"


class Govern extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1,
      }
    }
  }

  componentDidMount(){
    this.props.actions.getGovern(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteGovern({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getGovern(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return governColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/other/govern/${item.id}/edit`}>
              <Button type="link">编辑</Button>
            </Link>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, govern} = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning} >
        <Card title={<Link to="/other/govern/add"><Button type="primary" ><Icon type="plus" />新增政务</Button></Link>} >
          <Table columns={this.getCol()} 
            dataSource={govern?utils.addIndex(govern.list):[]}
            pagination={utils.Pagination(govern, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getGovern(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getGovern, deleteGovern}, dispatch)
  }
}

function mapStateProps(state){
  return {
    govern: state.other.govern,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Govern)