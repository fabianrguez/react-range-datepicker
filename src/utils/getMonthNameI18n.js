export const getMonthNamei18n = (monthIndex, locale = 'es') => new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2022, monthIndex, 1));
