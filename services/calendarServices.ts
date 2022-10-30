import { formatRange } from '@fullcalendar/react';
import { FULLCALENDAR_DATE_TIME_RANGE_FORMAT } from '../constants/calendarConstants';

export const getEventObjectFormText = (dateTimeRange: string) =>
  `Date : ${dateTimeRange}\n\nObjet`;

export const promptEventObjectForm = (start: Date, end: Date) => {
  const dateTimeRangeStr = formatRange(
    start,
    end,
    FULLCALENDAR_DATE_TIME_RANGE_FORMAT
  );
  const eventObjectFormText = getEventObjectFormText(dateTimeRangeStr);
  return window.prompt(eventObjectFormText);
};
