import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Card, Button, Table, Icon, Form} from "antd";
import {getPropertyTemplate} from "@/actions/financeAction"
import JCard from "@/components/JCard"
import {propertyTemColmuns} from "../colmuns"
import HeList from "@/components/HeList"


class Properytem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      params:{
        current: 1,
        heId: ""
      }
    }
  }
  componentDidMount(){
    this.props.actions.getPropertyTemplate({})
  }

  getCol(){
    return propertyTemColmuns.concat([
      {
        title: "操作",
        render(item){
          return (
            <div>
              <Link to={`/finance/propertytem/${item.id}/edit`}>
                <Button type="link">编辑</Button>
              </Link>
              
            </div>
          )
        }
      }
    ])
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const {params} = this.state
      params.heId = values.heId
      this.props.actions.getPropertyTemplate(params)
    });
  }

  render(){
    const {getFieldDecorator} = this.props.form
    const {spinning, utils, propertytem} = this.props
    const {params} = this.state

    return (
      <JCard spinning={spinning}>
        <Card title={<Link to="/finance/propertytem/add"><Button type="primary"><Icon type="plus" />添加模板</Button></Link>}>
          
        <div className="flexend mgb10">
            <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
              <Form.Item>
                {getFieldDecorator('heId', {
                  initialValue: ""
                })(
                  <HeList style={{width: 120}}/>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="search" />搜索</Button>
              </Form.Item>
            </Form>
          </div>
          <Table columns={this.getCol()}
            dataSource={propertytem?utils.addIndex(propertytem.list):[]}
            pagination={utils.Pagination(propertytem, page=>{
              params.current = page
              this.setState({params})
              this.props.actions.getPropertyTemplate(params)
            })}
          />
        </Card>
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getPropertyTemplate}, dispatch)
  }
}

function mapStateProps(state){
  return {
    propertytem: state.finance.propertytem,
    spinning:state.finance.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)( Form.create()(Properytem) )