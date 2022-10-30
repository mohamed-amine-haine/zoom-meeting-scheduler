import { DateSelectArg, EventClickArg } from '@fullcalendar/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { createZoomMeeting } from '../api/zoomMeetingApi';
import { promptEventObjectForm } from '../services/calendarServices';
import { CalendarEvent } from '../types/calendarTypes';
import { asyncTryCatch } from '../utils/common';

export const useEvents = (eventsDefaultValue: CalendarEvent[] = []) => {
  const [events, setEvents] = useState(eventsDefaultValue);

  const addEvent = useCallback(async ({ start, end }: DateSelectArg) => {
    const title = promptEventObjectForm(start, end);
    if (!title) {
      return;
    }

    const [result, error] = await asyncTryCatch(
      async () =>
        await createZoomMeeting({
          title,
          start,
          end,
        })
    );

    if (error) {
      toast.error(`Zoom Meeting Not Created!\n${error?.response?.data?.error}`);
      return;
    }

    if (result.data) {
      setEvents(oldEvents => [...oldEvents, result.data]);
      toast.success('Zoom Meeting Created!');
    }
  }, []);

  const openEvent = useCallback((event: EventClickArg) => {
    if (event.event.url) {
      event.jsEvent.preventDefault();
      window.open(event.event.url, '_blank');
    }
  }, []);

  return {
    events,
    addEvent,
    openEvent,
  };
};
