import { StyledCalendarHeader, StyledCalendarMonth, StyledCalendarWeekDays, StyledCalendarWeeks, StyledNavigationButton } from './styles';
import { WEEK_DAY, MONTHS } from 'constants';

export function CalendarMonth({ month, year, weeks, prevMonth, nextMonth, onDaySelected }) {
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
        {prevMonth && <StyledNavigationButton onClick={prevMonth}>{`<`}</StyledNavigationButton>}
        <h2>
          <span>{MONTHS[month]}</span>
          <span>{year}</span>
        </h2>
        {nextMonth && <StyledNavigationButton onClick={nextMonth}>{`>`}</StyledNavigationButton>}
      </StyledCalendarHeader>
      <StyledCalendarWeeks>
        <StyledCalendarWeekDays>
          {WEEK_DAY.map((weekDay) => (
            <span key={weekDay}>{weekDay}</span>
          ))}
        </StyledCalendarWeekDays>
        {renderWeeks(weeks)}
      </StyledCalendarWeeks>
    </StyledCalendarMonth>
  );
}
