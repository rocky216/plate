import * as React from "react"
import {connect} from "react-redux"
import {Route, Redirect, Switch} from "react-router-dom"
import HomePage from "@/views/home"
import PowerRouter from "./powerRouter"
import SellRouter from "./sellRouter"

interface Props {
  mytype: string
}

class Routers extends React.Component<Props> {
  
  render(){
    const {mytype} = this.props 
    return (
      <Switch>
        <Route exact  path="/" render={()=>{
          return <Redirect to={(window as any).mytype} />
        }} />
        {mytype==="/sell"?<Route render={(props)=><SellRouter/>} />:null}
        {mytype==="/power"?<Route render={(props)=><PowerRouter/>} />:null}
        
      </Switch>
    )
  }
}

const mapStateToProps = (state:any) => {
  return {
    mytype: state.app.mytype,
    prop: state.prop
  }
}

export default connect(mapStateToProps)(Routers)