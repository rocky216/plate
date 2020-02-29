import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, List, Typography, Table, } from "antd";
import JCard from "@/components/JCard"
import {getNotice } from "@/actions/appAction" 
import NewsLook from "./look"
import {newsColumns} from "../columns"


class News extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      detail: ""
    }
  }
  componentDidMount(){
    this.props.actions.getNotice({})
  }

  handlenLook(item){
    this.setState({visible:true, detail: item})
  }

  getCol(){
    let _this = this
    return newsColumns.concat([{
      title: "操作",
      render(item){
        return <Button size="small" type="link" onClick={_this.handlenLook.bind(_this, item)} >查看</Button>
      }
    }])
  }
  render(){
    const {utils, spinning, news} = this.props
    const {visible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        {visible?<NewsLook visible={visible} detail={detail} onCancel={()=>this.setState({visible: false, detail:""})} />:null}
        <Card size="small" title="消息列表" extra={<Link to="/"><Button><Icon type="rollback" />返回</Button></Link>}>
        
        <Table size="small" columns={this.getCol()} dataSource={news?utils.addIndex(news):[]} />
        
        {/* <List
          size="small"
          bordered
          dataSource={news?news:[]}
          renderItem={item => (
            <List.Item>
              <a href="javascript:;" onClick={()=>this.setState({visible:true, detail: item})} style={{color: "#666"}}>{item.noticeName}</a>
            </List.Item>
          )}
        /> */}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getNotice}, dispatch)
  }
}

function mapStateProps(state){
  return {
    news: state.app.news,
    spinning: state.app.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(News)