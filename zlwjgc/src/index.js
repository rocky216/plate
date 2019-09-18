import React from "react"
import {Root } from "native-base"
import {Provider} from "react-redux"
import RootNavigator from "@/routers"
import store from "@/store"
import _ from "lodash"

global._ = _;

class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  componentDidMount(){
    
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps, "nextProps1")
  }

  render(){
    return (
      <Provider store={store} >
        <Root>
          <RootNavigator/>
        </Root>
      </Provider>
    )
  }
}


export default Index

