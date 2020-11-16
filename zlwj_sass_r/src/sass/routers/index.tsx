import React from "react"
import {Switch, Route} from "react-router-dom"
import loadable from 'loadable-components'
import App from "@admin/views/app"

const Home = loadable(() => import('../views/home'))

class Routers extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
      </Switch>
    );
  }
}

export default Routers