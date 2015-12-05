import React from 'react';

export default class DateCell extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.handleClickCalendarDate(this.props.date);
  }

  render() {
    let value = this.props.date.getDate();
    let _classNames = [];

    if (this.props.date.getMonth() === this.props.selectedDate.getMonth()) {
      _classNames.push('present');
    }
    if (this.props.date.toDateString() === new Date().toDateString()) {
      _classNames.push('today');
    }
    if (this.props.isFocused) {
      _classNames.push('focus');
    }

    let className = _classNames.join(' ');

    return <li className={className} onClick={this.handleClick.bind(this)}>{value}</li>;
  }
}
