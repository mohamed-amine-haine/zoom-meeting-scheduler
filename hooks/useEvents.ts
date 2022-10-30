import { DateSelectArg } from '@fullcalendar/react';
import { useCallback, useState } from 'react';
import { createZoomMeeting } from '../api/zoomMeetingApi';
import { promptEventObjectForm } from '../services/calendarServices';
import { CalendarEvent } from '../types/calendarTypes';

export const useEvents = (eventsDefaultValue: CalendarEvent[] = []) => {
  const [events, setEvents] = useState(eventsDefaultValue);

  const addEvent = useCallback(async ({ start, end }: DateSelectArg) => {
    try {
      const title = promptEventObjectForm(start, end);

      if (title) {
        const { error, data: event } = await createZoomMeeting({
          title,
          start,
          end,
        });

        if (error) {
          console.log('Error');
          return;
        }
        if (event) {
          setEvents(oldEvents => [...oldEvents, event]);
        }
      }
    } catch (e) {
      console.log(e.response.data);
    }
  }, []);

  return {
    events,
    addEvent,
  };
};
