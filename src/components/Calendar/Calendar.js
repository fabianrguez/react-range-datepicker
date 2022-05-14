import { CalendarMonth } from 'components';
import { useEffect, useRef, useState } from 'react';
import { formatDate, getWeeksInMonth } from 'utils';
import { StyledCalendarInput, StyledCalendarInputs, StyledCalendarMonths, StyledCalendarWrapper } from './styles';

const now = new Date();

export function Calendar({
  months = 1,
  firstDayOfWeek = 1,
  startDateLabel = 'start',
  endDateLabel = 'end',
  onRangeSelected,
}) {
  const monthsRef = useRef();
  const [isRangeActive, setIsRangeActive] = useState(false);
  const [rangeStart, setRangeStart] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
      const $allDays = getAllDays();
      const startIndex = $allDays.findIndex((element) => element.dataset.key === rangeStart);
      const endIndex = $allDays.findIndex((element) => element.dataset.key === target.getAttribute('data-key'));

      const $notInBetween = [
        ...$allDays.slice(0, startIndex - 1),
        ...$allDays.slice(endIndex + 1, $allDays.length - 1),
      ];
      $notInBetween
        .filter(($btn) => $btn.getAttribute('data-key') !== rangeStart)
        .forEach(($notInBetweenBtn) => $notInBetweenBtn.classList.remove('active'));

      const $inBetween = $allDays.slice(startIndex, endIndex + 1);
      $inBetween.forEach(($button) => $button.classList.add('active'));
    }
  };

  const handleInputsFocus = () => setAreMonthsVisible(true);

  const handleInputsBlur = () => setAreMonthsVisible(true);

  const handleDaySelected = ({ date, dayKey }) => {
    const dateFormatted = formatDate(date);
    if ((!startDate && !endDate) || (startDate && endDate)) {
      setEndDate('');
      setStartDate(dateFormatted);
      setIsRangeActive(true);
      setRangeStart(dayKey);
      removeActiveDays({ ignore: dayKey });
    } else if (startDate && !endDate) {
      setEndDate(dateFormatted);
      setAreMonthsVisible(false);
      setIsRangeActive(false);
      onRangeSelected({ range: { start: startDate, end: dateFormatted } });
    }
  };

  const isFirstMonth = (index) => index === 0;

  const isLastMonth = (index, months) => months.length - 1 === index;

  useEffect(() => {
    setActualMonths(
      Array(months)
        .fill('')
        .map((_, index, elements) => {
          const date = new Date();
          date.setMonth(date.getMonth() + index);

          return {
            key: index,
            month: date.getMonth(),
            year: date.getFullYear(),
            weeks: getWeeksInMonth(date.getFullYear(), date.getMonth(), firstDayOfWeek),
            prevMonth: isFirstMonth(index) && date.getMonth() !== now.getMonth() ? () => {} : null,
            nextMonth: isLastMonth(index, elements) ? () => {} : null,
          };
        })
    );
  }, [firstDayOfWeek, months]);

  return (
    <StyledCalendarWrapper>
      <StyledCalendarInputs>
        <StyledCalendarInput>
          <label htmlFor="">{startDateLabel}</label>
          <input type="text" readOnly value={startDate} onFocus={handleInputsFocus} onBlur={handleInputsBlur} />
        </StyledCalendarInput>
        <StyledCalendarInput>
          <label>{endDateLabel}</label>
          <input type="text" readOnly value={endDate} onFocus={handleInputsFocus} onBlur={handleInputsBlur} />
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
