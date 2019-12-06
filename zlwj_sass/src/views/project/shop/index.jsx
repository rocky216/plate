import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import {getShopList, getHeHousingEstate, deleteShop} from "@/actions/projectAction"
import JCard from "@/components/JCard"
import {shopColmuns} from "../colmuns"
import AddShop from "./add"
import EditShop from "./edit"


class Shop extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addVisible: false,
      editVisible: false,
      detail: '',
      params:{
        current: 1
      }
    }
  }
  componentDidMount(){
    this.props.actions.getShopList(this.state.params)
    this.props.actions.getHeHousingEstate({pageSize: 1000})
  }
  handlenDelete(item){
    this.props.actions.deleteShop({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getShopList(this.state.params)
    })
  }

  getCol(){
    let _this = this
    return shopColmuns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editVisible: true, detail: item})} >编辑</Button>
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
    const {spinning,utils, shop} = this.props
    const {params, addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}><Icon type="plus" />新增商铺</Button>} >
          <AddShop visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
          <EditShop visible={editVisible} detail={detail} onCancel={()=>this.setState({editVisible: false, detail:''})} />
          <Table 
            columns={this.getCol()} dataSource={shop?utils.addIndex(shop.list):[]} 
            pagination={utils.Pagination(shop, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getShopList(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getShopList, getHeHousingEstate, deleteShop}, dispatch)
  }
}

function mapStateProps(state){
  return {
    shop: state.project.shop,
    spinning: state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Shop)