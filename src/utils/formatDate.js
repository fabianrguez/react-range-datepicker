export const formatDate = (date, lang = 'es') => Intl.DateTimeFormat(lang).format(date);
