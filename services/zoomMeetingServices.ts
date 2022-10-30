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
}: Omit<CalendarEvent, 'url'>): Omit<ZoomMeeting, 'join_url'> => ({
  topic: title,
  start_time: formatDateTimeToZoomFormat(start),
  duration: getMinutesDiff(end, start),
});

export const convertZoomMeetingToCalendarEvent = ({
  topic,
  join_url,
  start_time,
  duration,
}: ZoomMeeting): CalendarEvent => ({
  title: topic,
  url: join_url,
  start: start_time,
  end: dateTimeToIso(addMinutesToDateTime(start_time, duration)),
});
