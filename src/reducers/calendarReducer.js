import moment from 'moment';

import { types } from 'types/types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(4, 'hours').toDate(),
      bgcolor: '#fafafa',
      user: {
        _id: '123',
        name: 'Zajith',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EVENT_ADD_NEW:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.EVENT_SET_ACTIVE:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.EVENT_CLEAR_ACTIVE_EVENT:
      return {
        ...state,
        activeEvent: null,
      };

    case types.EVENT_UPDATE:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    default:
      return state;
  }
};
