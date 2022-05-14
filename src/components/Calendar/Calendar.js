import { CalendarMonth } from 'components';
import { useEffect, useRef, useState } from 'react';
import { formatDate, getWeeksInMonth } from 'utils';
import { StyledCalendarInput, StyledCalendarInputs, StyledCalendarMonths, StyledCalendarWrapper } from './styles';

export function Calendar({ months = 1, firstDayOfWeek = 1 }) {
  const monthsRef = useRef();
  const [isRangeActive, setIsRangeActive] = useState(false);
  const [rangeStart, setRangeStart] = useState();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [areMonthsVisible, setAreMonthsVisible] = useState(false);
  const [actualMonths, setActualMonths] = useState([]);

  const getAllDays = () => [...monthsRef.current.querySelectorAll('button:not(.placeholder)')];

  const removeActiveDays = ({ ignore = '' }) => {
    const allDays = getAllDays();
    allDays
      .filter((button) => button.getAttribute('data-key') !== ignore)
      .forEach((button) => button.classList.remove('active'));

    return allDays;
  };

  const handleRangeSelection = (e) => {
    if (isRangeActive) {
      const { target } = e;
      const allDays = removeActiveDays({ ignore: rangeStart });
      const startIndex = allDays.findIndex((element) => element.dataset.key === rangeStart);
      const endIndex = allDays.findIndex((element) => element.dataset.key === target.getAttribute('data-key'));

      const inBetween = allDays.slice(startIndex + 1, endIndex + 1);
      inBetween.forEach((button) => button.classList.add('active'));
    }
  };

  const handleInputsFocus = () => setAreMonthsVisible(true);

  const handleInputsBlur = () => setAreMonthsVisible(true);

  const handleDaySelected = ({ date, dayKey }) => {
    const dateFormatted = formatDate(date);
    if ((!checkInDate && !checkOutDate) || (checkInDate && checkOutDate)) {
      if (checkOutDate) setCheckOutDate('');
      setCheckInDate(dateFormatted);
      setIsRangeActive(true);
      setRangeStart(dayKey);
      removeActiveDays({ ignore: dayKey });
    } else if (checkInDate && !checkOutDate) {
      setCheckOutDate(dateFormatted);
      setAreMonthsVisible(false);
      setIsRangeActive(false);
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
      <StyledCalendarMonths ref={monthsRef} isVisible={areMonthsVisible} onMouseOver={handleRangeSelection}>
        {actualMonths?.map((date) => (
          <CalendarMonth {...date} onDaySelected={handleDaySelected} />
        ))}
      </StyledCalendarMonths>
    </StyledCalendarWrapper>
  );
}
