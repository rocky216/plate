import React from "react"
import {Popconfirm} from "antd"

interface Props {
  confirm:()=>void;
  children: any;
}

const DeletePop: React.FC<Props> = ({
  confirm,
  children
})=>{
  return (
    <Popconfirm
      title="是否删除？"
      onConfirm={confirm}
      okText="是"
      cancelText="否"
    >
      {children}
    </Popconfirm>
  )
}

export default DeletePop;