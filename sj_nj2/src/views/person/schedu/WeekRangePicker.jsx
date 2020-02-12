import React from "react"
import { DatePicker } from 'antd';

const { WeekPicker } = DatePicker;

class WeekRangePicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }
  

  disabledStartDate(startValue){
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate(endValue){
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  async onChange(field, value){
    await this.setState({
      [field]: value,
    });
    this.props.onChange(this.state.startValue, this.state.endValue)
  };

  onStartChange(value){
    this.onChange('startValue', value);
    
  };

  onEndChange(value){
    this.onChange('endValue', value);
  };

  handleStartOpenChange(open){
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange(open){
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <WeekPicker
          disabledDate={this.disabledStartDate.bind(this)}
          showTime
          value={startValue}
          placeholder="开始周"
          onChange={this.onStartChange.bind(this)}
          onOpenChange={this.handleStartOpenChange.bind(this)}
        />
        <span>-</span>
        <WeekPicker
          disabledDate={this.disabledEndDate.bind(this)}
          showTime
          value={endValue}
          placeholder="结束周"
          onChange={this.onEndChange.bind(this)}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange.bind(this)}
        />
      </div>
    );
  }
}

export default WeekRangePicker