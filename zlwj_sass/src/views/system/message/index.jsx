import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Icon, Button, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getSignList, deleteSign, getMesTemplate,deleteMesTemplate} from "@/actions/systemAction"
import {signColmuns, mesTempColmuns} from "../colmuns"
import AddSign from "./addSign"
import EditSign from "./editSign"
import AddMegtem from "./addMegtem"
import EditMegtem from "./editMegtem"


class Meassge extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addSignVisible: false,
      editSignVisible: false,
      addMegtemVisible: false,
      editMegtemVisible: false,
      msgtemDitail: "",
      signDetail: "",
      params:{
        current:1,
      },
      temParams: {
        current:1,
      }
    }
  }

  componentDidMount(){
    this.props.actions.getSignList(this.state.params)
    this.props.actions.getMesTemplate(this.state.temParams)
  }

  handlenDelete(item, type){
    console.log(item)
    if(type=="sign"){
      this.props.actions.deleteSign({
        id: item.id
      }, res=>{
        this.props.actions.getSignList(this.state.params)
        this.props.utils.OpenNotification("success")
      })
    }else{
      this.props.actions.deleteMesTemplate({
        id: item.id
      }, res=>{
        this.props.actions.getMesTemplate(this.state.temParams)
        this.props.utils.OpenNotification("success")
      })
    }
    
  }

  getCol(){
    let _this = this
    return signColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editSignVisible: true, signDetail: item})} >编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item, "sign")}>
                <Button type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  getTemCol(){
    let _this = this
    return mesTempColmuns.concat([{
      title: "操作",
      width: 200,
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editMegtemVisible: true, msgtemDitail: item})} >编辑</Button>
            <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item, "template")}>
                <Button type="link" >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, sign, msgtemp} = this.props
    const {addSignVisible, params, editSignVisible, signDetail, addMegtemVisible, editMegtemVisible, msgtemDitail, temParams} = this.state
    
    
    return (
      <JCard spinning={spinning}>
        <div>
          <Card title={<Button type="primary" onClick={()=>this.setState({addSignVisible:true})} ><Icon type="plus" />新增短信签名</Button>}>
            <AddSign visible={addSignVisible} onCancel={()=>this.setState({addSignVisible: false})}  />
            <EditSign visible={editSignVisible} detail={signDetail} onCancel={()=>this.setState({editSignVisible: false, signDetail: ""})} />
            
            <Table columns={this.getCol()} dataSource={sign?utils.addIndex(sign.list):[]} 
              pagination={utils.Pagination(sign, page=>{
                params.current = page
                this.setState({params})
                this.props.actions.getSignList(params)
              })} />
          </Card>
          <Card className="mgt10" title={<Button type="primary" onClick={()=>this.setState({addMegtemVisible:true})} ><Icon type="plus" />新增短信模板</Button>} >
            <AddMegtem visible={addMegtemVisible} onCancel={()=>this.setState({addMegtemVisible: false})} />
            <EditMegtem visible={editMegtemVisible} detail={msgtemDitail} onCancel={()=>this.setState({editMegtemVisible: false, msgtemDitail:""})} />
            
            <Table columns={this.getTemCol()} 
              dataSource={msgtemp?utils.addIndex(msgtemp.list):[]} 
              pagination={utils.Pagination(msgtemp, page=>{
                temParams.current = page
                this.setState({temParams})
                this.props.actions.getMesTemplate(temParams)
              })}/>
          </Card>
        </div>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSignList, deleteSign, getMesTemplate, deleteMesTemplate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    msgtemp: state.system.msgtemp,
    sign: state.system.sign,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Meassge)