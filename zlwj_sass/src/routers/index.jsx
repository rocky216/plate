import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from "@/views/home"


class Routers extends React.Component{
  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      
    )
  }
}

export default Routers
