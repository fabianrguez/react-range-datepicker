import { CalendarMonth } from 'components';
import { useActualMonths, useCalendarRange } from 'hooks';
import { StyledCalendarInput, StyledCalendarInputs, StyledCalendarMonths, StyledCalendarWrapper } from './styles';

export function Calendar({
  months = 1,
  firstDayOfWeek = 1,
  startDateLabel = 'start',
  endDateLabel = 'end',
  onRangeSelected,
  locale = 'en',
  weekDayNameLength = 'short',
}) {
  const actualMonths = useActualMonths({ months, firstDayOfWeek });
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
      <StyledCalendarInputs aria-controls="calendars">
        <StyledCalendarInput>
          <label htmlFor="">{startDateLabel}</label>
          <input type="text" readOnly value={rangeFormatted.startDate} onFocus={toggleMonthsVisibility(true)} />
        </StyledCalendarInput>
        <StyledCalendarInput>
          <label>{endDateLabel}</label>
          <input type="text" readOnly value={rangeFormatted.endDate} onFocus={toggleMonthsVisibility(true)} />
        </StyledCalendarInput>
      </StyledCalendarInputs>
      <StyledCalendarMonths
        id="calendars"
        tabIndex="0"
        ref={monthsRef}
        isVisible={areMonthsVisible}
        onMouseOver={handleRangeSelection}
      >
        {actualMonths?.map((date) => (
          <CalendarMonth
            {...date}
            locale={locale}
            weekDayNameLength={weekDayNameLength}
            onDaySelected={handleDaySelected}
          />
        ))}
      </StyledCalendarMonths>
    </StyledCalendarWrapper>
  );
}
