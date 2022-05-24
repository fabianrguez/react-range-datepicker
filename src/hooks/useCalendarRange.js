import { useCallback, useEffect, useRef, useState } from 'react';
import { daysDifference, formatDate } from 'utils';

export function useCalendarRange({ actualMonths, onRangeSelected }) {
  const monthsRef = useRef();
  const [areMonthsVisible, setAreMonthsVisible] = useState(false);
  const [isRangeActive, setIsRangeActive] = useState();
  const [rangeStart, setRangeStart] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const getAllDays = () => [...monthsRef.current.querySelectorAll('.day')];

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

  const disableDaysBeforeStart = (rangeStartKey) => {
    const $allDays = getAllDays();
    const startIndex = $allDays.findIndex((element) => element.dataset.key === rangeStartKey);

    const $daysBeforeStart = $allDays.slice(0, startIndex);
    $daysBeforeStart.forEach(($day) => $day.setAttribute('disabled', ''));
  };

  const enableAllDays = () => {
    const $allDays = getAllDays();
    $allDays.filter(($day) => $day.disabled).forEach(($day) => $day.removeAttribute('disabled'));
  };

  const handleDaySelected = ({ date, dayKey }) => {
    if ((!startDate && !endDate) || (startDate && endDate)) {
      setEndDate('');
      setStartDate(date);
      setIsRangeActive(true);
      setRangeStart(dayKey);
      removeActiveDays({ ignore: dayKey });
      disableDaysBeforeStart(dayKey);
    } else if (startDate && !endDate) {
      setEndDate(date);
      setAreMonthsVisible(false);
      setIsRangeActive(false);
      enableAllDays();
      onRangeSelected({ range: { start: startDate, end: date, days: daysDifference(startDate, date) } });
    }
  };

  const toggleMonthsVisibility =
    (visible = true) =>
    () =>
      setAreMonthsVisible(visible);

  const handleCalendarsBlur = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log(e.currentTarget, e.relatedTarget);
      if (areMonthsVisible) setAreMonthsVisible(false);
    }
  };

  const isRangeVisible = useCallback(
    () =>
      startDate &&
      endDate &&
      actualMonths.some(({ month, year }) => month === startDate.getMonth() && year === startDate.getFullYear()),
    [startDate, endDate, actualMonths]
  );

  const fillRange = useCallback(() => {
    const endKey = `${endDate.getMonth()}-${endDate.getDate()}`;
    const $allDays = getAllDays();

    const startIndex = $allDays.findIndex(($day) => $day.getAttribute('data-key') === rangeStart);
    const endIndex = $allDays.findIndex(($day) => $day.getAttribute('data-key') === endKey);

    const fillRange = $allDays.slice(startIndex, endIndex + 1);
    fillRange.forEach((day) => day.classList.add('active'));
  }, [endDate, rangeStart]);

  useEffect(() => {
    if (isRangeVisible()) {
      fillRange();
    }
  }, [isRangeVisible, fillRange]);

  return {
    monthsRef,
    rangeFormatted: {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    areMonthsVisible,
    handleDaySelected,
    handleRangeSelection,
    handleCalendarsBlur,
    toggleMonthsVisibility,
  };
}
