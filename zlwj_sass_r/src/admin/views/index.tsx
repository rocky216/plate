import React from "react"
import Routers from "@admin/routers"
import {Route, Switch} from "react-router-dom"
import App from "@admin/views/app"


class Index extends React.Component {
  constructor(props:any){
    super(props);
    (window as any)._navigation = props.history;
  }

  render() {
    return (
      <App/>
    );
  }
}

export default Index