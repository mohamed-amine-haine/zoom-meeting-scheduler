// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateZoomBearerToken } from '../../services/authServices';
import {
  createZoomMeetingApiBackend,
  getAllZoomMeetingsApiBackend,
} from '../../api/zoomMeetingApi';
import { ApiDataResponse } from '../../types/apiTypes';
import { CalendarEvent } from '../../types/calendarTypes';
import {
  convertCalendarEventToZoomMeeting,
  convertZoomMeetingToCalendarEvent,
} from '../../services/zoomMeetingServices';

const getZoomMeetings = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiDataResponse<CalendarEvent[]>>
) => {
  const bearerToken = generateZoomBearerToken();

  if (!bearerToken) {
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  try {
    const { meetings } = await getAllZoomMeetingsApiBackend(bearerToken);
    const calendarEvent = meetings.map(convertZoomMeetingToCalendarEvent);
    res.status(200).json({
      data: calendarEvent,
    });
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postZoomMeeting = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiDataResponse<CalendarEvent>>
) => {
  const bearerToken = generateZoomBearerToken();

  if (!bearerToken) {
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }

  try {
    const { title, start, end } = req.body as CalendarEvent;

    if (!title || !start || !end) {
      res.status(400).json({ error: 'Missing Fields' });
      return;
    }

    const zoomMeeting = convertCalendarEventToZoomMeeting({
      title,
      start,
      end,
    });

    const newZoomMeeting = await createZoomMeetingApiBackend(
      zoomMeeting,
      bearerToken
    );

    const { topic, join_url, start_time, duration } = newZoomMeeting;

    const newCalendarEvent = convertZoomMeetingToCalendarEvent({
      topic,
      join_url,
      start_time,
      duration,
    });

    res.status(201).json({
      data: newCalendarEvent,
    });
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await postZoomMeeting(req, res);
    return;
  }
  if (req.method === 'GET') {
    await getZoomMeetings(req, res);
    return;
  } else {
    res.status(405).json({ error: 'Only POST requests allowed' });
    return;
  }
}
