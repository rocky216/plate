import { Col, Row, Tag, Typography} from "antd";
import React from "react"

const {Text} = Typography

function clockStatus(clockStatus){
  switch(clockStatus){
    case "0":
      return <Text mark>等待打卡</Text>
    case "1":
      return <Text type="danger">下班卡缺卡</Text>
    case "2":
      return <Text type="danger">上班卡缺卡</Text>
    case "3":
      return ""
  }
}

export const dailyAttendColmuns = [
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "员工电话",
    dataIndex: "phone",
  },
  {
    title: "考勤记录",
    dataIndex: "clockRecord",
    render(item) {
      return (
        <div>
          {item.map(elem=>(
            <Row key={elem.id}>
              <Col span={8}><Tag color="blue">上班卡</Tag>
              {clockStatus(elem.clockStatus) && !elem.startClockTime?clockStatus(elem.clockStatus):elem.startClockTime}
            </Col>
              <Col span={8}><Tag color="blue">下班卡</Tag>
              {clockStatus(elem.clockStatus) && !elem.endClockTime?clockStatus(elem.clockStatus):elem.endClockTime}
            </Col>
            <Col span={8}>
              {clockStatus(elem.clockStatus)?null:<Text disabled>{elem.sumStr}</Text>}  
            </Col>
            </Row>
          ))}
        </div>
      );
    }
  }
]

export const dailyRepairColmuns = [
  {
    title: "提交途径",
    dataIndex: "submitTypeStr",
  },
  {
    title: "报修类型",
    dataIndex: "repairTypeName",
  },
  {
    title: "报修标题",
    dataIndex: "repairName",
  },
  {
    title: "报修说明",
    dataIndex: "repairInfo",
  }
]

export const patrolRecordDetailColmuns = [
  {
    title: "排序",
    dataIndex: "key",
  },
  {
    title: "巡更点",
    dataIndex: "pointName",
  },
  {
    title: "巡更点说明",
    dataIndex: "pointInfo",
  },
  {
    title: "巡更点检查图",
    dataIndex: "patrolImgUrl",
    render(item) {
      return item?<img src={item} width={100} height={100}/>:""
    }
  },
  {
    title: "巡更完成信息",
    dataIndex: "updateUserName",
    render(item, rows) {
      return item+(rows.updateTime||"");
    }
  },
]

export const patrolRecordColmuns = [
  {
    title: "状态",
    dataIndex: "recordStatus",
    render: (item)=>item=="0"?"巡更中":item=="1"?"巡更完成":"强制完成"
  },
  {
    title: "路线名称",
    dataIndex: "lineName",
  },
  {
    title: "巡更时长",
    dataIndex: "strTime",
  },
  {
    title: "巡更信息",
    dataIndex: "sumPoint",
    render(item, rows) {
      return (
        <div>
          总共{item}个巡更点， 完成{rows.completePoint}个巡更点
        </div>
      );
    }
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
  },
  {
    title: "完结信息",
    dataIndex: "endInfo",
    render(item, rows) {
      return (
        <div>
          <div>{item}</div>
          <div>{rows.updateInfo}</div>
        </div>
      );
    }
  },
]


export const patrolLineColmuns = [
  {
    title: "状态",
    dataIndex: "status",
    render: (item)=>item=="0"?"启用":"禁用"
  },
  {
    title: "路线名称",
    dataIndex: "name",
  },
  {
    title: "路线说明",
    dataIndex: "info",
  },
  {
    title: "路线信息",
    dataIndex: "sumPoint",
    render(item, rows) {
      return (
        <div>
          总共{item}个巡更点
        </div>
      );
    }
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
  },
]

export const patrolPointColmuns = [
  {
    title: "巡更点名称",
    dataIndex: "name",
  },
  {
    title: "巡更点标识",
    dataIndex: "qrCode",
  },
  {
    title: "巡更点说明",
    dataIndex: "info",
  },
  {
    title: "创建信息",
    dataIndex: "buildInfo",
  },
]