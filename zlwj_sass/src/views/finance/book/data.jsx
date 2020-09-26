import React from "react"

export const CreateTable = ({
  row
}) =>{
  return (
    <div style={{display: "flex", justifyContent: "flex-end"}}>
      <div className="bookchild">
          <ul>
            <li>详情编号</li>
            <li>详情名称</li>
            <li>详情收费标准</li>
            <li>详情总额</li>
          </ul>
          {row.child.map((item, index)=>(
            <ul key={index}>
              <li>{index+1}</li>
              <li>{item.detailsName}</li>
              <li>{item.detailsStandard}</li>
              <li>{item.detailsMoeny}</li>
            </ul>
          ))}
          <ul>
            <li style={{width: "75%", textAlign: "center"}}>【活动】{row.activeName || "暂无"}</li>
            <li style={{width: "25%"}}>{row.moneyReward || 0}</li>
          </ul>
          <ul>
            <li style={{width: "75%"}}>订单备注：{row.remark}</li>
            <li style={{width: "25%"}}>合计：{row.linkMoeny}</li>
          </ul>
        </div>
    </div>
  )
}

export const CreateOtherTable = ({
  row
}) =>{
  return (
    <div style={{display: "flex", justifyContent: "flex-end"}}>
      <div className="bookchild">
          <ul>
            <li>详情编号</li>
            <li>详情名称</li>
            <li>备注</li>
            <li>详情总额</li>
          </ul>
          {row.child.map((item, index)=>(
            <ul key={index}>
              <li>{index+1}</li>
              <li>{item.detailsName}</li>
              <li>{item.remark}</li>
              <li>{item.detailsMoeny}</li>
            </ul>
          ))}
          <ul>
            <li style={{width: "75%"}}>订单备注：{row.remark}</li>
            <li style={{width: "25%"}}>合计：{row.linkMoeny}</li>
          </ul>
        </div>
    </div>
  )
}

export const CreateEndFixTable = ({
  row
}) =>{
  return (
    <div style={{display: "flex", justifyContent: "flex-end"}}>
      <div className="bookchild">
          <ul>
            <li>详情编号</li>
            <li>详情类型</li>
            <li>时间</li>
            <li>详情名称</li>
            <li>详情总额</li>
          </ul>
          {row.child.map((item, index)=>(
            <ul key={index}>
              <li>{index+1}</li>
              <li>{item.detailsType}</li>
              <li>{item.detailsTime}</li>
              <li>{item.detailsName}</li>
              <li>{item.detailsMoeny}</li>
            </ul>
          ))}
          <ul>
            <li style={{width: "100%"}}>{row.merge}</li>
          </ul>
        </div>
    </div>
  )
}