import moment from 'moment';

import { types } from 'types/types';

const initialState = {
  events: [
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
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EVENT_SET_ACTIVE:
      return {
        ...state,
        activeEvent: action.payload,
      };

    default:
      return state;
  }
};
