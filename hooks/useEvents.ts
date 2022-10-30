import { DateSelectArg, EventClickArg } from '@fullcalendar/react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { createZoomMeeting, getAllZoomMeetings } from '../api/zoomMeetingApi';
import { promptEventObjectForm } from '../services/calendarServices';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ZOOM_MEETINGS_CACHE_KEYS } from '../constants/zoomMeetingConstants';

export const useEvents = () => {
  const { data: events, refetch: refetchEvents } = useQuery(
    [ZOOM_MEETINGS_CACHE_KEYS],
    () => getAllZoomMeetings().then(({ data }) => data)
  );

  const { mutate } = useMutation(createZoomMeeting, {
    onSuccess: () => {
      refetchEvents(), toast.success('Zoom Meeting Created!');
    },
    onError: err => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      toast.error(`Zoom Meeting Not Created!\n${error?.response?.data?.error}`);
    },
  });

  const addEvent = async ({ start, end }: DateSelectArg) => {
    const title = promptEventObjectForm(start, end);
    if (!title) {
      return;
    }

    mutate({
      title,
      start,
      end,
    });
  };

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
