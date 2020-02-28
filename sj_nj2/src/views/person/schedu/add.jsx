import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Row, Col, Tree, Form, DatePicker, Radio, TimePicker, Checkbox, Icon, Button} from "antd";
import JCard from "@/components/JCard"
import {getSelectDeptList, addSchedu, loadSelectDeptByRoleSchedu} from "@/actions/personAction"
import moment from "moment"
import "./index.less"

const {RangePicker } = DatePicker;
const {TreeNode } = Tree

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class AddSchedu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dept: [],
      deptKeyStr:[],
      startTime:null,
      endTime:"",
      productionType:"0",
      saturdayStatus:false,
      sundayStatus:false,
      cutOneStartTime:"",
      cutOneEndTime:"",
      cutTwoStartTime:"",
      cutTwoEndTime:"",
      cutThreeStartTime:"",
      cutThreeEndTime:"",
      productionStartTime: "",
      productionEndTime:"" 
    }
  }

  componentDidMount(){
    this.props.actions.loadSelectDeptByRoleSchedu({loadType: 1, loadPlan: 1, roleUrl:"/api/pc/plan"}, res=>{
      this.setState({dept: res})
    })
  }

  createNode(arr){
    return arr.map(item=>(
      <TreeNode key={item.id} value={item.id} title={item.deptName+(`${item.lastPlan?'('+item.lastPlan.planTime.substring(0,11)+')':""}`)} dataRef={item} >
        {item.nextDept && item.nextDept.length? this.createNode(item.nextDept):null}
      </TreeNode>
    ))
  }
  checked(time1, time2, msg){
    
    if(time1 && time2 ){
      if(time1.length>10){
        if(moment(time1)>moment(time2)){
          this.props.utils.OpenNotification("error", msg+"开始时间不能大于结束时间")
          return false
        }
      }else {
        if(moment(time1,"HH:mm")>moment(time2,"HH:mm")){
          this.props.utils.OpenNotification("error", msg+"开始时间不能大于结束时间")
          return false
        }
      }
    }else{
      this.props.utils.OpenNotification("error", msg+"不能为空！")
      return false
    }
    return true
  }

  handlenSubmit(){
    this.props.form.validateFields((err, values) => {
      const {
        deptKeyStr,
        startTime,
        endTime,
        productionType,
        saturdayStatus,
        sundayStatus,
        cutOneStartTime,
        cutOneEndTime,
        cutTwoStartTime,
        cutTwoEndTime,
        cutThreeStartTime,
        cutThreeEndTime,
        productionStartTime,
        productionEndTime
      } = this.state
      
      if(deptKeyStr.length==0){
        this.props.utils.OpenNotification("error","请选择排产车间/部门！")
        return
      }
      if(!startTime || !endTime ||  moment(startTime)>moment(endTime)){
        this.props.utils.OpenNotification("error", "排产日期不能为空或者开始时间不能大于结束时间")
        return 
      }
      if( !productionStartTime || !productionEndTime ){
        this.props.utils.OpenNotification("error", "排产时间不能为空")
        return 
      }
      let newValues = _.omit(this.state,"dept")

      this.props.actions.addSchedu({
        ...newValues,
        deptKeyStr: deptKeyStr.join(),
        saturdayStatus: saturdayStatus?"1":"0",
        sundayStatus: sundayStatus?"1":"0"
      }, res=>{
        this.props.utils.OpenNotification("success")
        this.props.history.push("/person/schedu")
      })
    });
  }

  hanldenChange(keys){
    this.setState({deptKeyStr:keys})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning} = this.props
    const {dept,
      deptKeyStr,
      startTime,
      endTime,
      productionType,
      saturdayStatus,
      sundayStatus,
      cutOneStartTime,
      cutOneEndTime,
      cutTwoStartTime,
      cutTwoEndTime,
      cutThreeStartTime,
      cutThreeEndTime,
      productionStartTime,
      productionEndTime} = this.state
    

    return (
      <JCard spinning={spinning}>
        
          <div className="scheduBox">
            <Card size="small" title={<Button type="link">请选择排产车间/部门</Button>} style={{minWidth: "300px"}}>
              {dept.length?
              <Tree
                defaultExpandAll
                checkable
                checkedKeys={deptKeyStr}
                onCheck={this.hanldenChange.bind(this)}
              >
                {this.createNode(dept)}
              </Tree>:null}
            </Card>
            
            <Card size="small" style={{width: "100%"}} extra={(
              <div>
                <Button type="primary" onClick={this.handlenSubmit.bind(this)}><Icon type="save" />保存</Button>
                <Link to="/person/schedu">
                  <Button className="mgl10"><Icon type="rollback" />返回</Button>
                </Link>
              </div>
            )}>
              <Form {...formItemLayout}>
                <Form.Item label="排产日期">
                  <DatePicker value={startTime?moment(startTime):null} 
                    onChange={(d)=>this.setState({startTime: moment(d).format("YYYY-MM-DD")})} /><span className="timeline">-</span>
                    <DatePicker value={endTime?moment(endTime):null} 
                    onChange={(d)=>this.setState({endTime: moment(d).format("YYYY-MM-DD")})}/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 6}} >
                  <Checkbox checked={saturdayStatus} 
                  onChange={({target})=>this.setState({saturdayStatus:target.checked})}>周六为上班日</Checkbox>
                  <Checkbox checked={sundayStatus} 
                  onChange={({target})=>this.setState({sundayStatus:target.checked})}>周日为上班日</Checkbox>
                </Form.Item>
                <Form.Item label="排产班次">
                  <Radio.Group value={productionType} onChange={({target})=>this.setState({productionType: target.value})}>
                    <Radio value="0">白班</Radio>
                    <Radio value="1">晚班</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="排产时间">
                  <TimePicker format="HH:mm" value={productionStartTime?moment(productionStartTime, "HH:mm"):null} 
                  onChange={(d)=>this.setState({productionStartTime: d?moment(d).format("HH:mm"):null})} 
                  /> 
                  
                  <span className="timeline">-</span>
                  <TimePicker format="HH:mm" value={productionEndTime?moment(productionEndTime, "HH:mm"):null} 
                  onChange={(d)=>this.setState({productionEndTime: d?moment(d).format("HH:mm"):null})}/>
                </Form.Item>
                <Form.Item label="扣除中饭时间">
                  <TimePicker format="HH:mm" value={cutOneStartTime?moment(cutOneStartTime, "HH:mm"):null} 
                    onChange={(d)=>this.setState({cutOneStartTime: d?moment(d).format("HH:mm"):null})}
                    />
                    <span className="timeline">-</span>
                    <TimePicker format="HH:mm" value={cutOneEndTime?moment(cutOneEndTime, "HH:mm"):null} 
                    onChange={(d)=>this.setState({cutOneEndTime: d?moment(d).format("HH:mm"):null})}/>
                </Form.Item>
                <Form.Item label="扣除晚饭时间">
                  <TimePicker format="HH:mm" value={cutTwoStartTime?moment(cutTwoStartTime, "HH:mm"):null} 
                    onChange={(d)=>this.setState({cutTwoStartTime: d?moment(d).format("HH:mm"):null})}
                    />
                    <span className="timeline">-</span>
                    <TimePicker format="HH:mm" value={cutTwoEndTime?moment(cutTwoEndTime, "HH:mm"):null} 
                    onChange={(d)=>this.setState({cutTwoEndTime: d?moment(d).format("HH:mm"):null})}/>
                </Form.Item>
                <Form.Item label="扣除其他时间">
                  <TimePicker format="HH:mm" value={cutThreeStartTime?moment(cutThreeStartTime, "HH:mm"):null} 
                    onChange={(d)=>this.setState({cutThreeStartTime: d?moment(d).format("HH:mm"):null})}
                    />
                    <span className="timeline">-</span>
                    <TimePicker format="HH:mm" value={cutThreeEndTime?moment(cutThreeEndTime, "HH:mm"):null} 
                    onChange={(d)=>this.setState({cutThreeEndTime: d?moment(d).format("HH:mm"):null})}/>
                </Form.Item>
              </Form>
            </Card>
          </div>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSelectDeptList, addSchedu, loadSelectDeptByRoleSchedu}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(AddSchedu) )