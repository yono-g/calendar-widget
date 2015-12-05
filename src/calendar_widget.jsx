import React from 'react';

import Calendar from './calendar.jsx';
import Clock from './clock.jsx';

export default class CalendarWidget extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  handleClickDateOfClock() {
    this.setState({ date: new Date() });
  }

  handleClickPreviousMonthButton() {
    this.state.date.setMonth(this.state.date.getMonth() - 1);
    this.setState({});
  }

  handleClickNextMonthButton() {
    this.state.date.setMonth(this.state.date.getMonth() + 1);
    this.setState({});
  }

  render() {
    return (
      <div>
        <Clock date={this.state.date}
               handleClickDateOfClock={this.handleClickDateOfClock.bind(this)} />

        <Calendar date={this.state.date}
                  handleClickPreviousMonthButton={this.handleClickPreviousMonthButton.bind(this)}
                  handleClickNextMonthButton={this.handleClickNextMonthButton.bind(this)} />
      </div>
    );
  }
}
