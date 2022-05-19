export const getWeekDaysNamesi18n = (locale = 'en', lenght = 'short') =>
  [...Array(7).keys()].map((dayIndex) =>
    new Intl.DateTimeFormat(locale, { weekday: lenght}).format(new Date(2022, 7, dayIndex + 1))
  );
