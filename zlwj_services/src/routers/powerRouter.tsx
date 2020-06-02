import React from "react"
import {Route} from "react-router-dom"
import PowerPage from "@/views/power"
import PowerDevice from "@/views/power/device"


class PowerRouter extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/power" component={PowerPage} />
        <Route path="/power/device" component={PowerDevice} />
      </>
    );
  }
}

export default PowerRouter;