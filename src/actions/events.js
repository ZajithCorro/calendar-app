import { types } from 'types/types';

export const addNewEvent = (event) => ({
  type: types.EVENT_ADD_NEW,
  payload: event,
});

export const setActiveEvent = (event) => ({
  type: types.EVENT_SET_ACTIVE,
  payload: event,
});
