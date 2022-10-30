import dayjs from 'dayjs';

export const dateTimeToIso = (dateTime: string | Date) =>
  dayjs(dateTime).toISOString();

export const getMinutesDiff = (
  dateTime1: string | Date,
  dateTime2: string | Date
) => dayjs(dateTime1).diff(dateTime2, 'minutes');

export const formatDateTimeToZoomFormat = (dateTime: string | Date) =>
  dayjs(dateTime).toISOString().split('.')[0] + 'Z';

export const addMinutesToDateTime = (
  dateTime: string | Date,
  duration: number
) => dayjs(dateTime).add(duration, 'minutes').toDate();
