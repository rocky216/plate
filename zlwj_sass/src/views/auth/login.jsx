import React from "react"
import {} from "antd"


class Login extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps){
    console.log(nextProps, "nextProps")
  }

  render(){
    return (
      <div>login</div>
    )
  }
}

export default Login