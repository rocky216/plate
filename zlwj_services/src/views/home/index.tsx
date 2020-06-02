import * as React from "react"
import {bindActionCreators} from "redux"
import {Link } from "react-router-dom"
import {connect} from "react-redux"
import { Button } from "antd";

class HomePage extends React.Component {

  state = {
    aa: "12",
    bb: "12"
  }
  constructor(props:any) {
    super(props);
    
  }
  

  static getDerivedStateFromProps(props:any, state:any){
    
    return null;
  } 

  render() {
    return (
      <div>
        <Link to="/house">
         <Button type="primary" onClick={()=>this.setState({aa: 1212})}>点击22</Button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateToProps = (state:any, ownProps:any) => {
  console.log(state)
  return {
    prop: state.prop
  }
}

export default connect(mapStateToProps)(HomePage) 