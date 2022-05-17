export const formatDate = (date, lang = 'es') => date ? Intl.DateTimeFormat(lang).format(date) : '';
