export const getWeeksInMonth = (year, month, firstDayOfWeek) => {
  const weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  let dayOfWeekCounter = firstDate.getDay();

  for (let day = 1; day <= numDays; day++) {
    if (dayOfWeekCounter === firstDayOfWeek || weeks.length === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(day);
    dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
  }

  return weeks
    .filter((week) => !!week.length)
    .map((week) => ({
      start: week[0],
      end: week[week.length - 1],
      dates: week,
    }));
};