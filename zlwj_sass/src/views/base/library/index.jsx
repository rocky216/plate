import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Tag, Modal} from "antd";
import JCard from "@/components/JCard"
import { getLibraryList, deleteLibrary} from "@/actions/baseAction";
import {libraryColmuns} from "../colmuns"
import AddLibrary from "./add"


class Library extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: '',
      params: {
        current: 1
      }
    }
  }

  componentDidMount(){
    this.props.actions.getLibraryList(this.state.params)
  }

  handlenClose(item, elem){
    let _this = this
    Modal.confirm({
      title: '是否删除标签？',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        _this.props.actions.deleteLibrary({
          id: elem.id
        }, res=>{
          _this.props.actions.getLibraryList(_this.state.params)
          _this.props.utils.OpenNotification("success")
        })
      }
    });
    
  }

  getCol(){
    let _this = this
    return libraryColmuns.concat([
      {
        title: "标签",
        dataIndex: "sysDictDatas",
        render(item, rows){
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
          return <Button type="link" onClick={()=>_this.setState({addVisible: true, detail: item})}>添加标签</Button>
        }
      }
    ])
  }

  render(){
    const {spinning, utils,library} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <Card >
          <AddLibrary visible={addVisible} detail={detail} onCancel={()=>this.setState({addVisible: false, detail: ''})} />

          <Table columns={this.getCol()}
              dataSource={library?utils.addIndex(library.list):[]}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getLibraryList, deleteLibrary}, dispatch)
  }
}

function mapStateProps(state){
  return {
    library: state.base.library,
    spinning:state.base.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Library)