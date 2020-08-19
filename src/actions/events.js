import { types } from 'types/types';

export const addNewEvent = (event) => ({
  type: types.EVENT_ADD_NEW,
  payload: event,
});

export const setActiveEvent = (event) => ({
  type: types.EVENT_SET_ACTIVE,
  payload: event,
});

export const clearActiveEvent = () => ({
  type: types.EVENT_CLEAR_ACTIVE_EVENT,
});

export const updateEvent = (event) => ({
  type: types.EVENT_UPDATE,
  payload: event,
});

export const deleteEvent = () => ({
  type: types.EVENT_DELETE,
});
