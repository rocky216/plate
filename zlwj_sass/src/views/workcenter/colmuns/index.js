export const propertyfeeColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "姓名",
    dataIndex: "owners",
    render(item){
      return item.name
    }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render(e,rows){
      return rows.owners.phone
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "房间号",
    dataIndex: "houseUrlStr"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
  {
    title: "优惠金额",
    dataIndex: "orderDiscountFee"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
]

export const propertyDetailColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "模板名称",
    dataIndex: "detailsName"
  },
  {
    title: "房屋类型",
    dataIndex: "houseType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "电梯和楼梯房"
        case 1:
          return "电梯房"
        case 2:
          return "楼梯房"
      }
    }
  },
  {
    title: "房屋面积条件",
    dataIndex: "areaConditionType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "无条件"
        case 1:
          return "建筑面积"
        case 2:
          return "室内面积"
        case 3:
          return "公摊面积"
      }
    }
  },
  {
    title: "房屋楼层条件",
    dataIndex: "floorStart",
    render(item, rows){
      return `${item}-${rows.floorEnd}层`
    }
  },
  {
    title: "收费类型",
    dataIndex: "feeType",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "固定金额"
        case 1:
          return "建筑面积乘金额"
        case 2:
          return "室内面积乘金额"
        case 3:
          return "公摊面积乘金额"
      } 
    }
  },
  {
    title: "收费金额",
    dataIndex: "fee"
  },
  {
    title: "时间单位",
    dataIndex: "feeTime",
    render(item){
      switch(parseInt(item)){
        case 0:
          return "月"
        case 1:
          return "季度"
        case 2:
          return "年"
      } 
    }
  },
  {
    title: "总金额",
    dataIndex: "totalFee"
  },
]

export const shopPropertyfeeColmuns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "姓名",
    dataIndex: "owners",
    render(item){
      return item?item.name:"无"
    }
  },
  {
    title: "手机号",
    dataIndex: "phone",
    render(e,rows){
      return rows?rows.owners.phone:"无"
    }
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "商铺号",
    dataIndex: "houseUrlStr"
  },
  {
    title: "缴费时间",
    dataIndex: "buildTime"
  },
  {
    title: "优惠金额",
    dataIndex: "orderDiscountFee"
  },
  {
    title: "缴费金额",
    dataIndex: "orderTrueFee"
  }
]

export const exceptionColumns = [
  {
    title: "序号",
    dataIndex: "key"
  },
  {
    title: "审批人",
    dataIndex: "checkUserName"
  },
  {
    title: "异常说明",
    dataIndex: "exceptionInfo"
  },
  {
    title: "创建时间",
    dataIndex: "buildTime"
  },
]