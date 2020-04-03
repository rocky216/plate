import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Table, Button, Icon, Popconfirm} from "antd";
import JCard from "@/components/JCard"
import {getCarList, deleteCarAttaList, carInfoExcelImport} from "@/actions/otherAction"
import {carColumns, importPlateColumns} from "../colmuns"
import CarSearch from "./CarSearch"
import _default from "antd/lib/date-picker";
import ImportUpload from "@/components/ImportUpload"

let params = {
  current: 1,
  linkName:"",
  carparkId:"",
  licensePlate:"",
  status:""
}

class CarList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      importVisible: false
    }
  }

  componentDidMount(){
    this.props.actions.getCarList(params)
  }

  handlenDelete(item){
    this.props.actions.deleteCarAttaList({
      id: item.id
    }, res=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCarList({})
    })
  }
  getCol(){
    let _this = this
    return carColumns.concat([{
      title: "操作",
      render(item){
        return (
          <div>
            <Link to={`/workcenter/car/${item.id}/edit`}>
              <Button type="link">编辑</Button>
            </Link>
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

  handlenSearch(values){
    if(values==null){
      params = {
        current: 1,
        linkName:"",
        carparkId:"",
        licensePlate:"",
        status:""
      }
      this.props.actions.getCarList(params)
      return 
    }
    this.props.actions.getCarList(_.assign(params,values))
  }

  render(){
    let _this = this
    const {utils, spinning, car, commonFiles } = this.props
    const {importVisible} = this.state

    const uploadProps = {
      visible: importVisible,
      download: commonFiles?commonFiles.carImportMode:"",
      columns: importPlateColumns,
      name: "file",
      action: "/api/pc/carInfo/excelImportCheck",
      insertExcel: this.props.actions.carInfoExcelImport,
      callback(){
        _this.props.actions.getCarList(params)
        _this.setState({importVisible: false})
      },
      onCancel(){
        _this.setState({importVisible: false})
      },
      data: {
        token: utils.getCookie("token"),
      }
    }

    return (
      <JCard spinning={spinning}>
        {importVisible?<ImportUpload {...uploadProps}  />:null}
        <Card title={(
          <div>
            <Link to="/workcenter/car/add">
              <Button type="primary"><Icon type="plus" />新增车牌</Button>
            </Link>
            <Button type="danger" ghost className="mgl10" onClick={()=>this.setState({importVisible: true})}><Icon type="export" />批量导入</Button>
          </div>
        )}>
          <div className="flexend mgb10">
            <CarSearch params={params} handlenSearch={this.handlenSearch.bind(this)} />
          </div>
          <Table columns={this.getCol()} dataSource={car?utils.addIndex(car.list):[]} 
            pagination={utils.Pagination(car, page=>{
              params.current = page
              this.props.actions.getCarList(params)
            })}/>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getCarList, deleteCarAttaList, carInfoExcelImport}, dispatch)
  }
}

function mapStateProps(state){
  return {
    commonFiles: state.app.commonFiles,
    car: state.other.car,
    spinning: state.other.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CarList)