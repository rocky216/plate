import React from "react"
import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation"
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';


import AuthLoading from "@/views/Auth/authLoad"
import AuthStack from "@/routers/authStack"
import AppStack from "@/routers/appStack"






const RootNavigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  Main: AppStack,
  Auth: AuthStack
},{
  initialRouteName: "AuthLoading"
}) 

export default createAppContainer(RootNavigator)