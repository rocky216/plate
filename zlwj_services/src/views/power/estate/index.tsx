import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Table, Card, Button } from "antd"
import {IProps } from "@/interface/app"
import JCard from "@/components/JCard"
import {estateColumns} from "../columns"
import IconButton from "@/components/IconButton"
import {getEstates, addEstates} from "@/actions/powerAction"
import AddEstate from "./add"


interface Props extends IProps {
  estate: any[];
}

interface State {
  visible: boolean;
  detail: any | boolean
}

class PowerEstate extends React.Component<Props, State> {
  
  state:State = {
    visible: false,
    detail: false
  }

  componentDidMount(){
    this.props.actions.getEstates()
  }

  handleSubmit(values:any){
    this.props.actions["addEstates"](values, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getEstates()
      this.setState({visible:false, detail: false})
    })
  }

  render() {
    const {spinning, utils, estate} = this.props;
    const {visible, detail} = this.state;

    return (
      <JCard spinning={spinning}>
        <AddEstate 
          visible={visible} 
          detail={detail} 
          onCreate={this.handleSubmit.bind(this)}
          onCancel={()=>this.setState({visible: false, detail: false})} />

        <Card size="small" title={<IconButton text="新增小区" type="primary" onClick={()=>this.setState({visible:true})}  />}>
          <Table size="middle" columns={estateColumns} dataSource={estate?utils.addIndex(estate):[]} />
        </Card>
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getEstates, addEstates}, dispatch)
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    spinning: state.power.spinning,
    estate: state.power.estate,
    utils: state.app.utils
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerEstate)