import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Modal} from "antd";
import {getHeList} from "@/actions/systemAction"
import JCard from "@/components/JCard"
import {heColmuns} from "../../colmuns"
import AddSign from "./addSign"


class HeList extends React.Component {
  componentDidMount(){
    this.props.actions.getHeList({
      companyId: this.props.match.params.id
    })
  }
  
  
  handlenClose(elem){
    console.log(elem)
  } 

  getCol(){
    let _this = this
    return heColmuns(_this).concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/system/company/${item.id}/he`}>
              <Button type="link">飞鸽短信</Button>
            </Link>
            
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, he} = this.props

    return (
      <JCard spinning={spinning}>
        <Card >


          <Table columns={this.getCol()} 
            dataSource={he?utils.addIndex(he):[]}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    he: state.system.he,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(HeList)