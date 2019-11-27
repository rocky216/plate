import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Link} from "react-router-dom"
import {Card, Table, Button, Form, Select, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getBuildList, deleteBuild} from "@/actions/projectAction"
import {getSelectHeList} from "@/actions/appAction"
import {buildColmuns} from "../colmuns"
import AddProdata from "./add"
import EditProdata from "./edit"

const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class ProData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: '',
      params: {
        current: 1,
        heId: ''
      }
    }
  }

  componentDidMount(){
    this.props.actions.getBuildList(this.state.params)
    this.props.actions.getSelectHeList({})
  }

  handlenDelete(item){
    this.props.actions.deleteBuild({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getBuildList(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return buildColmuns.concat([{
      title: "操作",
       render(item){
         return (
           <div>
             <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
             <Link to={`/project/prodata/${item.heId}/util/${item.id}`}>
             <Button type="link">
               单元
             </Button>
             </Link>
             <Popconfirm
                placement="topRight" 
                title="是否删除？"
                okText="是"
                cancelText="否"
                onConfirm={_this.handlenDelete.bind(_this, item)}>
                <Button  type="link" >删除</Button>
              </Popconfirm>
           </div>
         )
       }
    }])
  }

  handlenSearch(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.params.heId = values.heId
        this.setState({params: this.state.params})
        this.props.actions.getBuildList(this.state.params)
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, build, utils, allHeList} = this.props
    const {addVisible, editVisible, detail, params} = this.state

    return (
      <JCard spinning={spinning}  >
        <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增楼宇</Button>} >
          <AddProdata visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <EditProdata visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:''})} />
          
          <div className="flexend mgb10">
            <Form layout="inline" onSubmit={this.handlenSearch.bind(this)}>
              <Form.Item label="项目名称" >
                {getFieldDecorator('heId', {
                  initialValue: ""
                })(
                  <Select style={{width: 150}}>
                    <Option value="">全部</Option>
                    {allHeList && allHeList.length?allHeList.map(item=>(
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    )):null}
                  </Select>
                )}
              </Form.Item>
              <Form.Item  >
                <Button type="primary" htmlType="submit" ><Icon type="search" />搜索</Button>
              </Form.Item>
            </Form>
          </div>
          


          <Table size="small" columns={this.getCol()}  
            dataSource={build?utils.addIndex(build.list):[]}
            pagination={utils.Pagination(build, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getBuildList(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getBuildList, getSelectHeList, deleteBuild}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    build: state.project.build,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(ProData) )