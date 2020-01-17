import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button} from "antd";
import JCard from "@/components/JCard"
import {getDictType} from "@/actions/systemAction"
import {dictionColumns} from "../columns"
import AuthButton from "@/components/AuthButton"


class Diction extends React.Component {
  componentDidMount(){
    this.props.actions.getDictType({})
  }

  getCol(){
    return dictionColumns.concat([{
      title: "操作",
      width: 150,
      render(item){
        return (
          <div>
            <Link to={`/system/diction/${item.id}/typekey`}>
              <AuthButton auth="3-03-01" size="small" type="link">添加字典</AuthButton>
            </Link>
            {/* <Button size="small" type="link">删除</Button> */}
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, diction} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small">
          <Table size="small" columns={this.getCol()} dataSource={diction?utils.addIndex(diction):[]} />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getDictType}, dispatch)
  }
}

function mapStateProps(state){
  return {
    diction: state.system.diction,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Diction)