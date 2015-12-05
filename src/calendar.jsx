import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import DateCell from './date_cell.jsx';

export default class Calendar extends React.Component {
  static get YEAR_MONTH_FORMAT() {
    return 'YYYY年M月';
  }

  static get DAY_OF_WEEKS() {
    return [
      { key: 'sun', value: '日' },
      { key: 'mon', value: '月' },
      { key: 'tue', value: '火' },
      { key: 'wed', value: '水' },
      { key: 'thu', value: '木' },
      { key: 'fri', value: '金' },
      { key: 'sat', value: '土' }
    ];
  }

  static get NUM_OF_DATES() {
    return 42;  // カレンダーに描画する日数
  }

  constructor(props) {
    super(props);

    this.state = this.getStateValue(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateValue(nextProps));
  }

  getStateValue(props) {
    return {
      calendarDates: this.createDateList(props.date).map((date) => {
        return {
          date: date,
          isFocused: new Date().toDateString() === date.toDateString()
        };
      })
    };
  }

  createDateList(date) {
    let today = moment(date);
    let firstDayOfMonth = today.clone().startOf('month');

    let previousMonth = _.times(firstDayOfMonth.day(), (n) => {
      return firstDayOfMonth.clone().subtract(firstDayOfMonth.day() - n, 'day').toDate();
    });

    let presentMonth = _.times(today.daysInMonth(), (n) => {
      return firstDayOfMonth.clone().add(n, 'day').toDate();
    });

    let nextMonth = _.times(Calendar.NUM_OF_DATES - presentMonth.length - previousMonth.length, (n) => {
      return firstDayOfMonth.clone().add(1, 'month').add(n, 'day').toDate();
    });

    return previousMonth.concat(presentMonth).concat(nextMonth);
  }

  handleClickCalendarDate(date) {
    this.state.calendarDates.map((calendarDate) => {
      calendarDate.isFocused = calendarDate.date === date;
      return calendarDate;
    });

    this.setState({});
  }

  handleClickPreviousMonthButton() {
    this.props.handleClickPreviousMonthButton();
  }

  handleClickNextMonthButton() {
    this.props.handleClickNextMonthButton();
  }

  render() {
    let yearMonth = moment(this.props.date).format(Calendar.YEAR_MONTH_FORMAT);

    let dayOfWeeks = Calendar.DAY_OF_WEEKS.map((dayOfWeek) => {
      return <li key={dayOfWeek.key}>{dayOfWeek.value}</li>;
    });

    let dates = this.state.calendarDates.map((calendarDate) => {
      return <DateCell key={+calendarDate.date}
                       date={calendarDate.date}
                       isFocused={calendarDate.isFocused}
                       selectedDate={this.props.date}
                       handleClickCalendarDate={this.handleClickCalendarDate.bind(this)} />;
    });

    return (
      <div className="calendar">
        <div className="header">
          <span className="year-month">{yearMonth}</span>
          <ul className="buttons">
            <li><i className="fa fa-angle-left fa-lg" onClick={this.handleClickPreviousMonthButton.bind(this)}></i></li>
            <li><i className="fa fa-angle-right fa-lg" onClick={this.handleClickNextMonthButton.bind(this)}></i></li>
          </ul>
        </div>
        <ul className="day-of-weeks">{dayOfWeeks}</ul>
        <ul className="dates">{dates}</ul>
      </div>
    );
  }
}
