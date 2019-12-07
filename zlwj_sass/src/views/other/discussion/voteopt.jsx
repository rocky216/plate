import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import {getThemeOption, deleteVoteOpt} from "@/actions/otherAction"
import JCard from "@/components/JCard"
import {voteOptionsColmuns} from "../colmuns"
import AddVote from "./addVorte"
import EditVote from "./editVorte"


class VoteOpt extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      params: {
        current: 1,
        themeId: props.match.params.id
      }
    }
  }

  componentDidMount(){
    this.props.actions.getThemeOption(this.state.params)
  }

  handlenDelete(item){
    console.log(item)
    this.props.actions.deleteVoteOpt({
      id:item.id
    }, res=>{
      this.props.actions.getThemeOption(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this
    return voteOptionsColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
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
    const {spinning, utils, voteopt} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <Card 
          title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增选项</Button>}
          extra={<Link to="/other/discussion"><Button><Icon type="rollback" />返回</Button></Link>}>
            <AddVote visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
            <EditVote visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />
          <Table
            columns={this.getCol()}
            dataSource={voteopt?utils.addIndex(voteopt):[]}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getThemeOption, deleteVoteOpt}, dispatch)
  }
}

function mapStateProps(state){
  return {
    voteopt: state.other.voteopt,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(VoteOpt)