import { CalendarMonth } from 'components';
import { useActualMonths, useCalendarRange } from 'hooks';
import { StyledCalendarInput, StyledCalendarInputs, StyledCalendarMonths, StyledCalendarWrapper } from './styles';

export function Calendar({
  months = 1,
  firstDayOfWeek = 1,
  startDateLabel = 'start',
  endDateLabel = 'end',
  onRangeSelected,
}) {
  const [actualMonths] = useActualMonths({ months, firstDayOfWeek });
  const {
    monthsRef,
    rangeFormatted,
    areMonthsVisible,
    handleRangeSelection,
    handleDaySelected,
    toggleMonthsVisibility,
  } = useCalendarRange({
    onRangeSelected,
  });

  return (
    <StyledCalendarWrapper>
      <StyledCalendarInputs>
        <StyledCalendarInput>
          <label htmlFor="">{startDateLabel}</label>
          <input
            type="text"
            readOnly
            value={rangeFormatted.startDate}
            onFocus={toggleMonthsVisibility(true)}
          />
        </StyledCalendarInput>
        <StyledCalendarInput>
          <label>{endDateLabel}</label>
          <input
            type="text"
            readOnly
            value={rangeFormatted.endDate}
            onFocus={toggleMonthsVisibility(true)}
          />
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
