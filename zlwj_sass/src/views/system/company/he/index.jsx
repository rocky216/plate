import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Modal, Select} from "antd";
import {getHeList, deleteLinkHeSign, deleteLinkHeTem, merchantList, heLinkMch} from "@/actions/systemAction"
import JCard from "@/components/JCard"
import {heColmuns} from "../../colmuns"
import AddSign from "./addSign"

const {Option} = Select

class HeList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addSignVisible: false,
      detail: ""
    }
  }

  componentDidMount(){
    this.props.actions.merchantList({type: 1})
    this.props.actions.getHeList({
      companyId: this.props.match.params.id
    })
  }
  
  
  handlenClose(rows, elem, type){
    console.log(rows, elem, type)
    let _this = this
    console.log(_this, "_this")
    Modal.confirm({
      title: '是否删除',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        if(type == "signName"){
          _this.props.actions.deleteLinkHeSign({
            signId: elem.id,
            heId: rows.id
          }, res=>{
            _this.props.actions.getHeList({
              companyId: _this.props.match.params.id
            })
            _this.props.utils.OpenNotification("success")
          })
        }else if(type == "templateName"){
          _this.props.actions.deleteLinkHeTem({
            templateId: elem.id,
            heId: rows.id
          }, res=>{
            _this.props.actions.getHeList({
              companyId: _this.props.match.params.id
            })
            _this.props.utils.OpenNotification("success")
            
          })
        }
      }
    });
  } 
  handlenSys(item){
    let arr = []
    if(!item || !item.length) return []
    _.each(item, elem=>{
      arr.push(elem.sysWxAccount.id)
    })
    return arr
  }
  handlenChange(rows,values){
    console.log(arguments)
    this.props.actions.heLinkMch({
      heId: rows.id,
      wxAccountIds: values.join()
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getHeList({
        companyId: this.props.match.params.id
      })
    })
  }
  getCol(){
    const {merchant} = this.props
    let _this = this
    return heColmuns(_this).concat([
      {
        title: "商户号",
        dataIndex:"sysHeWxes",
        render(item, rows){
          return(
            <Select mode="multiple" style={{width:150}} 
            defaultValue={_this.handlenSys(item)} onChange={_this.handlenChange.bind(_this, rows)}>
              {merchant?merchant.map(item=>(
                <Option key={item.id} value={item.id}>{item.name}</Option>
              )):null}
            </Select>
          )
        }
      },{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({addSignVisible: true, detail: item})} >短信关联</Button>
          </div>
        )
      }
    }])
  }

  render(){
    const {spinning, utils, he} = this.props
    const {addSignVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <Card >
          <AddSign visible={addSignVisible} detail={detail} onCancel={()=>this.setState({addSignVisible: false})} />

          <Table columns={this.getCol()} 
            dataSource={he?utils.addIndex(he):[]}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHeList, deleteLinkHeSign, deleteLinkHeTem, merchantList, heLinkMch}, dispatch)
  }
}

function mapStateProps(state){
  return {
    merchant: state.system.merchant,
    he: state.system.he,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(HeList)