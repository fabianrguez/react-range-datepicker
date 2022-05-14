import { CalendarMonth } from 'components';
import { useEffect, useState } from 'react';
import { formatDate, getWeeksInMonth } from 'utils';
import { StyledCalendarInput, StyledCalendarInputs, StyledCalendarMonths, StyledCalendarWrapper } from './styles';

export function Calendar({ months = 1, firstDayOfWeek = 1 }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [areMonthsVisible, setAreMonthsVisible] = useState(false);
  const [actualMonths, setActualMonths] = useState([]);

  const handleInputsFocus = () => setAreMonthsVisible(true);

  const handleInputsBlur = () => setAreMonthsVisible(true);

  const handleDaySelected = (date) => {
    const dateFormatted = formatDate(date);
    if ((!checkInDate && !checkOutDate) || (checkInDate && checkOutDate)) {
      if (checkOutDate) setCheckOutDate('');
      setCheckInDate(dateFormatted);
    } else if (checkInDate && !checkOutDate) {
      setCheckOutDate(dateFormatted);
      setAreMonthsVisible(false);
    }
  };

  useEffect(() => {
    setActualMonths(
      Array(months)
        .fill('')
        .map((_, index) => {
          const date = new Date();
          date.setMonth(date.getMonth() + index);

          return {
            key: index,
            month: date.getMonth(),
            year: date.getFullYear(),
            weeks: getWeeksInMonth(date.getFullYear(), date.getMonth(), firstDayOfWeek),
          };
        })
    );
  }, [firstDayOfWeek, months]);

  return (
    <StyledCalendarWrapper>
      <StyledCalendarInputs>
        <StyledCalendarInput>
          <label htmlFor="">Check in</label>
          <input type="text" readOnly value={checkInDate} onFocus={handleInputsFocus} onBlur={handleInputsBlur} />
        </StyledCalendarInput>
        <StyledCalendarInput>
          <label>Check out</label>
          <input type="text" readOnly value={checkOutDate} onFocus={handleInputsFocus} onBlur={handleInputsBlur} />
        </StyledCalendarInput>
      </StyledCalendarInputs>
      <StyledCalendarMonths isVisible={areMonthsVisible}>
        {actualMonths?.map((date) => (
          <CalendarMonth {...date} onDaySelected={handleDaySelected}/>
        ))}
      </StyledCalendarMonths>
    </StyledCalendarWrapper>
  );
}
