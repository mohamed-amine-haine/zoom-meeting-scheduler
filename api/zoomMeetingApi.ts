import axios from 'axios';
import {
  CREATE_ZOOM_MEETING_ZOOM_API_URL,
  GET_ALL_ZOOM_MEETING_ZOOM_API_URL,
  ZOOM_MEETING_API_URL,
} from '../constants/apiConstants';
import { ApiDataResponse } from '../types/apiTypes';
import { CalendarEvent } from '../types/calendarTypes';
import { ZoomMeeting } from '../types/zoomMeetingTypes';
import { dateTimeToIso } from '../utils/dateUtils';

export const createZoomMeeting = ({
  title,
  start,
  end,
}: Omit<CalendarEvent, 'url'>) =>
  axios
    .post(ZOOM_MEETING_API_URL, {
      title,
      start: dateTimeToIso(start),
      end: dateTimeToIso(end),
    })
    .then<ApiDataResponse<CalendarEvent>>(({ data }) => data);

export const getAllZoomMeetings = () =>
  axios
    .get(ZOOM_MEETING_API_URL)
    .then<ApiDataResponse<CalendarEvent>>(({ data }) => data);

export const createZoomMeetingApiBackend = (
  { topic, start_time, duration }: Omit<ZoomMeeting, 'join_url'>,
  bearerToken: string
) =>
  axios
    .post(
      CREATE_ZOOM_MEETING_ZOOM_API_URL,
      {
        topic,
        start_time,
        duration,
      },
      {
        headers: {
          authorization: `Bearer ${bearerToken}`,
          'content-type': 'application/json',
        },
      }
    )
    .then<ZoomMeeting>(({ data }) => data);

export const getAllZoomMeetingsApiBackend = (bearerToken: string) =>
  axios
    .get(GET_ALL_ZOOM_MEETING_ZOOM_API_URL, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
        'content-type': 'application/json',
      },
    })
    .then<{ meetings: ZoomMeeting[] }>(({ data }) => data);
