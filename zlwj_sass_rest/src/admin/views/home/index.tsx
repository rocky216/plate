import React from 'react';
import {Link} from "react-router-dom"
import {Button, Input} from "antd"
import {connect} from "react-redux"



class HomePage extends React.Component {


  handleClick(){
    import(`@admin/views/home/list`)
    .then((a)=>{
      console.log(a)
    })
    .catch(() => {
      console.log(121)
      // Handle failure
    });
  }

  render() {
    
    return (
       <div>HomePage11211
         <Button type="primary" onClick={this.handleClick.bind(this)}>按需加载</Button>
         <Link to="/test">
          <Button type="primary" onClick={this.handleClick.bind(this)}>你好cfg</Button>
         </Link>
         <Link to="/list">
          <Button type="primary">lisy你好</Button>
         </Link>
         
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