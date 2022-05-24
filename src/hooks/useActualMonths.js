import { useCallback, useEffect, useState } from 'react';
import { getWeeksInMonth } from 'utils';

const isFirstMonth = (index) => index === 0;
const isLastMonth = (index, months) => months.length - 1 === index;

export function useActualMonths({ months, firstDayOfWeek }) {
  const [monthsOffset, setMonthsOffset] = useState(0);
  const [actualMonths, setActualMonths] = useState();

  const goNextMonth = useCallback(() => setMonthsOffset((prev) => prev + 1), []);
  const goPrevMonth = useCallback(() => setMonthsOffset((prev) => prev > 0 && prev - 1), []);

  useEffect(() => {
    setActualMonths(
      [...Array(months).keys()].map((monthIndex, _, elements) => {
        const date = new Date();
        date.setMonth(date.getMonth() + (monthsOffset + monthIndex));

        return {
          key: monthIndex,
          month: date.getMonth(),
          year: date.getFullYear(),
          weeks: getWeeksInMonth(date.getFullYear(), date.getMonth(), firstDayOfWeek),
          prevMonth: isFirstMonth(monthIndex) ? goPrevMonth : null,
          nextMonth: isLastMonth(monthIndex, elements) ? goNextMonth : null,
        };
      })
    );
    //eslint-disable-next-line
  }, [months, firstDayOfWeek, monthsOffset]);

  return actualMonths;
}
