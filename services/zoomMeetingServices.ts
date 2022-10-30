import { CalendarEvent } from '../types/calendarTypes';
import { ZoomMeeting } from '../types/zoomMeetingTypes';
import {
  addMinutesToDateTime,
  dateTimeToIso,
  formatDateTimeToZoomFormat,
  getMinutesDiff,
} from '../utils/dateUtils';

export const convertCalendarEventToZoomMeeting = ({
  title,
  start,
  end,
}: Omit<CalendarEvent, 'url'>): Omit<ZoomMeeting, 'start_url'> => ({
  topic: title,
  start_time: formatDateTimeToZoomFormat(start),
  duration: getMinutesDiff(end, start),
});

export const convertZoomMeetingToCalendarEvent = ({
  topic,
  start_url,
  start_time,
  duration,
}: ZoomMeeting): CalendarEvent => ({
  title: topic,
  url: start_url,
  start: start_time,
  end: dateTimeToIso(addMinutesToDateTime(start_time, duration)),
});
