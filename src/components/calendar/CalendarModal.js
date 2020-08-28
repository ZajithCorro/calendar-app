import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';

import { uiCloseModal } from 'actions/ui';
import {
  clearActiveEvent,
  eventStartAddNew,
  deleteEvent,
  eventStartUpdate,
} from 'actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const initEvent = {
  title: '',
  notes: '',
  start: '',
  end: '',
};

export default function CalendarModal() {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
      setStartDate(new Date(activeEvent.start));
      setEndDate(new Date(activeEvent.end));
    } else {
      setFormValues(initEvent);
      setStartDate('');
      setEndDate('');
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(clearActiveEvent());
    setFormValues(initEvent);
    setStartDate('');
    setEndDate('');
    setIsInvalidTitle(false);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleDelete = () => {
    dispatch(deleteEvent());
    closeModal();
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const { title, start, end } = formValues;
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return toast.error(
        ' ⚠ La fecha final debe ser mayor a la fecha de inicio'
      );
    }

    if (title.trim().length < 2) {
      return setIsInvalidTitle(true);
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }

    setIsInvalidTitle(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      style={customStyles}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      contentLabel='Example Modal'
      className='modal'
      overlayClassName='modal-fondo'
    >
      <div className='container'>
        <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'}</h1>
      </div>
      <hr />
      <form className='container'>
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className='form-control'
          />
        </div>

        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${isInvalidTitle && 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col'>
              <button
                type='button'
                className='btn btn-outline-danger btn-block'
                onClick={handleDelete}
              >
                <i className='far fa-trash-alt'></i>
                <span> Eliminar</span>
              </button>
            </div>
            <div className='col'>
              <button
                type='button'
                className='btn btn-outline-primary btn-block'
                onClick={handleSubmitForm}
              >
                <i className='far fa-save'></i>
                <span> Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
