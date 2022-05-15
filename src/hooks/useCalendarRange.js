import { useRef, useState } from 'react';
import { daysDifference, formatDate } from 'utils';

export function useCalendarRange({ onRangeSelected }) {
  const monthsRef = useRef();
  const [areMonthsVisible, setAreMonthsVisible] = useState(false);
  const [isRangeActive, setIsRangeActive] = useState();
  const [rangeStart, setRangeStart] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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

  const handleDaySelected = ({ date, dayKey }) => {
    if ((!startDate && !endDate) || (startDate && endDate)) {
      setEndDate('');
      setStartDate(date);
      setIsRangeActive(true);
      setRangeStart(dayKey);
      removeActiveDays({ ignore: dayKey });
    } else if (startDate && !endDate) {
      setEndDate(date);
      setAreMonthsVisible(false);
      setIsRangeActive(false);
      onRangeSelected({ range: { start: startDate, end: date, days: daysDifference(startDate, date) } });
    }
  };

  const toggleMonthsVisibility =
    (visible = true) =>
    () =>
      setAreMonthsVisible(visible);

  return {
    monthsRef,
    rangeFormatted: {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    areMonthsVisible,
    handleDaySelected,
    handleRangeSelection,
    toggleMonthsVisibility,
  };
}
