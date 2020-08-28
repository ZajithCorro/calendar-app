import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from 'helpers/calendar-messages';
import { uiOpenModal } from 'actions/ui';
import {
  setActiveEvent,
  clearActiveEvent,
  eventStartLoading,
} from 'actions/events';

import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewFab from 'components/ui/AddNewFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export default function CalendarScreen() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const onSelectEvent = (event) => {
    dispatch(setActiveEvent(event));
    dispatch(uiOpenModal());
  };

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem('lastView', event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  const onSelectSlot = () => {
    dispatch(clearActiveEvent());
  };

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  return (
    <div className='calendar-screen'>
      <Navbar />

      <div className='calendar-main'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          selectable={true}
          onView={onViewChange}
          view={lastView}
          components={{ event: CalendarEvent }}
        />

        <AddNewFab />
      </div>

      <CalendarModal />
    </div>
  );
}
