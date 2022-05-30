import { useState } from 'react';
import { getFullDaysBetweenDates, parseDatestring } from '../utils/DateUtils';

export function DaysBetweenCalculator({ onCalculate }) {
  const [startDatestring, setStartDatestring] = useState('');
  const [endDatestring, setEndDatestring] = useState('');

  const [errors, setErrors] = useState({
    startDatestring: null,
    endDatestring: null,
  });

  const clearInputs = () => {
    setStartDatestring('');
    setEndDatestring('');
    setErrors({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    calculate();
  }

  const calculate = () => {
    let errors = {};
    let datesValid = true;
    const startDate = parseDatestring(startDatestring);
    if (startDate === undefined) {
      datesValid = false;
      errors = {
        ...errors,
        startDatestring:
          'Invalid start date. Please enter date in format dd/mm/yyyy.',
      };
    }
    const endDate = parseDatestring(endDatestring);
    if (endDate === undefined) {
      datesValid = false;
      errors = {
        ...errors,
        endDatestring:
          'Invalid end date. Please enter date in format dd/mm/yyyy.',
      };
    }
    setErrors(errors);
    if (datesValid) {
      const daysBetween = getFullDaysBetweenDates(startDate, endDate);
      onCalculate({
        startDate,
        endDate,
        daysBetween,
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className='days-between-calculator'>
      <div className='days-between-inputs'>
        <div className='date-input'>
          <label htmlFor='startDate'>Start Date</label>
          <input
            name='startDate'
            value={startDatestring}
            onInput={event => setStartDatestring(event.target.value)}
            type='text'
            className={errors.startDatestring ? 'input-error' : ''}
            placeholder='dd/mm/yyyy'
          />
        </div>
        <div className='date-input'>
          <label htmlFor='endDate'>End Date</label>
          <input
            name='endDate'
            value={endDatestring}
            onInput={event => setEndDatestring(event.target.value)}
            type='text'
            className={errors.endDatestring ? 'input-error' : ''}
            placeholder='dd/mm/yyyy'
          />
        </div>
      </div>
      <div className='days-between-actions'>
        <button type="submit" className='calculate-button'>
          Calculate
        </button>
        <button type="button" className='clear-button' onClick={clearInputs}>
          Clear
        </button>        
      </div>
      <div className='days-between-feedback'>
        {errors.startDatestring && (
          <p>
            <small style={{ color: 'red' }}>{errors.startDatestring}</small>
          </p>
        )}
        {errors.endDatestring && (
          <p>
            <small style={{ color: 'red' }}>{errors.endDatestring}</small>
          </p>
        )}
      </div>
    </form>
  );
}
