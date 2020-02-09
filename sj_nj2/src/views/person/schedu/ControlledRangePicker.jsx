import React from "react"
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class ControlledRangePicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mode: ['month', 'month'],
      value: [],
    }
  }

  handlePanelChange(value, mode){
    this.setState({
      value,
      mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
    });
  };

  handleChange(value){
    console.log(value)
    this.setState({ value });
  };

  render() {
    const { value, mode } = this.state;
    console.log(mode, "mode")
    return (
      <RangePicker
        placeholder={['开始月份', '结束月份']}
        format="YYYY-MM"
        value={value}
        mode={["month", "month"]}
        onChange={this.handleChange.bind(this)}
        
      />
    );
  }
}

export default ControlledRangePicker