import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Table, Tag, Modal, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getSysLibrary, delDictData, deleteSysLibrary} from "@/actions/systemAction"
import {sysLibraryColmuns} from "../colmuns"
import AddTag from "./addTag";
import AddLibrary from "./add"

class SystemLibrary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      addTagVisible: false,
      tagDetail: '',
      editVisible: false,
      detail: '',
      params: {
        current: 1
      }
    }
  }
  componentDidMount(){
    this.props.actions.getSysLibrary(this.state.params)
  }

  handlenClose(item, elem){
    let _this = this
    Modal.confirm({
      title: '是否删除标签？',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        _this.props.actions.delDictData({
          id: elem.id
        }, res=>{
          _this.props.actions.getSysLibrary(_this.state.params)
          _this.props.utils.OpenNotification("success")
        })
      }
    });
    
  }

  handlenDelete(item){
    this.props.actions.deleteSysLibrary({
      id: item.id
    }, res=>{
      this.props.actions.getSysLibrary(this.state.params)
      this.props.utils.OpenNotification("success")
    })
  }

  getCol(){
    let _this = this
    return sysLibraryColmuns.concat([
      {
        title: "标签",
        dataIndex: "sysDictDatas",
        render(item, rows){
          console.log(item)
          return (
            <div>
              {item?item.map(elem=>(
                <Tag visible={!elem.visible} closable onClose={_this.handlenClose.bind(_this,rows, elem)} key={elem.id}>{elem.dictLabel}</Tag>
              )):null}
            </div>
          )
        }
      },
      {
        title: "操作",
        render(item){
          return (
            <div>
              <Button type="link" onClick={()=>_this.setState({addTagVisible: true, tagDetail: item})}>添加标签</Button>
              {/* <Popconfirm
              placement="topRight" 
              title="是否删除？"
              okText="是"
              cancelText="否"
              onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button type="link">删除</Button>
              </Popconfirm> */}
            </div>
          )
        }
      }
    ])
  }

  render(){
    const {spinning,utils, sysLibrary} = this.props
    const {addTagVisible, tagDetail, detail, addVisible} = this.state

    return (
      <JCard spinning={spinning}  >
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增字典</Button>} >
          <AddLibrary visible={addVisible} detail={detail} onCancel={()=>this.setState({addVisible: false})} />
          <AddTag visible={addTagVisible} detail={tagDetail} onCancel={()=>this.setState({addTagVisible: false, tagDetail:''})} />
          <Table columns={this.getCol()} 
            dataSource={sysLibrary? utils.addIndex(sysLibrary.list):[]}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSysLibrary, delDictData, deleteSysLibrary}, dispatch)
  }
}

function mapStateProps(state){
  return {
    sysLibrary: state.system.sysLibrary,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SystemLibrary)