import React from "react"
import {withRouter, Link} from "react-router-dom"
import {Menu } from "antd"
import menus from "./menus"


const { SubMenu } = Menu;



interface IProps {
  history: any;
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
    const {history } = this.props;
    
    return (
      <>
        <Menu 
          openKeys={[(window as any).mytype]}
          theme="dark" 
          mode="inline">
          {menus.map(item=>(
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

export default withRouter(SideBar as any);