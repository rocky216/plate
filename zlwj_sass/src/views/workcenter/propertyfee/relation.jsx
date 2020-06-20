import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Divider , Form, Typography, Icon, Button, Input, Tag, Table} from "antd";
import {loadAssetsInfo, updateAssetsRemark} from "@/actions/otherAction"
import {ownerLinkAssetsListColumns } from "../colmuns"
import Updatehouse from "./updatehouse"
import Updatemember from "./updatemember"
import EndLink from "./endlink"
import Updateowner from "./updateowner"
import ClassHouse from "./class/house"
import ClassShops from "./class/shops"
import ClassPlate from "./class/plate"

const {Text} = Typography;
const {TextArea } = Input

class PropertyRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remarkValue: "",
      houseVisible: false,
      houseDetial: "",
      memberVisible: false,
      endlinkVisible: false,
      endlinkDetail: "",
      ownerVisible: false,
    }
  }
  

  componentDidMount(){
    const {id, type} = this.props.houseItem
    console.log(this.props.houseItem, "houseItem")
    this.props.actions.loadAssetsInfo({assetsId: id, assetsType:type})
  }

  remarkChange(e){
    let value = e.target.value
    if(this.props.assetinfo.assets.remark == value) return;
    const {id, type} = this.props.houseItem
    this.props.actions.updateAssetsRemark({
      assetsId: id, assetsType:type,
      remark: e.target.value
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.loadAssetsInfo({assetsId: id, assetsType:type})
    })
  }

  handlenEndlink(item){
    console.log(this.props.houseItem)
    this.setState({endlinkVisible: true, endlinkDetail: {...this.props.houseItem,  ...item, }})
  }

  getClassType(data, elem){
    const {houseItem } = this.props
    if(houseItem.type=="house"){
      return <ClassHouse data={data}>{elem}</ClassHouse>
    }else if(houseItem.type=="shops"){
      return <ClassShops data={data}>{elem}</ClassShops>
    }else {
      return <ClassPlate data={data}>{elem}</ClassPlate>
    }
  }

  render(){
    const {utils, assetinfo, houseItem} = this.props
    const {houseVisible, memberVisible, endlinkVisible, endlinkDetail, ownerVisible, remarkValue} = this.state;
    
    return (
      <Card size="small" >
        {houseVisible?<Updatehouse visible={houseVisible} detail={assetinfo.assets} onCancel={()=>this.setState({houseVisible: false})} />:null}
        {memberVisible?<Updatemember visible={memberVisible} detail={this.props.houseItem} onCancel={()=>this.setState({memberVisible: false})} />:null}
        {endlinkVisible?<EndLink visible={endlinkVisible} detail={endlinkDetail} onCancel={()=>this.setState({endlinkVisible: false})} />:null}
        {ownerVisible?<Updateowner visible={ownerVisible} detail={{...this.props.houseItem,  owners: assetinfo.owners, assestId: assetinfo.assets.assestId}} 
          onCancel={()=>this.setState({ownerVisible: false})}
        />:null}

        <Divider orientation="left" ><Text mark>业主信息</Text></Divider>
        <div>
          <Form layout="inline">
            {assetinfo.owners?
            <>
              <Form.Item label="姓名">
                <Typography >{assetinfo.owners.name}</Typography>
              </Form.Item>
              <Form.Item label="电话">
                <Typography >{assetinfo.owners.phone}</Typography>
              </Form.Item>
              <Form.Item label="性别">
                <Typography >{assetinfo.owners.sex=="0"?"男":"女"}</Typography>
              </Form.Item>
              <Form.Item label="微信">
                <Typography >{assetinfo.owners.weixin}</Typography>
              </Form.Item>
              <Form.Item label="邮箱">
                <Typography >{assetinfo.owners.email}</Typography>
              </Form.Item>
            </>:null}
            <div style={{float: "right"}}>
              <Form.Item>
                  <Button type="primary" icon="plus" ghost onClick={()=>this.setState({ownerVisible: true})} >新增/编辑业主信息</Button>
              </Form.Item>
            </div>
          </Form>
          {assetinfo.ownerLinkAssetsList && assetinfo.ownerLinkAssetsList.length?
          <Table size="small" columns={ownerLinkAssetsListColumns} 
            dataSource={utils.addIndex(assetinfo.ownerLinkAssetsList)} pagination={false} />:null}
        </div>
          <Divider orientation="left" > <Text mark>{assetinfo.assets?assetinfo.assets.assetsTypeName:""}</Text> </Divider>
        {assetinfo.assets?
          this.getClassType(assetinfo.assets, 
            <>
              <Form.Item>
                <TextArea defaultValue={assetinfo.assets.remark} value={remarkValue}  onChange={({target})=> this.setState({remarkValue: target.value}) } onBlur={this.remarkChange.bind(this)} />
              </Form.Item>
              <Form.Item>
                <Button ico="plus" type="primary" ghost onClick={()=>this.setState({houseVisible: true})} >更新{assetinfo.assets?assetinfo.assets.assetsTypeName:""}信息</Button>
              </Form.Item>
            </>
          ):null}
        
        {houseItem.type=="parkingSpace"?null:
        <>
          <Divider orientation="left" > <Text mark>关联成员</Text> </Divider>
          <div>
            {assetinfo.assetsList?assetinfo.assetsList.map((item, index)=>(
              <Tag key={item.linkId} color="red" closable visible onClose={this.handlenEndlink.bind(this, item)} >{`${item.linkType}:${item.ownerName}${item.ownerPhone}`}</Tag>
            )):null}
            <div style={{float: "right"}}>
              <Button icon="plus" type="primary" ghost onClick={()=>this.setState({memberVisible: true})} >新增关联成员</Button>
            </div>
          </div>
        </>}
      </Card>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({loadAssetsInfo, updateAssetsRemark}, dispatch)
  }
}

function mapStateProps(state){
  return {
    assetinfo: state.other.assetinfo || {},
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(PropertyRelation)