import React from "react"
import {Link} from "react-router-dom"
import {
  Button
} from "antd"

class Home extends React.Component {
  render(){
    return (
      <div>
        Home
        <Link to="/login">
          <Button>login</Button>
        </Link>
        
      </div>
    )
  }
}

export default Home