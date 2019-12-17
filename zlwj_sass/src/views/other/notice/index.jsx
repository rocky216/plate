import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm } from "antd";
import JCard from "@/components/JCard"
import {getNotice, deleteNotice} from "@/actions/otherAction"
import  {noticeColmuns} from "../colmuns"


class Notice extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params:{
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getNotice(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteNotice({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getNotice(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return noticeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/other/notice/${item.id}/edit`}>
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

  render(){
    const {spinning, utils, notice} = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning} >
        <Card title={<Link to="/other/notice/add"><Button type="primary"><Icon type="plus" />新增公告</Button></Link>} >
          <Table columns={this.getCol()} 
            dataSource={notice?utils.addIndex(notice.list):[]}
            pagination={utils.Pagination(notice, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getNotice(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getNotice, deleteNotice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    notice: state.other.notice,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Notice)