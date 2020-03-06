import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Card, Tabs, Form, Select, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {getSelectHeList} from "@/actions/appAction"
import PileConfig from "./pile"

const { TabPane } = Tabs;
const {Option} = Select

class HeConfig extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: "1",
      tabs: [
        {title: "充电桩配置", key: "1"}
      ],
      heId: ""
    }
  }

  componentDidMount(){
    this.props.actions.getSelectHeList({}, res=>{
      this.setState({heId: res && res.length?res[0]["id"]:""})
    })
  }

  async handleSrach(e){
    e.preventDefault();
    await this.setState({heId:""})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({heId:values.heId})
      }
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {utils, spinning, allHeList} = this.props
    const {tabKey, tabs, heId} = this.state

    return (
      <JCard spinning={spinning}>
        <Card>
          <Form className="flexend" layout="inline" onSubmit={this.handleSrach.bind(this)}>
            <Form.Item >
              {getFieldDecorator('heId', {
                initialValue: allHeList&&allHeList.length?allHeList[0]["id"]:""
              })(
                <Select style={{width: 150}}>
                  {allHeList&&allHeList.length?allHeList.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )):null}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" ><Icon type="search" />搜索</Button>
            </Form.Item>
          </Form>
          <Tabs activeKey={tabKey}>
            {tabs.map(item=>(
              <TabPane tab={item.title} key={item.key} />
            ))}
          </Tabs>
          {heId?<PileConfig heId={heId} />:null}
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getSelectHeList}, dispatch)
  }
}

function mapStateProps(state){
  return {
    allHeList: state.app.allHeList,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(HeConfig) )