import { useCallback, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { getWeeksInMonth } from 'utils';

const now = new Date();
const isFirstMonth = (index) => index === 0;
const isLastMonth = (index, months) => months.length - 1 === index;

export function useActualMonths({ months, firstDayOfWeek }) {
  const [monthsOffset, setMonthsOffset] = useState(0);
  const [actualMonths, setActualMonths] = useState();

  const goNextMonth = useCallback(() => {
    console.log('go next');
    setMonthsOffset((prev) => prev + 1);
  }, []);
  const goPrevMonth = useCallback(() => {
    console.log('go prev');
    setMonthsOffset((prev) => prev > 0 && prev - 1);
  }, []);

  useEffect(() => {
    setActualMonths(
      Array(months)
        .fill('')
        .map((_, index, elements) => {
          const date = new Date();
          date.setMonth(date.getMonth() + (monthsOffset + index));

          return {
            key: index,
            month: date.getMonth(),
            year: date.getFullYear(),
            weeks: getWeeksInMonth(date.getFullYear(), date.getMonth(), firstDayOfWeek),
            prevMonth: isFirstMonth(index) && date.getMonth() !== now.getMonth() ? goPrevMonth : null,
            nextMonth: isLastMonth(index, elements) ? goNextMonth : null,
          };
        })
    );
    //eslint-disable-next-line
  }, [months, firstDayOfWeek, monthsOffset]);

  return actualMonths;
}
