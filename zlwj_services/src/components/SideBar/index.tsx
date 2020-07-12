import React from "react"
import {connect } from "react-redux"
import {withRouter, Link, Route} from "react-router-dom"
import {Menu } from "antd"
import menus from "./menus"
import _ from "lodash"


const { SubMenu } = Menu;



interface IProps {
  history: any;
  mytype: string
}

interface IState {

}

class SideBar extends React.Component<IProps, IState> {

  constructor(props:IProps){
    super(props);
  }

  state:IState = {

  }

  componentDidMount(){
    
  }

  render(){
    const {history, mytype} = this.props;

    return (
      <>
        <Menu 
          openKeys={[mytype]}
          theme="dark" 
          mode="inline">
          {_.filter(menus, o=>o.key===mytype).map(item=>(
            item.children && item.children.length?
            (
              <SubMenu 
                key={item.key} 
                title={item.title}
                onTitleClick={()=>history.push(item.link)}
                >

                {item.children.map(elem=>(
                  <Menu.Item key={elem.key}  >
                    <Link to={elem.link?elem.link:""} >{elem.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            )
            :(
              <Menu.Item key={item.key}  >
                {item.title}
              </Menu.Item>
            )
          ))}
        </Menu>
      </>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    mytype: state.app.mytype
  }
}

export default withRouter( connect(mapStateToProps)(SideBar) as any);