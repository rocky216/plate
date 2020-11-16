import React from "react"
import {Spin} from "antd"
import QueueAnim from "rc-queue-anim"

interface Props {
  spinning: boolean;
}

const JCard:React.FC<Props> = ({
  children,
  spinning
})=>{

  return (
    <Spin spinning={spinning} size="large" delay={500} tip="正在加载..." >
      <QueueAnim delay={300} appear={true}>
        {children}
      </QueueAnim>
      
    </Spin>
  )
}

export default JCard;