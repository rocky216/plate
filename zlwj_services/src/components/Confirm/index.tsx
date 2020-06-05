import React from "react"
import {Popconfirm, Button} from "antd"


interface Props {
  children?:any;
  title?:string;
  onConfirm:()=>void;
}

const Confirm: React.FC<Props> = ({
  children=(<Button type="link">删除</Button>),
  title="是否删除？",
  onConfirm
})=>{
  return (
    <Popconfirm
      title={title}
      okText="是"
      cancelText="否"
      onConfirm={onConfirm}
    >
      {children}
    </Popconfirm>
  )
}

export default Confirm