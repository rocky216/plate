import React from "react"
import {Input, DatePicker, Select, InputNumber, TreeSelect, Icon, Cascader } from "antd"
import moment from "moment"

const {Option} = Select
const {TreeNode} = TreeSelect 
const {TextArea} = Input

function handlenData(arr){
  let arrData = function(arr){
    if(arr && arr.length){
      _.each(arr, item=>{
        item.children = item.nextDept && item.nextDept.length?item.nextDept:null
        item.value = item.id
        item.key = item.id
        item.label = item.deptName
        if(item.nextDept && item.nextDept.length){
          arrData(item.nextDept)
        }
      })
    }
  } 
  arrData(arr)
  return arr
  
}

export  function staffInfoList(_this, {detail, employeeDict, deptNotsmall,roles, deptList, workspace, classSpace}){
  const {getFieldValue} = _this.props.form
  const {levelList, positionList, sourceList, intoCenterList, personTypeList} = employeeDict
  const {teach} = _this.state
  
  detail = detail?detail:{}
  console.log(handlenData(deptList), "As")
  return [
    {
      title: "姓名",
      value: "name",
      initialValue: detail.name,
      rules: [{required: true, message: '姓名不能为空！'}],
      type: <Input/>
    },
    {
      title: "入职日期",
      value: "entryTime",
      initialValue: detail.entryTime?moment(detail.entryTime):null,
      type: <DatePicker style={{width: "100%"}} />
    },
    {
      title: "人员类别",
      value: "personTypeId",
      initialValue: detail.personTypeId,
      type: (
        <Select>
          {personTypeList && personTypeList.length?personTypeList.map(item=>(
            <Option key={item.id} value={item.id}>{item.dictName}</Option>
          )):null}
        </Select>
      )
    },
    {
      title: "性别",
      value: "sex",
      initialValue: detail.sex,
      rules: [{required: true, message: '性别不能为空！'}],
      type: (
        <Select>
          <Option value="1">男</Option>
          <Option value="0">女</Option>
        </Select>
      )
    },
    {
      title: "转正日期",
      value: "regularTime",
      initialValue: detail.regularTime?moment(detail.regularTime):null,
      type: <DatePicker style={{width: "100%"}} />
    },
    {
      title: "岗级",
      value: "levelId",
      initialValue: detail.levelId,
      type: (
        <Select>
          {levelList && levelList.length?levelList.map(item=>(
            <Option key={item.id} value={item.id}>{item.dictName}</Option>
          )):null}
        </Select>
      )
    },
    {
      title: "状态",
      value: "activity",
      initialValue: detail.activity,
      rules: [{required: true, message: '状态不能为空！'}],
      type: (
        <Select>
          <Option value="0">待报到</Option>
          <Option value="1">试用期</Option>
          <Option value="2">在职</Option>
          <Option value="3">主动离职</Option>
          <Option value="4">被动离职</Option>
        </Select>
      )
    },
    {
      title: "试用期限",
      value: "probation",
      initialValue: detail.probation,
      type: <InputNumber min={0} style={{width: "100%"}} />
    },
    {
      title: "身份证号码",
      value: "card",
      initialValue: detail.card,
      rules: [{required: true, message: '身份证号码不能为空！'}],
      type: <Input/>
    },
    {
      title: "职位",
      value: "positionId",
      initialValue: detail.positionId,
      type: (
        <Select>
          {positionList && positionList.length?positionList.map(item=>(
            <Option key={item.id} value={item.id}>{item.dictName}</Option>
          )):null}
        </Select>
      )
    },
    {
      title: "出生日期",
      value: "birthday",
      initialValue: detail.birthday?moment(detail.birthday):null,
      type: <DatePicker style={{width: "100%"}} />
    },
    {
      title: "电话",
      value: "phone",
      initialValue: detail.phone,
      rules: [{required: true, message: '电话不能为空！'}],
      type: <InputNumber style={{width: "100%"}} />
    },
    {
      title: "民族",
      value: "nation",
      initialValue: detail.nation,
      type: <Input />
    },
    {
      title: "入职前工作年限",
      value: "workyear",
      initialValue: detail.workyear,
      type: <InputNumber min={0} style={{width: "100%"}}/>
    },
    {
      title: "QQ",
      value: "qq",
      initialValue: detail.qq,
      type: <InputNumber style={{width: "100%"}} />
    },
    {
      title: "婚姻",
      value: "matrimonial", 
      initialValue: detail.matrimonial,
      type: (
        <Select>
          <Option value="0">已婚</Option>
          <Option value="1">未婚</Option>
        </Select>
      )
    },
    {
      title: "入职前行业年限",
      value: "industryWorkyear",
      initialValue: detail.industryWorkyear,
      type: <InputNumber min={0} style={{width: "100%"}} />
    },
    {
      title: "微信",
      value: "wechat",
      initialValue: detail.wechat,
      type: <Input />
    },
    {
      title: "国籍",
      value: "nationality",
      initialValue: detail.nationality,
      type: <Input />
    },
    {
      title: "带教",
      value: "directorId",
      type: (
        <div className="teach_wrap">
          <Input  value={teach?teach.name:""} />
          <Icon className="pulsIcon" type="user-add" onClick={()=>_this.setState({visible: true})} />
        </div>
      )
    },
    {
      title: "邮箱",
      value: "email",
      initialValue: detail.email,
      type: <Input />
    },
    {
      title: "职称",
      value: "jobtitle",
      initialValue: detail.jobtitle,
      type: <Input />
    },
    { 
      title: "来源渠道",
      value: "sourceId",
      initialValue: detail.sourceId,
      type: (
        <Select>
          {sourceList && sourceList.length?sourceList.map(item=>(
            <Option key={item.id} value={item.id}>{item.dictName}</Option>
          )):null}
        </Select>
      )
    },
    {
      title: "紧急联系人",
      value: "emergency",
      initialValue: detail.emergency,
      type:  <Input />
    },
    {
      title: "部门/车间",
      value: "mDeptId",
      initialValue: detail.mDeptId,
      rules: [{required: true, message: '选择部门/车间！'}],
      type: (
        <TreeSelect onSelect={_this.handlenSelect.bind(_this)}>
          {_this.createNode(deptNotsmall?deptNotsmall:[])}
        </TreeSelect>
      )
    },
    {
      title: "单元/工段/班组",
      value: "units",
      initialValue: deptList && deptList.length?[detail.unitId,detail.workScoreId,detail.classId]:[],
      hide: deptList && deptList.length?false:true,
      type: (
        <Cascader  options={handlenData(deptList)}  />
      )
    },
    {
      title: "紧急联系方式",
      value: "emergencyTel",
      initialValue: detail.emergencyTel,
      type: <InputNumber min={0} style={{width: "100%"}} />
    },
    // {
    //   title: "工段",
    //   value: "workScoreId",
    //   initialValue: workspace && workspace.length?detail.workScoreId:"",
    //   hide: workspace?false:true,
    //   type: ( 
    //     <Select onChange={_this.handlenTeam.bind(_this)}>
    //       {workspace && workspace.length?workspace.map(item=>(
    //         <Option key={item.id} value={item.id} dataRef={item} >{item.deptName}</Option>
    //       )):null}
    //     </Select>
    //   )
    // },
    // {
    //   title: "班组",
    //   value: "classId",
    //   initialValue: detail.classId,
    //   hide: classSpace?false:true,
    //   type: ( 
    //     <Select >
    //       {classSpace && classSpace.length?classSpace.map(item=>(
    //         <Option key={item.id} value={item.id} dataRef={item} >{item.deptName}</Option>
    //       )):null}
    //     </Select>
    //   )
    // },
    {
      title: "衣服尺寸",
      value: "clothSize",
      initialValue: detail.clothSize,
      type: <InputNumber min={0} style={{width: "100%"}} />
    },
    {
      title: "附属部门",
      value: "bDeptId",
      initialValue: detail.bDeptId,
      type: (
        <TreeSelect >
          {_this.createNode(deptNotsmall?deptNotsmall:[])}
        </TreeSelect>
      )
    },
    {
      title: "成本中心",
      value: "intoCenterId",
      initialValue: detail.intoCenterId,
      type: (
        <Select>
          {intoCenterList && intoCenterList.length?intoCenterList.map(item=>(
            <Option key={item.id} value={item.id}>{item.dictName}</Option>
          )):null}
        </Select>
      )
    },
    {
      title: "鞋码",
      value: "shoeSize",
      initialValue: detail.shoeSize,
      type: <InputNumber min={0} style={{width: "100%"}} />
    },
    {
      title: "备注",
      value: "remark",
      initialValue: detail.remark,
      type: <TextArea rows={1}/>
    },
    {
      title: "工号",
      value: "jobNumber",
      initialValue: detail.jobNumber,
      type: <Input/>
    },
    {
      title: "住宿情况",
      value: "stayCase",
      initialValue: detail.stayCase,
      type: (
        <Select style={{width: "100%"}}>
          <Option value="0">住宿舍</Option>
          <Option value="1">不住宿舍</Option>
        </Select>
      )
    },
    {
      title: "宿舍信息",
      value: "stayinfo",
      initialValue: detail.stayinfo,
      type: <TextArea/>
    },
    {
      title: "角色",
      value: "roleKeys",
      initialValue: detail.roleKeys?detail.roleKeys.split(","):[],
      type: (
        <Select mode="multiple">
          {roles && roles.length?roles.map(item=>(
            <Option key={item.id} >{item.roleName}</Option>
          )):null}
        </Select>
      )
    },
    {
      title: "现居住地",
      value: "address",
      initialValue: detail.address,
      type: <TextArea/>
    },
  
  ]
}