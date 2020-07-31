import React from "react"


export const PrintSettle = ({
  detail
})=>{
  return (
    <div className="trimdetail" >
      <div>
        <img src={detail.companyLogo} />
        <span style={{marginLeft: 100, fontSize: 20}}>装修计划计算单</span>
      </div>
      <table  border="1" >
        <tbody>
        <tr>
          <td>住宅：{detail.aaetsName}</td>
          <td>业主：{detail.ownerName}</td>
          <td>电话：{detail.ownerPhone}</td>
        </tr>
        <tr>
          <td>装修类型：{detail.fixPlan.fixType=="company"?"公司":"个人"}</td>
          <td>装修负责人：{detail.fixPlan.director}</td>
          <td>装修联系人：{detail.fixPlan.linkName}</td>
        </tr>
        <tr>
          <td colSpan={3} style={{textAlign: "center"}}>装修时间：{detail.fixPlan.fixStartTime.substring(0,10)}至{detail.fixPlan.fixEndTime?detail.fixPlan.fixEndTime.substring(0,10):""}</td>
        </tr>
        </tbody>
      </table>
      <table border="1" className="mgt10">
        <tbody>
          {detail.deposit.map((item, index)=>(
            <tr key={item.id}>
              <td>履约金</td>
              <td>{item.buildTime}</td>
              <td>装修履约金{index+1}</td>
              <td>{item.depositMoney}</td>
          </tr>
          ))}
        {detail.fixPlan.sumDepositMoney?
        <tr>
          <td colSpan={4} style={{textAlign: "right"}}>合计：{detail.fixPlan.sumDepositMoney}元</td>
        </tr>:null}

        {detail.tear.map(item=>(
          <tr key={item.id}>
            <td>违规扣款</td>
            <td>{item.buildTime}</td>
            <td>{item.tearNo}</td>
            <td>{item.tearMoney}元</td>
        </tr>
        ))}
        {detail.fixPlan.outMoney?(
          <>
            <tr>
              <td colSpan={4} style={{textAlign: "right"}}>合计：{detail.fixPlan.outMoney}元</td>
            </tr>
            <tr>
              <td colSpan={4} style={{textAlign: "right"}}>
                {`${detail.fixPlan.sumDepositMoney}(履约金) - ${detail.fixPlan.outMoney}(违规扣款) = ${detail.fixPlan.sumTearMoney}元`}
              </td>
            </tr>
          </>
        )
        :null}
        </tbody>
      </table>
      <table border="1" className="mgt10">
        <tbody>
        <tr>
          <td colSpan="5" style={{textAlign: "center"}}>领到{detail.companyName}退回装修履约金共计人命币{detail.fixPlan.outMoney || 0}元</td>
        </tr>
        <tr style={{textAlign: "right"}}>
          <td colSpan="4">领款人____________</td>
          <td colSpan="7">_______年____月____日</td>
        </tr>
        </tbody>
      </table>
      <div style={{display: "flex", justifyContent:"space-between"}}>
        <span>打印时间：{detail?detail.fixPlan.printDate:""}</span>
        <span>[智联万家物业云]技术支持：江西高超网络</span>
      </div>
    </div>
  )
}

export const DepositSettle = ({
  detail,
  item
})=>{
  return (
    <div className="trimdetail">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <img src={detail.companyLogo} />
        <span style={{ fontSize: 20, paddingTop:20}}>装修履约金</span>
        <span style={{paddingTop: 25}}>单号：ZXRC2020011201-1</span>
      </div>
      <table  border="1" >
        <tbody>
          <tr>
            <td>住宅：{detail.aaetsName}</td>
            <td>业主：{detail.ownerName}</td>
            <td>电话：{detail.ownerPhone}</td>
            <td>{detail.ownerPhone}</td>
          </tr>
          <tr>
            <td>装修类型：{detail.fixPlan.fixType=="company"?"公司":"个人"}</td>
            <td>装修负责人：{detail.fixPlan.director}</td>
            <td>装修联系人：{detail.fixPlan.linkName}</td>
            <td>装修联系电话：{detail.fixPlan.linkName}</td>
          </tr>
          <tr>
            <td colSpan={2}>开始装修时间：{detail.fixPlan.fixType=="company"?"公司":"个人"}</td>
            <td colSpan={2}>履约金支付时间：{detail.fixPlan.director}</td>
          </tr>
        </tbody>
      </table>
      <table border="1" className="mgt10">
        <tbody>
          <tr>
            <td>序号</td>
            <td>收费详细</td>
            <td>收费金额</td>
          </tr>
          <tr>
            <td>1</td>
            <td>{item.depositInfo}</td>
            <td>{item.depositMoney}元</td>
          </tr>
          <tr>
            <td colSpan={2}>{item.depositMoneyChinaese}</td>
            <td>{item.depositMoney}元</td>
          </tr>
          <tr>
            <td colSpan={3}>装修履约金入住一年后可退</td>
          </tr>
        </tbody>
      </table>
      <div style={{display: "flex", justifyContent:"space-between"}}>
        <span>打印时间：{detail?detail.fixPlan.printDate:""}</span>
        <span>[智联万家物业云]技术支持：江西高超网络</span>
      </div>
    </div>
  )
}