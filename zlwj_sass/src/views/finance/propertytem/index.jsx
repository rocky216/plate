import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Table, Icon} from "antd";
import {getPropertyTemplate} from "@/actions/financeAction"
import JCard from "@/components/JCard"
import {propertyTemColmuns} from "../colmuns"


class Properytem extends React.Component {
  
  componentDidMount(){
    this.props.actions.getPropertyTemplate({})
  }

  getCol(){
    return propertyTemColmuns.concat([
      {
        title: "操作",
        render(item){
          return (
            <div>
              <Button type="link">编辑</Button>
            </div>
          )
        }
      }
    ])
  }

  render(){
    const {spinning, utils, propertytem} = this.props

    return (
      <JCard spinning={spinning}>
        <Card title={<Link to="/finance/propertytem/add"><Button type="primary"><Icon type="plus" />添加模板</Button></Link>}>
          <Table columns={this.getCol()}
            dataSource={propertytem?utils.addIndex(propertytem.list):[]}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPropertyTemplate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    propertytem: state.finance.propertytem,
    spinning:state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Properytem)