import React from "react"
import {Switch, Route, withRouter} from "react-router-dom"
import App from "@/views/app"


class Index extends React.Component {
  constructor(props){
    super(props)
    window._navigation = props.history
  }
  
  render (){
    return <App/>
  }
}

export default withRouter(Index)