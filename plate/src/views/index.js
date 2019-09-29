import React from "react"
import {connect} from "react-redux"
import {Switch, Route, withRouter} from "react-router-dom"
import App from "@/views/app"
import "./index.less"


class Index extends React.Component {
  constructor(props){
    super(props)
    global._navigation = props.history
  }

  componentWillMount(){
  }

  render(){
    const {token} = this.props

    return (
      <App/>
    )
  }
}

function mapStateProps(state){
  console.log(state)
  return {
    token: state.app.token
  }
}

export default  withRouter(Index) //withRouter(connect(mapStateProps)(Index))