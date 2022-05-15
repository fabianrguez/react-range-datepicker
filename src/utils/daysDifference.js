import { MS_TO_DAYS } from 'constants';

export const daysDifference = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / MS_TO_DAYS + 1;
