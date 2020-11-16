import React from 'react';
import {Link} from "react-router-dom"
import {Button, Input} from "antd"
import {connect} from "react-redux"



class HomePage extends React.Component {
  componentDidMount(){
    
  }

  render() {
    
    return (
       <div>HomePage
         <Link to="/test">
          <Button type="primary">你好211</Button>
         </Link>
         <Link to="/list">
          <Button type="primary">list</Button>
         </Link>
         <Input/>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    prop: state.prop
  }
}

export default connect(mapStateToProps)(HomePage);