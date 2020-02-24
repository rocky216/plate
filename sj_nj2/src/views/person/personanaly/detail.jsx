import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {bindActionCreators} from "redux"
import {Table, Card, Button, Icon} from "antd";
import JCard from "@/components/JCard"
import {getHResourceAnalysisDetail} from "@/actions/personAction"

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 5,
        },
      };
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];
[{
  all: {
    bianzhi: 12,
    shiji: "12"
  },
  D: {
    bianzhi: 12,
    shiji: "12"
  },
}]

class AnalyDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      detail: "",
      columns: []
    }
  }
  componentDidMount(){
    this.props.actions.getHResourceAnalysisDetail({deptId: this.props.match.params.id}, res=>{
      this.setState({detail: res}) 
      this.handlenData(res)
    })
  }
  handlenData(res){
    let col = [{
      title: "科室",
      dataIndex: "ks"
    }]
    if(!res || !_.isArray(res)){
      return col
    }
    
    _.each(res[0], (item, attr)=>{
      if(attr!="ks"){
        col.push({
          title: attr=="all"?"总体":attr+"岗级",
          children: [
            {
              title: "编制",
              dataIndex: attr,
              key:attr+1,
              render(item){
                return item.BianZhi
              }
            },
            {
              title: "实际",
              dataIndex: attr,
              key:attr+2,
              render(item){
                return item.ShiJi
              }
            },
          ]
        })
      }
    })
    col.push({
      title: "GAP",
      render(item){
        console.log(item,"item")
        let n = item.all.ShiJi-item.all.BianZhi
        return <span style={{color: n>0?"red":""}} >{n}</span>
      }
    })
    this.setState({columns: col})
    console.log(col,"res")
  }

  render(){
    const {utils, spinning} = this.props
    const {detail, columns} = this.state
    return (
      <JCard spinning={spinning}>
        <Card size="small" title="在岗&编制人员统计" extra={<Link to="/person/personanaly"><Button><Icon type="rollback" />返回</Button></Link>}>
          <Table size="small" columns={columns} dataSource={detail?detail:[]} bordered pagination={false} />
        </Card>
        
      </JCard>
    )
  }
}

function mapDispatchProps(dispatch){
  return {
    actions: bindActionCreators({getHResourceAnalysisDetail}, dispatch)
  }
}

function mapStateProps(state){
  return {
    spinning: state.person.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(AnalyDetail)