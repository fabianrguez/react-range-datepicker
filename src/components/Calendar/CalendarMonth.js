import { getMonthNamei18n, getWeekDaysNamesi18n } from 'utils';
import {
  StyledCalendarHeader,
  StyledCalendarMonth,
  StyledCalendarWeekDays,
  StyledCalendarWeeks,
  StyledNavigationButton,
} from './styles';

export function CalendarMonth({ month, year, weeks, prevMonth, nextMonth, locale, weekDayNameLength, onDaySelected }) {
  const handleDaySelected = (day) => (e) => {
    e.preventDefault();
    e.target.classList.add('active');
    const dayKey = e.target.getAttribute('data-key');
    onDaySelected({ date: new Date(year, month, day), dayKey });
  };

  const renderWeeks = (weeks) =>
    weeks?.map(({ dates }, weekIndex) => {
      if (dates.length < 7) {
        const limit = 7 - dates.length;
        for (let index = 0; index < limit; index++) {
          weekIndex === 0 ? dates.unshift(0) : dates.push(0);
        }
      }
      return (
        <StyledCalendarWeekDays key={weekIndex}>
          {dates.map((day, index) =>
            day !== 0 ? (
              <button key={`${day}-${index}`} data-key={`${month}-${day}`} onClick={handleDaySelected(day)}>
                {day}
              </button>
            ) : (
              <button key={index} className="placeholder"></button>
            )
          )}
        </StyledCalendarWeekDays>
      );
    });

  return (
    <StyledCalendarMonth>
      <StyledCalendarHeader>
        <StyledNavigationButton isHidden={!prevMonth} onClick={prevMonth}>{`<`}</StyledNavigationButton>
        <h2>
          <span>{getMonthNamei18n(month, locale)}</span>
          <span>{year}</span>
        </h2>
        <StyledNavigationButton isGoingRight isHidden={!nextMonth} onClick={nextMonth}>{`>`}</StyledNavigationButton>
      </StyledCalendarHeader>
      <StyledCalendarWeeks>
        <StyledCalendarWeekDays>
          {getWeekDaysNamesi18n(locale, weekDayNameLength).map((weekDay) => (
            <span key={weekDay}>{weekDay}</span>
          ))}
        </StyledCalendarWeekDays>
        {renderWeeks(weeks)}
      </StyledCalendarWeeks>
    </StyledCalendarMonth>
  );
}
