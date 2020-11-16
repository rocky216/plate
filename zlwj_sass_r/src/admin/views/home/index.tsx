import React from "react"
import JCard from "@admin/components/JCard"
import { Line } from '@ant-design/charts';
import { connect } from "react-redux";

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const config = {
  data,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
  label: {
    style: {
      fill: '#aaa',
    },
  },
};
class HomePage extends React.Component {
  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return (
      <JCard spinning={false} >
        <div key="a">
          <Line {...config} />
        </div>
        <div key="b">Queue Demo</div>
        <div key="c">Queue Demo</div>
        <div key="d">Queue Demo</div>
      </JCard>
    );
  }
}

const mapStateToProps = (state:any) => {
  console.log(state)
  return {

  }
}

export default connect(mapStateToProps)(HomePage)