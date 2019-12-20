import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm, Modal} from "antd";
import JCard from "@/components/JCard"
import {getThemeList, deleteTheme, addVoteRole, SendJPush} from "@/actions/otherAction"
import { themeColmuns } from "../colmuns";
import SelectHouse from "@/components/SelectHouse"



class Discussion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editVisible: false,
      detail: '',
      authVisible: false,
      authDetail: "",
      roles: [],
      params: {
        current: 1,
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

  handlenEditRole(){
    const {authDetail, roles} = this.state
    this.props.actions.addVoteRole({
      themeId: authDetail.id,
      houseIds: roles.join()
    }, res=>{
      this.props.actions.getThemeList(this.state.params)
      this.props.utils.OpenNotification("success")
      this.setState({authVisible: false})
    })
  }

  handlenJpush(item){
    let _this = this
    Modal.confirm({
      title: '是否推送消息？',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        _this.props.actions.SendJPush({
          themeId:item.id
        }, res=>{
          // this.props.actions.getThemeList(this.state.params)
          _this.props.utils.OpenNotification("success")
        })
      }
    });
  }

  getCol(){
    let _this = this
    return themeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/other/discussion/${item.id}/edit`}>
              <Button type="link" size="small">编辑</Button>
            </Link>
            <Link to={`/other/discussion/${item.id}/voteopt`}>
              <Button type="link" size="small">投票选项</Button>
            </Link>
            {item.voteType=="1"?<Button type="link" size="small" 
            onClick={()=>_this.setState({authVisible: true, roles: item.houseIdStr?item.houseIdStr.split(","):[], authDetail: item})} >投票权限</Button>:null}
            <Button onClick={_this.handlenJpush.bind(_this, item)} type="link" size="small">推送消息</Button>
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
    const {editVisible, detail, params, authVisible, authDetail, roles} = this.state
    
    return (
      <JCard spinning={spinning}  >
        <Card  title={<Link to="/other/discussion/add"><Button type="primary"><Icon type="plus" />新增主题</Button></Link>}>
          <Modal
            // destroyOnClose
            okText="确定"
            cancelText="取消"
            title="选择权限"
            visible={authVisible}
            onCancel={()=>this.setState({authVisible: false})}
            onOk={this.handlenEditRole.bind(this)}
          >
            <SelectHouse 
              NoInput={true} 
              checkable 
              onCheck={(keys)=>this.setState({roles:keys})}
              checkedKeys={roles} />
          </Modal>
          <Table 
            columns={this.getCol()}
            dataSource={theme?utils.addIndex(theme.list):[]}
            pagination={utils.Pagination(theme, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getThemeList(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getThemeList, deleteTheme, addVoteRole, SendJPush}, dispatch)
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