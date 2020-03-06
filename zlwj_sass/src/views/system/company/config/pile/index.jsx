import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Tabs, Form, Select, Table, Button, Icon} from "antd";
import {getPileList} from '@/actions/systemAction'
import AddPile from "./add"
import EditPile from "./edit"
import {pileColumns} from "../../../colmuns"

const { TabPane } = Tabs;
const {Option} = Select

class PileConfig extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pile: [],
      addVisible: false,
      editVisible: false,
      detail: ""
    }
  }
  componentDidMount(){
    this.props.actions.getPileList({
      heId: this.props.heId
    }, res=>this.setState({pile: res}))
  }

  getCol(){
    let _this = this
    return pileColumns.concat([{
      title: "操作",
      render(item){
        return <Button type="link" onClick={()=>_this.setState({editVisible: true, detail:item})}>编辑</Button>
      }
    }])
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, heId, pileList} = this.props
    const {addVisible, editVisible, detail} = this.state
    return (
      <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增设配参数</Button>}>
        <AddPile visible={addVisible} heId={heId} onCancel={()=>this.setState({addVisible: false})} />
        {detail?<EditPile visible={editVisible} detail={detail} heId={heId} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Table columns={this.getCol()} dataSource={pileList?utils.addIndex(pileList):[]} pagination={false} />
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPileList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    pileList: state.system.pileList,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(PileConfig) )