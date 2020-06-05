import React from "react"
import {connect } from "react-redux"
import {bindActionCreators } from "redux"
import { Table, Card, Button } from "antd"
import {IProps } from "@/interface/app"
import JCard from "@/components/JCard"
import {estateColumns} from "../columns"
import IconButton from "@/components/IconButton"
import {getEstates } from "@/actions/powerAction"


interface Props extends IProps {
  estate: any[];
}

class PowerEstate extends React.Component<Props> {
  
  componentDidMount(){
    this.props.actions.getEstates()
  }

  render() {
    const {spinning, utils, estate} = this.props;

    return (
      <JCard spinning={spinning}>
        <Card size="small" title={<IconButton text="新增小区" type="primary"  />}>
          <Table size="middle" columns={estateColumns} dataSource={estate?utils.addIndex(estate):[]} />
        </Card>
      </JCard>
    );
  }

}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getEstates }, dispatch)
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