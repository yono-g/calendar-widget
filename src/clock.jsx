import React from 'react';
import moment from 'moment';

export default class Clock extends React.Component {
  static get TIME_FORMAT() {
    return 'HH:mm:ss';
  }

  static get DATE_FORMAT() {
    return 'YYYY年M月D日 dddd';
  }

  static get REFRESH_INTERVAL() {
    return 1000;
  }

  constructor(props) {
    super(props);

    this.state = {
      date: props.date
    };

    this.timer = setInterval(this.refresh.bind(this), Clock.REFRESH_INTERVAL);
  }

  refresh() {
    this.setState({
      date: new Date()
    });
  }

  handleClickDateOfClock() {
    this.props.handleClickDateOfClock();
  }

  render() {
    let timeString = moment(this.state.date).format(Clock.TIME_FORMAT);
    let dateString = moment(this.state.date).format(Clock.DATE_FORMAT);

    return (
      <div className="clock">
        <h1 className="clock-time">{timeString}</h1>
        <h2 className="clock-date" onClick={this.handleClickDateOfClock.bind(this)}>{dateString}</h2>
      </div>
    );
  }
}
