import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getThemeList, deleteTheme} from "@/actions/otherAction"
import { themeColmuns } from "../colmuns";



class Discussion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      detail: '',
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getThemeList(this.state.params)
  }

  handlenDelete(item){
    console.log(item)
    this.props.actions.deleteTheme({
      id: item.id
    }, res=>{
      this.props.actions.getThemeList(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this
    return themeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" size="small">编辑</Button>
            <Link to={`/other/discussion/${item.id}/voteopt`}>
              <Button type="link" size="small">投票选项</Button>
            </Link>
            <Button type="link" size="small">投票权限</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link" size="small" >删除</Button>
              </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, theme, } = this.props
    const {editVisible, detail} = this.state
    return (
      <JCard spinning={spinning}  >
        <Card  title={<Link to="/other/discussion/add"><Button type="primary"><Icon type="plus" />新增主题</Button></Link>}>
          
          <Table 
            columns={this.getCol()}
            dataSource={theme?utils.addIndex(theme.list):[]}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getThemeList, deleteTheme}, dispatch)
  }
}

function mapStateProps(state){
  return {
    theme: state.other.theme,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Discussion)