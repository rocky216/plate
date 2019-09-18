import React from "react"
import {createStackNavigator, createAppContainer} from "react-navigation"
import LoginPage from "@/views/Auth/login"
import {primaryColor } from "@/config"
import RegisterPage from "@/views/Auth/register"

const authStack = createStackNavigator({
  Login: LoginPage,
  Register: RegisterPage
}, {
  // initialRouteName: "Login",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: primaryColor,
      height: 40,
      textAlign: "center"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontSize: 16
    }
  }
})

export default createAppContainer(authStack)