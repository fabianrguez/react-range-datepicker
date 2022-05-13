import { StyledCalendarMonth, StyledCalendarWeekDays } from './styles';

const WEEK_DAY = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export function CalendarMonth({ month, weeks }) {

  const handleDaySelected = (day) => () => console.log(day);

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
          {dates.map((day, index) => (
            <button key={`${day}-${index}`} onClick={handleDaySelected(day)}>{day !== 0 ? day : ''}</button>
          ))}
        </StyledCalendarWeekDays>
      );
    });

  return (
    <StyledCalendarMonth>
      <header>
        <h2>{month}</h2>
      </header>
      <div>
        <StyledCalendarWeekDays>
          {WEEK_DAY.map((weekDay) => (
            <span key={weekDay}>{weekDay}</span>
          ))}
        </StyledCalendarWeekDays>
        {renderWeeks(weeks)}
      </div>
    </StyledCalendarMonth>
  );
}
