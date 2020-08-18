import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from 'helpers/calendar-messages';

import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

moment.locale('es');
const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    user: {
      _id: '123',
      name: 'Zajith',
    },
  },
];

export default function CalendarScreen() {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const onDoubleClick = (event) => {
    console.log('Doble click');
  };

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem('lastView', event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {};

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onView={onViewChange}
        view={lastView}
        components={{ event: CalendarEvent }}
      />

      <CalendarModal />
    </div>
  );
}
