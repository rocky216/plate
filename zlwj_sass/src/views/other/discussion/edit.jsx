import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Form, Button, Input, Icon, Select, InputNumber, DatePicker, Radio} from "antd";
import {editTheme, getThemeList, getThemeDetail} from "@/actions/otherAction"
import BraftEditor from "@/components/BraftEditor"
import JCard from "@/components/JCard"
import moment from "moment"

const {TextArea} = Input
const {Option} = Select
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

class AddTheme extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      voteType:'',
      themeText: null, 
      detail:{}
    }
  }

  componentDidMount(){
    this.props.actions.getThemeDetail({
      id: this.props.match.params.id
    }, res=>{
      this.setState({detail: res, voteType: res.voteType, themeText: res.themeText})
    })
  }


  handlenSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values)=>{
      if(!err){
        console.log(values)
        const {hastime} = values

        this.props.actions.editTheme({
          ...values,
          startTime: moment(hastime[0]).format("YYYY-MM-DD"),
          endTime: moment(hastime[1]).format("YYYY-MM-DD"),
          voteType: this.state.voteType,
          themeText: this.state.themeText,
          hastime: '',
          id: this.props.match.params.id
        }, res=>{
          this.props.utils.OpenNotification("success")
          this.props.history.push("/other/discussion")
        })
      }
    })
  }

  handlenChange(content){
    console.log(content)
    this.setState({themeText: content})
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, baseInfo} = this.props
    const {voteType, themeText, detail} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Card title="新增议事堂主题" extra={<Link to="/other/discussion"><Button ghost type="primary"><Icon type="rollback"  />返回</Button></Link>}>
          <Form {...formItemLayout} onSubmit={this.handlenSubmit.bind(this)} >
            <Form.Item label="主题名称" hasFeedback>
              {getFieldDecorator('themeName', {
                initialValue: detail.themeName,
                rules: [
                  {
                    required: true,
                    message: '填写主题名称!',
                  }
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="主题描述" hasFeedback>
              {getFieldDecorator('themeEndText', {
                initialValue: detail.themeEndText,
                rules: [
                  {
                    required: true,
                    message: '填写主题描述!',
                  }
                ],
              })(<TextArea autoSize={{minRows: 2}} />)}
            </Form.Item>
            <Form.Item label="主题标签" hasFeedback>
              {getFieldDecorator('themeType', {
                initialValue: detail?String(detail.themeType):'',
                rules: [
                  {
                    required: true,
                    message: '填写主题名称!',
                  }
                ],
              })(
                <Select>
                  {baseInfo && baseInfo.sysDict && baseInfo.sysDict.vote_theme && baseInfo.sysDict.vote_theme.theme_type?
                  baseInfo.sysDict.vote_theme.theme_type.map(item=>(
                    <Option key={item.id} vlaue={item.id}>{item.dictLabel}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="单人投票数" hasFeedback>
              {getFieldDecorator('singleCount', {
                initialValue: detail.singleCount,
                rules: [
                  {
                    required: true,
                    message: '填写单人投票数!',
                  }
                ],
              })(<InputNumber style={{width: "100%"}} />)}
            </Form.Item>
            <Form.Item label="投票有效时间" hasFeedback>
              {getFieldDecorator('hastime', {
                initialValue: detail?[moment(detail.startTime),moment(detail.endTime)]:null,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '选择投票有效时间!',
                  }
                ],
              })(<RangePicker  />)}
            </Form.Item>
            <Form.Item label="投票类型" >
              <Radio.Group value={voteType} onChange={({target})=>this.setState({voteType: target.value})}>
                <Radio value="0">所有业主</Radio>
                <Radio value="1">部分业主</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="内容" hasFeedback>
              {themeText != null?<BraftEditor defaultValue={themeText} onChange={content=>this.setState({themeText: content})} />:null}
      
            </Form.Item>
            <Form.Item {...tailFormItemLayout} >
              <Button type="primary" htmlType="submit" ><Icon type="save" />保存</Button>
            </Form.Item>
          </Form>
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({editTheme, getThemeList, getThemeDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    baseInfo: state.app.baseInfo,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Form.create()(AddTheme))