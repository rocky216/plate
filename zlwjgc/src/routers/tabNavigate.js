import React from "react"
import {View, ScrollView} from "react-native"
import {
  createBottomTabNavigator, 
  createAppContainer, 
  createDrawerNavigator,
  DrawerItems, 
  SafeAreaView} from "react-navigation"
import HomePage from "@/views/Home"
import WisdomLifePage from "@/views/WisdomLife"
import UsersPage from "@/views/Users"
import IconEntypo from 'react-native-vector-icons/Entypo';
import {primaryColor, fontColor} from "@/config"
import DrawerSide from "@/components/DrawerSide"

const DrawerNav = createDrawerNavigator({
  Index: HomePage
}, {
  contentComponent: (props)=><DrawerSide {...props} />,
  drawerWidth: 200
})

const RootTabNavigate = createBottomTabNavigator({
  Home: {
    screen: createAppContainer(DrawerNav),
    navigationOptions: {
      tabBarLabel: "首页",
      tabBarIcon:({tintColor, focused})=>{
        return <IconEntypo name="home" size={22} color={focused?primaryColor:fontColor} />
      }
    }
  },
  WisdomLife: {
    screen: WisdomLifePage,
    navigationOptions: {
      tabBarLabel: "智慧生活",
      tabBarIcon:({tintColor, focused})=>{
        return <IconEntypo name="network" size={22} color={focused?primaryColor:fontColor} />
      }
    }
  },
  Users: {
    screen: UsersPage,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon:({tintColor, focused})=>{
        return <IconEntypo name="user" size={22} color={focused?primaryColor:fontColor} />
      }
    }
  }
})

export default createAppContainer(RootTabNavigate)

