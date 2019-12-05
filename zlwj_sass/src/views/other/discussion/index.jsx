import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon} from "antd";
import BraftEditor from "@/components/BraftEditor"
import JCard from "@/components/JCard"
import {getThemeList} from "@/actions/otherAction"
import { themeColmuns } from "../colmuns";
import AddTheme from "./add"


class Discussion extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
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

  getCol(){
    return themeColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link">编辑</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, theme, } = this.props
    const {addVisible, editVisible, detail} = this.state
    return (
      <JCard spinning={spinning}  >
        <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增主题</Button>}>
          <AddTheme visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />

          <Table size="small" 
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
    actions: bindActionCreators({getThemeList}, dispatch)
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