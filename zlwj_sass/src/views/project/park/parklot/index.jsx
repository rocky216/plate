import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Icon, Tabs, Modal, Table, Upload} from "antd";
import JCard from "@/components/JCard"
import {getParkLot, deleteParkLot, getParkingSpace, excelImportParkingSpace} from "@/actions/projectAction"
import AddParkLot from "./add"
import EditParkLot from "./edit"
import AddParkBox from "./addPark"
import EditParkBox from "./editPark"
import {parkPlateLotColumns, importPlateColumns} from "../../colmuns"
import ParkLotSearch from "./ParkLotSearch"
import ImportUpload from "@/components/ImportUpload"  

const {TabPane } = Tabs

class ParkLot extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeKey: "",
      addVisible: false,
      editVisible: false,
      addParkVisible: false,
      editParkVisible: false,
      importVisible: false,
      parkDetial: "",
      params: {
        current: 1,
        parkingSpaceCode: "",
        typeId:""
      }
    }
  }
  componentDidMount(){
    console.log(this.props.match.params, "this.props.match.params")
    this.props.actions.getParkLot({
      id: this.props.match.params.id
    }, res=>{
      if(res && res.length){
        this.loadParkFloorArea({floorAreaId: res?res[0]["id"]:"", ...this.state.params})
        this.setState({activeKey: res?res[0]["id"]:"" })
      }
      
    })
  }
  loadParkFloorArea(params){
    this.props.actions.getParkingSpace({
      carparkId: this.props.match.params.id,
      ...params
    })
  }

  handlenEdit(key){
    let _this = this
    Modal.confirm({
      title: '是否删除楼层区域？',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        _this.props.actions.deleteParkLot({
          id:key
        }, res=>{
          _this.props.actions.getParkLot({
            id: _this.props.match.params.id
          })
        })
      }
    });
  }

  handlenOnChange(key){
    this.setState({activeKey:key})
    this.loadParkFloorArea({floorAreaId:key})
  }

  getCol(){
    let _this = this
    return parkPlateLotColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Button type="link" onClick={()=>_this.setState({editParkVisible: true, parkDetial: item})} >编辑</Button>
          </div>
        )
      }
    }])
  }

  handlenSearch(values){
    const {params} = this.state
    if(values===null){
      this.loadParkFloorArea({floorAreaId: this.state.activeKey})
      this.setState({params: {
        current: 1,
        parkingSpaceCode: "",
        typeId:""
      }})
      return 
    }
    _.assign(params, values)
    this.setState({params})
    this.loadParkFloorArea({floorAreaId: this.state.activeKey, ...values})
    
  }

  render(){
    let _this = this
    const {utils, spinning, parklot, parkFloorArea, match, commonFiles} = this.props
    const {addVisible, activeKey, editVisible, addParkVisible, params, editParkVisible, parkDetial, importVisible, 
      } = this.state

    const uploadProps = {
      visible: importVisible,
      download: commonFiles?commonFiles.parkingSpaceMode:"",
      columns: importPlateColumns,
      name: "file",
      action: "/api/pc/parkingSpace/excelImportCheck",
      insertExcel: this.props.actions.excelImportParkingSpace,
      callback(){
        _this.loadParkFloorArea({floorAreaId: activeKey})
        _this.setState({importVisible: false})
      },
      onCancel(){
        _this.setState({importVisible: false})
      },
      data: {
        token: utils.getCookie("token"),
        floorAreaId:activeKey,
        carparkId: match.params.id,
        heId: parklot && activeKey?_.filter(parklot, o=>o.id==activeKey)[0]["heId"]:""
      }
    }


    return (
      <JCard spinning={spinning}>
        <AddParkLot visible={addVisible} onCancel={()=>this.setState({addVisible: false})} />
        {editVisible && activeKey?<EditParkLot visible={editVisible} id={activeKey} onCancel={()=>this.setState({editVisible: false})} />:null}
        
        {addParkVisible&& activeKey?
        <AddParkBox visible={addParkVisible} id={activeKey} onCancel={()=>this.setState({addParkVisible: false})} />:null}
        {editParkVisible && parkDetial?
          <EditParkBox visible={editParkVisible} id={activeKey} parkDetial={parkDetial} onCancel={()=>this.setState({editParkVisible: false, parkDetial:""})} />:null}
        {importVisible?<ImportUpload {...uploadProps}  />:null}
        

        <Card size="small">
          <Tabs 
          hideAdd
          activeKey={String(activeKey)}
          onChange={this.handlenOnChange.bind(this)}
          type="editable-card"
          onEdit={this.handlenEdit.bind(this)}
          tabBarExtraContent={(
            <div>
              <Button type="primary" onClick={()=>this.setState({addVisible: true})} ><Icon type="plus" />新增楼层区域</Button>
              <Link to="/project/park">
                <Button className="mgl10"><Icon type="rollback" />返回</Button> 
              </Link>
            </div>
          )}>
            {parklot?parklot.map(item=>(
              <TabPane tab={item.floorAreaName} key={item.id}></TabPane>
            )):<TabPane tab="" key="-1"></TabPane>}
          </Tabs>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="mgb10">
              <Button type="primary" ghost onClick={()=>this.setState({editVisible: true})} ><Icon type="edit" />编辑楼层区域</Button>
              <Button type="primary" className="mgl10" onClick={()=>this.setState({addParkVisible: true})}><Icon type="plus" />新增车位</Button>
              <Button type="danger" ghost className="mgl10" onClick={()=>this.setState({importVisible: true})}><Icon type="export" />批量导入</Button>
              
            </div>
            <div>
              <ParkLotSearch handlenSearch={this.handlenSearch.bind(this)} />
            </div>
          </div>
          <Table columns={this.getCol()} dataSource={parkFloorArea?utils.addIndex(parkFloorArea.list):[]} 
            pagination={utils.Pagination(parkFloorArea, page=>{
              params.current = page
              this.setState({params})
              this.loadParkFloorArea({floorAreaId: activeKey, ...params})
            })}/>
            
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getParkLot, deleteParkLot, getParkingSpace, excelImportParkingSpace}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles:state.app.commonFiles,
    parkFloorArea: state.project.parkFloorArea,
    parklot: state.project.parklot,
    spinning: state.project.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkLot)