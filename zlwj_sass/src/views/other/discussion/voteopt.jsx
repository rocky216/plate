import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon} from "antd";
import {getThemeOption} from "@/actions/otherAction"
import JCard from "@/components/JCard"
import {voteOptionsColmuns} from "../colmuns"


class VoteOpt extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params: {
        current: 1,
        themeId: props.match.params.id
      }
    }
  }

  componentDidMount(){
    this.props.actions.getThemeOption(this.state.params)
  }

  getCol(){
    return voteOptionsColmuns.concat([{
      title: "操作",
      render(){
        return (
          <div>
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, voteopt} = this.props

    return (
      <JCard spinning={spinning}>
        <Card 
          title={<Button type="primary"  ><Icon type="plus" />新增选项</Button>}
          extra={<Link to="/other/discussion"><Button><Icon type="rollback" />返回</Button></Link>}>
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
    actions: bindActionCreators({getThemeOption}, dispatch)
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