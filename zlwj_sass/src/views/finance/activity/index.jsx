import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Popconfirm, Form} from "antd";
import {getCostActive, deleteCostActive} from "@/actions/financeAction"
import JCard from "@/components/JCard"
import {activityColumns} from "../colmuns"
import AddActivity from "./add"
import EditActivity from "./edit"
import HeList from "@/components/HeList"


class Activity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: "",
      params: {
        current: 1,
        heId: ""
      }
    }
  }
  

  componentDidMount(){
    this.props.actions.getCostActive(this.state.params)
  }

  handlenDelete(item){
    this.props.actions.deleteCostActive({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCostActive(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return activityColumns.concat([{
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

  handleSearch(){
    this.props.form.validateFieldsAndScroll((err, values)=>{
      const {params} = this.state
      params.heId = values.heId
      this.setState({params})
      this.props.actions.getCostActive(params)
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, costactivity} = this.props
    const {params, addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <AddActivity visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {!editVisible?null:
        <EditActivity visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />}

        <Card title={<Button type="primary" icon="plus" onClick={()=>this.setState({addVisible: true})}  >新增活动模板</Button>} >
          <div className="flexend mgb10">
            <Form layout="inline">
              <Form.Item label="小区">
                {getFieldDecorator("heId", {
                  initialValue: ""
                })(
                  <HeList style={{width: 150}} />
                )}
              </Form.Item>
              <Form.Item>
                <Button icon="search" type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
              </Form.Item>
            </Form>
          </div>
          
          <Table columns={this.getCol()} dataSource={costactivity?utils.addIndex(costactivity.list):[]}  
            pagination={utils.Pagination(costactivity, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getCostActive(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCostActive, deleteCostActive}, dispatch)
  }
}

function mapStateProps(state){
  return {
    costactivity: state.finance.costactivity,
    spinning: state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Activity) )