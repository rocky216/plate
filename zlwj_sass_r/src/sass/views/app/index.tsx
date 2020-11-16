import React from "react"
import {Button} from "antd"
import {Link} from "react-router-dom"


class App extends React.Component {
  render() {
    
    return (
      <div>
        app
        <br/>
        <Link to="/home">
          <Button>Home</Button>
        </Link>
        
      </div>
    );
  }
}

export default App