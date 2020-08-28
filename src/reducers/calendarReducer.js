import { types } from 'types/types';

const initialState = {
  events: [],
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

    case types.EVENT_DELETE:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    case types.EVENT_LOADED:
      return {
        ...state,
        events: [...action.payload],
      };

    default:
      return state;
  }
};
