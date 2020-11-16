import React from 'react';
import {Switch, Route} from "react-router-dom"
import App from "@admin/views/app"
import Login from "@admin/views/auth/login"
import "./index.less"
// import {generate, presetPalettes} from '@ant-design/colors';


class Index extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}


export default Index;