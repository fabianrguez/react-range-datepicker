import { CalendarMonth } from 'components';
import { useEffect, useState } from 'react';
import { StyledCalendarInputs, StyledCalendarMonths, StyledCalendarWrapper, StyledCalendarInput } from './styles';

const MONTHS = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
};

const getWeeksInMonth = (year, month) => {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let date = 1; date <= numDays; date++) {
    if (dayOfWeekCounter === 0 || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(date);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  return weeks
    .filter((week) => !!week.length)
    .map((week) => ({
      start: week[0],
      end: week[week.length - 1],
      dates: week,
    }));
};

export function Calendar({ months = 1 }) {
  const [areMonthsVisible, setAreMonthsVisible] = useState(false);
  const [actualMonths, setActualMonths] = useState([]);

  const handleInputsFocus = () => setAreMonthsVisible(true);

  const handleInputsBlur = () => setAreMonthsVisible(false);

  useEffect(() => {
    setActualMonths(
      Array(months)
        .fill('')
        .map((_, index) => {
          const date = new Date();
          date.setMonth(date.getMonth() + index);

          return {
            key: index,
            month: MONTHS[date.getMonth()],
            weeks: getWeeksInMonth(date.getFullYear(), date.getMonth())
          };
        })
    );
  }, [months]);

  return (
    <StyledCalendarWrapper>
      <StyledCalendarInputs>
        <StyledCalendarInput>
          <label htmlFor="">Check in</label>
          <input type="text" readOnly onFocus={handleInputsFocus} onBlur={handleInputsBlur} />
        </StyledCalendarInput>
        <StyledCalendarInput>
          <label>Check out</label>
          <input type="text" readOnly onFocus={handleInputsFocus} onBlur={handleInputsBlur} />
        </StyledCalendarInput>
      </StyledCalendarInputs>
      <StyledCalendarMonths isVisible={areMonthsVisible}>
        {actualMonths?.map((date) => (
          <CalendarMonth {...date} />
        ))}
      </StyledCalendarMonths>
    </StyledCalendarWrapper>
  );
}
