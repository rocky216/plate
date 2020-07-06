import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Tabs, Card, Table, Button, Icon, Popconfirm, Form, Input, Select} from "antd";
import JCard from "@/components/JCard"
import {otherAssetList, getHeShops, deleteNothouse, comfirExcelImport} from "@/actions/projectAction"
import {nothouseColumns, importNothhouseColumns} from "../colmuns"
import AddNothouse from "./add"
import EditNothouse from "./edit"
import HeList from "@/components/HeList"
import ImportUpload from "@/components/ImportUpload"  

const { TabPane } = Tabs;
const {Option} = Select

class ProjectNothouse extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      importHeId: "",
      importVisible: false,
      addVisible: false,
      editVisible: false,
      detail: "",
      otherasset: [],
      params: {
        current: 1,
        heId: "",
        shopsName: "",
        shopsCode: "",
        otherType: "",
        status:""
      }
    }
  }

  async componentDidMount(){
    const {params} = this.state
    let otherasset =  await this.props.actions.otherAssetList({})
    this.setState({otherasset})
    if(otherasset && otherasset.length){
      params.otherType = otherasset[0]["id"]
      await this.props.actions.getHeShops(params)
      this.setState({params})
    }
  }
  handleTabs(key){
    const {params} = this.state
    params.otherType = key
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

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {params} = this.state
      params.shopsName = values.shopsName
      params.shopsCode = values.shopsCode
      params.status = values.status
      params.heId = values.heId
      this.props.actions.getHeShops(params)
    });
  }

  handlenReset(){
    this.props.form.resetFields()
    let obj = {
      current: 1,
      heId: "",
      shopsName: "",
      shopsCode: "",
      otherType: this.state.params.otherType,
      status:""
    }
    this.setState({params: obj})
    this.props.actions.getHeShops(obj)
  }

  render(){ 
    let _this = this;
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, nothouse, commonFiles} = this.props
    const {otherasset , params, addVisible, editVisible, detail, importVisible, importHeId} = this.state

    const uploadProps = {
      visible: importVisible,
      download: commonFiles?commonFiles.otherHouseMode:"",
      columns: importNothhouseColumns,
      name: "file",
      action: "/api/pc/heShops/excelImportCheck",
      insertExcel: this.props.actions.comfirExcelImport,
      callback(){
        _this.props.actions.otherAssetList({});
        _this.setState({importVisible: false})
      },
      onCancel(){
        _this.setState({importVisible: false})
      },
      data: {
        token: utils.getCookie("token"),
        heId: importHeId
      },
    }

    return (
      <JCard spinning={spinning}  >
        {addVisible?
        <AddNothouse params={params} visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />:null}
        {editVisible?
        <EditNothouse visible={editVisible}  params={params} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:""})} />:null}
        
        {importVisible?<ImportUpload {...uploadProps} check={importHeId?false:true} >
          <HeList style={{width: 120}} value={importHeId} onChange={(val)=>this.setState({importHeId:val})} />
        </ImportUpload>:null}
        <Card >
          <Tabs 
            type="card"
            tabBarExtraContent={(
              <div>
                <Button type="danger"  ghost className="mgr10" onClick={()=>this.setState({importVisible: true})}><Icon type="export" />批量导入</Button>
                <Button type="primary" ghost  onClick={()=>this.setState({addVisible: true})}><Icon type="plus"/>新增非住宅房屋</Button>
              </div>
            )}
            onChange={this.handleTabs.bind(this)}>
            {otherasset?otherasset.map(item=>(
              <TabPane tab={item.dictLabel} key={item.id} />
            )):<TabPane tab="" key="" />}
          </Tabs>
          <div className="flexend mgb10">
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
              <Form.Item label="房屋名称">
                {getFieldDecorator('shopsName')(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="房屋编号">
                {getFieldDecorator('shopsCode')(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="小区">
                {getFieldDecorator('heId', {
                  initialValue: ""
                })(
                  <HeList style={{width: 120}}/>
                )}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('status', {
                  initialValue: ""
                })(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="0">正常</Option>
                    <Option value="1">停用</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
                <Button className="mgl10" onClick={this.handlenReset.bind(this)} ><Icon type="rollback" />重置</Button>
              </Form.Item>
            </Form>
          </div>
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
    actions: bindActionCreators({otherAssetList, getHeShops, deleteNothouse, comfirExcelImport}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles:state.app.commonFiles,
    nothouse: state.project.nothouse,
    spinning: state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(ProjectNothouse) )