import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tabs, Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {otherAssetList, getHeShops, deleteNothouse } from "@/actions/projectAction"
import {nothouseColumns} from "../colmuns"
import AddNothouse from "./add"
import EditNothouse from "./edit"

const { TabPane } = Tabs;

class ProjectNothouse extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      otherasset: [],
      params: {
        current: 1,
        id: ""
      }
    }
  }

  async componentDidMount(){
    const {params} = this.state
    let otherasset =  await this.props.actions.otherAssetList({})
    this.setState({otherasset})
    if(otherasset && otherasset.length){
      params.id = otherasset[0]["id"]
      await this.props.actions.getHeShops(params)
      this.setState({params})
    }
  }
  handleTabs(key){
    const {params} = this.state
    params.id = key
    this.props.actions.getHeShops(params)
  }

  handlenDelete(item){
    this.props.actions.deleteNothouse({id: item.id}, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getHeShops(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return nothouseColumns.concat([{
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
                <Button type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {utils, spinning, nothouse} = this.props
    const {otherasset , params, addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}  >
        <AddNothouse params={params} visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible?
        <EditNothouse visible={editVisible}  params={params} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        <Card >
          <Tabs 
            type="card"
            tabBarExtraContent={<Button type="primary" ghost  onClick={()=>this.setState({addVisible: true})}><Icon type="plus"/>新增非住宅房屋</Button>}
            onChange={this.handleTabs.bind(this)}>
            {otherasset?otherasset.map(item=>(
              <TabPane tab={item.dictLabel} key={item.id} />
            )):<TabPane tab="" key="" />}
          </Tabs>
          <Table columns={this.getCol()} dataSource={nothouse?utils.addIndex(nothouse.list):[]} 
            pagination={utils.Pagination(nothouse, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getHeShops(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({otherAssetList, getHeShops, deleteNothouse}, dispatch)
  }
}

function mapStateProps(state){
  return {
    nothouse: state.project.nothouse,
    spinning: state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ProjectNothouse)