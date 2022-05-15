import { useEffect, useState } from 'react';
import { getWeeksInMonth } from 'utils';

const now = new Date();
const isFirstMonth = (index) => index === 0;
const isLastMonth = (index, months) => months.length - 1 === index;

export function useActualMonths({ months, firstDayOfWeek }) {
  const [actualMonths, setActualMonths] = useState();

  const changeMonths = () => {};

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
  }, [months, firstDayOfWeek]);

  return [actualMonths, changeMonths];
}
