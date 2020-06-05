import React from "react"
import {Button} from "antd"
import { PlusOutlined } from '@ant-design/icons';

interface Props {
  text:string;
  onClick?:()=>any;
  type?: any;
  icon?:any;
  ghost?:boolean;
}

const IconButton: React.FC<Props> = ({
  text,
  onClick,
  type,
  icon=<PlusOutlined/>,
  ghost=false
})=>{
  
  return (
    <Button icon={icon} type={type} onClick={onClick} ghost={ghost} >{text}</Button>
  )
}

export default IconButton;
