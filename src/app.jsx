import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import CalendarWidget from './calendar_widget.jsx';

moment.locale('ja', {
  weekdays: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日']
});

const container = document.querySelector('#container');
ReactDOM.render(<CalendarWidget />, container);
