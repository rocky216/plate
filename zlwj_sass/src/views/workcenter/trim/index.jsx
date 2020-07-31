import React from "react"
import {connect} from "react-redux"
import {Link } from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Tabs, Badge, Button} from "antd";
import JCard from "@/components/JCard"
import SelectAllType from "@/components/SelectAllType"
import "../propertyfee/index.less"
import {propertyPlanPage} from "@/actions/otherAction"
import {trimColumns} from "../colmuns"
import AddTrim from "./add"

const {TabPane } = Tabs

let params = {
  current:1,
  planStatusStr: "allCount"
}

class PropertyfeeTrm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: [
        {title: "全部计划", key: "allCount"},
        {title: "进行中计划", key: "proceed"},
        {title: "已完成计划", key: "complete"},
      ],
      houseItem: "",
      visible: false,
    }
  }
  

  componentDidMount(){
    this.props.actions.propertyPlanPage(params)
  }

  handlenSelectShop(item){
    this.setState({houseItem: item})
  }
  handleChange(val){
    params.planStatusStr = val
    this.props.actions.propertyPlanPage(params)
  }

  getCol(){
    return trimColumns.concat([
      {
        title: "操作",
        render(item) {
          return (
             <div>
               <Link to={`/workcenter/trim/${item.id}/detail/details`}>
                <Button type="link">详情</Button>
               </Link>
             </div>
          );
        }
      }
    ])
  }

  render(){
    const {utils, spinning, trim} = this.props
    const {tabs, houseItem, visible} = this.state
    
    return (
      <JCard spinning={spinning}>
        {visible?
        <AddTrim
          visible={visible}
          houseItem={houseItem}
          params={params}
          onCancel={()=>this.setState({visible:false, })}
        />:null}

        <div className="propertyfee">
          <div className="select_house">
            <Card title="选择房间" size="small" bodyStyle={{padding:0}}>
              <SelectAllType showLine isNotLoadPark onSelect={this.handlenSelectShop.bind(this)}  />
            </Card>
          </div>
          <div style={{width: "100%"}}>
            <Card
              title={houseItem?houseItem.name:null}
              extra={houseItem?<Button onClick={()=>this.setState({visible:true})} type="primary" icon="plus">新增装修计划</Button>:null}
            >
              {trim?<Tabs
                onChange={this.handleChange.bind(this)}
              >
                {tabs.map(item=>(
                  <TabPane tab={(
                    <Badge count={trim[item.key]} showZero>{item.title}</Badge>
                  )} key={item.key} />
                ))}
              </Tabs>:null}
              <Table columns={this.getCol()} dataSource={trim?utils.addIndex(trim.page.list):[]} 
                pagination={trim?utils.Pagination(trim.page, page=>{
                  params.current = page
                  this.props.actions.propertyPlanPage(params)
                }):false}/>
            </Card>
          </div>
        </div>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({propertyPlanPage }, dispatch)
  }
}

function mapStateProps(state){
  return {
    trim: state.other.trim,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PropertyfeeTrm)