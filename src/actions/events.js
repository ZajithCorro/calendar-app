import { types } from 'types/types';
import { fetchConToken } from 'helpers/fetch';
import { prepareEvents } from 'helpers/prepareEvents';

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken('events', event, 'POST');
      const body = await resp.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(addNewEvent(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewEvent = (event) => ({
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

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('events');
      const body = await resp.json();

      console.log(body.eventos);

      const events = prepareEvents(body.eventos);

      console.log(events);

      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.EVENT_LOADED,
  payload: events,
});
