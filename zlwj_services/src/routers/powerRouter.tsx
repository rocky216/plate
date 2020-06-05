import React from "react"
import {Route} from "react-router-dom"
import PowerPage from "@/views/power"
import PowerDevice from "@/views/power/device"
import PowerCompanyPage from "@/views/power/company"
import PowerEstate from "@/views/power/estate"


class PowerRouter extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/power" component={PowerPage} />
        <Route path="/power/device" component={PowerDevice} />
        <Route path="/power/company" component={PowerCompanyPage} />
        <Route path="/power/estate" component={PowerEstate} />
      </>
    );
  }
}

export default PowerRouter;